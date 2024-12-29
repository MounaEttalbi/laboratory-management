package com.backend.TestAnalyse.controller;


import com.backend.TestAnalyse.dto.TestAnalyseDTO;
import com.backend.TestAnalyse.entity.TestAnalyse;
import com.backend.TestAnalyse.service.TestAnalyseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/testanalyses")
public class TestAnalyseController {

    private final TestAnalyseService testAnalyseService;

    @Autowired
    public TestAnalyseController(TestAnalyseService testAnalyseService) {
        this.testAnalyseService = testAnalyseService;
    }


    @PostMapping
    public ResponseEntity<TestAnalyse> addTestAnalyse(@RequestBody TestAnalyse testAnalyse) {
        return ResponseEntity.ok(testAnalyseService.addTestAnalyse(testAnalyse));
    }


    @PutMapping("/update/{id}")
    public ResponseEntity<TestAnalyse> updateTestAnalyse(
            @PathVariable Long id,
            @RequestBody TestAnalyseDTO testAnalyseDTO) {
        return ResponseEntity.ok(testAnalyseService.updateTestAnalyse(id, testAnalyseDTO));
    }


    @GetMapping("/all")
    public ResponseEntity<List<TestAnalyse>> getAllTestAnalyses() {
        return ResponseEntity.ok(testAnalyseService.getAllTestAnalyses());
    }


    @GetMapping("/{id}")
    public ResponseEntity<TestAnalyse> getTestAnalyseById(@PathVariable Long id) {
        return testAnalyseService.getTestAnalyseById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }


    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteTestAnalyse(@PathVariable Long id) {
        testAnalyseService.deleteTestAnalyse(id);
        return ResponseEntity.noContent().build();
    }
}
