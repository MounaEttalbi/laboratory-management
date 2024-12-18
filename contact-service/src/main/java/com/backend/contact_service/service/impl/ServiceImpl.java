package com.backend.contact_service.service.impl;

import com.backend.contact_service.client.AdresseRestClient;
import com.backend.contact_service.client.LaboratoryRestClient;
import com.backend.contact_service.dto.ContactDTO;
import com.backend.contact_service.entity.Contact;
import com.backend.contact_service.mapper.Mapper;
import com.backend.contact_service.model.Adresse;
import com.backend.contact_service.model.Laboratory;
import com.backend.contact_service.repository.ContactRepository;
import com.backend.contact_service.service.ContactService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ServiceImpl implements ContactService {

    private ContactRepository contactRepository;
    private AdresseRestClient adresseRestClient;
    private LaboratoryRestClient laboratoryRestClient;

    public ServiceImpl(ContactRepository contactRepository,
                       AdresseRestClient adresseRestClient,
                       LaboratoryRestClient laboratoryRestClient) {
        this.contactRepository = contactRepository;
        this.adresseRestClient = adresseRestClient;
        this.laboratoryRestClient = laboratoryRestClient;
    }

    @Override
    public Contact addContact(ContactDTO contactDTO) {
        Contact contact = Mapper.toEntity(contactDTO);
        return contactRepository.save(contact);
    }

    @Override
    public Contact updateContact(Long id, ContactDTO contactDTO) {
        Optional<Contact> existingContact = contactRepository.findById(id);
        if (existingContact.isPresent()) {
            Contact contactToUpdate = existingContact.get();
            contactToUpdate.setId(contactDTO.getId());
            contactToUpdate.setFax(contactDTO.getFax());
            contactToUpdate.setEmail(contactDTO.getEmail());
            contactToUpdate.setNumTel(contactDTO.getNumTel());

            return contactRepository.save(contactToUpdate);
        }
        return null;
    }

    @Override
    public List<Contact> getAllLContacts() {
        List<Contact> contacts = contactRepository.findAll();

        for (Contact contact : contacts) {
            // Récupération et affectation de l'adresse
            if (contact.getFkIdAdresse() != null) {
                Adresse adresse = adresseRestClient.getAdresseById(contact.getFkIdAdresse());
                contact.setAdresse(adresse);
            }

            // Récupération et affectation du laboratoire
            if (contact.getFkIdLaboratoire() != null) {
                Laboratory laboratory = laboratoryRestClient.findLaboratoryById(contact.getFkIdLaboratoire());
                contact.setLaboratory(laboratory);
                // Ajouter le nom du laboratoire dans le contact
                contact.setLaboratoryName(laboratory.getNom());
            }
        }
        return contacts;
    }


    @Override
    public Optional<Contact> getContactById(long id) {
        Optional<Contact> contactOptional = contactRepository.findById(id);

        if (contactOptional.isPresent()) {
            Contact contact = contactOptional.get();

            // Récupération et affectation de l'adresse
            if (contact.getFkIdAdresse() != null) {
                Adresse adresse = adresseRestClient.getAdresseById(contact.getFkIdAdresse());
                contact.setAdresse(adresse);
            }

            // Récupération et affectation du laboratoire
            if (contact.getFkIdLaboratoire() != null) {
                Laboratory laboratory = laboratoryRestClient.findLaboratoryById(contact.getFkIdLaboratoire());
                contact.setLaboratory(laboratory);
            }

            return Optional.of(contact);
        }

        return Optional.empty();
    }

    @Override
    public void deleteContact(Long id) {
        contactRepository.deleteById(id);
    }

    @Override
    public List<Contact> getContactsByLaboratoryId(Long fkIdLaboratoire) {
        return contactRepository.findByFkIdLaboratoire(fkIdLaboratoire);
    }

}
