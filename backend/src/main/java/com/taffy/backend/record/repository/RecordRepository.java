package com.taffy.backend.record.repository;

import com.taffy.backend.record.domain.Record;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RecordRepository extends JpaRepository<Record, Long> {
    Optional<Record> findByMemberId(long userId);
}