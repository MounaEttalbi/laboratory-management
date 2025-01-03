package ProjetLibre.analyse_service.Entities;


import ProjetLibre.analyse_service.Classes.Laboratory;
import jakarta.persistence.*;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class AnalyseTable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long idLaboratoire;
    @Transient
    private Laboratory labo;
    private String nom;
    private String description;
    private String type;
    // Getters and Setters

}
