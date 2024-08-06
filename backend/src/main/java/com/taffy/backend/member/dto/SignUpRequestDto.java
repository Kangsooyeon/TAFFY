package com.taffy.backend.member.dto;

import jakarta.validation.constraints.*;
import lombok.Getter;

@Getter
public class SignUpRequestDto {

    @Email
    @NotEmpty(message = "이메일은 필수 입력 항목입니다")
    private String email;

    @NotEmpty(message = "닉네임은 필수 입력 항목입니다")
    @Size(min = 4, max = 10)
    private String nickName;

    @NotEmpty(message = "비밀번호는 필수 입력 항목입니다")
    @Pattern(regexp = "^(?=.*[a-zA-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,20}$", message = "영문/숫자/특수문자 8~20자 이내로 작성해주세요")
    private String password;

    @NotEmpty(message = "국가명은 필수 입력 항목입니다")
    private String countryName;

}
