package com.backend.examen_service.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class TestAnalyseModel {
    private Long id;
    private int fkIdAnalyse;
    private String nomTest;
    private String sousEpreuve;
    private Double intervalMinDeReference;
    private Double intervalMaxDeReference;
    private String uniteDeReference;
    private String details;
}
