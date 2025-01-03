package com.ProjetLabo.Epreuve_Service.Clients;

import org.springframework.cloud.openfeign.FeignClient;

@FeignClient("ANALYSE-SERVICE")
public interface AnalyseClient {
}
