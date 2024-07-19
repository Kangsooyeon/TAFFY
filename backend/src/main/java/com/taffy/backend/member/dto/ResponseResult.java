package com.taffy.backend.member.dto;

import lombok.RequiredArgsConstructor;
import lombok.Getter;

@Getter
@RequiredArgsConstructor(staticName = "of")
public class ResponseResult<T> {
    private final int status;
    private final T data;
}