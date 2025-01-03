package com.ProjetLabo.Epreuve_Service.Entities;


import com.ProjetLabo.Epreuve_Service.models.AnalyseTable;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class Epreuve {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id ;

    private String nom ;
    private String description ;
    private Long idAnalyse;
    @Transient
    private AnalyseTable analyse;


}
