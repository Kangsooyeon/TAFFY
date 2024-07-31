package com.taffy.backend.record.service;

import com.taffy.backend.global.exception.ErrorCode;
import com.taffy.backend.global.exception.TaffyException;
import com.taffy.backend.poomsae.domain.UserPsMv;
import com.taffy.backend.record.domain.Record;
import com.taffy.backend.record.dto.RecordDto;
import com.taffy.backend.record.repository.RecordRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class RecordService {

    private final RecordRepository recordRepository;

    @Transactional(readOnly = true)
    public RecordDto getRecord(long userId) {
        Optional<Record> recordOpt = recordRepository.findById(userId);
        Record record = recordOpt.orElseThrow(() -> new TaffyException(ErrorCode.USER_RECORD_NOT_FOUND));
        return RecordDto.builder().recordId(record.getId())
                .userId(record.getMember().getId())
                .win(record.getWin())
                .lose(record.getLose())
                .draw(record.getDraw())
                .modifiedDate(record.getModifiedDate())
                .build();
    }
}
