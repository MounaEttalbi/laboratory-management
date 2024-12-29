package com.backend.TestAnalyse.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LaboratoireModel {
    private Long id;
    private String nom;
    private String logo;
    private String nrc;
    private boolean active;
    private String dateActivation;
}
