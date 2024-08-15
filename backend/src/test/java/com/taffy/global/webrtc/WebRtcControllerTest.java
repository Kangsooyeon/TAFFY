package com.taffy.global.webrtc;

import com.taffy.backend.global.webrtc.WebrtcController;
import io.openvidu.java.client.*;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.util.ReflectionTestUtils;

import java.util.HashMap;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

class WebrtcControllerTest {

    @InjectMocks
    private WebrtcController webrtcController;

    @Mock
    private OpenVidu openVidu;

    @BeforeEach
    void setUp() {
        // Mockito 어노테이션을 초기화합니다.
        MockitoAnnotations.openMocks(this);

        // OpenVidu URL과 Secret을 설정합니다.
        ReflectionTestUtils.setField(webrtcController, "OPENVIDU_URL", "https://localhost:4443/");
        ReflectionTestUtils.setField(webrtcController, "OPENVIDU_SECRET", "MY_SECRET");

        // OpenVidu 객체를 주입합니다.
        ReflectionTestUtils.setField(webrtcController, "openvidu", openVidu);
    }

    @Test
    void testInitializeSession() throws OpenViduJavaClientException, OpenViduHttpException {
        // Given
        Map<String, Object> params = new HashMap<>();
        Session mockSession = mock(Session.class);
        when(mockSession.getSessionId()).thenReturn("TEST_SESSION_ID");
        when(openVidu.createSession(any(SessionProperties.class))).thenReturn(mockSession);

        // When
        ResponseEntity<String> response = webrtcController.initializeSession(params);

        // Then
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("TEST_SESSION_ID", response.getBody());
        verify(openVidu).createSession(any(SessionProperties.class));
    }

    @Test
    void testCreateConnection() throws OpenViduJavaClientException, OpenViduHttpException {
        // Given
        String sessionId = "TEST_SESSION_ID";
        Map<String, Object> params = new HashMap<>();
        Session mockSession = mock(Session.class);
        Connection mockConnection = mock(Connection.class);
        when(openVidu.getActiveSession(sessionId)).thenReturn(mockSession);
        when(mockSession.createConnection(any(ConnectionProperties.class))).thenReturn(mockConnection);
        when(mockConnection.getToken()).thenReturn("TEST_TOKEN");

        // When
        ResponseEntity<String> response = webrtcController.createConnection(sessionId, params);

        // Then
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("TEST_TOKEN", response.getBody());
        verify(openVidu).getActiveSession(sessionId);
        verify(mockSession).createConnection(any(ConnectionProperties.class));
    }

    @Test
    void testCreateConnectionSessionNotFound() throws OpenViduJavaClientException, OpenViduHttpException {
        // Given
        String sessionId = "NONEXISTENT_SESSION_ID";
        Map<String, Object> params = new HashMap<>();
        when(openVidu.getActiveSession(sessionId)).thenReturn(null);

        // When
        ResponseEntity<String> response = webrtcController.createConnection(sessionId, params);

        // Then
        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
        verify(openVidu).getActiveSession(sessionId);
    }
}