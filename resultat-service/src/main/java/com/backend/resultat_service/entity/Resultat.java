package com.backend.resultat_service.entity;

import com.backend.resultat_service.model.Examen;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.persistence.*;
import lombok.*;

import java.io.IOException;
import java.util.List;

@Entity
@Table(name = "resultats")
@Getter @Setter @AllArgsConstructor @NoArgsConstructor @ToString @Data

public class Resultat {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long fkIdExamen;

    private String valeursMesurees;
    private String observations;
    private String commentaires;
    private String status;

    @Lob
    private byte[] rapportPDF; // Fichier PDF généré

    @Transient
    private Examen examen;

}