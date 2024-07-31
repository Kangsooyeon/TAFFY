package com.taffy.backend.record.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ResponseDto<T> {

    private Boolean isSuccess;
    private int status;
    private T data;
}
