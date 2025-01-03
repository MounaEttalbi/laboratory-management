package com.app.backend.service;

import java.util.List;
import java.util.Optional;

import com.app.backend.dto.LaboratoryDTO;
import com.app.backend.entities.Laboratory;

public interface LaboratoryService {

    Laboratory addLaboratory(Laboratory laboratory);

    Laboratory updateLaboratory(Long id, LaboratoryDTO laboratoryDTO);

    List<Laboratory> getAllLaboratories();

    Optional<Laboratory> getLaboratoryById(long id);

    void deleteLaboratory(Long id);

    Laboratory getLaboByNom(String nom);
}
