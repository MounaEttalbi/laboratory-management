package com.backend.TestAnalyse.service;


import com.backend.TestAnalyse.dto.TestAnalyseDTO;
import com.backend.TestAnalyse.entity.TestAnalyse;

import java.util.List;
import java.util.Optional;

public interface TestAnalyseService {

    TestAnalyse addTestAnalyse(TestAnalyse testAnalyse);

    TestAnalyse updateTestAnalyse(Long id, TestAnalyseDTO testAnalyseDTO);

    List<TestAnalyse> getAllTestAnalyses();

    Optional<TestAnalyse> getTestAnalyseById(Long id);

    void deleteTestAnalyse(Long id);
}
