package com.taffy.backend.member.repository;

import com.taffy.backend.member.domain.Member;
import com.taffy.backend.record.domain.Record;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Long> {
    boolean existsByEmail(String email);
    Optional<Member> findByEmail(String email);

    @Query("select r from Record r join fetch r.member m where r.member = :mid")
    Record findUserAndRecord(@Param("mid") Member member);
}