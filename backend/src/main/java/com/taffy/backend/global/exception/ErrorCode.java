package com.taffy.backend.global.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public enum ErrorCode {

    INTERNAL_SERVER_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, "서버 에러입니다."),
    DUPLICATE_EMAIL(HttpStatus.CONFLICT, "이미 존재하는 이메일 계정입니다."),
    MEMBER_NOT_FOUND(HttpStatus.NOT_FOUND, "없는 회원의 정보 입니다."),

    JWT_TOKEN_EXPIRED(HttpStatus.BAD_REQUEST,"JWT 토큰이 만료되었습니다."),
    JWT_UNSUPPORTED(HttpStatus.BAD_REQUEST,"지원하지 않는 JWT 토큰입니다."),
    JWT_MALFORMED(HttpStatus.BAD_REQUEST,"올바른 JWT 토큰의 형태가 아닙니다."),
    JWT_SIGNATURE(HttpStatus.BAD_REQUEST,"올바른 SIGNATURE가 아닙니다."),
    JWT_ILLEGAL_ARGUMENT(HttpStatus.BAD_REQUEST,"잘못된 정보를 넣었습니다."),

    CANNOT_BELT_UPGRADE(HttpStatus.BAD_REQUEST,"더 이상 승격할 수 없습니다. 이미 최고단계입니다."),
    BELT_NOT_FOUNT(HttpStatus.NOT_FOUND, "없는 벨트 정보 입니다."),
    NICHNAME_ALREADY_EXIST(HttpStatus.CONFLICT, "이미 존재하는 닉네임입니다"),
    CANNOT_JOIN_ROOM(HttpStatus.CONFLICT,"인원수가 초과되었습니다.");

    private final HttpStatus httpstatus;
    private final String message;
}