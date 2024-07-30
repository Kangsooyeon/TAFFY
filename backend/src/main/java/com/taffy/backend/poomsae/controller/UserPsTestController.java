package com.taffy.backend.poomsae.controller;

import com.sun.security.auth.UserPrincipal;
import com.taffy.backend.poomsae.dto.*;
import com.taffy.backend.poomsae.repository.UserPsMvRepository;
import com.taffy.backend.poomsae.service.PsMvService;
import com.taffy.backend.poomsae.service.UserPsEduService;
import com.taffy.backend.poomsae.service.UserPsMvService;
import com.taffy.backend.poomsae.service.UserPsTestService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/test")
@RequiredArgsConstructor
public class UserPsTestController {

    private final UserPsEduService userPsEduService;
    private final PsMvService psMvService;
    private final UserPsMvRepository userPsMvRepository;
    private final UserPsMvService userPsMvService;
    private final UserPsTestService userPsTestService;


    //
    //
    //
    // PS TEST

    // 유저 품새 심사 P/F 목록
    @GetMapping("/users/ps")
    public ResponseEntity<ResponseDto> psTestList(@AuthenticationPrincipal Long userId) {
        List<UserPsTestDto> psTestList = userPsTestService.getPsTestList(userId);
        return ResponseEntity.status(HttpStatus.OK).body(new ResponseDto(true, HttpStatus.OK.value(), psTestList));
    }


}