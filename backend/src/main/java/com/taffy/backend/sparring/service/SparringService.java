package com.taffy.backend.sparring.service;

import com.taffy.backend.sparring.model.UserModel;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.ListOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class SparringService {

    private final RedisTemplate<String, Object> redisTemplate;

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
}
