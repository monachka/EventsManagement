package com.uasz.events;

import java.util.Arrays;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

//import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.DeleteMapping;

import com.uasz.events.domain.Client;
import com.uasz.events.domain.ClientRepository;
import com.uasz.events.domain.Prestataire;
import com.uasz.events.domain.PrestataireRepository;
import com.uasz.events.domain.User;
import com.uasz.events.domain.UserRepository;
import com.uasz.events.domain.Evenement;
import com.uasz.events.domain.EvenementRepository;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;

import org.springframework.beans.factory.annotation.Value;
//import org.springframework.boot.SpringApplication;
//import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class EventsManagement implements CommandLineRunner {

	private static final Logger logger = 
			LoggerFactory.getLogger(EventsManagement.class);
	
			@Autowired
			private ClientRepository crepository;
			
		
			@Autowired
			private PrestataireRepository prepository;

			@Autowired
			private EvenementRepository erepository;
			
			@Autowired
			private UserRepository urepository;
			
				
			public static void main(String[] args) {
				SpringApplication.run(EventsManagement.class, args);
			}
		
			@Override
			public void run(String... args) throws Exception {
				// Add objects and save these to db 
				
				urepository.save(new User("admin", 
						"$2a$10$QgUd1ravnkJucCBgV7Y5O.1S4toikspn0ODogXa31TOXplAUgaYne", "ADMIN"));
			}
}