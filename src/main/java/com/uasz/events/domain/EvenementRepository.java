package com.uasz.events.domain;

import java.util.List;

//
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource
public interface EvenementRepository extends CrudRepository<Evenement, Long>  {

	List<Evenement> findByTypeEvent(@Param("typeEvent") String typeEvent);

	// @Query("select e from Evenement e where e.typeEvent = ?1")
	// List<Evenement> findByTypeEvent(String typeEvent);
}