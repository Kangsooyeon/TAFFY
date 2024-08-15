package com.taffy.backend.member.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Belt {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "belt_id")
    private Long id;

    @Column(name = "belt_level")
    private int beltLevel;

    @Column(name = "belt_name")
    private String beltName;

    @Column(name = "belt_title")
    private String beltTitle;

}
