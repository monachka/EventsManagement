package com.uasz.events.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.uasz.events.domain.AccountCredentials;
import com.uasz.events.service.JwtService;

import org.springframework.http.HttpStatus;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;

import com.uasz.events.domain.PrestataireRepository;
import com.uasz.events.domain.Prestataire;
import com.uasz.events.domain.PrestataireInfo;
import com.uasz.events.domain.ClientRepository;
import com.uasz.events.domain.Client;
import com.uasz.events.domain.UserRepository;
import com.uasz.events.domain.User;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class UsersController {
	@Autowired
	private JwtService jwtService;

	@Autowired	
	AuthenticationManager authenticationManager;

    @Autowired
    private ClientRepository clientRepository;
    @Autowired
    private PrestataireRepository prestataireRepository;
	@Autowired
    private UserRepository userRepository;


	@GetMapping("/{username}")
    public ResponseEntity<?> ByUsername(@PathVariable String username) {

        Optional<Client> clientOptional = clientRepository.findByUsername(username);
        if (clientOptional.isPresent()) {
            Client client = clientOptional.get();
            return new ResponseEntity<>(client, HttpStatus.OK);
        }

        Optional<Prestataire> prestataireOptional = prestataireRepository.findByUsername(username);
        if (prestataireOptional.isPresent()) {
            Prestataire prestataire = prestataireOptional.get();
            return new ResponseEntity<>(prestataire, HttpStatus.OK);
        }

        Optional<User> userOptional = userRepository.findByUsername(username);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            return new ResponseEntity<>(user, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

	
}



