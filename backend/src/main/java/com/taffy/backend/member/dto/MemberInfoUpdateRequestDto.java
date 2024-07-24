package com.taffy.backend.member.dto;

import lombok.Getter;

@Getter
public class MemberInfoUpdateRequestDto {

    private String nickName;
    private String photoUrl;
    private String countryName;
}
