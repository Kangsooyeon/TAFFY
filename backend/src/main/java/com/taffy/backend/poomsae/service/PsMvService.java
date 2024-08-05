package com.taffy.backend.poomsae.service;

import com.taffy.backend.global.exception.ErrorCode;
import com.taffy.backend.global.exception.TaffyException;
import com.taffy.backend.poomsae.domain.Ps;
import com.taffy.backend.poomsae.domain.UserPsMv;
import com.taffy.backend.poomsae.dto.*;
import com.taffy.backend.poomsae.repository.PsMvRepository;
import com.taffy.backend.poomsae.repository.PsRepository;

import com.taffy.backend.poomsae.repository.UserPsEduRepository;
import com.taffy.backend.poomsae.repository.UserPsMvRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PsMvService {

    private final PsMvRepository psMvRepository;
    private final PsRepository psRepository;
    private final UserPsMvRepository userPsMvRepository;
    private final UserPsEduRepository userPsEduRepository;

    @Transactional(readOnly = true)
    public DetailPageDto getPsDetail(Integer psId, Long userId) {
        Optional<Ps> ps = psRepository.findById(psId);
        if (!ps.isPresent()) {
            // handle not found case
            return null; // or throw an exception
        }

        // 해당 품새의 기본동작 리스트
        List<MvDto> mvDtos = psMvRepository.findMvByPsIdAndUserId(psId, userId);

        return new DetailPageDto(ps.get().getPsId(), ps.get().getPsKoName(), ps.get().getPsEnName() , ps.get().getPsUrl(), ps.get().getPsKoDesc(), mvDtos.size(), mvDtos);
    }

    public PsWholeDto getOneWholePs(Long userId, Integer psId) {
        Optional<Ps> psOpt = psRepository.findById(psId);
        if (!psOpt.isPresent()) {
            return null;
        }
        Ps ps = psOpt.get();

        PsDto psDto = PsDto.builder().psId(ps.getPsId()).psKoName(ps.getPsKoName()).psEnName(ps.getPsEnName()).psUrl(ps.getPsUrl()).psKoDesc(ps.getPsKoDesc())
        .psEnDesc(ps.getPsEnDesc()).build();

        List<MvDetailDto> mvDetails = userPsMvRepository.findMvDetails(userId, psId);

        return new PsWholeDto(psDto ,mvDetails.size(), mvDetails);
    }

    public MvDetailDto getUsPsMvDetailByPsMvId(Long userId, Integer psId, Integer mvSeq) {
        return userPsMvRepository.findMvDetail(userId, psId, mvSeq);
    }

    @Transactional
    public void mvDone(Long userId, Integer psMvId) {
        Optional<UserPsMv> userPsMvOpt = userPsMvRepository.findByUserIdAndPsMvId(userId, psMvId);
        UserPsMv userPsMv = userPsMvOpt.orElseThrow(() -> new TaffyException(ErrorCode.USER_PS_MV_NOT_FOUND));
        userPsMv.userPsMvDone();
        userPsMvRepository.save(userPsMv);
    }


}
