package com.backend.TestAnalyse;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@EnableFeignClients(basePackages = "com.backend.TestAnalyse.client")
public class TestAnalyseApplication {

	public static void main(String[] args) {
		SpringApplication.run(TestAnalyseApplication.class, args);
	}

}
