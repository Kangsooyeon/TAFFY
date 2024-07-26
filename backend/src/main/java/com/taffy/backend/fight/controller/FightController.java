package com.taffy.backend.fight.controller;

import com.taffy.backend.fight.dto.InviteRoomRequestDto;
import com.taffy.backend.fight.dto.ResponseDto;
import com.taffy.backend.fight.service.FightService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/sparring")
@RequiredArgsConstructor
public class FightController {

    private final FightService fightService;

    @PostMapping("/create")
    public ResponseEntity<ResponseDto> createRoom(@AuthenticationPrincipal Long memberId) {
        String roomId = fightService.createRoom(memberId);
        return ResponseEntity.status(HttpStatus.OK).body(new ResponseDto<>(HttpStatus.OK.value(), "방 생성 완료", roomId));
    }

    @PostMapping("/invite")
    public ResponseEntity<String> invite(@RequestBody InviteRoomRequestDto inviteRoomRequestDto){
        fightService.invite(inviteRoomRequestDto);
        return ResponseEntity.status(HttpStatus.OK).body("방에 초대되었습니다.");
    }

    @PostMapping("/join")
    public ResponseEntity<String> enterRoom(@AuthenticationPrincipal Long memberId){
        fightService.enterRoom(memberId);
        return ResponseEntity.status(HttpStatus.OK).body("방에 가입이 되었습니다.");
    }

}