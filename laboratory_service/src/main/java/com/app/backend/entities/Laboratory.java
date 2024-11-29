package com.app.backend.entities;

import jakarta.persistence.*;

import java.util.Arrays;
import java.util.Date;


@Entity
@Table(name = "laboratory")
public class Laboratory {
	
    @Id @GeneratedValue(strategy=GenerationType.IDENTITY)
    private long id;
    
    private String nom;
    
    @Lob
    @Column(length = 100000)
    private byte[] logo;
    
    private Long  nrc;
    private Statut statut;
    private Date dateActivation;
    
    public Laboratory() {
		super();
	}
	public Laboratory(long id, String nom, byte[] logo, Long nrc, Statut statut, Date dateActivation) {
		super();
		this.id = id;
		this.nom = nom;
		this.logo = logo;
		this.nrc = nrc;
		this.statut = statut;
		this.dateActivation = dateActivation;
	}
	
	//Getters and Setters
    
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public String getNom() {
		return nom;
	}
	public void setNom(String nom) {
		this.nom = nom;
	}
	public byte[] getLogo() {
		return logo;
	}
	public void setLogo(byte[] logo) {
		this.logo = logo;
	}
	public Long getNrc() {
		return nrc;
	}
	public void setNrc(Long nrc) {
		this.nrc = nrc;
	}
	public Statut getStatut() {
		return statut;
	}
	public void setStatut(Statut statut) {
		this.statut = statut;
	}
	public Date getDateActivation() {
		return dateActivation;
	}
	public void setDateActivation(Date dateActivation) {
		this.dateActivation = dateActivation;
	}

	@Override
	public String toString() {
		return "Laboratory{" +
				"id=" + id +
				", nom='" + nom + '\'' +
				", logo=" + Arrays.toString(logo) +
				", nrc=" + nrc +
				", statut=" + statut +
				", dateActivation=" + dateActivation +
				'}';
	}
}