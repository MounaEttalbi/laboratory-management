package com.example.service_utilisateur.Services;

public interface RoleService {

    void assignRole(String userId,String roleName);

    String getUserRole(String userId);
}
