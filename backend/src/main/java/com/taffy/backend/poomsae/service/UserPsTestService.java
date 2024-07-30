package com.taffy.backend.poomsae.service;

import com.taffy.backend.poomsae.domain.UserPsTest;
import com.taffy.backend.poomsae.dto.UserPsTestDto;
import com.taffy.backend.poomsae.repository.UserPsTestRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserPsTestService {

    private final UserPsTestRepository userPsTestRepository;

    @Transactional(readOnly = true)
    public List<UserPsTestDto> getPsTestList(Long userId) {
        List<UserPsTest> userPsTests = userPsTestRepository.findByMemberId(userId);
        return userPsTests.stream()
                .map(userPsTest -> new UserPsTestDto(
                        userPsTest.getUserPsTestId(),
                        userPsTest.getMember().getId(),
                        userPsTest.getPs().getPsId(),
                        userPsTest.isPassed(),
                        userPsTest.getModifiedDate()))
                .collect(Collectors.toList());
    }
}
