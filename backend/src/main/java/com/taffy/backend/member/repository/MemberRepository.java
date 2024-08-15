package com.taffy.backend.member.repository;

import com.taffy.backend.member.domain.Country;
import com.taffy.backend.member.domain.Member;
import com.taffy.backend.record.domain.Record;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Long> {
    boolean existsByEmail(String email);
    Optional<Member> findByEmail(String email);
    boolean existsByNickname(String nickname);
    Optional<Member> findByNickname(String nickname);

    @Query("select r from Record r join fetch r.member m where r.member = :mid")
    Record findUserAndRecord(@Param("mid") Member member);

    @Query("SELECT c FROM Member m JOIN m.country c WHERE m.id = :userId")
    Country findMemberWithCountryById(@Param("userId") Long userId);

    @Query("SELECT CASE WHEN COUNT(m) > 0 THEN true ELSE false END " +
            "FROM Member m " +
            "WHERE m.nickname = :nickname AND m.id <> :memberId")
    Boolean isValidInviteNickname(@Param("memberId") Long memberId, @Param("nickname") String nickname);
}


