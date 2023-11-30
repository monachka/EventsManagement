package com.uasz.events.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User.UserBuilder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.uasz.events.domain.User;
import com.uasz.events.domain.UserRepository;
import com.uasz.events.domain.Client;
import com.uasz.events.domain.ClientRepository;
import com.uasz.events.domain.Prestataire;
import com.uasz.events.domain.PrestataireRepository;


@Service
public class UserDetailsServiceImpl implements UserDetailsService  {
	@Autowired
	private UserRepository repository;

	@Autowired
	private ClientRepository crepository;

	@Autowired
	private PrestataireRepository prepository;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		Optional<User> user = repository.findByUsername(username);
		Optional<Client> client = crepository.findByUsername(username); 
		Optional<Prestataire> prestataire = prepository.findByUsername(username);  

		UserBuilder builder = null;
		if (user.isPresent()) {
			User currentUser = user.get();
			builder = org.springframework.security.core.userdetails.User.withUsername(username);
			builder.password(currentUser.getPassword());
			builder.roles(currentUser.getRole());
		} 
		else if(client.isPresent())
		{
			Client currentUser = client.get();
			builder = org.springframework.security.core.userdetails.User.withUsername(username);
			builder.password(currentUser.getPassword());
			builder.roles(currentUser.getRole());
		}
		else if(prestataire.isPresent())
		{
			Prestataire currentUser = prestataire.get();
			builder = org.springframework.security.core.userdetails.User.withUsername(username);
			builder.password(currentUser.getPassword());
			builder.roles(currentUser.getRole());
		}
		else {
			throw new UsernameNotFoundException("User not found.");
		}

		return builder.build();	    
	}
}
