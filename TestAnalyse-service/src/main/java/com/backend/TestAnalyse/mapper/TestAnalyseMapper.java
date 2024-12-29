package com.backend.TestAnalyse.mapper;



import com.backend.TestAnalyse.dto.TestAnalyseDTO;
import com.backend.TestAnalyse.entity.TestAnalyse;
import org.springframework.stereotype.Component;

@Component
public class TestAnalyseMapper {

    // Convertit une entité en DTO
    public TestAnalyseDTO toDto(TestAnalyse testAnalyse) {
        if (testAnalyse == null) {
            return null;
        }

        TestAnalyseDTO dto = new TestAnalyseDTO();
        dto.setId(testAnalyse.getId());
        dto.setFkIdAnalyse(testAnalyse.getFkIdAnalyse());
        dto.setNomTest(testAnalyse.getNomTest());
        dto.setSousEpreuve(testAnalyse.getSousEpreuve());
        dto.setIntervalMinDeReference(testAnalyse.getIntervalMinDeReference());
        dto.setIntervalMaxDeReference(testAnalyse.getIntervalMaxDeReference());
        dto.setUniteDeReference(testAnalyse.getUniteDeReference());
        dto.setDetails(testAnalyse.getDetails());

        return dto;
    }

    // Convertit un DTO en entité
    public TestAnalyse toEntity(TestAnalyseDTO dto) {
        if (dto == null) {
            return null;
        }

        TestAnalyse testAnalyse = new TestAnalyse();
        testAnalyse.setId(dto.getId());
        testAnalyse.setFkIdAnalyse(dto.getFkIdAnalyse());
        testAnalyse.setNomTest(dto.getNomTest());
        testAnalyse.setSousEpreuve(dto.getSousEpreuve());
        testAnalyse.setIntervalMinDeReference(dto.getIntervalMinDeReference());
        testAnalyse.setIntervalMaxDeReference(dto.getIntervalMaxDeReference());
        testAnalyse.setUniteDeReference(dto.getUniteDeReference());
        testAnalyse.setDetails(dto.getDetails());

        return testAnalyse;
    }
}
