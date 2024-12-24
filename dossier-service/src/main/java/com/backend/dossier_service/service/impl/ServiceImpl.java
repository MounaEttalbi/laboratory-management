package com.backend.dossier_service.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.backend.dossier_service.entity.Dossier;
import com.backend.dossier_service.repository.DossierRepository;
import com.backend.dossier_service.service.DossierService;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class ServiceImpl implements DossierService {

    @Autowired
    private DossierRepository dossierRepository;

    @Override
    public Dossier createDossier(Dossier dossier) {
        return dossierRepository.save(dossier);
    }

    @Override
    public Dossier getDossierById(int numDossier) {
        Optional<Dossier> dossier = dossierRepository.findById(numDossier);
        return dossier.orElseThrow(() -> new RuntimeException("Dossier not found with ID: " + numDossier));
    }

    @Override
    public List<Dossier> getAllDossiers() {
        return dossierRepository.findAll();
    }

    @Override
    public List<Dossier> getDossiersByDate(Date date) {
        return dossierRepository.findByDate(date);
    }

    @Override
    public Dossier updateDossier(int numDossier, Dossier dossierDetails) {
        // Récupérer le dossier existant
        Optional<Dossier> dossierOptional = dossierRepository.findById(numDossier);

        if (dossierOptional.isPresent()) {
            // Récupérer le dossier à mettre à jour
            Dossier dossier = dossierOptional.get();

            // Mettre à jour les propriétés du dossier avec les nouvelles valeurs
            dossier.setDate(dossierDetails.getDate());
            dossier.setFkEmailUtilisateur(dossierDetails.getFkEmailUtilisateur());
            dossier.setFkIdPatient(dossierDetails.getFkIdPatient());
            dossier.setStatus(dossierDetails.getStatus());

            // Sauvegarder les modifications dans la base de données
            return dossierRepository.save(dossier);
        } else {
            // Si le dossier n'existe pas, renvoyer null ou lancer une exception
            throw new RuntimeException("Dossier non trouvé pour le numéro: " + numDossier);
        }}

    @Override
    public void deleteDossier(int numDossier) {
        Dossier dossier = getDossierById(numDossier);
        dossierRepository.delete(dossier);
    }
    @Override
    public Dossier archiveDossier(int numDossier) {
        Dossier dossier = dossierRepository.findById(numDossier).orElseThrow(() -> new RuntimeException("Dossier introuvable"));
        dossier.setStatus("ARCHIVED");  // Marque le dossier comme archivé
        return dossierRepository.save(dossier);
    }
    @Override
    public List<Dossier> getDossiersByPatient(String patientId) {
        // Assurez-vous que vous avez un repository DossierRepository
        return dossierRepository.findByFkIdPatient(patientId);
    }
    @Override
    public List<Dossier> getDossiersByUser(String userEmail) {
        // Assurez-vous que vous avez un repository DossierRepository
        return dossierRepository.findByFkEmailUtilisateur(userEmail);
    }

}