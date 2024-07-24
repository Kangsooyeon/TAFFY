package com.taffy.backend.poomsae.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Mv {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "mv_id")
    private Long mvId;

    @Column(name = "mv_url", length = 500)
    private String mvUrl;

    @Column(name = "mv_ko_name", length = 255)
    private String mvKoName;

    @Column(name = "mv_ko_desc", columnDefinition = "TEXT")
    private String mvKoDesc;

    @Column(name = "mv_ko_vo", length = 500)
    private String mvKoVo;

    @Column(name = "mv_en_name", length = 255)
    private String mvEnName;

    @Column(name = "mv_en_desc", columnDefinition = "TEXT")
    private String mvEnDesc;

    @Column(name = "mv_en_vo", length = 500)
    private String mvEnVo;

    @Enumerated(EnumType.STRING)
    @Column(name = "mv_type", columnDefinition = "ENUM('ATK', 'DEF', 'STD', 'TUR')")
    private MovementType mvType;

    // ps 테이블과 양방향 연결 해야할까?
    // 이 기본동작을 포함하는 품새들을 찾을 필요가 있을까?
    // @OneToMany

    public enum MovementType {
        ATK, DEF, STD, TUR
    }
}
