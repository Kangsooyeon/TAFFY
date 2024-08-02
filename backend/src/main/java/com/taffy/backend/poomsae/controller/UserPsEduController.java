package com.taffy.backend.poomsae.controller;

import com.taffy.backend.poomsae.dto.MainPageDto;
import com.taffy.backend.poomsae.dto.ResponseDto;
import com.taffy.backend.poomsae.service.UserPsEduService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class UserPsEduController {

    private final UserPsEduService userPsEduService;

    @GetMapping("/edu/main")
    public ResponseEntity<ResponseDto> poomSaeEduMain(@AuthenticationPrincipal Long userId){
        List<MainPageDto> mainPageDtos = userPsEduService.poomSaeEduMain(userId);
        return ResponseEntity.status(HttpStatus.OK).body(new ResponseDto(true,HttpStatus.OK.value(),mainPageDtos));
    }
}
