package com.taffy.backend.sparring.dto;

import com.taffy.backend.poomsae.domain.Mv;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class MissionDto {

    private int mvId;
    private String moKoName;
    private String mvEnName;
    private Mv.MovementType mvType;

}
