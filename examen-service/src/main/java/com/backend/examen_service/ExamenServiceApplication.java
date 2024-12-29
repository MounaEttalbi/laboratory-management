package com.backend.examen_service;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@EnableFeignClients(basePackages = "com.backend.examen_service.client")
public class ExamenServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(ExamenServiceApplication.class, args);
	}

}
