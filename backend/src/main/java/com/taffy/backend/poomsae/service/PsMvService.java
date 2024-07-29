package com.taffy.backend.poomsae.service;


import com.taffy.backend.poomsae.domain.Mv;
import com.taffy.backend.poomsae.domain.Ps;
import com.taffy.backend.poomsae.dto.DetailPageDto;
import com.taffy.backend.poomsae.dto.MvDto;
import com.taffy.backend.poomsae.repostiory.PsMvRepository;
import com.taffy.backend.poomsae.repostiory.PsRepository;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PsMvService {

    private final PsMvRepository psMvRepository;
    private final PsRepository psRepository;

    @Transactional(readOnly = true)
    public DetailPageDto getPsDetail(Integer psId) {
        Optional<Ps> ps = psRepository.findById(psId);
        if (!ps.isPresent()) {
            // handle not found case
            return null; // or throw an exception
        }

        // 해당 품새의 기본동작 유니크 리스트
        List<MvDto> mvDtos = psMvRepository.findUniqueMvByPsId(psId);
        // 해당 품새의 기본동작 리스트
//        List<MvDto> mvDtos = psMvRepository.findMvByPsId(psId);

        return new DetailPageDto(ps.get().getPsId(), ps.get().getPsKoName(), ps.get().getPsUrl(), ps.get().getPsKoDesc(), mvDtos.size(), mvDtos);
    }
}
