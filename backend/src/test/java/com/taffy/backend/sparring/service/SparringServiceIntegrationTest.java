package com.taffy.backend.sparring.service;

import com.taffy.backend.config.redis.TestConfig;
import com.taffy.backend.sparring.model.UserModel;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Import;
import org.springframework.data.redis.core.ListOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.TestPropertySource;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@ActiveProfiles("test")
@Import(TestConfig.class)
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
@SpringBootTest
@TestPropertySource(locations = "classpath:application-test.properties")
class SparringServiceIntegrationTest {

    @Autowired
    private RedisTemplate<String, Object> redisTemplate;

    @Autowired
    private SparringService sparringService;

    @BeforeEach
    void setUp() {
        // 테스트 전마다 Redis 키를 초기화합니다.
        redisTemplate.delete("UserQueue");
    }

    @Test
    @Order(3)
    void testEnqueueUser() {
        // Given
        UserModel user = new UserModel(1, "nickname", "beltName", "profileImg", 10, 5, 2);

        // When
        sparringService.enqueueUser(user);

        // Then
        ListOperations<String, Object> listOperations = redisTemplate.opsForList();
        Long size = listOperations.size("UserQueue");
        assertNotNull(size);
        assertEquals(1, size);
        assertEquals(user, listOperations.index("UserQueue", 0));
    }

    @Test
    @Order(1)
    void testDequeueUsers() {
        UserModel user1 = new UserModel(1, "nickname1", "beltName1", "profileImg1", 10, 5, 2);
        UserModel user2 = new UserModel(2, "nickname2", "beltName2", "profileImg2", 12, 3, 4);

        sparringService.enqueueUser(user1);
        sparringService.enqueueUser(user2);

        List<UserModel> result = sparringService.dequeueUsers();

        assertEquals(2, result.size());
        assertEquals(user1, result.get(0));
        assertEquals(user2, result.get(1));
    }

    @Test
    @Order(2)
    void testGetQueue() {
        UserModel user1 = new UserModel(1, "nickname", "beltName", "profileImg", 10, 5, 2);
        UserModel user2 = new UserModel(2, "nickname2", "beltName2", "profileImg2", 12, 3, 4);

        sparringService.enqueueUser(user1);
        sparringService.enqueueUser(user2);

        List<Object> result = sparringService.getQueue();

        assertEquals(2, result.size());
        assertEquals(user1, result.get(0));
        assertEquals(user2, result.get(1));
    }
}
