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

    @Transactional
    public void updateRecord(long userId, String result) {
        Optional<Record> recordOpt = recordRepository.findByMemberId(userId);
        Record record = recordOpt.orElseThrow(() -> new TaffyException(ErrorCode.USER_RECORD_NOT_FOUND));

        switch (result.toLowerCase()) {
            case "win":
                record.incrementWin();
                break;
            case "lose":
                record.incrementLose();
                break;
            case "draw":
                record.incrementDraw();
                break;
            default:
                throw new TaffyException(ErrorCode.INVALID_RESULT);
        }

        recordRepository.save(record);
    }
}
