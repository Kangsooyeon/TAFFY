package com.taffy.backend.poomsae.service;

import com.taffy.backend.global.exception.ErrorCode;
import com.taffy.backend.global.exception.TaffyException;
import com.taffy.backend.member.domain.Member;
import com.taffy.backend.member.repository.MemberRepository;
import com.taffy.backend.poomsae.domain.UserPsEdu;
import com.taffy.backend.poomsae.domain.UserPsMv;
import com.taffy.backend.poomsae.dto.MainPageDto;
import com.taffy.backend.poomsae.repository.UserPsEduRepository;
import com.taffy.backend.poomsae.repository.UserPsMvRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static java.util.stream.Collectors.toList;


@Service
@RequiredArgsConstructor
public class UserPsEduService {

    private final UserPsEduRepository userPsEduRepository;
    private final MemberRepository memberRepository;
    private final UserPsMvRepository userPsMvRepository;

    @Transactional(readOnly = true)
    public List<MainPageDto> poomSaeEduMain(Long userId) {
        Member member = memberRepository.findById(userId).orElseThrow(() -> new TaffyException(ErrorCode.MEMBER_NOT_FOUND));
        List<UserPsEdu> userPsEduList = userPsEduRepository.findUserAndPoomSaeComplete(member);
        return userPsEduList.stream().map(u ->
                        new MainPageDto(u.getMember().getId(), u.getPs().getPsThumb(), u.getPs().getPsKoName(), u.getUserPsEduDone())).collect(toList());
    }

    @Transactional
    public void psDone(Long userId, Integer psId) {
        UserPsEdu userPsEdu = userPsEduRepository.findByUserIdAndPsId(userId, psId);
        if (userPsEdu == null) {
            throw new TaffyException(ErrorCode.USER_PS_EDU_NOT_FOUND);
        }
        userPsEdu.setUserPsEduDone(true);
        userPsEduRepository.save(userPsEdu);
    }

    @Transactional(readOnly = true)
    public boolean isPsDone(Long userId, Integer psId) {
        List<UserPsMv> userPsMvList = userPsMvRepository.findAllByUserIdAndPsId(userId, psId);
        return userPsMvList.stream().allMatch(UserPsMv::getUserPsMvDone);
    }
}
