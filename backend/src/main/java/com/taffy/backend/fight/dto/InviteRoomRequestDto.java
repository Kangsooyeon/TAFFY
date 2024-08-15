package com.taffy.backend.fight.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class InviteRoomRequestDto {

    private String nickName;
    private String roomId;
}
