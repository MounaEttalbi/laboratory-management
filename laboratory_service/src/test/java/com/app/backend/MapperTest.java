package com.app.backend;



import com.app.backend.dto.LaboratoryDTO;
import com.app.backend.entities.Laboratory;
import com.app.backend.entities.Statut;
import com.app.backend.mapper.Mapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.Date;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import static org.junit.jupiter.api.Assertions.*;

class MapperTest {

    private Laboratory laboratory;
    private LaboratoryDTO laboratoryDTO;

    @BeforeEach
    public void setUp() throws ParseException {
        // Définit une date fixe pour éviter les différences de millisecondes
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        Date fixedDate = dateFormat.parse("2024-01-01");

        // Initialisation d'une entité Laboratory et d'un DTO LaboratoryDTO pour les tests
        laboratory = new Laboratory(1L, "Laboratoire ABC", new byte[]{1, 2, 3}, 123456L, Statut.ACTIF, fixedDate);

        laboratoryDTO = new LaboratoryDTO();
        laboratoryDTO.setId(1L);
        laboratoryDTO.setNom("Laboratoire ABC");
        laboratoryDTO.setLogo(new byte[]{1, 2, 3});
        laboratoryDTO.setNrc(123456L);
        laboratoryDTO.setStatut(Statut.ACTIF);
        laboratoryDTO.setDateActivation(fixedDate);
    }
    @Test
    void testToDTO() {
        LaboratoryDTO dto = Mapper.toDTO(laboratory);

        assertNotNull(dto);
        assertEquals(laboratory.getId(), dto.getId());
        assertEquals(laboratory.getNom(), dto.getNom());
        assertArrayEquals(laboratory.getLogo(), dto.getLogo());
        assertEquals(laboratory.getNrc(), dto.getNrc());
        assertEquals(laboratory.getStatut(), dto.getStatut());
        assertEquals(laboratory.getDateActivation(), dto.getDateActivation());
    }

    @Test
    void testToDTO_NullLaboratory() {
        LaboratoryDTO dto = Mapper.toDTO(null);

        assertNull(dto, "La conversion d'un Laboratory null devrait retourner un DTO null");
    }

    @Test
    void testToEntity() {
        Laboratory entity = Mapper.toEntity(laboratoryDTO);

        assertNotNull(entity);
        assertEquals(laboratoryDTO.getId(), entity.getId());
        assertEquals(laboratoryDTO.getNom(), entity.getNom());
        assertArrayEquals(laboratoryDTO.getLogo(), entity.getLogo());
        assertEquals(laboratoryDTO.getNrc(), entity.getNrc());
        assertEquals(laboratoryDTO.getStatut(), entity.getStatut());
        assertEquals(laboratoryDTO.getDateActivation(), entity.getDateActivation());
    }

    @Test
    void testToEntity_NullLaboratoryDTO() {
        Laboratory entity = Mapper.toEntity(null);

        assertNull(entity, "La conversion d'un LaboratoryDTO null devrait retourner un Laboratory null");
    }
}
