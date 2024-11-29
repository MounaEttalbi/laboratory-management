package com.backend.adresse_service.service;

import com.backend.adresse_service.dto.AdresseDTO;
import com.backend.adresse_service.entity.Adresse;

import java.util.List;
import java.util.Optional;

public interface AdresseService {
    Adresse addAdresse(AdresseDTO adresseDTO);

    Adresse updateAdresse(Long id, AdresseDTO adresseDTO);

    List<Adresse> getAllAdresse();

    Optional<Adresse> getAdresseById(long id);

    void deleteAdresse(Long id);
}
