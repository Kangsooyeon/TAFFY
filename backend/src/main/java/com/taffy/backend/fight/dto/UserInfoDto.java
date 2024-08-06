package com.taffy.backend.fight.dto;

import com.taffy.backend.member.domain.Belt;
import com.taffy.backend.member.domain.Member;
import com.taffy.backend.record.domain.Record;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserInfoDto {
    private String nickname;
    private String belt;
    private Integer totalMatches;
    private Integer win;
    private Integer lose;
    private Integer draw;
    private String avatar;
}
