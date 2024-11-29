package com.app.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.backend.entities.User;


public interface UserRepository extends JpaRepository<User,String> {

}
