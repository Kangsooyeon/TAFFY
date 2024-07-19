package com.taffy.backend.global.security.jwt.dto;

import com.taffy.backend.member.domain.Member;
import lombok.*;

@Getter
@Builder
@NoArgsConstructor
public class MemberRefreshTokenDTO {
    private Long userId;

    public MemberRefreshTokenDTO(Long userId) {
        this.userId = userId;
    }

    public static MemberRefreshTokenDTO of(Member member){
        return new MemberRefreshTokenDTO(
                member.getId()
        );
    }
}