package com.backend.dossier_service.service;

import java.util.Date;
import java.util.List;

import com.backend.dossier_service.entity.Dossier;

public interface DossierService {
    Dossier createDossier(Dossier dossier);
    Dossier getDossierById(int numDossier);
    List<Dossier> getAllDossiers();
    List<Dossier> getDossiersByDate(Date date);
    Dossier updateDossier(int numDossier, Dossier dossierDetails);
    void deleteDossier(int numDossier);
}