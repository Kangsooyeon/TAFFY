package com.taffy.backend.poomsae.domain;

import com.taffy.backend.global.audit.BaseTime;
import com.taffy.backend.member.domain.Member;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.time.LocalDateTime;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "User_Ps_Edu")
public class UserPsEdu extends BaseTime {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_ps_edu_id")
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Member member;

    @ManyToOne
    @JoinColumn(name = "ps_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Ps ps;

    @Column(name = "user_ps_edu_done", columnDefinition = "TINYINT(1)")
    private Boolean userPsEduDone;

    public void setUserPsEduDone(Boolean userPsEduDone) {
        this.userPsEduDone = userPsEduDone;
    }
}
