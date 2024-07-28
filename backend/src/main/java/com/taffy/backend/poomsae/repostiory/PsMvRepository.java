package com.taffy.backend.poomsae.repostiory;

import com.taffy.backend.poomsae.domain.PsMv;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.QueryByExampleExecutor;

public interface PsMvRepository extends JpaRepository<PsMv, Integer> {
}