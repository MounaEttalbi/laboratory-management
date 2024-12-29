package com.backend.TestAnalyse.dto;

public class TestAnalyseDTO {

    private Long id;
    private int fkIdAnalyse;
    private String nomTest;
    private String sousEpreuve;
    private Double intervalMinDeReference;
    private Double intervalMaxDeReference;
    private String uniteDeReference;
    private String details;

    // Getters et Setters
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

    public String getNomTest() {
        return nomTest;
    }

    public void setNomTest(String nomTest) {
        this.nomTest = nomTest;
    }

    public String getSousEpreuve() {
        return sousEpreuve;
    }

    public void setSousEpreuve(String sousEpreuve) {
        this.sousEpreuve = sousEpreuve;
    }

    public Double getIntervalMinDeReference() {
        return intervalMinDeReference;
    }

    public void setIntervalMinDeReference(Double intervalMinDeReference) {
        this.intervalMinDeReference = intervalMinDeReference;
    }

    public Double getIntervalMaxDeReference() {
        return intervalMaxDeReference;
    }

    public void setIntervalMaxDeReference(Double intervalMaxDeReference) {
        this.intervalMaxDeReference = intervalMaxDeReference;
    }

    public String getUniteDeReference() {
        return uniteDeReference;
    }

    public void setUniteDeReference(String uniteDeReference) {
        this.uniteDeReference = uniteDeReference;
    }

    public String getDetails() {
        return details;
    }

    public void setDetails(String details) {
        this.details = details;
    }
}
