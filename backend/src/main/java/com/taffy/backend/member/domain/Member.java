package com.taffy.backend.member.domain;

import com.taffy.backend.global.audit.BaseTime;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Member extends BaseTime {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_email")
    private String email;

    @OneToOne
    @JoinColumn(name = "country_id")
    private Country country;

    @Column(name = "profile_img")
    private String profile_img;

    @OneToOne
    @JoinColumn(name = "belt_id")
    private Belt belt;

    @Column(name = "nickname")
    private String nickname;

}
