package com.app.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.backend.entities.Laboratory;
import org.springframework.stereotype.Repository;

@Repository
public interface LaboratoryRepository extends JpaRepository<Laboratory, Long> {
    Laboratory findByNom(String nom);
}
