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

    @PostMapping("/matching")
    public ResponseEntity<ResponseDto> matching(@AuthenticationPrincipal Long memberId) throws OpenViduJavaClientException, OpenViduHttpException {
        ConnectionInfoDto connectionInfoDto = fightService.quickStart(memberId);
        return ResponseEntity.status(HttpStatus.OK).body(new ResponseDto<>(HttpStatus.OK.value(), "방 생성 완료", connectionInfoDto));
    }
    @PostMapping("/create")
    public ResponseEntity<ResponseDto> createRoom(@AuthenticationPrincipal Long memberId) throws OpenViduJavaClientException, OpenViduHttpException {
        ConnectionInfoDto connectionInfoDto = fightService.createRoom(memberId);
        return ResponseEntity.status(HttpStatus.OK).body(new ResponseDto<>(HttpStatus.OK.value(), "방 생성 완료", connectionInfoDto));
    }

    @PostMapping("/game-invitations")
    public ResponseEntity<ResponseDto> enterRoom(@AuthenticationPrincipal Long memberId, @RequestParam  String sessionId)
            throws OpenViduJavaClientException, OpenViduHttpException {
        ConnectionInfoDto connectionInfoDto = fightService.joinRoom(memberId, sessionId);
        return ResponseEntity.status(HttpStatus.OK).body(new ResponseDto<>(HttpStatus.OK.value() , "방 가입 완료", connectionInfoDto));
    }

}
