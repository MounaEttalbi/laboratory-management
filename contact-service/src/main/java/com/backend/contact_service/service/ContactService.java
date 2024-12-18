package com.backend.contact_service.service;

import com.backend.contact_service.dto.ContactDTO;
import com.backend.contact_service.entity.Contact;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


public interface ContactService {

    Contact addContact(ContactDTO contactDTO);

    Contact updateContact(Long id, ContactDTO contactDTO);

    List<Contact> getAllLContacts();

    Optional<Contact> getContactById(long id);

    void deleteContact(Long id);
    
    List<Contact> getContactsByLaboratoryId(Long fkIdLaboratoire);

}
