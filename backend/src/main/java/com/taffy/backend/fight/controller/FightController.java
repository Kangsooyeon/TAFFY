package com.taffy.backend.fight.controller;

import com.taffy.backend.fight.dto.ConnectionInfoDto;
import com.taffy.backend.fight.dto.InviteRoomRequestDto;
import com.taffy.backend.fight.dto.ResponseDto;
import com.taffy.backend.fight.service.FightService;
import io.openvidu.java.client.*;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.Map;


@RestController
@RequestMapping("/api/sparring")
@RequiredArgsConstructor
public class FightController {

    private final FightService fightService;
    private static final Logger log = LoggerFactory.getLogger(FightController.class);

    @PostMapping("/create")
    public ResponseEntity<ResponseDto> createRoom(@AuthenticationPrincipal Long memberId) throws OpenViduJavaClientException, OpenViduHttpException {
        log.info("memberId = ",memberId);
        String sessionId= fightService.initializeSession(memberId);
//        String sessionId = "test"+System.currentTimeMillis();
        ConnectionInfoDto roomId = fightService.createRoom(memberId,sessionId); //sessionId로 room생성
        return ResponseEntity.status(HttpStatus.OK).body(new ResponseDto<>(HttpStatus.OK.value(), "방 생성 완료", roomId));
    }

    @PostMapping("/join")
    public ResponseEntity<String> enterRoom(@AuthenticationPrincipal Long memberId, @RequestParam  String sessionId){
        fightService.enterRoom(memberId, sessionId);
        return ResponseEntity.status(HttpStatus.OK).body("방에 가입이 되었습니다.");
    }

}
