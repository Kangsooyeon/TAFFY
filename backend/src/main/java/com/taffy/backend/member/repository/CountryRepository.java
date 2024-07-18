package com.taffy.backend.member.repository;

import com.taffy.backend.member.domain.Country;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CountryRepository extends JpaRepository<Country, Long> {

    Country findByCountryName(String countryName);

}
