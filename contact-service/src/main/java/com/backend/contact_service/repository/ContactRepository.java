package com.backend.contact_service.repository;

import com.backend.contact_service.entity.Contact;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ContactRepository extends JpaRepository<Contact,Long> {
    List<Contact> findByFkIdLaboratoire(Long fkIdLaboratoire);
}
