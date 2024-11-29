package com.backend.adresse_service.service.impl;

import com.backend.adresse_service.dto.AdresseDTO;
import com.backend.adresse_service.entity.Adresse;
import com.backend.adresse_service.mapper.Mapper;
import com.backend.adresse_service.repository.AdresseRepository;
import com.backend.adresse_service.service.AdresseService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ServiceImpl implements AdresseService {

    private AdresseRepository adresseRepository;

    public ServiceImpl(AdresseRepository adresseRepository){
        this.adresseRepository=adresseRepository;
    }
    @Override
    public Adresse addAdresse(AdresseDTO adresseDTO) {
        Adresse adresse= Mapper.toEntity(adresseDTO);
        return adresseRepository.save(adresse);
    }

    @Override
    public Adresse updateAdresse(Long id, AdresseDTO adresseDTO) {
        Optional<Adresse> existingAdresse = adresseRepository.findById(id);
        if (existingAdresse.isPresent()) {
            Adresse adresseToUpdate = existingAdresse.get();
            adresseToUpdate.setCommune(adresseDTO.getCommune());
            adresseToUpdate.setCodePostal((adresseDTO.getCodePostal()));
            adresseToUpdate.setVille(adresseDTO.getVille());
            adresseToUpdate.setNomVoie(adresseDTO.getNomVoie());
            adresseToUpdate.setNumVoie(adresseDTO.getNumVoie());
            return adresseRepository.save(adresseToUpdate);
        }
        return null;
    }

    @Override
    public List<Adresse> getAllAdresse() {
        return adresseRepository.findAll();
    }

    @Override
    public Optional<Adresse> getAdresseById(long id) {
        return adresseRepository.findById(id);
    }

    @Override
    public void deleteAdresse(Long id) {
         adresseRepository.deleteById(id);
    }
}
