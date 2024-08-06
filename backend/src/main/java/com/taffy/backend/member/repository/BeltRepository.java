package com.taffy.backend.member.repository;

import com.taffy.backend.member.domain.Belt;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface BeltRepository extends JpaRepository<Belt, Long> {
    Optional<Belt> findByBeltLevel(int beltLevel);
}
