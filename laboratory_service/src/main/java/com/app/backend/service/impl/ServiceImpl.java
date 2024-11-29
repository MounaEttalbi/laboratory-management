package com.app.backend.service.impl;
import java.util.List;
import java.util.Optional;

import com.app.backend.dto.LaboratoryDTO;
import com.app.backend.entities.Laboratory;
import com.app.backend.repository.LaboratoryRepository;
import com.app.backend.service.LaboratoryService;
import org.springframework.stereotype.Service;
import com.app.backend.mapper.Mapper;

@Service
public class ServiceImpl implements LaboratoryService {

    private LaboratoryRepository laboratoryRepository;

    public ServiceImpl(LaboratoryRepository laboratoryRepository) {
        this.laboratoryRepository = laboratoryRepository;
    }

    @Override
    public Laboratory addLaboratory(LaboratoryDTO laboratoryDTO) {
        // Convertir le DTO en entité et l'ajouter à la base de données
        Laboratory laboratory = Mapper.toEntity(laboratoryDTO);
        return laboratoryRepository.save(laboratory);
    }

    @Override
    public Laboratory updateLaboratory(Long id, LaboratoryDTO laboratoryDTO) {
        Optional<Laboratory> existingLaboratory = laboratoryRepository.findById(id);
        if (existingLaboratory.isPresent()) {
            Laboratory laboratoryToUpdate = existingLaboratory.get();
            laboratoryToUpdate.setNom(laboratoryDTO.getNom());
            laboratoryToUpdate.setLogo(laboratoryDTO.getLogo());
            laboratoryToUpdate.setNrc(laboratoryDTO.getNrc());
            laboratoryToUpdate.setStatut(laboratoryDTO.getStatut());
            laboratoryToUpdate.setDateActivation(laboratoryDTO.getDateActivation());
            return laboratoryRepository.save(laboratoryToUpdate);
        }
        return null;
    }

    @Override
    public List<Laboratory> getAllLaboratories() {
        return laboratoryRepository.findAll();
    }

    @Override
    public Optional<Laboratory> getLaboratoryById(long id) {
        return laboratoryRepository.findById(id);
    }

    @Override
    public void deleteLaboratory(Long id) {
        laboratoryRepository.deleteById(id);
    }
}
