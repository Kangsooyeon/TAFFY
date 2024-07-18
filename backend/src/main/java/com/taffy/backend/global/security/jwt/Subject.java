package com.taffy.backend.global.security.jwt;

import lombok.Getter;

@Getter
public class Subject {
    private final Long memberId;

    public Subject(Long memberId) {
        this.memberId = memberId;
    }

    public static Subject atk(long memberId) {
        return new Subject(memberId);
    }

    public static Subject rtk(long memberId) {
        return new Subject(memberId);
    }
}