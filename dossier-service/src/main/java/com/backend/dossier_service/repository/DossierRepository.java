package com.backend.dossier_service.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.backend.dossier_service.entity.Dossier;

import java.util.Date;
import java.util.List;

public interface DossierRepository extends JpaRepository<Dossier, Integer> {
    // Exemple de méthode personnalisée pour trouver les dossiers par date
    List<Dossier> findByDate(Date date);
}