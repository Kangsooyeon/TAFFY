package com.taffy.backend.member.dto;

import jakarta.validation.constraints.*;
import lombok.Getter;

@Getter
public class SignUpRequestDto {

    @Email
    @NotEmpty
    private String email;

    @NotEmpty
    @Size(min = 4, max = 20)
    private String nickName;

    @NotEmpty
    @Pattern(regexp = "^(?=.*[a-zA-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,20}$", message = "영문/숫자/특수문자 8~20자 이내로 작성해주세요")
    private String password;

    @NotEmpty
    private String countryName;

}
