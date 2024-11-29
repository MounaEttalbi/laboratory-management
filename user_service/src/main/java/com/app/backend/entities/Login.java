package com.app.backend.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@DiscriminatorValue("Login")
@NoArgsConstructor

public class Login {
    @Id

    private String email;
    private String mdp;
    @Enumerated(EnumType.STRING) // Use EnumType.STRING to store enum values as strings
    private Role role;



    public Login(String email,String mdp) {
        this.email = email;
        this.mdp = mdp;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public String getMdp() {
        return mdp;
    }

    public void setMdp(String mdp) {
        this.mdp = mdp;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}