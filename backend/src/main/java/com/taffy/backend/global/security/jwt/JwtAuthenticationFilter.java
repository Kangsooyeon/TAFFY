package com.taffy.backend.global.security.jwt;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.taffy.backend.global.exception.ErrorCode;
import com.taffy.backend.global.security.jwt.dto.ResponseDTO;
import com.taffy.backend.member.domain.Role;
import io.jsonwebtoken.*;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Date;

@Slf4j
@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtProvider jwtProvider;
    private final ObjectMapper objectMapper;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        try {
            String token = parseBearerToken(request);
            log.info("Filter is running...");

            if (token != null && !token.equalsIgnoreCase("null")) {
                Claims claims = jwtProvider.validateAndGetUserId(token);
                String payload = claims.getSubject();
                Member member = objectMapper.readValue(payload, Member.class);
                Long memberId = member.getMemberId();
                Date expiration = claims.getExpiration();
                log.info("Authenticated user ID : {}", memberId);
                log.info("Authenticated expiration : {}", expiration);

                AbstractAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
                        memberId,
                        null,
                        AuthorityUtils.createAuthorityList(String.valueOf(Role.USER)));
                authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContext securityContext = SecurityContextHolder.createEmptyContext();
                securityContext.setAuthentication(authentication);
                SecurityContextHolder.setContext(securityContext);
            }
            filterChain.doFilter(request, response);
        } catch (ExpiredJwtException e) {
            logger.error("Could not set user authentication in security context {}", e);
            jwtExceptionHandler(response, ErrorCode.JWT_TOKEN_EXPIRED.getMessage());
        } catch (UnsupportedJwtException e) {
            logger.error("Could not set user authentication in security context {}", e);
            jwtExceptionHandler(response, ErrorCode.JWT_UNSUPPORTED.getMessage());
        } catch (MalformedJwtException e) {
            logger.error("Could not set user authentication in security context {}", e);
            jwtExceptionHandler(response, ErrorCode.JWT_MALFORMED.getMessage());
        } catch (SignatureException e) {
            logger.error("Could not set user authentication in security context {}", e);
            jwtExceptionHandler(response, ErrorCode.JWT_SIGNATURE.getMessage());
        } catch (IllegalArgumentException e) {
            logger.error("Could not set user authentication in security context {}", e);
            jwtExceptionHandler(response, ErrorCode.JWT_ILLEGAL_ARGUMENT.getMessage());
        }
    }

    private String parseBearerToken(HttpServletRequest request){
        String bearerToken = request.getHeader("Authorization");

        if(StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")){
            return bearerToken.substring(7);
        }
        return null;
    }

    private void jwtExceptionHandler(HttpServletResponse response, String message) throws IOException{
        ResponseDTO<String> dto = new ResponseDTO<>(HttpStatus.UNAUTHORIZED.value(), message);
        response.setStatus(HttpStatus.FORBIDDEN.value());
        response.setCharacterEncoding("UTF-8");
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);

        objectMapper.writeValue(response.getWriter(), dto);
    }

    @Getter
    static class Member {
        private Long memberId;
    }
}