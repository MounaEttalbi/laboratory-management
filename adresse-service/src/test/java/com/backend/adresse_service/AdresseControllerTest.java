package com.backend.adresse_service;


import com.backend.adresse_service.controller.AdresseController;
import com.backend.adresse_service.dto.AdresseDTO;
import com.backend.adresse_service.entity.Adresse;
import com.backend.adresse_service.service.AdresseService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.Arrays;
import java.util.Optional;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

public class AdresseControllerTest {

    private MockMvc mockMvc;

    @Mock
    private AdresseService adresseService;

    @InjectMocks
    private AdresseController adresseController;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
        mockMvc = MockMvcBuilders.standaloneSetup(adresseController).build();
    }

    @Test
    public void testGetAllAdresses() throws Exception {
        Adresse adresse1 = new Adresse(1L, "12", "Rue de Paris", "75001", "Paris", "Paris");
        Adresse adresse2 = new Adresse(2L, "15", "Avenue des Champs", "75008", "Paris", "Paris");

        when(adresseService.getAllAdresse()).thenReturn(Arrays.asList(adresse1, adresse2));

        mockMvc.perform(get("/adresse/all"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].id").value(1L))
                .andExpect(jsonPath("$[0].numVoie").value("12"))
                .andExpect(jsonPath("$[1].id").value(2L))
                .andExpect(jsonPath("$[1].numVoie").value("15"));

        verify(adresseService, times(1)).getAllAdresse();
    }

    @Test
    public void testGetAdresseById() throws Exception {
        Adresse adresse = new Adresse(1L, "12", "Rue de Paris", "75001", "Paris", "Paris");

        when(adresseService.getAdresseById(1L)).thenReturn(Optional.of(adresse));

        mockMvc.perform(get("/adresse/{id}", 1L))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1L))
                .andExpect(jsonPath("$.numVoie").value("12"));

        verify(adresseService, times(1)).getAdresseById(1L);
    }

    @Test
    public void testDeleteAdresse() throws Exception {
        doNothing().when(adresseService).deleteAdresse(1L);

        mockMvc.perform(delete("/adresse/deleteAdresse/{id}", 1L))
                .andExpect(status().isNoContent());

        verify(adresseService, times(1)).deleteAdresse(1L);
    }

    @Test
    public void testDeleteAdresseNotFound() throws Exception {
        doThrow(new RuntimeException("Adresse not found")).when(adresseService).deleteAdresse(1L);

        mockMvc.perform(delete("/adresse/deleteAdresse/{id}", 1L))
                .andExpect(status().isNotFound());

        verify(adresseService, times(1)).deleteAdresse(1L);
    }
}
