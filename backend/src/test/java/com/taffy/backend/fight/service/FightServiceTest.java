package com.taffy.backend.fight.service;

import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.redis.core.ListOperations;
import org.springframework.data.redis.core.RedisTemplate;

import java.util.Map;


@SpringBootTest
public class FightServiceTest {

    @Autowired
    private FightService fightService;

    @Test
    public void testSearch(){
//        fightService.testConnection();

        System.out.println(    fightService.getAllKeys()     );
        System.out.println("asfasdfsafsadfsadfsadfsadfesadfsad");
      fightService.getSpecificKey("ses_BYceIdFFRX");
    }
}