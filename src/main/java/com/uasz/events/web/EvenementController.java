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
import com.uasz.events.domain.PrestataireInfo;
import com.uasz.events.domain.ClientRepository;
import com.uasz.events.domain.Client;
import com.uasz.events.service.UserDetailsServiceImpl;

import java.util.stream.Collectors;
import java.util.stream.StreamSupport;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.BeanWrapper;
import org.springframework.beans.BeanWrapperImpl;


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

    @GetMapping("/client/{clientId}")
    public ResponseEntity<List<Evenement>> getEvenementsByClientId(@PathVariable Long clientId) {
        // Rechercher le client dans la base de données par son ID
        Optional<Client> clientOptional = clientRepository.findById(clientId);

        // Vérifier si le client a été trouvé
        if (clientOptional.isPresent()) {
            // Récupérer les événements associés à ce client depuis la base de données
            List<Evenement> evenements = evenementRepository.findByClient(clientOptional.get());

            // Retourner la liste des événements associés au client
            return new ResponseEntity<>(evenements, HttpStatus.OK);
        } else {
            // Retourner une réponse avec le statut HTTP 404 (Not Found) si le client n'est pas trouvé
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/prestataire/{presId}")
    public ResponseEntity<List<Evenement>> getEvenementsByPresId(@PathVariable Long presId) {
        // Rechercher le client dans la base de données par son ID
        Optional<Prestataire> clientOptional = prestataireRepository.findById(presId);

        // Vérifier si le client a été trouvé
        if (clientOptional.isPresent()) {
            // Récupérer les événements associés à ce client depuis la base de données
            List<Evenement> evenements = evenementRepository.findByPrestataires(clientOptional.get());

            // Retourner la liste des événements associés au client
            return new ResponseEntity<>(evenements, HttpStatus.OK);
        } else {
            // Retourner une réponse avec le statut HTTP 404 (Not Found) si le client n'est pas trouvé
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
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
    public ResponseEntity<?> createEvenement(Authentication authentication, @RequestBody EvenementRequest evenementRequest) {
        
        // Récupérer le principal de l'objet Authentication
        Object principal = authentication.getPrincipal();

        // Vérifier le type du principal
        if (principal instanceof UserDetails) {
            // Si le principal est un UserDetails, le convertir
            UserDetails userDetails = (UserDetails) principal;
            
            // Récupérer le nom d'utilisateur
            String username = userDetails.getUsername();
            
            // Rechercher le client dans la base de données par le nom d'utilisateur
            Client client = clientRepository.findByUsername(username).orElse(null);

            // Vérifier si le client a été trouvé
            if (client != null) {
                // Créer l'événement
                Evenement evenement = new Evenement(
                    evenementRequest.getEvenement().getTypeEvent(),
                    evenementRequest.getEvenement().getAdresseEvent(),
                    evenementRequest.getEvenement().getDateEvent(),
                    evenementRequest.getEvenement().getHeureEvent()
                );

                // Associer le client avec l'événement
                evenement.setClient(client);

                // Charger les prestataires depuis la base de données en utilisant les IDs
                List<Prestataire> prestataires = new ArrayList<>();

                // Vérifier si la liste de prestataires est null avant d'itérer
                System.out.println(evenementRequest.getPrestataires());
                if (evenementRequest.getPrestataires() != null) {
                    for (PrestataireInfo prestataireInfo : evenementRequest.getPrestataires()) {
                        List<Prestataire> prestataireList = prestataireRepository.findByTypeServiceAndId(
                            prestataireInfo.getTypeService(),
                            prestataireInfo.getId()
                        );
                        
                        prestataires.addAll(prestataireList);
                    }
                }

                // Associer les prestataires avec l'événement
                evenement.setPrestataires(prestataires);

                // Enregistrer l'événement dans la base de données
                evenementRepository.save(evenement);

                // Retourner une réponse avec l'événement créé et le statut HTTP 201 (Created)
                return new ResponseEntity<>(evenement, HttpStatus.CREATED);
            } else {
                // Retourner une réponse avec un message d'erreur si le client n'est pas trouvé
                return new ResponseEntity<>("Client non trouvé.", HttpStatus.BAD_REQUEST);
            }
        } else if (principal instanceof String) {
            // Si le principal est une chaîne de caractères, l'utiliser comme nom d'utilisateur
            String username = (String) principal;
            
            // Rechercher le client dans la base de données par le nom d'utilisateur
            Client client = clientRepository.findByUsername(username).orElse(null);

            // Vérifier si le client a été trouvé
            if (client != null) {
                // Créer l'événement
                Evenement evenement = new Evenement(
                    evenementRequest.getEvenement().getTypeEvent(),
                    evenementRequest.getEvenement().getAdresseEvent(),
                    evenementRequest.getEvenement().getDateEvent(),
                    evenementRequest.getEvenement().getHeureEvent()
                );

                // Associer le client avec l'événement
                evenement.setClient(client);

                // Charger les prestataires depuis la base de données en utilisant les IDs
                List<Prestataire> prestataires = new ArrayList<>();

                // Vérifier si la liste de prestataires est null avant d'itérer
                System.out.println(evenementRequest.getPrestataires());
                if (evenementRequest.getPrestataires() != null) {
                    for (PrestataireInfo prestataireInfo : evenementRequest.getPrestataires()) {
                        List<Prestataire> prestataireList = prestataireRepository.findByTypeServiceAndId(
                            prestataireInfo.getTypeService(),
                            prestataireInfo.getId()
                        );
                        
                        prestataires.addAll(prestataireList);
                    }
                }

                // Associer les prestataires avec l'événement
                evenement.setPrestataires(prestataires);

                // Enregistrer l'événement dans la base de données
                evenementRepository.save(evenement);

                // Retourner une réponse avec l'événement créé et le statut HTTP 201 (Created)
                return new ResponseEntity<>(evenement, HttpStatus.CREATED);
            } else {
                // Retourner une réponse avec un message d'erreur si le client n'est pas trouvé
                return new ResponseEntity<>("Client non trouvé.", HttpStatus.BAD_REQUEST);
            }
        }

        // Retourner une réponse avec un message d'erreur si le principal n'est ni UserDetails ni String
        return new ResponseEntity<>("Impossible de récupérer les informations du client.", HttpStatus.BAD_REQUEST);
    }


    @PutMapping("/{id}")
    public ResponseEntity<Evenement> updateEvenement(@PathVariable Long id, @RequestBody EvenementRequest updatedEvenement) {
        Evenement existingEvenement = evenementRepository.findById(id).orElse(null);
        if (existingEvenement != null) {
            // Mise à jour des propriétés de l'événement existant avec celles de l'événement mis à jour
            if (updatedEvenement.getEvenement().getTypeEvent() != null) {
                existingEvenement.setTypeEvent(updatedEvenement.getEvenement().getTypeEvent());
            }
            if (updatedEvenement.getEvenement().getAdresseEvent() != null) {
                existingEvenement.setAdresseEvent(updatedEvenement.getEvenement().getAdresseEvent());
            }
            if (updatedEvenement.getEvenement().getDateEvent() != null) {
                existingEvenement.setDateEvent(updatedEvenement.getEvenement().getDateEvent());
            }
            if (updatedEvenement.getEvenement().getHeureEvent() != null) {
                existingEvenement.setHeureEvent(updatedEvenement.getEvenement().getHeureEvent());
            }
            // Ajouter des vérifications pour d'autres propriétés si nécessaire

            // Mise à jour de la liste de prestataires s'ils ne sont pas nuls dans la requête
            if (updatedEvenement.getEvenement().getPrestataires() != null) {
                existingEvenement.setPrestataires(updatedEvenement.getEvenement().getPrestataires());
            }

            // Mettre à jour d'autres propriétés ici si nécessaire

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
