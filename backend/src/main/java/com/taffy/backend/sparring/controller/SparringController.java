package com.taffy.backend.sparring.controller;

import com.taffy.backend.sparring.model.UserModel;
import com.taffy.backend.sparring.service.SparringService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/spar")
public class SparringController {

    private final SparringService sparringService;

    @PostMapping("/enqueue")
    public ResponseEntity<?> enqueueUser(@RequestBody UserModel userModel) {
        sparringService.enqueueUser(userModel);
        return new ResponseEntity<>("enqueue 성공", HttpStatus.CREATED);
    }

    @GetMapping("/dequeue")
    public ResponseEntity<?> dequeueUsers() {
        List<UserModel> matchedUsers = sparringService.dequeueUsers();

        if (matchedUsers.size() == 2) {
            return new ResponseEntity<>(matchedUsers, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
    }

    @GetMapping("/queue")
    public ResponseEntity<List<Object>> getQueue() {
        List<Object> userQueue = sparringService.getQueue();
        return new ResponseEntity<>(userQueue, HttpStatus.OK);
    }
}
