package com.taffy.backend.poomsae.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class MainPageDto {

    private Long userId;
    private String psThumb;
    private String psKoName;
    private Boolean userPsEduDone;
}
