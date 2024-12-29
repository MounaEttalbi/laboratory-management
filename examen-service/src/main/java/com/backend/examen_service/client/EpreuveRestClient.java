package com.backend.examen_service.client;

import org.springframework.cloud.openfeign.FeignClient;

@FeignClient(name = "epreuve-service")
public interface EpreuveRestClient {
}
