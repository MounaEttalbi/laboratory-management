package com.backend.examen_service.client;

import com.backend.examen_service.model.TestAnalyseModel;
import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@FeignClient(name = "TestAnalyse-service")
public interface TestAnalyseRestClient {

    @GetMapping("/api/testanalyses/all")
    @CircuitBreaker(name = "testAnalyseService", fallbackMethod = "getDefaultAllTestAnalyses")
    List<TestAnalyseModel> findAllTestAnalyses();

    @GetMapping("/api/testanalyses/{id}")
    @CircuitBreaker(name = "testAnalyseService", fallbackMethod = "getDefaultTestAnalyseById")
    TestAnalyseModel findTestAnalyseById(@PathVariable("id") Long id);

    @PostMapping("/api/testanalyses")
    @CircuitBreaker(name = "testAnalyseService", fallbackMethod = "addDefaultTestAnalyse")
    TestAnalyseModel addTestAnalyse(@RequestBody TestAnalyseModel testAnalyseModel);

    @PutMapping("/api/testanalyses/update/{id}")
    @CircuitBreaker(name = "testAnalyseService", fallbackMethod = "updateDefaultTestAnalyse")
    TestAnalyseModel updateTestAnalyse(@PathVariable("id") Long id, @RequestBody TestAnalyseModel testAnalyseModel);

    @DeleteMapping("/api/testanalyses/delete/{id}")
    @CircuitBreaker(name = "testAnalyseService", fallbackMethod = "deleteDefaultTestAnalyse")
    void deleteTestAnalyse(@PathVariable("id") Long id);

    // Méthodes de secours (fallback)

    default List<TestAnalyseModel> getDefaultAllTestAnalyses(Exception exception) {
        return List.of();
    }

    default TestAnalyseModel getDefaultTestAnalyseById(Long id, Exception exception) {
        TestAnalyseModel defaultTest = new TestAnalyseModel();
        defaultTest.setId(id);
        defaultTest.setNomTest("Test inconnu");
        defaultTest.setSousEpreuve("Non disponible");
        defaultTest.setIntervalMinDeReference(0.0);
        defaultTest.setIntervalMaxDeReference(0.0);
        defaultTest.setUniteDeReference("N/A");
        defaultTest.setDetails("Détails non disponibles");
        return defaultTest;
    }

    default TestAnalyseModel addDefaultTestAnalyse(TestAnalyseModel testAnalyseModel, Exception exception) {
        TestAnalyseModel defaultTest = new TestAnalyseModel();
        defaultTest.setNomTest("Ajout non réussi");
        return defaultTest;
    }

    default TestAnalyseModel updateDefaultTestAnalyse(Long id, TestAnalyseModel testAnalyseModel, Exception exception) {
        TestAnalyseModel defaultTest = new TestAnalyseModel();
        defaultTest.setId(id);
        defaultTest.setNomTest("Mise à jour non réussie");
        return defaultTest;
    }

    default void deleteDefaultTestAnalyse(Long id, Exception exception) {
        // Aucun traitement nécessaire pour la suppression par défaut
    }
}
