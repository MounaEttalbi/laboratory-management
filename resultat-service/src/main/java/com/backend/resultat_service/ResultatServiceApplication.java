package com.backend.resultat_service;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@EnableFeignClients(basePackages = "com.backend.resultat_service.client")
public class ResultatServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(ResultatServiceApplication.class, args);
	}

}
