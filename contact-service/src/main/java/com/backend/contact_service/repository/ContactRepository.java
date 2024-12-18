package com.backend.contact_service.repository;

import com.backend.contact_service.entity.Contact;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ContactRepository extends JpaRepository<Contact,Long> {
	List<Contact> findByFkIdLaboratoire(Long fkIdLaboratoire);
}
