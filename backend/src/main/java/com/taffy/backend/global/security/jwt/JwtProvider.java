package com.taffy.backend.global.security.jwt;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.taffy.backend.global.security.jwt.dto.MemberRefreshTokenDTO;
import com.taffy.backend.global.security.jwt.dto.TokensResponseDTO;
import io.jsonwebtoken.*;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.Base64;
import java.util.Date;

@Component
@RequiredArgsConstructor
public class JwtProvider {
    private final ObjectMapper objectMapper;

    @Value("${jwt.key}")
    private String key;

    @Value("${jwt.live.atk}")
    private Long atkLive;

    @Value("${jwt.live.rtk}")
    private Long rtkLive;

    @PostConstruct
    protected void init() {
        key = Base64.getEncoder().encodeToString(key.getBytes());
    }

    public TokensResponseDTO reissueAtk(MemberRefreshTokenDTO memberRefreshTokenDTO) throws JsonProcessingException {
        Subject atkSubject = Subject.atk(memberRefreshTokenDTO.getUserId());
        String atk = createToken(atkSubject, atkLive);
        return new TokensResponseDTO(atk, null);
    }

    public TokensResponseDTO createTokensByLogin(Long id) throws JsonProcessingException {
        Subject atkSubject = Subject.atk(id);
        Subject rtkSubject = Subject.rtk(id);
        String atk = createToken(atkSubject, atkLive);
        String rtk = createToken(rtkSubject, rtkLive);
        return new TokensResponseDTO(atk, rtk);
    }

    private String createToken(Subject subject, Long tokenLive) throws JsonProcessingException {
        String subjectStr = objectMapper.writeValueAsString(subject);
        Claims claims = Jwts.claims().setSubject(subjectStr);

        Date date = new Date();
        return Jwts.builder()
                .setSubject(claims.getSubject())
                .setIssuedAt(date)
                .setExpiration(new Date(date.getTime() + tokenLive))
                .signWith(SignatureAlgorithm.HS256, key)
                .compact();
    }

    public Claims validateAndGetUserId(String token) throws JwtException {
        return Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    public boolean isValidToken(String token) {
        try {
            Jwts.parser()
                    .setSigningKey(key)
                    .parseClaimsJws(token)
                    .getBody();
            return true;
        }catch (Exception e){
            return false;
        }
    }
}