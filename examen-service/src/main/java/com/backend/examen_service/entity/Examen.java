package com.backend.examen_service.entity;

import com.backend.examen_service.model.DossierModel;
import com.backend.examen_service.model.EpreuveModel;
import com.backend.examen_service.model.TestAnalyseModel;
import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Entity
@Table(name = "examen")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class Examen {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long fkNumDossier;

    @Column(nullable = false)
    private Long fkIdEpreuve;

    @Column(nullable = false)
    private Long fkIdTestAnalyse;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(nullable = false)
    private Date date;

    @Column(nullable = false, length = 50)
    private String status; // en cours, terminé, etc.

    @Column(columnDefinition = "TEXT")
    private String commentaires; // Observations ou remarques des techniciens

    @Transient
    private DossierModel dossier;
    @Transient
    private EpreuveModel epreuve;
    @Transient
    private TestAnalyseModel testAnalyse;
}
