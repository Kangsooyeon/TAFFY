package com.taffy.backend.member.controller;

import com.taffy.backend.global.email.MailService;
import com.taffy.backend.global.email.dto.MailDto;
import com.taffy.backend.global.security.jwt.dto.TokensResponseDTO;
import com.taffy.backend.member.dto.LoginRequestDto;
import com.taffy.backend.member.dto.SignUpRequestDto;
import com.taffy.backend.member.service.MemberService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import static org.springframework.http.HttpStatus.*;

@RestController
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;
    private final MailService mailService;

    @PostMapping("/api/sign-up")
    public ResponseEntity<String> signUp(@RequestBody @Valid SignUpRequestDto signUpRequestDto){
        memberService.signUp(signUpRequestDto);
        return ResponseEntity.status(CREATED).body("회원가입 완료");
    }

    @PostMapping("/api/login")
    public ResponseEntity<String> login(@RequestBody @Valid LoginRequestDto loginRequestDto, HttpServletResponse httpServletResponse){
        TokensResponseDTO tokens = memberService.login(loginRequestDto);
        cookieTokenSetting(httpServletResponse, tokens);
        return ResponseEntity.status(OK).body("로그인 완료");
    }

    @PostMapping("/api/mail")
    public ResponseEntity<String> mailConfirm(@RequestBody MailDto mailDto){
        String authenticationCode = mailService.sendSimpleMessage(mailDto.getEmail());
        return ResponseEntity.status(OK).body(authenticationCode);
    }

    @DeleteMapping("/api/user")
    public ResponseEntity<String> deleteMember(@AuthenticationPrincipal Long memberId){
        memberService.deleteMember(memberId);
        return ResponseEntity.status(NO_CONTENT).body("회원 삭제 완료");
    }
    
    private static void cookieTokenSetting(HttpServletResponse httpServletResponse, TokensResponseDTO tokens) {
        Cookie cookieAtk = new Cookie("atk", tokens.getAtk());
        Cookie cookieRtk = new Cookie("rtk", tokens.getRtk());
        cookieAtk.setHttpOnly(true);
        cookieAtk.setPath("/");
        cookieAtk.setMaxAge(60 * 60);
        cookieRtk.setHttpOnly(true);
        cookieRtk.setPath("/");
        cookieRtk.setMaxAge(60 * 60);
        httpServletResponse.addCookie(cookieAtk);
        httpServletResponse.addCookie(cookieRtk);
    }
}
