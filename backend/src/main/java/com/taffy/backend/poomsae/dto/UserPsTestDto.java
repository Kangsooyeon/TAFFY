package com.taffy.backend.poomsae.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class UserPsTestDto {
    private Integer userPsTestId;
    private Long userId;
    private Integer psId;
    private boolean isPassed;
    private LocalDateTime modifiedDate;

    public UserPsTestDto(Integer userPsTestId, Long id, Integer psId, boolean passed) {
    }
}
