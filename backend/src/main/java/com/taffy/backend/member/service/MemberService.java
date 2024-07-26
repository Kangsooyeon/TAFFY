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
import com.taffy.backend.member.dto.MemberInfoUpdateRequestDto;
import com.taffy.backend.member.dto.NicknameDuplicateDto;
import com.taffy.backend.member.dto.SignUpRequestDto;
import com.taffy.backend.member.repository.BeltRepository;
import com.taffy.backend.member.repository.CountryRepository;
import com.taffy.backend.member.repository.MemberRepository;
import com.taffy.backend.poomsae.domain.UserPsEdu;
import com.taffy.backend.poomsae.domain.UserPsTest;
import com.taffy.backend.poomsae.dto.MyPageDto;
import com.taffy.backend.poomsae.dto.PoomSaeCompletedDto;
import com.taffy.backend.poomsae.repostiory.UserPsEduRepository;
import com.taffy.backend.poomsae.repostiory.UserPsMvRepository;
import com.taffy.backend.poomsae.repostiory.UserPsTestRepository;
import com.taffy.backend.record.domain.Record;
import com.taffy.backend.record.repository.RecordRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;
    private final CountryRepository countryRepository;
    private final BeltRepository beltRepository;
    private final BCryptPasswordEncoder passwordEncoder;
    private final JwtProvider jwtProvider;

    // 초기 데이터 설정을 위함
    private final UserPsEduRepository userPsEduRepository;
    private final UserPsMvRepository userPsMvRepository;
    private final UserPsTestRepository userPsTestRepository;
    private final RecordRepository recordRepository;


    @Transactional
    public void signUpWithInitialData(SignUpRequestDto signUpRequestDto) {

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

        // Insert Initial Data
        // record
        Record initialRecord = Record.builder()
                        .member(member)
                        .win(0)
                        .lose(0)
                        .draw(0)
                        .build();
        memberRepository.save(member);
        recordRepository.save(initialRecord);
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

    public TokensResponseDTO reissueToken(Long memberId) {
        Member member = memberRepository.findById(memberId).orElseThrow(()-> new TaffyException(ErrorCode.MEMBER_NOT_FOUND));
        try {
            TokensResponseDTO reissueTokens = jwtProvider.createTokensByLogin(member.getId());
            return reissueTokens;
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
    }

    @Transactional
    public void modificationInfo(Long memberId, MemberInfoUpdateRequestDto memberInfoUpdateRequestDto) {
        Member member = memberRepository.findById(memberId).orElseThrow(()-> new TaffyException(ErrorCode.MEMBER_NOT_FOUND));
        Country country = countryRepository.findByCountryName(memberInfoUpdateRequestDto.getCountryName());

        member.updateInfo(memberInfoUpdateRequestDto, country);
    }

    @Transactional
    public void beltPromotion(Long memberId) {
        Member member = memberRepository.findById(memberId).orElseThrow(()-> new TaffyException(ErrorCode.MEMBER_NOT_FOUND));
        long beltLevel = member.getBelt().getId() + 1;

        if (beltLevel > 11){
            throw new TaffyException(ErrorCode.CANNOT_BELT_UPGRADE);
        }
        Belt belt = beltRepository.findById(beltLevel).orElseThrow(() -> new TaffyException(ErrorCode.BELT_NOT_FOUNT));
        member.beltPromotion(belt);
    }

    @Transactional(readOnly = true)
    public MyPageDto myPage(Long memberId) {
        Member member = memberRepository.findById(memberId).orElseThrow(()-> new TaffyException(ErrorCode.MEMBER_NOT_FOUND));
        Record userRecord = memberRepository.findUserAndRecord(member);
        List<UserPsEdu> userAndPoomSaeComplete = userPsEduRepository.findUserAndPoomSaeComplete(member);

        int winPercentage = getWinPercentage(userRecord);
        List<PoomSaeCompletedDto> poomSaeCompletedDto = getPoomSaeCompletedDtos(userAndPoomSaeComplete);

        MyPageDto myPageDto = MyPageDto.builder()
                .imageUrl(userRecord.getMember().getProfile_img())
                .nickname(userRecord.getMember().getNickname())
                .beltName(userRecord.getMember().getBelt().getBelt_name())
                .poomSaeCompletedList(poomSaeCompletedDto)
                .winScore(winPercentage)
                .build();

        return myPageDto;
    }

    @Transactional(readOnly = true)
    public void isNicknameDuplicate(NicknameDuplicateDto nicknameDuplicateDto) {
        boolean isExistNickname = memberRepository.existsByNickname(nicknameDuplicateDto.getNickName());

        if (isExistNickname){
            throw new TaffyException(ErrorCode.NICHNAME_ALREADY_EXIST);
        }
    }

    private static List<PoomSaeCompletedDto> getPoomSaeCompletedDtos(List<UserPsEdu> userAndPoomSaeComplete) {
        List<PoomSaeCompletedDto> poomSaeCompletedDto = new ArrayList<>();
        for(UserPsEdu userPsEdu : userAndPoomSaeComplete){
            poomSaeCompletedDto.add(new PoomSaeCompletedDto(userPsEdu.getId(), userPsEdu.getUserPsEduDone()));
        }
        return poomSaeCompletedDto;
    }

    private static int getWinPercentage(Record userRecord) {
        return (int) ((userRecord.getWin() * 100.0) / (userRecord.getWin() + userRecord.getDraw() + userRecord.getLose()));
    }
}