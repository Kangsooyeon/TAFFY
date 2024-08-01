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
@Table(name = "User_Ps_Test")
public class UserPsTest extends BaseTime {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_ps_test_id")
    private Integer userPsTestId;

    @ManyToOne
    @JoinColumn(name = "user_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Member member;

    @ManyToOne
    @JoinColumn(name = "ps_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Ps ps;

    @Column(name = "user_ps_test_pass")
    private boolean isPassed;

    public void passPsTest() {
        isPassed = true;
    }
}
