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

import org.springframework.http.HttpStatus;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;

import com.uasz.events.domain.ClientRepository;
import com.uasz.events.domain.Client;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@RestController
@RequestMapping("/api/clients")
public class ClientController {

    @Autowired
    private ClientRepository clientRepository;

    @GetMapping
    public List<Client> getClients() {
            Iterable<Client> clientsIterable = clientRepository.findAll();
            List<Client> clientsList = new ArrayList<>();
            clientsIterable.forEach(clientsList::add);
        return clientsList;
    }

    @GetMapping("/{id}")
    public ResponseEntity<Client> getClient(@PathVariable Long id) {
        Client client = clientRepository.findById(id).orElse(null);
        if (client != null) {
            return new ResponseEntity<>(client, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/signin")
    public ResponseEntity<Client> createClient(@RequestBody Client client) {
        // Client savedClient = clientRepository.save(client);
        // return new ResponseEntity<>(savedClient, HttpStatus.CREATED);
        String encodedPassword = new BCryptPasswordEncoder().encode(client.getPassword());
        Client newUser = new Client(client.getUsername(), encodedPassword, client.getPrenom(), client.getNom(), client.getAdresse(), client.getTelephone(), client.getEmail());
        clientRepository.save(newUser);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Client> updateClient(@PathVariable Long id, @RequestBody Client updatedClient) {
        Client existingClient = clientRepository.findById(id).orElse(null);
        if (existingClient != null) {
            // Mise à jour des propriétés de l'événement existant avec celles de l'événement mis à jour
            existingClient.setPrenom(updatedClient.getPrenom());
            existingClient.setNom(updatedClient.getNom());
            existingClient.setUsername(updatedClient.getUsername());
            existingClient.setPassword(updatedClient.getPassword());
            existingClient.setTelephone(updatedClient.getTelephone());
            existingClient.setEmail(updatedClient.getEmail());
            existingClient.setAdresse(updatedClient.getAdresse());
            existingClient.setRole(updatedClient.getRole());
            // Mettre à jour d'autres propriétés ici

            Client updatedClients = clientRepository.save(existingClient);
            return new ResponseEntity<>(updatedClients, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteClient(@PathVariable Long id) {
        if (clientRepository.existsById(id)) {
            clientRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
