package com.taffy.backend.poomsae.repository;

import com.taffy.backend.poomsae.domain.UserPsMv;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface UserPsMvRepository extends JpaRepository<UserPsMv, Long> {

    @Query("SELECT upm FROM UserPsMv upm WHERE upm.member.id = :userId AND upm.psMv.id = :psMvId")
    List<UserPsMv> findByUserIdAndPsMvId(@Param("userId") Integer userId, @Param("psMvId") Integer psMvId);
}