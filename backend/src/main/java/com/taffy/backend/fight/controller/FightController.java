package com.taffy.backend.fight.controller;

import com.taffy.backend.fight.dto.InviteRoomRequestDto;
import com.taffy.backend.fight.dto.ResponseDto;
import com.taffy.backend.fight.service.FightService;
import io.openvidu.java.client.*;
import jakarta.annotation.PostConstruct;
import java.time.LocalDateTime;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;


@RestController
@RequestMapping("/api/sparring")
@RequiredArgsConstructor
public class FightController {

    private static final Logger log = LoggerFactory.getLogger(FightController.class);
//    private OpenVidu openvidu;
//    @Value("${openvidu.url}")
//    private String OPENVIDU_URL;
//
//    @Value("${openvidu.secret}")
//    private String OPENVIDU_SECRET;


//    @PostConstruct
//    public void init() {
//        this.openvidu = new OpenVidu(OPENVIDU_URL, OPENVIDU_SECRET);
//    }


    private final FightService fightService;

//    public String initializeSession(Long memberId)
//            throws OpenViduJavaClientException, OpenViduHttpException {
//        Session session = openvidu.createSession();
//        log.info(session.getSessionId());
//        return session.getSessionId();
//    }

    @SneakyThrows
    @PostMapping("/create")
    public ResponseEntity<ResponseDto> createRoom(@AuthenticationPrincipal Long memberId) {
//        String sessionId= initializeSession(memberId);
        LocalDateTime now = LocalDateTime.now();
        String sessionId = "test" + now ;
        log.info(sessionId);
        String roomId = fightService.createRoom(memberId,sessionId); //sessionId로 room생성
        return ResponseEntity.status(HttpStatus.OK).body(new ResponseDto<>(HttpStatus.OK.value(), "방 생성 완료", roomId));
    }

    @PostMapping("/join")
    public ResponseEntity<String> enterRoom(@AuthenticationPrincipal Long memberId, String sessionId){
        fightService.enterRoom(memberId, sessionId);
        return ResponseEntity.status(HttpStatus.OK).body("방에 가입이 되었습니다.");
    }

}
