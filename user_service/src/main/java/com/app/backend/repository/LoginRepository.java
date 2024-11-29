package com.app.backend.repository;

import com.app.backend.entities.Login;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LoginRepository extends JpaRepository<Login,String> {
    Login findLoginByEmail(String email);
}
