package com.taffy.backend.global.security.jwt;

import lombok.Getter;

@Getter
public class Subject {
    private final Long memberId;

    public Subject(Long memberId) {
        this.memberId = memberId;
    }

    public static Subject atk(Long memberId) {
        return new Subject(memberId);
    }

    public static Subject rtk(Long memberId) {
        return new Subject(memberId);
    }
}