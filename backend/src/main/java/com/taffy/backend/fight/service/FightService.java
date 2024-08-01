package com.taffy.backend.fight.service;

import com.taffy.backend.fight.dto.InviteRoomRequestDto;
import com.taffy.backend.fight.dto.RedisHashUser;
import com.taffy.backend.global.exception.ErrorCode;
import com.taffy.backend.global.exception.TaffyException;
import com.taffy.backend.member.domain.Member;
import com.taffy.backend.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.concurrent.TimeUnit;

@Service
@RequiredArgsConstructor
public class FightService {

    private final MemberRepository memberRepository;
    private final RedisTemplate<String, Object> redisTemplate;

    private static final String INVITE_PREFIX = "invite:";

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
        redisTemplate.opsForList().rightPush(sessionId, redisHashUser);
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

//    @Cacheable(value = "rooms", key = "#invitee")
//    public String getRoomForInvitee(String invitee) {
//        String inviteKey = INVITE_PREFIX + invitee;
//        return (String) redisTemplate.opsForValue().get(inviteKey);
//    }
}