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
import org.springframework.stereotype.Service;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;

import com.uasz.events.domain.ClientRepository;
import com.uasz.events.domain.Client;
import com.uasz.events.domain.NotificationsPres;
import com.uasz.events.domain.NotificationsPresRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;


@RestController
@RequestMapping("/api/notificationsPres")
public class NotificationsPresController {

    @Autowired
    private NotificationsPresRepository notificationsPresRepository;

    @GetMapping
    public List<NotificationsPres> getNotifsClients() {
            Iterable<NotificationsPres> clientsIterable = notificationsPresRepository.findAll();
            List<NotificationsPres> clientsList = new ArrayList<>();
            clientsIterable.forEach(clientsList::add);
        return clientsList;
    }

    @GetMapping("/{id}")
    public ResponseEntity<NotificationsPres> getNotifsClient(@PathVariable Long id) {
        NotificationsPres client = notificationsPresRepository.findById(id).orElse(null);
        if (client != null) {
            return new ResponseEntity<>(client, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }


    @PostMapping("/newNotif")
    public ResponseEntity<NotificationsPres> createNotif(@RequestBody NotificationsPres client) {
        // Client savedClient = clientRepository.save(client);
        // return new ResponseEntity<>(savedClient, HttpStatus.CREATED);
        NotificationsPres newUser = new NotificationsPres(client.getPrId(), client.getMsg());
        notificationsPresRepository.save(newUser);
        return ResponseEntity.ok().build();
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteNotifClient(@PathVariable Long id) {
        if (notificationsPresRepository.existsById(id)) {
            notificationsPresRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
