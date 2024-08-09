package com.taffy.backend.fight.service;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.taffy.backend.fight.controller.FightController;
import com.taffy.backend.fight.dto.ConnectionInfoDto;
import io.openvidu.java.client.Connection;
import io.openvidu.java.client.ConnectionProperties;
import io.openvidu.java.client.SessionProperties;

import java.util.*;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import com.taffy.backend.fight.dto.RedisHashUser;
import com.taffy.backend.global.exception.ErrorCode;
import com.taffy.backend.global.exception.TaffyException;
import com.taffy.backend.member.domain.Member;
import com.taffy.backend.member.repository.MemberRepository;
import io.openvidu.java.client.OpenVidu;
import io.openvidu.java.client.OpenViduHttpException;
import io.openvidu.java.client.OpenViduJavaClientException;
import io.openvidu.java.client.Session;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.Cursor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ScanOptions;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class FightService {
    private static final Logger log = LoggerFactory.getLogger(FightController.class);
    private final MemberRepository memberRepository;
    private final RedisTemplate<String, Object> redisTemplate;
    private final ObjectMapper objectMapper;
    private static final String ROOM_PREFIX = "taffy:";
    private final LocalContainerEntityManagerFactoryBean entityManagerFactory;


    private OpenVidu openvidu;
    @Value("${openvidu.url}")
    private String OPENVIDU_URL;

    @Value("${openvidu.secret}")
    private String OPENVIDU_SECRET;


    @PostConstruct
    public void init() {
        this.openvidu = new OpenVidu(OPENVIDU_URL, OPENVIDU_SECRET);
    }

    public String initializeSession(Map<String,Object> params)
            throws OpenViduJavaClientException, OpenViduHttpException {
        SessionProperties properties = SessionProperties.fromJson(params).build();
        Session session = openvidu.createSession(properties);
        log.info("openvidu session : "+session.getSessionId());
        return session.getSessionId();
    }

    // Map<String, String > params : sessionId, userName
    public String joinSession(Map<String,Object> params) throws OpenViduJavaClientException, OpenViduHttpException {
        Session session = openvidu.getActiveSession(params.get("sessionId").toString());
        System.out.println("joinSession : " + params.get("sessionId"));
        if (session == null) {
            new TaffyException(ErrorCode.CANNOT_JOIN_ROOM);
        }
        ConnectionProperties properties = ConnectionProperties.fromJson(params).build();
        Connection connection = session.createConnection(properties);
        //frontend에서 openvidu 의 session에 접속하기 위해 반드시 필요한 것
        return connection.getToken();
    }


    @Transactional(readOnly = true)
    public ConnectionInfoDto createRoom(Long memberId)
            throws OpenViduJavaClientException, OpenViduHttpException {
        Map<String, Object> map =new HashMap<>();
        //member 존재여부 체크
        RedisHashUser redisHashUser = createRedisHashUser(memberId);
        //sessionId 생성
        //openvidu 방 생성
       String sessionId=  initializeSession(map);

        map.put("sessionId", sessionId);
        map.put("memberId", memberId);
        //redis에 저장
        redisTemplate.opsForList().rightPush(sessionId, redisHashUser);
        //openvidu 미디어서버로 connection
        String connectionToken = joinSession(map);
        return  new ConnectionInfoDto(sessionId, connectionToken, "waiting");
    }

    @Transactional(readOnly = true)
    public ConnectionInfoDto joinRoom(Long memberId, String sessionId) throws OpenViduJavaClientException, OpenViduHttpException {
        RedisHashUser redisHashUser = createRedisHashUser(memberId);
        redisTemplate.opsForList().rightPush(sessionId, redisHashUser);
        Map<String, Object> map =new HashMap<>();
        map.put("sessionId", sessionId);
        map.put("memberId", memberId);
        String connectionToken = joinSession(map);
        return new ConnectionInfoDto(sessionId, connectionToken, "start");
    }

    @Transactional(readOnly = true)
    public ConnectionInfoDto quickStart(Long memberId) throws OpenViduJavaClientException, OpenViduHttpException {
        // 빠른참여
        //일단 redis에 빈 방 있는지부터 찾아
        String sessionId = findAvailableRoom();
        System.out.println("quickStart method  sessoinId  : " + sessionId);
        if(sessionId.equals("notfound")){ //참여가능한 게임방을 찾지 못한 경우
            // 자신이 새로 게임방을 만든 후, 다른 사람이 들어올 때 까지 대기하게 됨
            return createRoom(memberId);
        }
        return joinRoom(memberId,sessionId);
    }

    public String exitRoom(Long memberId, String sessionId){
        // 1. sessionId 로 room 가져오기.
        //getUsers(sessionId);
        return null;
    }

    public String findAvailableRoom(){
        Cursor<byte[]> cursor = redisTemplate.getConnectionFactory().getConnection().scan(ScanOptions.scanOptions().match("ses_*").build());
        while (cursor.hasNext()) {
            String key = new String(cursor.next());
            List<Object> value = redisTemplate.opsForList().range(key, 0, -1);
            if (value != null && value.size() == 1) {
                return key;
            }
        }
        return "notfound";
    }

    public  HashMap<String, List<RedisHashUser>> getAllRoom(){
        Cursor<byte[]> cursor = redisTemplate.getConnectionFactory().getConnection().scan(ScanOptions.scanOptions().match("ses_*").build());
        HashMap<String, List<RedisHashUser>> map = new HashMap<>();
        while (cursor.hasNext()) {
            String key = new String(cursor.next());
            List<Object> value = redisTemplate.opsForList().range(key, 0, -1);
            if (value != null ) {
                List<RedisHashUser> lists = value.stream()
                        .map(object -> (RedisHashUser) object) // 객체를 RedisHashUser로 캐스팅
                        .collect(Collectors.toList());
                map.put(key, lists);
            }
        }
        return map;
    }

    public Map<String, Object> getOnePeopleRoom() {
        Map<String, Object> keys = new HashMap<>();
        Map<String, Object> filteredKeys = new HashMap<>();
        Cursor<byte[]> cursor = redisTemplate.getConnectionFactory().getConnection().scan(ScanOptions.scanOptions().match("ses_*").build());
        while (cursor.hasNext()) {
            String key = new String(cursor.next());
            List<Object> value = redisTemplate.opsForList().range(key, 0, -1);
            if (value != null && value.size() == 1) {
                filteredKeys.put(key, value);
            }
            keys.put(key, value);
        }
        return filteredKeys;
    }

    @Transactional(readOnly = true)
    public List<RedisHashUser>  getUsers(String sessionId) {
        List<Object> list = redisTemplate.opsForList().range(sessionId, 0, -1);
        return list.stream().map(obj -> objectMapper.convertValue(obj, RedisHashUser.class)).collect(Collectors.toList());
    }

public void deleteInviter(Long memberId, String sessionId) {
    List<RedisHashUser> users = getUsers(sessionId);
    RedisHashUser userToRemove = users.stream()
            .filter(user -> user.getId().equals(memberId))
            .findFirst()
            .orElse(null);

    if (userToRemove != null) {
        try {
            Long remove = redisTemplate.opsForList().remove(sessionId, 1,userToRemove);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}

    private RedisHashUser createRedisHashUser(Long memberId) {
        // 해당 member의 존재여부 체크
        Member member = memberRepository.findById(memberId).orElseThrow(() -> new TaffyException(ErrorCode.MEMBER_NOT_FOUND));

        //redis에 객체를 저장할 수 있도록 변환
        RedisHashUser redisHashUser = RedisHashUser.builder()
                .id(member.getId())
                .email(member.getEmail())
                .win(member.getRecord().getWin())
                .draw(member.getRecord().getDraw())
                .loss(member.getRecord().getLose())
                .nickName(member.getNickname())
                .beltName(member.getBelt().getBeltName())
                .build();
        return redisHashUser;
    }

    public void addMember(String sessionId, RedisHashUser member) {
        redisTemplate.opsForList().rightPush(sessionId, member);
    }

}
