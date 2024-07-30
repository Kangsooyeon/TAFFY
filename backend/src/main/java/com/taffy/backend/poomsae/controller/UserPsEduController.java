package com.taffy.backend.poomsae.controller;

import com.taffy.backend.poomsae.dto.*;
import com.taffy.backend.poomsae.service.PsMvService;
import com.taffy.backend.poomsae.service.UserPsEduService;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

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
        return ResponseEntity.status(HttpStatus.OK).body(new ResponseDto(true, HttpStatus.OK.value(), mainPageDtos));
    }

    // 품새교육 상세페이지
    @GetMapping("/{psId}")
    public ResponseEntity<ResponseDto> poomSaeEduDetail(@AuthenticationPrincipal Long userId, @PathVariable Integer psId){
        DetailPageDto detailPageDto = psMvService.getPsDetail(psId, userId);
        return ResponseEntity.status(HttpStatus.OK).body(new ResponseDto(true, HttpStatus.OK.value(), detailPageDto));
    }
    
    // 품새 전체학습
    @GetMapping("/ps/{psId}")
    public ResponseEntity<ResponseDto> psEduWhole(@AuthenticationPrincipal Long userId, @PathVariable Integer psId) {
        PsWholeDto psWhole = psMvService.getOneWholePs(userId, psId);
        return ResponseEntity.status(HttpStatus.OK).body(new ResponseDto(true, HttpStatus.OK.value(), psWhole));
    }

    // 품새 개별동작 조회
    @GetMapping("/mv/{psMvId}")
    public ResponseEntity<ResponseDto> mvEduDetail(@AuthenticationPrincipal Long userId, @PathVariable Integer psMvId) {
        MvDetailDto mvDetailDto = psMvService.getUsPsMvDetailByPsMvId(userId, psMvId);
        return ResponseEntity.status(HttpStatus.OK).body(new ResponseDto(true, HttpStatus.OK.value(), mvDetailDto));
    }

    //
    //
    //

    // 유저 품새교육 완료
    @PutMapping("{psId}")
    public ResponseEntity<ResponseDto> psDone(@AuthenticationPrincipal Long userId, @PathVariable Integer psId) {
        userPsEduService.psDone(userId, psId);
        return ResponseEntity.status(HttpStatus.OK).body(new ResponseDto(true, HttpStatus.OK.value(), "해당 품새의 강의를 완료했습니다."));
    }

    // 유저 기본동작 완료
    @PutMapping("/mv/{psMvId}")
    public ResponseEntity<ResponseDto> mvDone(@AuthenticationPrincipal Long userId, @PathVariable Integer psMvId) {
        psMvService.mvDone(userId, psMvId);
        return ResponseEntity.status(HttpStatus.OK).body(new ResponseDto(true, HttpStatus.OK.value(), "해당 동작을 완료했습니다."));
    }

}
