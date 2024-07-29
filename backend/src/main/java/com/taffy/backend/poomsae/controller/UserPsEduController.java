package com.taffy.backend.poomsae.controller;

import com.taffy.backend.poomsae.dto.DetailPageDto;
import com.taffy.backend.poomsae.dto.MainPageDto;
import com.taffy.backend.poomsae.dto.ResponseDto;
import com.taffy.backend.poomsae.repostiory.PsRepository;
import com.taffy.backend.poomsae.service.PsMvService;
import com.taffy.backend.poomsae.service.UserPsEduService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/edu")
@RequiredArgsConstructor
public class UserPsEduController {

    private final UserPsEduService userPsEduService;
    private final PsMvService psMvService;

    // 품새교육 메인페이지
    @GetMapping("/main")
    public ResponseEntity<ResponseDto> poomSaeEduMain(@AuthenticationPrincipal Long userId){
        List<MainPageDto> mainPageDtos = userPsEduService.poomSaeEduMain(userId);
        return ResponseEntity.status(HttpStatus.OK).body(new ResponseDto(true,HttpStatus.OK.value(),mainPageDtos));
    }

    // 품새교육 상세페이지
    @GetMapping("/{psId}")
    public ResponseEntity<ResponseDto> poomSaeEduDetail(@PathVariable Integer psId){
        DetailPageDto detailPageDto = psMvService.getPsDetail(psId);
        return ResponseEntity.status(HttpStatus.OK).body(new ResponseDto(true, HttpStatus.OK.value(), detailPageDto));
    }


}
