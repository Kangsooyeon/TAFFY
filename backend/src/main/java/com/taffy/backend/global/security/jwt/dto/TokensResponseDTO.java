package com.taffy.backend.global.security.jwt.dto;

import lombok.Data;

@Data
public class TokensResponseDTO {
    private final String atk;
    private final String rtk;
}