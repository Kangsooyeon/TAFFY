package com.taffy.backend.poomsae.repository;

import com.taffy.backend.poomsae.domain.UserPsEdu;
import com.taffy.backend.poomsae.domain.UserPsMv;
import com.taffy.backend.poomsae.dto.MvDetailDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface UserPsMvRepository extends JpaRepository<UserPsMv, Long> {

    @Query("SELECT upm FROM UserPsMv upm WHERE upm.member.id = :userId AND upm.psMv.psMvId = :psMvId")
    List<UserPsMv> findByUserIdAndPsMvId(@Param("userId") Integer userId, @Param("psMvId") Integer psMvId);

    @Query("SELECT new com.taffy.backend.poomsae.dto.MvDetailDto(pm.psMvId, m.mvId, pm.psMvSeq, " +
            "m.mvUrl, m.mvKoName, m.mvKoDesc, m.mvKoVo, m.mvEnName, " +
            "m.mvEnDesc, m.mvEnVo, m.mvType, upm.userPsMvDone) " +
            "FROM PsMv pm " +
            "JOIN pm.mv m " +
            "LEFT JOIN UserPsMv upm ON upm.psMv.psMvId = pm.psMvId AND upm.member.id = :userId " +
            "WHERE pm.ps.psId = :psId " +
            "ORDER BY pm.psMvSeq")
    List<MvDetailDto> findMvDetails(@Param("userId") Long userId, @Param("psId") Integer psId);

    @Query("SELECT new com.taffy.backend.poomsae.dto.MvDetailDto(pm.psMvId, m.mvId, pm.psMvSeq, " +
            "m.mvUrl, m.mvKoName, m.mvKoDesc, m.mvKoVo, m.mvEnName, " +
            "m.mvEnDesc, m.mvEnVo, m.mvType, upm.userPsMvDone) " +
            "FROM PsMv pm " +
            "JOIN pm.mv m " +
            "LEFT JOIN UserPsMv upm ON upm.psMv.psMvId = pm.psMvId AND upm.member.id = :userId " +
            "WHERE pm.ps.psId = :psId AND pm.psMvSeq = :mvSeq")
    MvDetailDto findMvDetail(@Param("userId") Long userId, @Param("psId") Integer psId, Integer mvSeq);

    @Query("SELECT upm FROM UserPsMv upm WHERE upm.member.id = :userId AND upm.psMv.psMvId = :psMvId")
    Optional<UserPsMv> findByUserIdAndPsMvId(@Param("userId") Long userId, @Param("psMvId") Integer psMvId);

    @Query("SELECT upe FROM UserPsEdu upe WHERE upe.member.id = :userId AND upe.ps.psId = :psId")
    Optional<UserPsEdu> findByUserIdAndPsId(@Param("userId") Long userId, @Param("psId") Integer psId);

    @Query("SELECT upm FROM UserPsMv upm WHERE upm.member.id = :userId AND upm.psMv.ps.psId = :psId")
    List<UserPsMv> findAllByUserIdAndPsId(@Param("userId") Long userId, @Param("psId") Integer psId);
}
