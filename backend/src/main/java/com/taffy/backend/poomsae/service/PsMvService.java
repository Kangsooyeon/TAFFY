package com.taffy.backend.poomsae.service;

import com.taffy.backend.poomsae.domain.Ps;
import com.taffy.backend.poomsae.dto.DetailPageDto;
import com.taffy.backend.poomsae.dto.MvDetailDto;
import com.taffy.backend.poomsae.dto.MvDto;
import com.taffy.backend.poomsae.dto.PsWholeDto;
import com.taffy.backend.poomsae.repository.PsMvRepository;
import com.taffy.backend.poomsae.repository.PsRepository;

import com.taffy.backend.poomsae.repository.UserPsMvRepository;
import lombok.RequiredArgsConstructor;
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

    @Transactional(readOnly = true)
    public DetailPageDto getPsDetail(Integer psId, Long userId) {
        Optional<Ps> ps = psRepository.findById(psId);
        if (!ps.isPresent()) {
            // handle not found case
            return null; // or throw an exception
        }

        // 해당 품새의 기본동작 리스트
        List<MvDto> mvDtos = psMvRepository.findMvByPsIdAndUserId(psId, userId);

        return new DetailPageDto(ps.get().getPsId(), ps.get().getPsKoName(), ps.get().getPsUrl(), ps.get().getPsKoDesc(), mvDtos.size(), mvDtos);
    }

    public PsWholeDto getOneWholePs(Long userId, Integer psId) {
        Optional<Ps> ps = psRepository.findById(psId);
        if (!ps.isPresent()) {
            return null;
        }
        List<MvDetailDto> mvDetails = userPsMvRepository.findMvDetails(userId, psId);

        return new PsWholeDto(mvDetails.size(), mvDetails);
    }

    public MvDetailDto getUsPsMvDetailByPsMvId(Long userId, Integer psMvId) {
        return userPsMvRepository.findMvDetail(userId, psMvId);
    }


}
