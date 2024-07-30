package com.taffy.backend.poomsae.controller;

import com.taffy.backend.poomsae.dto.*;
import com.taffy.backend.poomsae.repository.UserPsMvRepository;
import com.taffy.backend.poomsae.service.PsMvService;
import com.taffy.backend.poomsae.service.UserPsEduService;
import com.taffy.backend.poomsae.service.UserPsMvService;
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
    private final UserPsMvRepository userPsMvRepository;
    private final UserPsMvService userPsMvService;


    //
    //
    //
    // PS EDU PAGE

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
    // PS EDU

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

    // 해당 품새의 모든 기본동작 완료 여부
    @GetMapping("/users/{psId}")
    public ResponseEntity<ResponseDto> isPsDone(@AuthenticationPrincipal Long userId, @PathVariable Integer psId) {
        boolean isDone = userPsEduService.isPsDone(userId, psId);
        if (isDone) {
            return ResponseEntity.status(HttpStatus.OK).body(new ResponseDto(true, HttpStatus.OK.value(), "모든 기본동작이 완료되었습니다."));
        } else {
            return ResponseEntity.status(HttpStatus.OK).body(new ResponseDto(false, HttpStatus.OK.value(), "기본동작 중 완료되지 않은 동작이 있습니다."));
        }
    }

    // 동작별 완료 여부
    @GetMapping("/mv/users/{psMvId}")
    public ResponseEntity<ResponseDto> isMvDone(@AuthenticationPrincipal Long userId, @PathVariable Integer psMvId) {
        boolean isDone = userPsMvService.isMvDone(userId, psMvId);
        if (isDone) {
            return ResponseEntity.status(HttpStatus.OK).body(new ResponseDto(true, HttpStatus.OK.value(), "해당 기본동작은 완료되었습니다."));
        } else {
            return ResponseEntity.status(HttpStatus.OK).body(new ResponseDto(false, HttpStatus.OK.value(), "해당 기본동작은 아직 완료되지 않았습니다."));
        }
    }
}
