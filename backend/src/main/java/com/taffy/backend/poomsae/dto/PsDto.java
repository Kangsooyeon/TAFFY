package com.taffy.backend.poomsae.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PsDto {

    private Integer psId;
    private String psKoName;
    private String psEnName;
    private String psUrl;
    private String psKoDesc;
    private String psEnDesc;
    private String psThumb;

}
