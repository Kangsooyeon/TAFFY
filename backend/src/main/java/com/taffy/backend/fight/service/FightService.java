package com.taffy.backend.fight.service;

import com.taffy.backend.fight.dto.InviteRoomRequestDto;
import com.taffy.backend.fight.dto.RedisHashUser;
import com.taffy.backend.global.exception.ErrorCode;
import com.taffy.backend.global.exception.TaffyException;
import com.taffy.backend.member.domain.Member;
import com.taffy.backend.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.redis.core.Cursor;
import org.springframework.data.redis.core.HashOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ScanOptions;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.TimeUnit;

@Service
@RequiredArgsConstructor
public class FightService {

    private final MemberRepository memberRepository;
    private final RedisTemplate<String, Object> redisTemplate;

    private static final String INVITE_PREFIX = "invite:";
    private static final String ROOM_PREFIX = "taffy:";
    private final LocalContainerEntityManagerFactoryBean entityManagerFactory;

    @Transactional(readOnly = true)
    public String createRoom(Long memberId, String sessionId) {

        Member member = memberRepository.findById(memberId).orElseThrow(() -> new TaffyException(ErrorCode.MEMBER_NOT_FOUND));

        RedisHashUser redisHashUser = RedisHashUser.builder()
                .id(member.getId())
                .email(member.getEmail())
                .win(member.getRecord().getWin())
                .draw(member.getRecord().getDraw())
                .loss(member.getRecord().getLose())
                .nickName(member.getNickname())
                .beltName(member.getBelt().getBelt_name())
                .build();

//        String roomId = "room:" + member.getNickname()+":"+System.currentTimeMillis();
        redisTemplate.opsForList().rightPush(ROOM_PREFIX+sessionId, redisHashUser);
        return sessionId;
    }

    @Transactional(readOnly = true)
    public void invite(InviteRoomRequestDto inviteRoomRequestDto) {
        Member member = memberRepository.findByNickname(inviteRoomRequestDto.getNickName()).orElseThrow(() -> new TaffyException(ErrorCode.MEMBER_NOT_FOUND));
        String inviteKey = INVITE_PREFIX + member.getNickname();
        redisTemplate.opsForValue().set(inviteKey, inviteRoomRequestDto.getRoomId(), 3, TimeUnit.MINUTES);
    }

    @Transactional(readOnly = true)
    public void enterRoom(Long memberId, String roomId) {
        Member member = memberRepository.findById(memberId).orElseThrow(() -> new TaffyException(ErrorCode.MEMBER_NOT_FOUND));

        RedisHashUser redisHashUser = RedisHashUser.builder()
                .id(member.getId())
                .email(member.getEmail())
                .win(member.getRecord().getWin())
                .draw(member.getRecord().getDraw())
                .loss(member.getRecord().getLose())
                .nickName(member.getNickname())
                .beltName(member.getBelt().getBelt_name())
                .build();

//        if (roomId != null && redisTemplate.opsForList().size(roomId) < 2) {
//            redisTemplate.opsForList().rightPush(roomId, redisHashUser);
//            redisTemplate.delete(INVITE_PREFIX + member.getNickname());
//            return;
//        }
        if(roomId != null && redisTemplate.opsForList().size(roomId) < 2 ){
            redisTemplate.opsForList().rightPush(roomId, redisHashUser);
            System.out.println("방 입장 완료 :" + roomId );
            return;
        }

        throw new TaffyException(ErrorCode.CANNOT_JOIN_ROOM);
    }

    public Map<String, Object> getAllKeys() {
        Map<String, Object> keys = new HashMap<>();
        Cursor<byte[]> cursor = redisTemplate.getConnectionFactory().getConnection().scan(ScanOptions.scanOptions().match("*").build());
        while (cursor.hasNext()) {
            String key = new String(cursor.next());
            Object value = redisTemplate.opsForList().range(key, 0, -1);

//            HashOperations<String, String, Object> hashOps = redisTemplate.opsForHash();
//            Map<String, Object> entries = hashOps.entries(key);

//            if (entries.isEmpty()) {
//                return null;
//            }
//
//            RedisHashUser user = new RedisHashUser();
//            user.setId(Long.valueOf((String) entries.get("id")));
//            user.setEmail((String) entries.get("email"));
//            user.setLoss(Integer.parseInt((String) entries.get("lose")));
//            user.setWin(Integer.parseInt((String) entries.get("win")));
//            user.setDraw(Integer.parseInt((String)entries.get("draw")));
//            user.setNickName((String)entries.get("nickName"));
//            user.setBeltName((String)entries.get("beltName"));

            keys.put(key, value);
        }
        return keys;
    }

    public void getSpecificKey(String key) {
        Object value = redisTemplate.opsForList().range(key,0,-1);
        System.out.println("Key: " + key + ", Value: " + value);
    }
}