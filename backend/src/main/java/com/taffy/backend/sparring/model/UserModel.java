package com.taffy.backend.sparring.model;

import java.io.Serializable;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.redis.core.RedisHash;
import com.fasterxml.jackson.annotation.JsonTypeInfo;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@RedisHash("User")
@JsonTypeInfo(use = JsonTypeInfo.Id.CLASS, include = JsonTypeInfo.As.PROPERTY, property = "@class")
public class UserModel implements Serializable {
    @Id
    private int userId;
    private String nickname;
    private String beltName;
    private String profileImg;
    private int winCnt;
    private int loseCnt;
    private int drawCnt;
}
