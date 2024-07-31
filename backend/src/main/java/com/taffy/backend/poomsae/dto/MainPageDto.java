package com.taffy.backend.poomsae.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class MainPageDto {

    private Integer psId;
    private String psKoName;
    private String psEnName;
    private String psThumb;
    private String psUrl;
    private String psKoDesc;
    private String psEnDesc;
    private Boolean userPsEduDone;
    private Long userId;
}
