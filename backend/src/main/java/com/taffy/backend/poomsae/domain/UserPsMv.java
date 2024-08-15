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

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "User_Ps_Mv")
public class UserPsMv extends BaseTime {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_ps_mv_id")
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Member member;

    @ManyToOne
    @JoinColumn(name = "ps_mv_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private PsMv psMv;

    @Column(name = "user_ps_mv_done", nullable = false)
    private Boolean userPsMvDone;

    // 동작완료 메서드
    public void userPsMvDone() {
        this.userPsMvDone = true;
    }

    // getter 로 생성되지만 명시적으로 생성
    public Boolean getUserPsMvDone() {
        return userPsMvDone;
    }
}
