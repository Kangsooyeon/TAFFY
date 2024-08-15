package com.taffy.backend.fight.service;

import com.taffy.backend.fight.dto.RedisHashUser;
import com.taffy.backend.member.domain.Member;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.redis.core.ListOperations;
import org.springframework.data.redis.core.RedisTemplate;

import java.util.HashMap;
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
        fightService.deleteInviter(1L,"test:3fsdfasfs");
    }

    @Test
    public void testAdd(){
        RedisHashUser redisHashUser = RedisHashUser.builder()
                .id(333L)
                .email("test@test.com")
                .win(0)
                .draw(0)
                .loss(0)
                .nickName("test")
                .beltName("WhiteBelt")
                .build();
        fightService.addMember("test:3fsdfasfs",redisHashUser);
    }

    @Test
    public void testQuickStartRoomSelect(){
        HashMap<String, List<RedisHashUser>> list = fightService.getAllRoom();
        System.out.println(list);
    }

    @Test
    public void deleteTest(){
        fightService.expiredRoom("ses_K9oer6p8Pj");
    }

}