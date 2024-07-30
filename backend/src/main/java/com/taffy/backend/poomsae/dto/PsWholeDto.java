package com.taffy.backend.poomsae.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class PsWholeDto {
    private Integer size;
    private List<MvDetailDto> mvDetails;
}
