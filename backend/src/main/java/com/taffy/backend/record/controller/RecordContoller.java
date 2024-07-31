package com.taffy.backend.record.controller;

import com.taffy.backend.record.dto.RecordDto;
import com.taffy.backend.record.dto.ResponseDto;
import com.taffy.backend.record.service.RecordService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/record")
@RequiredArgsConstructor
public class RecordContoller {

    private final RecordService recordService;

    // 유저 전적 조회
    @GetMapping("")
    public ResponseEntity<ResponseDto> getRecord(@AuthenticationPrincipal Long userId) {
        RecordDto recordDto = recordService.getRecord(userId);
        return ResponseEntity.status(HttpStatus.OK).body(new ResponseDto(true, HttpStatus.OK.value(), recordDto));
    }
}
