package com.backend.TestAnalyse.model;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AnalyseModel {

    private Long id;
    private Long idLaboratoire;
    private LaboratoireModel labo; // Objet laboratoire (optionnel si vous le récupérez depuis un autre service)
    private String nom;
    private String description;
    private String type;

}
