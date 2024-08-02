package com.taffy.backend.member.controller;

import com.taffy.backend.global.email.MailService;
import com.taffy.backend.global.email.dto.MailDto;
import com.taffy.backend.global.security.jwt.dto.TokensResponseDTO;
import com.taffy.backend.member.dto.LoginRequestDto;
import com.taffy.backend.member.dto.MemberInfoUpdateRequestDto;
import com.taffy.backend.member.dto.SignUpRequestDto;
import com.taffy.backend.member.service.MemberService;
import com.taffy.backend.poomsae.dto.MyPageDto;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import static org.springframework.http.HttpStatus.*;

@RestController
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;
    private final MailService mailService;

    @PostMapping("/api/sign-up")
    public ResponseEntity<String> signUp(@RequestBody @Valid SignUpRequestDto signUpRequestDto, BindingResult bindingResult){
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
    public ResponseEntity<String> mailConfirm(@RequestBody MailDto mailDto, BindingResult bindingResult){
        String authenticationCode = mailService.sendSimpleMessage(mailDto.getEmail());
        return ResponseEntity.status(OK).body(authenticationCode);
    }

    @DeleteMapping("/api/user")
    public ResponseEntity<String> deleteMember(@AuthenticationPrincipal Long memberId){
        memberService.deleteMember(memberId);
        return ResponseEntity.status(NO_CONTENT).body("회원 삭제 완료");
    }

    @GetMapping("/api/reissue")
    public ResponseEntity<String> reissueToken(@AuthenticationPrincipal Long memberId, HttpServletResponse httpServletResponse) {
        TokensResponseDTO reissueToken = memberService.reissueToken(memberId);
        cookieTokenSetting(httpServletResponse, reissueToken);
        return ResponseEntity.status(OK).body("토큰 재발급 완료");
    }

    @PatchMapping("/api/user")
    public ResponseEntity<String> modificationInfo(@AuthenticationPrincipal Long memberId, @RequestBody MemberInfoUpdateRequestDto memberInfoUpdateRequestDto){
        memberService.modificationInfo(memberId, memberInfoUpdateRequestDto);
        return ResponseEntity.status(OK).body("회원정보 수정 완료");
    }

    @PutMapping("/api/belt")
    public ResponseEntity<String> beltPromotion(@AuthenticationPrincipal Long memberId){
        memberService.beltPromotion(memberId);
        return ResponseEntity.status(OK).body("축하합니다! 띠 단계 1단계 승급하였습니다.");
    }

    @GetMapping("/api/user")
    public ResponseEntity<MyPageDto> myPage(@AuthenticationPrincipal Long memberId){
        MyPageDto myPageDto = memberService.myPage(memberId);
        return ResponseEntity.status(OK).body(myPageDto);
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
