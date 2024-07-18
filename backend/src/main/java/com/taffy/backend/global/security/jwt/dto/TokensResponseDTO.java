package com.taffy.backend.global.security.jwt.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class TokensResponseDTO{
    private String atk;
    private String rtk;
}