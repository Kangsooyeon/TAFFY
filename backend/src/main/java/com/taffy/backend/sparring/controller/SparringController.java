package com.taffy.backend.sparring.controller;

import com.taffy.backend.sparring.entity.UserEntity;
import com.taffy.backend.sparring.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/spar")
public class SparringController {

    private final UserService userService;

    @PostMapping("/redisTest")
    public ResponseEntity<?> addRedisKey(@RequestBody UserEntity userEntity) {
        userService.saveUser(userEntity);
        return new ResponseEntity<>("유저가 캐시에 저장됐습니다.",HttpStatus.CREATED);
    }

    @GetMapping("/redisTest")
    public ResponseEntity<?> getRedisKeys() {
        List<Object> users = userService.getUsers();
        return new ResponseEntity<>(users, HttpStatus.OK);
    }
}
