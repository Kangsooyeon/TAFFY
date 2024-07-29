package com.taffy.backend.poomsae.repository;

import com.taffy.backend.poomsae.domain.PsMv;
import com.taffy.backend.poomsae.dto.MvDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface PsMvRepository extends JpaRepository<PsMv, Integer> {

    @Query("SELECT new com.taffy.backend.poomsae.dto.MvDto(pm.psMvId, m.mvId, pm.psMvSeq, m.mvKoName, m.mvThumb, upm.userPsMvDone) " +
            "FROM PsMv pm " +
            "JOIN pm.mv m " +
            "LEFT JOIN UserPsMv upm ON upm.psMv.id = pm.id AND upm.member.id = :userId " +
            "WHERE pm.ps.psId = :psId " +
            "ORDER BY pm.psMvSeq")
    List<MvDto> findMvByPsIdAndUserId(@Param("psId") Integer psId, @Param("userId") Long userId);
}
