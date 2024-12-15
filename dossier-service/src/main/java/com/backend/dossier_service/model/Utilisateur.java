package com.backend.dossier_service.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;

@AllArgsConstructor
public class Utilisateur {
    @Id
    private String email;
    private String nomComplet;
    private String numTel;
    @Lob
    @Column(length = 100000)
    private byte[] signature;
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getNomComplet() {
		return nomComplet;
	}
	public void setNomComplet(String nomComplet) {
		this.nomComplet = nomComplet;
	}
	public String getNumTel() {
		return numTel;
	}
	public void setNumTel(String numTel) {
		this.numTel = numTel;
	}
	public byte[] getSignature() {
		return signature;
	}
	public void setSignature(byte[] signature) {
		this.signature = signature;
	}
    
    
}
