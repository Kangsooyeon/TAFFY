package com.taffy.backend.poomsae.service;

import com.taffy.backend.poomsae.domain.UserPsMv;
import com.taffy.backend.poomsae.repository.UserPsMvRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserPsMvService {

    private final UserPsMvRepository userPsMvRepository;

    @Transactional(readOnly = true)
    public Boolean isMvDone(Long userId, Integer psId, Integer mvSeq) {
        Optional<UserPsMv> userPsMvOptional = userPsMvRepository.findByUserIdAndPsIdAndMvSeq(userId, psId, mvSeq);
        return userPsMvOptional.map(UserPsMv::getUserPsMvDone).orElse(false);
    }
}
