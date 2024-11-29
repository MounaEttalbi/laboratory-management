package com.app.backend.dtos;

import com.app.backend.entities.Role;


public class UtilisateurDto {
    private String email;
    private String nomComplet;
    private String numTel;
    private Role profession;

    public UtilisateurDto() {
    }

    public UtilisateurDto(String email,String nomComplet,String numTel,Role profession) {
        this.profession = profession;
        this.email = email;
        this.nomComplet =nomComplet;
        this.numTel = numTel;
    }

    public Role getProfession() {
        return profession;
    }

    public void setProfession(Role profession) {
        this.profession = profession;
    }

    public String getNumTel() {
        return numTel;
    }

    public void setNumTel(String numTel) {
        this.numTel = numTel;
    }

    public String getNomComplet() {
        return nomComplet;
    }

    public void setNomComplet(String nomComplet) {
        this.nomComplet = nomComplet;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
