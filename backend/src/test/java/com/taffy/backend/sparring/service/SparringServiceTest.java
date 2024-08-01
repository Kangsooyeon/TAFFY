package com.taffy.backend.sparring.service;

import com.taffy.backend.sparring.model.UserModel;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.data.redis.core.ListOperations;
import org.springframework.data.redis.core.RedisTemplate;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class SparringServiceTest {

    @Mock
    private RedisTemplate<String, Object> redisTemplate;

    @Mock
    private ListOperations<String, Object> listOperations;

    @InjectMocks
    private SparringService sparringService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        when(redisTemplate.opsForList()).thenReturn(listOperations);
    }

    @Test
    void enqueueUser() {
        UserModel userModel = new UserModel(1, "user1", "white", "image1.jpg", 10, 5, 1);
        sparringService.enqueueUser(userModel);
        verify(listOperations, times(1)).rightPush("UserQueue", userModel);
    }

    @Test
    void dequeueUsers() {
        UserModel user1 = new UserModel(1, "user1", "white", "image1.jpg", 10, 5, 1);
        UserModel user2 = new UserModel(2, "user2", "blue", "image2.jpg", 15, 3, 2);

        when(listOperations.size("UserQueue")).thenReturn(2L);
        when(listOperations.leftPop("UserQueue")).thenReturn(user1).thenReturn(user2);

        List<UserModel> users = sparringService.dequeueUsers();

        assertEquals(2, users.size());
        assertEquals(user1, users.get(0));
        assertEquals(user2, users.get(1));

        verify(listOperations, times(2)).leftPop("UserQueue");
    }

    @Test
    void dequeueUsers_NotEnoughUsers() {
        when(listOperations.size("UserQueue")).thenReturn(1L);

        List<UserModel> users = sparringService.dequeueUsers();

        assertTrue(users.isEmpty());

        verify(listOperations, times(0)).leftPop("UserQueue");
    }

    @Test
    void getQueue() {
        List<Object> mockQueue = new ArrayList<>();
        mockQueue.add(new UserModel(1, "user1", "white", "image1.jpg", 10, 5, 1));
        mockQueue.add(new UserModel(2, "user2", "blue", "image2.jpg", 15, 3, 2));

        when(listOperations.range("UserQueue", 0, -1)).thenReturn(mockQueue);

        List<Object> queue = sparringService.getQueue();

        assertEquals(2, queue.size());
        assertEquals(mockQueue, queue);

        verify(listOperations, times(1)).range("UserQueue", 0, -1);
    }
}
