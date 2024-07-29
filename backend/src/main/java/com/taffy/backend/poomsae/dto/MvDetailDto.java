package com.taffy.backend.poomsae.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class MvDetailDto {
    private Integer mvId;
    private String mvUrl;
    private String mvKoName;
    private String mvKoDesc;
    private String mvKoVo;
    private Boolean isDone;
}
