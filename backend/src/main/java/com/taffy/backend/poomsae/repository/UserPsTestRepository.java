package com.taffy.backend.poomsae.repository;

import com.taffy.backend.poomsae.domain.UserPsTest;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserPsTestRepository extends JpaRepository<UserPsTest, Integer> {
    List<UserPsTest> findByMemberId(Long userId);

    Optional<UserPsTest> findByMember_IdAndPs_PsId(Long userId, Integer psId);
}
