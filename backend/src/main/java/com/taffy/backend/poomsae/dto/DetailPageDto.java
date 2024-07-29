package com.taffy.backend.poomsae.dto;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class DetailPageDto {

    private Integer psId;
    private String psKoName;
    private String psUrl;
    private String psKoDesc;
    private Integer size;
    private List<MvDto> movements;

}
