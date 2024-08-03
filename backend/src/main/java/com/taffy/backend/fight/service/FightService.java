package com.taffy.backend.fight.service;
import com.taffy.backend.fight.controller.FightController;
import com.taffy.backend.fight.dto.ConnectionInfoDto;
import io.openvidu.java.client.Connection;
import io.openvidu.java.client.ConnectionProperties;
import java.util.List;
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
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.Cursor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ScanOptions;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class FightService {
    private static final Logger log = LoggerFactory.getLogger(FightController.class);
    private final MemberRepository memberRepository;
    private final RedisTemplate<String, Object> redisTemplate;

    private static final String ROOM_PREFIX = "taffy:";
    private final LocalContainerEntityManagerFactoryBean entityManagerFactory;

    @Transactional(readOnly = true)
    public ConnectionInfoDto createRoom(Long memberId, String sessionId)
            throws OpenViduJavaClientException, OpenViduHttpException {
        //member 존재여부 체크
        RedisHashUser redisHashUser = createRedisHashUser(memberId);
        //redis에 저장
        redisTemplate.opsForList().rightPush(ROOM_PREFIX+sessionId, redisHashUser);
        //openvidu에서 session 생성
        initializeSession(memberId);
        //openvidu 미디어서버로 connection
        Map<String, Object> map =new HashMap<>();
        map.put("sessionId", sessionId);
        map.put("memberId", memberId);
        String connectionToken = joinSession(map);
        return  new ConnectionInfoDto(sessionId, connectionToken);
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
                .beltName(member.getBelt().getBelt_name())
                .build();
        return redisHashUser;
    }

    @Transactional(readOnly = true)
    public void enterRoom(Long memberId, String roomId) {
        RedisHashUser redisHashUser = createRedisHashUser(memberId);

        if(roomId != null && redisTemplate.opsForList().size(roomId) < 2 ){
            redisTemplate.opsForList().rightPush(roomId, redisHashUser);
            System.out.println("방 입장 완료 :" + roomId );
            return;
        }

        throw new TaffyException(ErrorCode.CANNOT_JOIN_ROOM);
    }
    @Transactional(readOnly = true)
    public ConnectionInfoDto joinRoom(Long memberId, String sessionId) throws OpenViduJavaClientException, OpenViduHttpException {
        RedisHashUser redisHashUser = createRedisHashUser(memberId);
        redisTemplate.opsForList().rightPush(sessionId, redisHashUser);
        Map<String, Object> map =new HashMap<>();
        map.put("sessionId", sessionId);
        map.put("memberId", memberId);
        String connectionToken = joinSession(map);
        return new ConnectionInfoDto(sessionId, connectionToken);
    }

    @Transactional(readOnly = true)
    public ConnectionInfoDto gameStart(Long memberId, String sessionId){
        return null;
    }

    public String findAvailableRoom(){
        Cursor<byte[]> cursor = redisTemplate.getConnectionFactory().getConnection().scan(ScanOptions.scanOptions().match("*").build());
        while (cursor.hasNext()) {
            String key = new String(cursor.next());
            List<Object> value = redisTemplate.opsForList().range(key, 0, -1);
            if (value != null && value.size() == 1) {
                return key;
            }
        }
        return "notfound";
    }
    public Map<String, Object> getOnePeopleRome() {
        Map<String, Object> keys = new HashMap<>();
        Map<String, Object> filteredKeys = new HashMap<>();
        Cursor<byte[]> cursor = redisTemplate.getConnectionFactory().getConnection().scan(ScanOptions.scanOptions().match("*").build());
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
    public void getSpecificKey(String key) {
        Object value = redisTemplate.opsForList().range(key,0,-1);
        System.out.println("Key: " + key + ", Value: " + value);
    }

    private OpenVidu openvidu;
    @Value("${openvidu.url}")
    private String OPENVIDU_URL;

    @Value("${openvidu.secret}")
    private String OPENVIDU_SECRET;


    @PostConstruct
    public void init() {
        this.openvidu = new OpenVidu(OPENVIDU_URL, OPENVIDU_SECRET);
    }


    public String initializeSession(Long memberId)
            throws OpenViduJavaClientException, OpenViduHttpException {
        Session session = openvidu.createSession();
        log.info(session.getSessionId());
        return session.getSessionId();
    }

    // Map<String, String > params : sessionId, userName
    public String joinSession(Map<String,Object> params) throws OpenViduJavaClientException, OpenViduHttpException {
        Session session = openvidu.getActiveSession(params.get("sessionId").toString());
        if (session == null) {
            new TaffyException(ErrorCode.CANNOT_JOIN_ROOM);
        }
        ConnectionProperties properties = ConnectionProperties.fromJson(params).build();
        Connection connection = session.createConnection(properties);
        //frontend에서 openvidu 의 session에 접속하기 위해 반드시 필요한 것
        return connection.getToken();
    }

}
