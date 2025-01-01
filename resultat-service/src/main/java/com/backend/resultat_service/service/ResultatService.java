package com.backend.resultat_service.service;

import com.backend.resultat_service.dto.ResultatDTO;
import com.backend.resultat_service.entity.Resultat;

import java.util.List;
import java.util.Optional;

public interface ResultatService {

    Resultat addResultat(ResultatDTO resultatDTO);

    Resultat updateResultat(Long id, ResultatDTO resultatDTO);

    void deleteResultat(Long id);

    List<Resultat> getAllResultats();

    Optional<Resultat> getResultatById(Long id);

    byte[] generateRapportPDF(Long id);

    Resultat updateStatus(Long id, String status);
}
