package com.backend.contact_service.controller;

import com.backend.contact_service.dto.ContactDTO;
import com.backend.contact_service.entity.Contact;
import com.backend.contact_service.service.ContactService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/contact")
@CrossOrigin(origins = "http://localhost:4200")
public class ContactController {

    private ContactService contactService;

    public ContactController(ContactService contactService){
        this.contactService=contactService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<Contact>> getAllContacts() {
        List<Contact> contacts = contactService.getAllLContacts();
        return ResponseEntity.ok(contacts);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Contact> getContactById(@PathVariable Long id) {
        Optional<Contact> contacts = contactService.getContactById(id);
        return contacts.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping("/addContact")
    public ResponseEntity<Contact> addContact(@RequestBody ContactDTO contactDTO) {
        Contact contact = contactService.addContact(contactDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(contact);
    }

    @PutMapping("/updateContact/{id}")
    public ResponseEntity<Contact> updateContact(@PathVariable Long id, @RequestBody ContactDTO updatedContactDTO) {
        try {
            Contact updatedContact = contactService.updateContact(id,updatedContactDTO);
            return ResponseEntity.ok(updatedContact);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @DeleteMapping("/deleteContact/{id}")
    public ResponseEntity<Void> deleteContact(@PathVariable Long id) {
        try {
            contactService.deleteContact(id);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }
    @GetMapping("/labo/{fkIdLaboratoire}")
    public ResponseEntity<List<Contact>> getContactsByLaboratoryId(@PathVariable Long fkIdLaboratoire) {
        List<Contact> contacts = contactService.getContactsByLaboratoryId(fkIdLaboratoire);
        return contacts.isEmpty() ? ResponseEntity.noContent().build() : ResponseEntity.ok(contacts);
    }

}
