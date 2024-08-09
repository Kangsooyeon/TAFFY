package com.taffy.backend.websocket.dto;

import lombok.Data;
import lombok.ToString;

@ToString
@Data
public class DataMessage {
    private String sessionId;
    private String nickname;
    private String inviter;
    private String status;
    // getters and setters
}