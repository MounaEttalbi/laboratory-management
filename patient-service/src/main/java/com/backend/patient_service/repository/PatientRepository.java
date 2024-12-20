package com.backend.patient_service.repository;

import com.backend.patient_service.entity.Patient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PatientRepository extends JpaRepository<Patient, Integer> {
    // Vous pouvez ajouter des méthodes personnalisées ici si nécessaire
}
