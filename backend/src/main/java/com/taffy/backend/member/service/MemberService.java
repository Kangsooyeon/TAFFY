package com.taffy.backend.member.service;

import com.taffy.backend.global.exception.ErrorCode;
import com.taffy.backend.global.exception.TaffyException;
import com.taffy.backend.global.security.jwt.JwtProvider;
import com.taffy.backend.member.domain.Member;
import com.taffy.backend.member.dto.signUpRequestDto;
import com.taffy.backend.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtProvider jwtProvider;

    @Transactional
    public void signUp(signUpRequestDto signUpRequestDto) {
        boolean existsEmail = memberRepository.existsByEmail(signUpRequestDto.getEmail());
        if (existsEmail) {
            throw new TaffyException(ErrorCode.DUPLICATE_EMAIL);
        }
    }
}