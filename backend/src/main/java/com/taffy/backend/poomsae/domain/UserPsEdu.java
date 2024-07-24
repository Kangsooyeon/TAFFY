package com.taffy.backend.poomsae.domain;

import com.taffy.backend.global.audit.BaseTime;
import com.taffy.backend.member.domain.Member;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.awt.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "user_ps_edu")
public class UserPsEdu extends BaseTime {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_ps_edu_id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private Member member;

    @ManyToOne
    @JoinColumn(name = "ps_id", nullable = false)
    private Ps ps;

    @Column(name = "user_ps_edu_done", columnDefinition = "TINYINT(1)")
    private Boolean userPsEduDone;

}
