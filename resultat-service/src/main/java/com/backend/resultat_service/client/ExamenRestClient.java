package com.backend.resultat_service.client;


import com.backend.resultat_service.model.Examen;
import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

@FeignClient(name = "examen-service") // Nom du service enregistré dans Eureka ou application.properties
public interface ExamenRestClient {

    @GetMapping("/api/examens/{id}")
    @CircuitBreaker(name = "examenService", fallbackMethod = "getDefaultExamen")
    Examen findExamenById(@PathVariable("id") Long id);

    @GetMapping("/api/examens/all")
    @CircuitBreaker(name = "examenService", fallbackMethod = "getDefaultAllExamens")
    List<Examen> findAllExamens();

    // Méthode de secours pour un examen spécifique
    default Examen getDefaultExamen(Long id, Exception exception) {
        Examen examen = new Examen();
        examen.setId(id);
        examen.setNom("Examen inconnu");
        examen.setCommentaires("Description non disponible");
        examen.setDate(null);
        return examen;
    }

    // Méthode de secours pour la liste complète des examens
    default List<Examen> getDefaultAllExamens(Exception exception) {
        return List.of();
    }
}
