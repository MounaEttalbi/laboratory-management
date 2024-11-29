package com.app.backend.config;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ConfigTestController {

    @Autowired
    private  GlobalConfig globalConfig;


    public ConfigTestController(GlobalConfig globalConfig) {
        this.globalConfig = globalConfig;
    }

    @GetMapping("/globalConfig")
    public GlobalConfig globalConfig() {
        return globalConfig;
    }
}

