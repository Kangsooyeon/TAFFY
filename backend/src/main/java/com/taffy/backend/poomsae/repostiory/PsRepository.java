package com.taffy.backend.poomsae.repostiory;

import com.taffy.backend.poomsae.domain.Ps;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.QueryByExampleExecutor;

public interface PsRepository extends JpaRepository<Ps, Integer> {


}