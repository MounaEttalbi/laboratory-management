package com.backend.examen_service.model;

import lombok.*;

@Setter @Getter @AllArgsConstructor @NoArgsConstructor
@ToString @Data
public class EpreuveModel {
    private int id;
    private String nom;
    private int fkIdAnalyse;
}
