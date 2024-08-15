package com.taffy.backend.poomsae.repository;

import com.taffy.backend.member.domain.Member;
import com.taffy.backend.poomsae.domain.UserPsEdu;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface UserPsEduRepository extends JpaRepository<UserPsEdu, Integer> {

    @Query("select upe from UserPsEdu upe join fetch upe.ps p where upe.member = :mid")
    List<UserPsEdu> findUserAndPoomSaeComplete(@Param("mid") Member member);

    @Query("SELECT upe FROM UserPsEdu upe WHERE upe.member.id = :userId AND upe.ps.psId = :psId")
    UserPsEdu findByUserIdAndPsId(@Param("userId") Long userId, @Param("psId") Integer psId);
}