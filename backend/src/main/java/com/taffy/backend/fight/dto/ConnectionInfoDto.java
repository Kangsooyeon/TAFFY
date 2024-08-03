package com.taffy.backend.fight.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ConnectionInfoDto {
    String sessionId;
    String connectionToken;
}
