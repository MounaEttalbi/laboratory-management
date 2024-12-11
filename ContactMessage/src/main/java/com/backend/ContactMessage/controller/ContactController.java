package com.backend.ContactMessage.controller;

import com.backend.ContactMessage.model.ContactMessage;
import com.backend.ContactMessage.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:4200")
public class ContactController {

    @Autowired
    private EmailService emailService;

    @PostMapping(value = "/contact", consumes = "application/json", produces = "application/json")
    public ResponseEntity<Map<String, String>> sendContactMessage(@RequestBody ContactMessage contactMessage) {
        Map<String, String> response = new HashMap<>();
        try {
            String subject = "Nouveau message de platform LabManage ";
            String content = "Nom: " + contactMessage.getName() +
                    "\nEmail: " + contactMessage.getEmail() +
                    "\nMessage: " + contactMessage.getMessage();
            emailService.sendEmail("mounaettalbi@gmail.com", subject, content);

            response.put("message", "Message envoyé avec succès");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            e.printStackTrace();
            response.put("error", "Une erreur est survenue lors de l'envoi du message: " + e.getMessage());
            return ResponseEntity.status(500).body(response);
        }
    }


}



