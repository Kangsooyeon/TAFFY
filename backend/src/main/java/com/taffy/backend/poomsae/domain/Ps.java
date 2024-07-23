package com.taffy.backend.poomsae.domain;

import com.taffy.backend.member.domain.Belt;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Ps {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ps_id")
    private Integer psId;

    @Column(name = "ps_ko_name", length = 255, nullable = false)
    private String psKoName;

    @Column(name = "ps_en_name", length = 255, nullable = false)
    private String psEnName;

    @Column(name = "ps_ko_desc", columnDefinition = "TEXT")
    private String psKoDesc;

    @Column(name = "ps_en_desc", columnDefinition = "TEXT")
    private String psEnDesc;

    @Column(name = "ps_url", length = 500)
    private String psUrl;

    @Column(name = "ps_thumb", length = 500)
    private String psThumb;

    @ManyToOne(fetch = FetchType.LAZY)
    @Column(name = "belt_id", nullable = false)
    private Belt belt;

    @OneToMany(mappedBy = "ps", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<PsMv> psMvList;

}
