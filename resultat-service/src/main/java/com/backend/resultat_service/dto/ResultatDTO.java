package com.backend.resultat_service.dto;

import lombok.*;

import java.util.List;
@Getter @Setter
@AllArgsConstructor @NoArgsConstructor
@Data @ToString
public class ResultatDTO {

    private Long id;
    private Long fkIdExamen;
    private String valeursMesurees;
    private String observations;
    private String commentaires;
    private String status;
    private byte[] rapportPDF;
}
