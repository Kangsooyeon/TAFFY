package com.taffy.backend.member.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import lombok.Getter;

@Getter
public class LoginRequestDto {

    @Email
    @NotEmpty(message = "이메일을 입력하세요")
    private String email;

    @NotEmpty(message = "비밀번호를 입력하세요")
    private String password;
}
