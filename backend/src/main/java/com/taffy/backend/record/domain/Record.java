package com.taffy.backend.record.domain;

import com.taffy.backend.global.audit.BaseTime;
import com.taffy.backend.member.domain.Member;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Record extends BaseTime {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "record_id")
    private Integer id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private Member member;

    @Column(name = "win")
    private Integer win;

    @Column(name = "lose")
    private Integer lose;

    @Column(name="draw")
    private Integer draw;

    public void incrementWin() {
        this.win = this.win + 1;
    }

    public void incrementLose() {
        this.lose = this.lose + 1;
    }

    public void incrementDraw() {
        this.draw = this.draw + 1;
    }

}
