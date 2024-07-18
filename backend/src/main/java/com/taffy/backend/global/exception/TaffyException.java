package com.taffy.backend.global.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class TaffyException extends RuntimeException {

    private ErrorCode errorCode;
    private String message;

    public TaffyException(ErrorCode errorCode) {
        this.errorCode = errorCode;
    }

    @Override
    public String getMessage() {
        if (message == null) {
            message = errorCode.getMessage();
        }
        return message;
    }
}
