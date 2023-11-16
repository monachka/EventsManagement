package com.uasz.events.domain;

import java.util.List;
import java.util.Optional;


import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource
public interface PrestataireRepository extends CrudRepository<Prestataire, Long> {

	//Optional<Prestataire> findByNom(@Param("nom") String nom);
	Optional<Prestataire> findByUsername(String username);
	// Optional<Prestataire> findByPhotoPath(String photoPath);

	// @Query("select p from Prestataire p where p.username = ?1")
	// List<Prestataire> findByUsername(String username);
}
