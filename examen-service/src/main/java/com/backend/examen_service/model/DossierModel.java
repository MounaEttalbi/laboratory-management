package com.backend.examen_service.model;

import lombok.*;

import java.util.Date;
@Setter
@Getter
@AllArgsConstructor  @NoArgsConstructor @Data
public class DossierModel {

    private int numDossier;
    private Date date;
    private String fkEmailUtilisateur;
    private String fkIdPatient;
    private String utilisateurNom;
    private String patientNom;
}
