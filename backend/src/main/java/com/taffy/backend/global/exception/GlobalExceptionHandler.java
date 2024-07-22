package com.taffy.backend.global.exception;

import com.taffy.backend.global.aop.CustomValidationException;
import com.taffy.backend.global.aop.dto.ResponseDto;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(TaffyException.class)
    public ResponseEntity<String> TaffyExceptionHandler(TaffyException e) {
        log.error(e.getMessage());
        return error(e);
    }

    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<String> TaffyExceptionHandler(RuntimeException e) {
        log.error(e.getMessage());
        return serverError();
    }

    @ExceptionHandler(CustomValidationException.class)
    public ResponseEntity<?> validationApiException(CustomValidationException e) {
        log.error(e.getMessage());
        return new ResponseEntity<>(new ResponseDto<>(HttpStatus.BAD_REQUEST.value(), e.getMessage(), e.getErrorMap()), HttpStatus.BAD_REQUEST);
    }

    private ResponseEntity<String> error(TaffyException e) {
        return ResponseEntity.status(e.getErrorCode().getHttpstatus()).body(e.getMessage());
    }

    private ResponseEntity<String> serverError() {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(ErrorCode.INTERNAL_SERVER_ERROR.getMessage());
    }
}