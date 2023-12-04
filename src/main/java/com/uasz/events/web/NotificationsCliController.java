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
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;

import com.uasz.events.domain.ClientRepository;
import com.uasz.events.domain.Client;
import com.uasz.events.domain.NotificationsCli;
import com.uasz.events.domain.NotificationsCliRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@RestController
@RequestMapping("/api/notificationsClients")
public class NotificationsCliController {

    @Autowired
    private ClientRepository clientRepository;
    @Autowired
    private NotificationsCliRepository notificationsCliRepository;

    @GetMapping
    public List<NotificationsCli> getNotifsClients() {
            Iterable<NotificationsCli> clientsIterable = notificationsCliRepository.findAll();
            List<NotificationsCli> clientsList = new ArrayList<>();
            clientsIterable.forEach(clientsList::add);
        return clientsList;
    }

    @GetMapping("/{id}")
    public ResponseEntity<NotificationsCli> getNotifsClient(@PathVariable Long id) {
        NotificationsCli client = notificationsCliRepository.findById(id).orElse(null);
        if (client != null) {
            return new ResponseEntity<>(client, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }


    @PostMapping("/newNotif")
    public ResponseEntity<NotificationsCli> createNotif(@RequestBody NotificationsCli client) {
        // Client savedClient = clientRepository.save(client);
        // return new ResponseEntity<>(savedClient, HttpStatus.CREATED);
        NotificationsCli newUser = new NotificationsCli(client.getClId(), client.getMsg());
        notificationsCliRepository.save(newUser);
        return ResponseEntity.ok().build();
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteNotifClient(@PathVariable Long id) {
        if (notificationsCliRepository.existsById(id)) {
            notificationsCliRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
