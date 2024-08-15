package com.taffy.backend.poomsae.repository;

import com.taffy.backend.poomsae.domain.Mv;
import com.taffy.backend.poomsae.domain.Mv.MovementType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface MvRepository extends JpaRepository<Mv, Integer> {

//    @Query("SELECT m FROM Mv m WHERE m.mvType = :mvType ORDER BY function('RAND') LIMIT 9")
//    List<Mv> findRandomByMvType(@Param("mvType") MovementType mvType);
    List<Mv> findByMvType(Mv.MovementType mvType);

}
