package com.taffy.backend.poomsae.dto;

import com.taffy.backend.poomsae.domain.Mv;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class MvDto {
    private Integer psMvId;
    private Integer mvId;
    private Integer mvSeq;
    private String mvKoName;
    private String mvThumb;
    private Boolean isDone;

    public MvDto(Mv mv) {
    }
}
