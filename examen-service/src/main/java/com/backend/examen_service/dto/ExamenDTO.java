package com.backend.examen_service.dto;



import lombok.*;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class ExamenDTO {
    private Long id;
    private String nom;
    private Long fkNumDossier;
    private Long fkIdEpreuve;
    private Long fkIdTestAnalyse;
    private Date date;
    private String status;
    private String commentaires;
}
