package com.uasz.events.web;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.DeleteMapping;

import java.util.Arrays;
import java.util.ArrayList;
import java.util.List;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.annotation.AuthenticationPrincipal;

import jakarta.persistence.JoinTable;
import java.util.Optional;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;

import org.springframework.http.HttpStatus;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;

import com.uasz.events.domain.EvenementRepository;
import com.uasz.events.domain.Evenement;
import com.uasz.events.domain.EvenementRequest;
import com.uasz.events.domain.PrestataireRepository;
import com.uasz.events.domain.Prestataire;
import com.uasz.events.domain.PrestataireRequest;
import com.uasz.events.domain.ClientRepository;
import com.uasz.events.domain.Client;
import com.uasz.events.service.UserDetailsServiceImpl;

import java.util.stream.Collectors;
import java.util.stream.StreamSupport;


@RestController
@RequestMapping("/api/evenement")
public class EvenementController {

    @Autowired
    private EvenementRepository evenementRepository;
    @Autowired
    private ClientRepository clientRepository;
    @Autowired
    private PrestataireRepository prestataireRepository;


    @GetMapping
    public List<Evenement> getEvenements() {
            Iterable<Evenement> evenementsIterable = evenementRepository.findAll();
            List<Evenement> evenementsList = new ArrayList<>();
            evenementsIterable.forEach(evenementsList::add);
        return evenementsList;
    } 

    @GetMapping("/{id}")
    public ResponseEntity<Evenement> getEvenement(@PathVariable Long id) {
        Evenement evenement = evenementRepository.findById(id).orElse(null);
        if (evenement != null) {
            return new ResponseEntity<>(evenement, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/create")
    public ResponseEntity<?> createEvenement(@RequestBody EvenementRequest evenementRequest) {
       
        Evenement evenement = new Evenement(
            evenementRequest.getEvenement().getTypeEvent(),
            evenementRequest.getEvenement().getAdresseEvent(),
            evenementRequest.getEvenement().getDateEvent(),
            evenementRequest.getEvenement().getHeureEvent()
        );

        // Load the prestataires from the database using the IDs
        List<Prestataire> prestataires = prestataireRepository.findByTypeServiceAndId(
            evenementRequest.getPrestataire().getTypeService(),
            evenementRequest.getPrestataire().getId()
        );

        // Associer les prestataires avec l'événement
        evenement.setPrestataires(prestataires);

        // Enregistrer l'événement dans la base de données
        evenementRepository.save(evenement);

        return new ResponseEntity<>(evenement, HttpStatus.CREATED);
    
    }




    @PutMapping("/{id}")
    public ResponseEntity<Evenement> updateEvenement(@PathVariable Long id, @RequestBody Evenement updatedEvenement) {
        Evenement existingEvenement = evenementRepository.findById(id).orElse(null);
        if (existingEvenement != null) {
            // Mise à jour des propriétés de l'événement existant avec celles de l'événement mis à jour
            existingEvenement.setTypeEvent(updatedEvenement.getTypeEvent());
            existingEvenement.setAdresseEvent(updatedEvenement.getAdresseEvent());
            existingEvenement.setDateEvent(updatedEvenement.getDateEvent());
            existingEvenement.setHeureEvent(updatedEvenement.getHeureEvent());
            // Mettre à jour d'autres propriétés ici

            Evenement updatedEvenements = evenementRepository.save(existingEvenement);
            return new ResponseEntity<>(updatedEvenements, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEvenement(@PathVariable Long id) {
        if (evenementRepository.existsById(id)) {
            evenementRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

}
