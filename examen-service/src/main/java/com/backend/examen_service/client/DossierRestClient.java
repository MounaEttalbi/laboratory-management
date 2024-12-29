package com.backend.examen_service.client;


import com.backend.examen_service.model.DossierModel;
import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.Date;
import java.util.List;

@FeignClient(name = "dossier-service") // Nom du service enregistré dans Eureka ou application.properties
public interface DossierRestClient {

    @GetMapping("/api/dossiers/{numDossier}")
    @CircuitBreaker(name = "dossierService", fallbackMethod = "getDefaultDossier")
    DossierModel findDossierById(@PathVariable("numDossier") int numDossier);

    @GetMapping("/api/dossiers")
    @CircuitBreaker(name = "dossierService", fallbackMethod = "getDefaultAllDossiers")
    List<DossierModel> findAllDossiers();

    @GetMapping("/api/dossiers/by-date")
    @CircuitBreaker(name = "dossierService", fallbackMethod = "getDefaultDossiersByDate")
    List<DossierModel> findDossiersByDate(@RequestParam("date") Date date);

    @GetMapping("/api/dossiers/by-user/{email}")
    @CircuitBreaker(name = "dossierService", fallbackMethod = "getDefaultDossiersByUser")
    List<DossierModel> findDossiersByUser(@PathVariable("email") String email);

    @GetMapping("/api/dossiers/by-patient/{patientId}")
    @CircuitBreaker(name = "dossierService", fallbackMethod = "getDefaultDossiersByPatient")
    List<DossierModel> findDossiersByPatient(@PathVariable("patientId") String patientId);

    // Méthodes de secours (fallback)

    default DossierModel getDefaultDossier(int numDossier, Exception exception) {
        DossierModel dossier = new DossierModel();
        dossier.setNumDossier(numDossier);
        dossier.setDate(null);
        dossier.setFkEmailUtilisateur("Utilisateur inconnu");
        dossier.setFkIdPatient("Patient inconnu");
        dossier.setUtilisateurNom("Nom utilisateur non disponible");
        dossier.setPatientNom("Nom patient non disponible");
        return dossier;
    }

    default List<DossierModel> getDefaultAllDossiers(Exception exception) {
        return List.of();
    }

    default List<DossierModel> getDefaultDossiersByDate(Date date, Exception exception) {
        return List.of();
    }

    default List<DossierModel> getDefaultDossiersByUser(String email, Exception exception) {
        return List.of();
    }

    default List<DossierModel> getDefaultDossiersByPatient(String patientId, Exception exception) {
        return List.of();
    }
}
