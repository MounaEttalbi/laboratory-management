package com.backend.TestAnalyse.client;


import com.backend.TestAnalyse.model.LaboratoireModel;
import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

@FeignClient(name = "laboratory-service")
public interface LaboratoryRestClient {

    @GetMapping("/laboratory/{id}")
    @CircuitBreaker(name="laboratoryService",fallbackMethod="getDefaultLaboratory")
    LaboratoireModel findLaboratoryById(@PathVariable Long id) ;

    @GetMapping("/laboratory/all")
    @CircuitBreaker(name="laboratoryService",fallbackMethod="getDefaultAllLaboratory")
    List<LaboratoireModel> allLaboratory();

    default LaboratoireModel getDefaultLaboratory(Long id, Exception exception) {
        LaboratoireModel labo =new LaboratoireModel();
        labo.setId(id);
        labo.setNom("Not available");
        labo.setNrc(null);
        return labo;
    }

    default List<LaboratoireModel> getDefaultAllLaboratory(Exception exception){
        return List.of();
    }

}
