package com.taffy.backend.sparring.service;

import com.taffy.backend.global.exception.ErrorCode;
import com.taffy.backend.global.exception.TaffyException;
import com.taffy.backend.poomsae.domain.Mv;
import com.taffy.backend.poomsae.dto.MvDto;
import com.taffy.backend.poomsae.repository.MvRepository;
import com.taffy.backend.sparring.dto.MissionDto;
import com.taffy.backend.sparring.model.UserModel;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.ListOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SparringService {

    private final RedisTemplate<String, Object> redisTemplate;
    private final MvRepository mvRepository;

    public void enqueueUser(UserModel userModel) {
        ListOperations<String, Object> listOperations = redisTemplate.opsForList();
        listOperations.rightPush("UserQueue", userModel);
    }

    public List<UserModel> dequeueUsers() {
        ListOperations<String, Object> listOperations = redisTemplate.opsForList();
        List<UserModel> matchedUsers = new ArrayList<>();

        if (listOperations.size("UserQueue") >= 2) {
            UserModel user1 = (UserModel) listOperations.leftPop("UserQueue");
            UserModel user2 = (UserModel) listOperations.leftPop("UserQueue");

            if (user1 != null && user2 != null) {
                matchedUsers.add(user1);
                matchedUsers.add(user2);
            }
        }
        return matchedUsers;
    }

    public List<Object> getQueue() {
        ListOperations<String, Object> listOperations = redisTemplate.opsForList();
        return listOperations.range("UserQueue", 0, -1);
    }

    @Transactional(readOnly = true)
    public List<MissionDto> getMission(String type) {
        Mv.MovementType mvType;
        try {
            mvType = Mv.MovementType.valueOf(type.toUpperCase());
        } catch (IllegalArgumentException e) {
            throw new TaffyException(ErrorCode.INVALID_MOVEMENT_TYPE);
        }
        List<Mv> movements = mvRepository.findByMvType(mvType);
        if (movements.isEmpty()) {
            throw new TaffyException(ErrorCode.MOVEMENTS_NOT_FOUND);
        }
        List<Mv> randomMovements = new ArrayList<>();
        for (int i = 0; i < 9; i++) {
            randomMovements.add(movements.get((int) (Math.random() * movements.size())));
        }
        return randomMovements.stream()
                .map(mv -> new MissionDto(mv.getMvId(), mv.getMvKoName(), mv.getMvEnName(), mv.getMvType()))
                .collect(Collectors.toList());
    }
}
