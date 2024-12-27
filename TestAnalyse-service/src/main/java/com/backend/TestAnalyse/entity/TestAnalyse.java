package com.backend.TestAnalyse.entity;

import com.backend.TestAnalyse.model.Analyse;
import jakarta.persistence.*;

@Entity
@Table(name = "TestAnalyse")
public class TestAnalyse {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private int fkIdAnalyse;
    private String nomTest;
    private String sousEpreuve;
    private Double intervalMinDeReference;
    private Double intervalMaxDeReference;
    private String uniteDeReference;
    private String details;

    @Transient
    private Analyse analyse;


    public TestAnalyse() {
    }
    public TestAnalyse(Long id, int fkIdAnalyse,String nomTest,String sousEpreuve,Double intervalMinDeReference,Double intervalMaxDeReference,String uniteDeReference,String details ) {
        this.id = id;
        this.fkIdAnalyse=fkIdAnalyse;
        this.nomTest=nomTest;
        this.sousEpreuve=sousEpreuve;
        this.intervalMinDeReference=intervalMinDeReference;
        this.intervalMaxDeReference=intervalMaxDeReference;
        this.uniteDeReference=uniteDeReference;
        this.details=details;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public int getFkIdAnalyse() {
        return fkIdAnalyse;
    }

    public void setFkIdAnalyse(int fkIdAnalyse) {
        this.fkIdAnalyse = fkIdAnalyse;
    }

    public Analyse getAnalyse() {
        return analyse;
    }

    public void setAnalyse(Analyse analyse) {
        this.analyse = analyse;
    }

    public String getDetails() {
        return details;
    }

    public void setDetails(String details) {
        this.details = details;
    }

    public String getUniteDeReference() {
        return uniteDeReference;
    }

    public void setUniteDeReference(String uniteDeReference) {
        this.uniteDeReference = uniteDeReference;
    }

    public Double getIntervalMaxDeReference() {
        return intervalMaxDeReference;
    }

    public void setIntervalMaxDeReference(Double intervalMaxDeReference) {
        this.intervalMaxDeReference = intervalMaxDeReference;
    }

    public Double getIntervalMinDeReference() {
        return intervalMinDeReference;
    }

    public void setIntervalMinDeReference(Double intervalMinDeReference) {
        this.intervalMinDeReference = intervalMinDeReference;
    }

    public String getSousEpreuve() {
        return sousEpreuve;
    }

    public void setSousEpreuve(String sousEpreuve) {
        this.sousEpreuve = sousEpreuve;
    }

    public String getNomTest() {
        return nomTest;
    }

    public void setNomTest(String nomTest) {
        this.nomTest = nomTest;
    }

    @Override
    public String toString() {
        return "TestAnalyse{" +
                "id=" + id +
                ", fkIdAnalyse=" + fkIdAnalyse +
                ", nomTest='" + nomTest + '\'' +
                ", sousEpreuve='" + sousEpreuve + '\'' +
                ", intervalMinDeReference=" + intervalMinDeReference +
                ", intervalMaxDeReference=" + intervalMaxDeReference +
                ", uniteDeReference='" + uniteDeReference + '\'' +
                ", details='" + details + '\'' +
                ", analyse=" + analyse +
                '}';
    }
}
