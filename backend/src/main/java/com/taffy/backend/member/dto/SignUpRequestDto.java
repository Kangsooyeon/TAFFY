package com.taffy.backend.member.dto;

import jakarta.validation.constraints.Email;
import lombok.Getter;

@Getter
public class SignUpRequestDto {

    @Email
    private String email;
    private String nickName;
    private String password;
    private String countryName;

}
