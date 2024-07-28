package com.taffy.backend.poomsae.repostiory;

import com.taffy.backend.poomsae.domain.PsMv;
import com.taffy.backend.poomsae.dto.MvDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface PsMvRepository extends JpaRepository<PsMv, Integer> {

    @Query("SELECT new com.taffy.backend.poomsae.dto.MvDto(m.mvId, m.mvKoName, m.mvThumb) " +
            "FROM PsMv pm " +
            "JOIN pm.mv m " +
            "WHERE pm.ps.psId = :psId " +
            "GROUP BY m.mvId")
    List<MvDto> findUniqueMvByPsId(@Param("psId") Integer psId);
}
