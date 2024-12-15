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
        // Initialisation d'une date fixe pour cohérence dans les tests
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        Date fixedDate = dateFormat.parse("2024-01-01");

        // Création d'une entité Laboratory
        laboratory = new Laboratory(1L, "Laboratoire ABC", "logo_url", 123456L, Statut.ACTIF, fixedDate);

        // Création d'un DTO LaboratoryDTO
        laboratoryDTO = new LaboratoryDTO();
        laboratoryDTO.setId(1L);
        laboratoryDTO.setNom("Laboratoire ABC");
        laboratoryDTO.setLogo("logo_url");
        laboratoryDTO.setNrc(123456L);
        laboratoryDTO.setStatut(Statut.ACTIF);
        laboratoryDTO.setDateActivation(fixedDate);
    }

    @Test
    void testToDTO() {
        // Conversion de l'entité en DTO
        LaboratoryDTO dto = Mapper.toDTO(laboratory);

        // Vérifications
        assertNotNull(dto, "Le DTO ne doit pas être null");
        assertEquals(laboratory.getId(), dto.getId(), "L'ID doit correspondre");
        assertEquals(laboratory.getNom(), dto.getNom(), "Le nom doit correspondre");
        assertEquals(laboratory.getLogo(), dto.getLogo(), "Le logo doit correspondre");
        assertEquals(laboratory.getNrc(), dto.getNrc(), "Le NRC doit correspondre");
        assertEquals(laboratory.getStatut(), dto.getStatut(), "Le statut doit correspondre");
        assertEquals(laboratory.getDateActivation(), dto.getDateActivation(), "La date d'activation doit correspondre");
    }

    @Test
    void testToDTO_NullLaboratory() {
        // Conversion d'une entité null
        LaboratoryDTO dto = Mapper.toDTO(null);

        // Vérification
        assertNull(dto, "La conversion d'un Laboratory null doit retourner un DTO null");
    }

    @Test
    void testToEntity() {
        // Conversion du DTO en entité
        Laboratory entity = Mapper.toEntity(laboratoryDTO);

        // Vérifications
        assertNotNull(entity, "L'entité ne doit pas être null");
        assertEquals(laboratoryDTO.getId(), entity.getId(), "L'ID doit correspondre");
        assertEquals(laboratoryDTO.getNom(), entity.getNom(), "Le nom doit correspondre");
        assertEquals(laboratoryDTO.getLogo(), entity.getLogo(), "Le logo doit correspondre");
        assertEquals(laboratoryDTO.getNrc(), entity.getNrc(), "Le NRC doit correspondre");
        assertEquals(laboratoryDTO.getStatut(), entity.getStatut(), "Le statut doit correspondre");
        assertEquals(laboratoryDTO.getDateActivation(), entity.getDateActivation(), "La date d'activation doit correspondre");
    }

    @Test
    void testToEntity_NullLaboratoryDTO() {
        // Conversion d'un DTO null
        Laboratory entity = Mapper.toEntity(null);

        // Vérification
        assertNull(entity, "La conversion d'un LaboratoryDTO null doit retourner une entité null");
    }
}
