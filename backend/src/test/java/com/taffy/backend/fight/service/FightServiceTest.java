package com.taffy.backend.fight.service;

import com.taffy.backend.fight.dto.RedisHashUser;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.redis.core.ListOperations;
import org.springframework.data.redis.core.RedisTemplate;

import java.util.List;
import java.util.Map;


@SpringBootTest
public class FightServiceTest {

    @Autowired
    private FightService fightService;

    @Test
    public void testSearch(){
//        fightService.testConnection();

        List<RedisHashUser> users = fightService.getUsers("ses_JaDvDNFa2l");

       // System.out.println(  users.get(0)   );
        System.out.println("asfasdfsafsadfsadfsadfsadfesadfsad");

    //  fightService.getSpecificKey("ses_BYceIdFFRX");
    }

    @Test
    public void testDelete(){
        fightService.deleteInviter(22L,"ses_RT28DU1PmT");
    }
}