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
    CANNOT_JOIN_ROOM(HttpStatus.CONFLICT,"인원수가 초과되었습니다."),

    PS_NOT_FOUND(HttpStatus.BAD_REQUEST, "없는 품새 ID 입니다"),
    USER_PS_EDU_NOT_FOUND(HttpStatus.NOT_FOUND, "없는 유저 품새 교육 정보입니다"),
    USER_PS_MV_NOT_FOUND(HttpStatus.NOT_FOUND, "없는 유저 기본동작 교육 정보입니다."),
    INVALID_MOVEMENT_TYPE(HttpStatus.NOT_FOUND, "없는 기본동작 타입입니다."),
    MOVEMENTS_NOT_FOUND(HttpStatus.NOT_FOUND, "동작을 찾을 수 없습니다.."),

    USER_PS_TEST_NOT_FOUND(HttpStatus.NOT_FOUND, "없는 유저 심사 정보입니다."),

    USER_RECORD_NOT_FOUND(HttpStatus.NOT_FOUND, "유저의 전적 데이터가 없습니다."),

    INVALID_RESULT(HttpStatus.BAD_REQUEST, "잘못된 결과 값입니다.");


    private final HttpStatus httpstatus;
    private final String message;
}