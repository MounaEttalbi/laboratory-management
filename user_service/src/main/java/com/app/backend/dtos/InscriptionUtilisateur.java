package com.app.backend.dtos;

import com.app.backend.entities.Role;
import jakarta.persistence.Column;
import jakarta.persistence.Lob;

public class InscriptionUtilisateur {
    private String cin;
    private String email;
    private String mdp;
    private String nomComplet;
    private String numTel;
    // Use EnumType.STRING to store enum values as strings
    private Role role;
    @Lob
    @Column(length = 100000)
    private byte[] signature;

    public byte[] getSignature() {
        return signature;
    }

    public void setSignature(byte[] signature) {
        this.signature = signature;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
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

    public InscriptionUtilisateur() {

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

    public String getCin() {
        return cin;
    }

    public void setCin(String cin) {
        this.cin = cin;
    }
}
