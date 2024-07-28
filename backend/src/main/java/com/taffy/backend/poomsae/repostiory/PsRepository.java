package com.taffy.backend.poomsae.repostiory;

import com.taffy.backend.member.domain.Member;
import com.taffy.backend.poomsae.domain.Ps;
import com.taffy.backend.poomsae.domain.UserPsEdu;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface PsRepository extends JpaRepository<Ps, Long> {
    List<Ps> findAll();
}