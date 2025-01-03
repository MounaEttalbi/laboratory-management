package com.example.service_utilisateur.controllers;


import com.example.service_utilisateur.Services.RoleService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/roles")
@RequiredArgsConstructor
public class KeycloakRoleApi {

    private RoleService roleService;


    @PutMapping("/assign-role")
    public ResponseEntity<?>  assignRole(){
        roleService.assignRole("b2c67dc6-6705-4299-9075-fc4adda50119", "TECHNICIEN");
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }


}
