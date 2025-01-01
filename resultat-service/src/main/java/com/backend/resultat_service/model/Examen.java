package com.backend.resultat_service.model;

import lombok.*;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class Examen {

    private Long id;
    private String nom;
    private Long fkNumDossier;
    private Long fkIdEpreuve;
    private Long fkIdTestAnalyse;
    private Date date;
    private String status;
    private String commentaires;
}