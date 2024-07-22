package com.taffy.backend.sparring.repository;

import com.taffy.backend.sparring.entity.UserEntity;
import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<UserEntity, String> {
}
