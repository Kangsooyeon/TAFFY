package com.taffy.backend.poomsae.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "ps_mv")
public class PsMv {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ps_mv_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ps_id", nullable = false)
    private Ps ps;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "mv_id", nullable = false)
    private Mv mv;

    @Column(name = "ps_mv_seq", nullable = false)
    private Integer psMvSeq;
}
