package com.uasz.events.domain;

import com.uasz.events.domain.Client;
import com.uasz.events.domain.Prestataire;
import java.util.List;


import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource
public interface EvenementRepository extends CrudRepository<Evenement, Long> {
    List<Evenement> findByTypeEvent(String typeEvent);
     List<Evenement> findByClient(Client client);
     List<Evenement> findByPrestataires(Prestataire prestataire);
}
