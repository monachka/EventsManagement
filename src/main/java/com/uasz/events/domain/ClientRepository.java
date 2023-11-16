package com.uasz.events.domain;
//
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource
public interface ClientRepository extends CrudRepository<Client, Long>  {

	// Optional<Client> findByPrenom(@Param("prenom") String prenom);
	// Optional<Client> findByNom(@Param("nom") String nom);
	Optional<Client> findByUsername(String username);
	// Optional<Client> findByPrenomAndNom(String prenom, String nom);

	// @Query("select c from Client c where c.username = ?1")
	// List<Client> findByUsername(String username);
}