package com.taffy.backend.global.email.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;

@Getter
public class MailDto {

    @NotNull
    @Email
    private String email;
}