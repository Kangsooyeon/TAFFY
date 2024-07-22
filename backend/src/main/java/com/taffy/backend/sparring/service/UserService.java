package com.taffy.backend.sparring.service;

import com.taffy.backend.sparring.entity.UserEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    private final RedisTemplate<String, Object> redisTemplate;

    @Autowired
    public UserService(RedisTemplate<String, Object> redisTemplate) {
        this.redisTemplate = redisTemplate;
    }

    public void saveUser(UserEntity user) {
        redisTemplate.opsForList().rightPush("users", user);
    }

    public List<Object> getUsers() {
        return redisTemplate.opsForList().range("users", 0, -1);
    }
}
