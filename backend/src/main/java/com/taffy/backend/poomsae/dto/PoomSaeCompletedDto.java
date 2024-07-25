package com.taffy.backend.poomsae.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class PoomSaeCompletedDto {

    private Integer id;
    private Boolean isCompleted;
}
