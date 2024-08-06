package com.taffy.backend.websocket.dto;

import lombok.Data;

@Data
public class DataMessage {
    private String sessionId;
    private String nickname;


    // getters and setters
}