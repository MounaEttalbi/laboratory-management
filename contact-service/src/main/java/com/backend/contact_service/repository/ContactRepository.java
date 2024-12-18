package com.backend.contact_service.repository;

import com.backend.contact_service.entity.Contact;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ContactRepository extends JpaRepository<Contact,Long> {
<<<<<<< HEAD

	List<Contact> findByFkIdLaboratoire(Long fkIdLaboratoire);
=======
    List<Contact> findByFkIdLaboratoire(Long fkIdLaboratoire);
>>>>>>> 2bec11be510752e94c7aee8b6585e9372c32062e
}
