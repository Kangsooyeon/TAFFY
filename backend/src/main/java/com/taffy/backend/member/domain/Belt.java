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
    @Column(name = "belt_id")
    private Long id;

    @Column(name = "belt_level")
    private int belt_level;

    @Column(name = "belt_name")
    private String belt_name;

    @Column(name = "belt_title")
    private String belt_title;

}
