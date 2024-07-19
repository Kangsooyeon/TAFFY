package com.taffy.backend.member.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.taffy.backend.global.exception.ErrorCode;
import com.taffy.backend.global.exception.TaffyException;
import com.taffy.backend.global.security.jwt.JwtProvider;
import com.taffy.backend.global.security.jwt.dto.TokensResponseDTO;
import com.taffy.backend.member.domain.Belt;
import com.taffy.backend.member.domain.Country;
import com.taffy.backend.member.domain.Member;
import com.taffy.backend.member.dto.LoginRequestDto;
import com.taffy.backend.member.dto.SignUpRequestDto;
import com.taffy.backend.member.repository.BeltRepository;
import com.taffy.backend.member.repository.CountryRepository;
import com.taffy.backend.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;
    private final CountryRepository countryRepository;
    private final BeltRepository beltRepository;
    private final BCryptPasswordEncoder passwordEncoder;
    private final JwtProvider jwtProvider;

    @Transactional
    public void signUp(SignUpRequestDto signUpRequestDto) {

        boolean existsEmail = memberRepository.existsByEmail(signUpRequestDto.getEmail());
        if (existsEmail) {
            throw new TaffyException(ErrorCode.DUPLICATE_EMAIL);
        }

        Country country = countryRepository.findByCountryName(signUpRequestDto.getCountryName());
        Belt belt = beltRepository.findById(1L).get();

        Member member = Member.builder()
                .email(signUpRequestDto.getEmail())
                .password(passwordEncoder.encode(signUpRequestDto.getPassword()))
                .nickname(signUpRequestDto.getNickName())
                .profile_img("https://seojihyeon.s3.ap-northeast-2.amazonaws.com/basicprofile.png")
                .belt(belt)
                .country(country)
                .build();

        memberRepository.save(member);
    }

    @Transactional(readOnly = true)
    public TokensResponseDTO login(LoginRequestDto loginRequestDto){
        Member member = memberRepository.findByEmail(loginRequestDto.getEmail()).orElseThrow(() -> new TaffyException(ErrorCode.MEMBER_NOT_FOUND));
        boolean matches = passwordEncoder.matches(loginRequestDto.getPassword(), member.getPassword());
        if (matches){
            try {
                TokensResponseDTO tokensByLogin = jwtProvider.createTokensByLogin(member.getId());
                return tokensByLogin;
            } catch (JsonProcessingException e) {
                e.printStackTrace();
            }
        }
        return null;
    }

    @Transactional
    public void deleteMember(Long memberId) {
        memberRepository.deleteById(memberId);
    }
}