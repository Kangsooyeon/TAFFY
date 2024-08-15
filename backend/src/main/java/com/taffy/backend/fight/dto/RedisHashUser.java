package com.taffy.backend.fight.dto;

import jakarta.persistence.Id;
import lombok.*;
import org.springframework.data.redis.core.RedisHash;
import org.springframework.data.redis.core.index.Indexed;

@Setter
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@RedisHash(value = "redishash-user", timeToLive = 3000L)
public class RedisHashUser {

    @Id
    private Long id;

    @Indexed
    private String email;

    private int win;
    private int loss;
    private int draw;
    private String nickName;
    private String beltName;
}