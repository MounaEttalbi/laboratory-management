package com.backend.TestAnalyse.service.impl;

import com.backend.TestAnalyse.dto.TestAnalyseDTO;
import com.backend.TestAnalyse.entity.TestAnalyse;
import com.backend.TestAnalyse.repository.TestAnalyseRepository;
import com.backend.TestAnalyse.service.TestAnalyseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TestAnalyseServiceImpl implements TestAnalyseService {

    private final TestAnalyseRepository testAnalyseRepository;

    @Autowired
    public TestAnalyseServiceImpl(TestAnalyseRepository testAnalyseRepository) {
        this.testAnalyseRepository = testAnalyseRepository;
    }

    @Override
    public TestAnalyse addTestAnalyse(TestAnalyse testAnalyse) {
        return testAnalyseRepository.save(testAnalyse);
    }

    @Override
    public TestAnalyse updateTestAnalyse(Long id, TestAnalyseDTO testAnalyseDTO) {
        Optional<TestAnalyse> existingTestAnalyse = testAnalyseRepository.findById(id);
        if (existingTestAnalyse.isPresent()) {
            TestAnalyse testAnalyse = existingTestAnalyse.get();
            testAnalyse.setFkIdAnalyse(testAnalyseDTO.getFkIdAnalyse());
            testAnalyse.setNomTest(testAnalyseDTO.getNomTest());
            testAnalyse.setSousEpreuve(testAnalyseDTO.getSousEpreuve());
            testAnalyse.setIntervalMinDeReference(testAnalyseDTO.getIntervalMinDeReference());
            testAnalyse.setIntervalMaxDeReference(testAnalyseDTO.getIntervalMaxDeReference());
            testAnalyse.setUniteDeReference(testAnalyseDTO.getUniteDeReference());
            testAnalyse.setDetails(testAnalyseDTO.getDetails());
            return testAnalyseRepository.save(testAnalyse);
        } else {
            throw new RuntimeException("TestAnalyse not found with ID: " + id);
        }
    }

    @Override
    public List<TestAnalyse> getAllTestAnalyses() {
        return testAnalyseRepository.findAll();
    }

    @Override
    public Optional<TestAnalyse> getTestAnalyseById(Long id) {
        return testAnalyseRepository.findById(id);
    }

    @Override
    public void deleteTestAnalyse(Long id) {
        if (testAnalyseRepository.existsById(id)) {
            testAnalyseRepository.deleteById(id);
        } else {
            throw new RuntimeException("TestAnalyse not found with ID: " + id);
        }
    }
}

