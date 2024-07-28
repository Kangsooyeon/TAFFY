package com.taffy.backend.poomsae.repostiory;

import com.taffy.backend.member.domain.Member;
import com.taffy.backend.poomsae.domain.UserPsEdu;
import com.taffy.backend.poomsae.domain.UserPsTest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface UserPsTestRepository extends JpaRepository<UserPsTest, Long> {
}