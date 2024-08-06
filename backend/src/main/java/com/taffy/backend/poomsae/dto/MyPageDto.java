package com.taffy.backend.poomsae.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MyPageDto {

    private String nickname;
    private String beltName;
    private List<PoomSaeCompletedDto> poomSaeCompletedList;
    private int winScore;
    private String country;
    private String profileImg;

}