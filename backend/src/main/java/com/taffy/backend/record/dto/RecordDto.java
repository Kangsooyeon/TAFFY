package com.taffy.backend.record.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RecordDto {
    private Integer recordId;
    private Long userId;
    private Integer win;
    private Integer lose;
    private Integer draw;
    private LocalDateTime modifiedDate;
}
