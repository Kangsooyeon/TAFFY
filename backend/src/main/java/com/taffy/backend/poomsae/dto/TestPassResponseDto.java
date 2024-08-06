package com.taffy.backend.poomsae.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TestPassResponseDto {
    private Integer psId;
    private String beltName;
    private String message;
}
