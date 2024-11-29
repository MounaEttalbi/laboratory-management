package com.app.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;


@SpringBootApplication
public class GatewayServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(GatewayServiceApplication.class, args);
	}
	
	/*
	 * //Configuration dynamic of routes example :
	 * http://localhost:8888/USER_SERVICE/user/all
	 * 
	 * @Bean DiscoveryClientRouteDefinitionLocator locator(ReactiveDiscoveryClient
	 * rdc,DiscoveryLocatorProperties dlp) { return new
	 * DiscoveryClientRouteDefinitionLocator(rdc,dlp); }
	 */
}
