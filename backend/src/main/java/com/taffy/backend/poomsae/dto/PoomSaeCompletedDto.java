package com.taffy.backend.poomsae.dto;

import com.taffy.backend.poomsae.domain.Ps;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class PoomSaeCompletedDto {

    private Integer psId;
    private Boolean isCompleted;
}
