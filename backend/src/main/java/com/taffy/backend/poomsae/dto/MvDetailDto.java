package com.taffy.backend.poomsae.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class MvDetailDto {
    private Integer psMvId;
    private Integer mvId;
    private Integer psMvSeq;
    private String mvUrl;
    private String mvKoName;
    private String mvKoDesc;
    private String mvKoVo;
    private String mvEnName;
    private String mvEnDesc;
    private String mvEnVo;
    private String mvType;
    private Boolean userPsMvDone;
}
