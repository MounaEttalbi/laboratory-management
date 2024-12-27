package com.backend.dossier_service;

import com.backend.dossier_service.service.DossierService;
import com.backend.dossier_service.controller.DossierController;
import com.backend.dossier_service.entity.Dossier;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.util.Arrays;
import java.util.List;

@WebMvcTest(DossierController.class)
public class DossierControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private DossierService dossierService;

    @InjectMocks
    private DossierController dossierController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testCreateDossier() throws Exception {
        Dossier dossier = new Dossier();
        dossier.setNumDossier(1);
        // Définir d'autres attributs du dossier si nécessaire

        when(dossierService.createDossier(any(Dossier.class))).thenReturn(dossier);

        mockMvc.perform(post("/api/dossiers")
                .contentType("application/json")
                .content("{ \"numDossier\": 1 }"))  // Ajustez le JSON pour correspondre à votre Dossier
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.numDossier").value(1));
    }
    
    @Test
    void testGetDossierById() throws Exception {
        Dossier dossier = new Dossier();
        dossier.setNumDossier(1);

        when(dossierService.getDossierById(1)).thenReturn(dossier);

        mockMvc.perform(get("/api/dossiers/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.numDossier").value(1));
    }

    @Test
    void testGetAllDossiers() throws Exception {
        Dossier dossier1 = new Dossier();
        dossier1.setNumDossier(1);
        Dossier dossier2 = new Dossier();
        dossier2.setNumDossier(2);
        List<Dossier> dossiers = Arrays.asList(dossier1, dossier2);

        when(dossierService.getAllDossiers()).thenReturn(dossiers);

        mockMvc.perform(get("/api/dossiers"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].numDossier").value(1))
                .andExpect(jsonPath("$[1].numDossier").value(2));
    }

    
    @Test
    void testDeleteDossier() throws Exception {
        doNothing().when(dossierService).deleteDossier(1);

        mockMvc.perform(delete("/api/dossiers/1"))
                .andExpect(status().isNoContent());
    }

    @Test
    void testGetDossiersByUser() throws Exception {
        Dossier dossier1 = new Dossier();
        dossier1.setNumDossier(1);
        Dossier dossier2 = new Dossier();
        dossier2.setNumDossier(2);
        List<Dossier> dossiers = Arrays.asList(dossier1, dossier2);

        when(dossierService.getDossiersByUser("user@example.com")).thenReturn(dossiers);

        mockMvc.perform(get("/api/dossiers/by-user/user@example.com"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].numDossier").value(1))
                .andExpect(jsonPath("$[1].numDossier").value(2));
    }

    @Test
    void testGetDossiersByPatient() throws Exception {
        Dossier dossier1 = new Dossier();
        dossier1.setNumDossier(1);
        Dossier dossier2 = new Dossier();
        dossier2.setNumDossier(2);
        List<Dossier> dossiers = Arrays.asList(dossier1, dossier2);

        when(dossierService.getDossiersByPatient("patientId")).thenReturn(dossiers);

        mockMvc.perform(get("/api/dossiers/by-patient/patientId"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].numDossier").value(1))
                .andExpect(jsonPath("$[1].numDossier").value(2));
    }

    
}
