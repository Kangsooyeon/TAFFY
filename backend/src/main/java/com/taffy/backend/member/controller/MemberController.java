package com.taffy.backend.member.controller;

import com.taffy.backend.global.security.jwt.dto.TokensResponseDTO;
import com.taffy.backend.member.dto.LoginRequestDto;
import com.taffy.backend.member.dto.SignUpRequestDto;
import com.taffy.backend.member.service.MemberService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;

    @PostMapping("/api/sign-up")
    public String signUp(@RequestBody @Valid SignUpRequestDto signUpRequestDto){
        memberService.signUp(signUpRequestDto);
        return "회원가입 완료";
    }

    @PostMapping("/api/login")
    public String signUp(@RequestBody @Valid LoginRequestDto loginRequestDto,
                         HttpServletResponse httpServletResponse){
        TokensResponseDTO tokens = memberService.login(loginRequestDto);
        Cookie cookie = new Cookie("token", tokens.getAtk());
        cookie.setHttpOnly(true);
        cookie.setPath("/");
        cookie.setMaxAge(60 * 60);
        httpServletResponse.addCookie(cookie);
        return "로그인 완료";
    }
}
