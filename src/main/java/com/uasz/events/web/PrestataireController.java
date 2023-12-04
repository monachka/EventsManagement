package com.uasz.events.web;

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

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;

import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.multipart.MultipartFile;
// import org.apache.commons.lang3.StringUtils;
import org.springframework.util.StringUtils;

import org.springframework.http.HttpStatus;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;

import com.uasz.events.domain.PrestataireRepository;
import com.uasz.events.domain.Prestataire;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import org.springframework.core.io.Resource;
import java.net.MalformedURLException;
import org.springframework.http.HttpHeaders;
import java.io.FileNotFoundException;




@RestController
@RequestMapping("/api/prestataires")
public class PrestataireController {

    @Autowired
    private PrestataireRepository prestataireRepository;

    @GetMapping
    public List<Prestataire> getPrestataires() {
            Iterable<Prestataire> prestatairesIterable = prestataireRepository.findAll();
            List<Prestataire> prestatairesList = new ArrayList<>();
            prestatairesIterable.forEach(prestatairesList::add);
        return prestatairesList;
    }

    @GetMapping("/{id}")
    public ResponseEntity<Prestataire> getPrestataire(@PathVariable Long id) {
        Prestataire prestataire = prestataireRepository.findById(id).orElse(null);
        if (prestataire != null) {
            return new ResponseEntity<>(prestataire, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/byUsername/{username}")
    public ResponseEntity<Prestataire> PresByUsername(@PathVariable String username) {
        
        if (prestataireRepository.findByUsername(username) != null) {
            Prestataire prestataire = prestataireRepository.findByUsername(username).get();
            return new ResponseEntity<>(prestataire, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/signin")
    public ResponseEntity<Prestataire> createPrestataire(@RequestBody Prestataire prestataire) {
        // Prestataire savedPrestataire = prestataireRepository.save(prestataire);
        // return new ResponseEntity<>(savedPrestataire, HttpStatus.CREATED);
        String encodedPassword = new BCryptPasswordEncoder().encode(prestataire.getPassword());
        Prestataire newUser = new Prestataire(prestataire.getUsername(), encodedPassword, prestataire.getNom(), prestataire.getAdresse(), prestataire.getTelephone(), prestataire.getEmail(), prestataire.getCapacityEvents(), prestataire.getEtoile(), prestataire.getTypeService(), prestataire.getPhoto());
        prestataireRepository.save(newUser);
        return ResponseEntity.ok().build();
    }


    @PutMapping("/{id}")
    public ResponseEntity<Prestataire> updatePrestataire(@PathVariable Long id, @RequestBody Prestataire updatedPrestataire) {
        Prestataire existingPrestataire = prestataireRepository.findById(id).orElse(null);
        if (existingPrestataire != null) {
            // Mise à jour des propriétés de l'événement existant avec celles de l'événement mis à jour
            existingPrestataire.setNom(updatedPrestataire.getNom());
            existingPrestataire.setUsername(updatedPrestataire.getUsername());
            existingPrestataire.setPassword(updatedPrestataire.getPassword());
            existingPrestataire.setTelephone(updatedPrestataire.getTelephone());
            existingPrestataire.setEmail(updatedPrestataire.getEmail());
            existingPrestataire.setAdresse(updatedPrestataire.getAdresse());
            existingPrestataire.setCapacityEvents(updatedPrestataire.getCapacityEvents());
            existingPrestataire.setEtoile(updatedPrestataire.getEtoile());
            existingPrestataire.setTypeService(updatedPrestataire.getTypeService());
            existingPrestataire.setRole(updatedPrestataire.getRole());
            existingPrestataire.setPhoto(updatedPrestataire.getPhoto());

            Prestataire updatedPrestataires = prestataireRepository.save(existingPrestataire);
            return new ResponseEntity<>(updatedPrestataires, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePrestataire(@PathVariable Long id) {
        if (prestataireRepository.existsById(id)) {
            prestataireRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
