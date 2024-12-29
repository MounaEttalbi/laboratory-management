package com.backend.TestAnalyse.client;


import com.backend.TestAnalyse.model.AnalyseModel;
import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;
@FeignClient(name = "analyse-service") // Nom du service enregistré dans Eureka ou application.properties
public interface AnalyseRestClient {

    @GetMapping("/analyses/{id}")
    @CircuitBreaker(name = "analyseService", fallbackMethod = "getDefaultAnalyse")
    AnalyseModel findAnalyseById(@PathVariable("id") Long id);

    @GetMapping("/analyses/all")
    @CircuitBreaker(name = "analyseService", fallbackMethod = "getDefaultAllAnalyses")
    List<AnalyseModel> findAllAnalyses();

    // Méthode de secours pour un ID spécifique
    default AnalyseModel getDefaultAnalyse(Long id, Exception exception) {
        AnalyseModel analyse = new AnalyseModel();
        analyse.setId(id);
        analyse.setNom("Analyse inconnue");
        analyse.setDescription("Description non disponible");
        analyse.setType("Type non disponible");
        return analyse;
    }

    // Méthode de secours pour la liste complète
    default List<AnalyseModel> getDefaultAllAnalyses(Exception exception) {
        return List.of();
    }
}
