package com.app.backend.client;
import java.util.List;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import com.app.backend.model.Laboratory;

import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;

@FeignClient(name = "laboratory-service")
public interface LaboratoryRestClient {
	
	@GetMapping("/laboratory/{id}")
	@CircuitBreaker(name="laboratoryService",fallbackMethod="getDefaultLaboratory")
	Laboratory findLaboratoryById(@PathVariable Long id) ;
	
	@GetMapping("/laboratory/all")
	@CircuitBreaker(name="laboratoryService",fallbackMethod="getDefaultAllLaboratory")
	List<Laboratory> allLaboratory();
	
	default Laboratory getDefaultLaboratory(Long id, Exception exception) {
		Laboratory labo =new Laboratory();
		labo.setId(id);
		labo.setNom("Not available");
		labo.setNrc(null);
		return labo;
	}

	default List<Laboratory> getDefaultAllLaboratory(Exception exception){
		return List.of();
	}

}
