package com.taffy.backend.websocket.controller;

import com.taffy.backend.websocket.dto.DataMessage;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class DataController {

    @MessageMapping("/data.send")
    @SendTo("/topic/data")
    public DataMessage sendMessage(DataMessage dataMessage) {
        return dataMessage;
    }
}