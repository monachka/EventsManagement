package com.uasz.events.domain;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.DeleteMapping;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.JoinColumn;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.FetchType;
import jakarta.persistence.Transient;

import java.util.List;
import java.util.Arrays;

import com.uasz.events.domain.User;
import com.uasz.events.domain.Evenement;
import com.uasz.events.domain.BaseEntity;

@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})

@Entity
public class Prestataire extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(nullable = false, updatable = false)
    private long id;

    @Column(nullable=false)
	private int capacityEvents;

    @Column(nullable=false, unique=true)
	private String username;

	@Column(nullable=false, unique=true)
	private String email;

	@Column(nullable=false, unique=true)
	private String telephone;
	 
	@Column(nullable=false)
	private String password;

	@Column(nullable=false)
	private String adresse;

	@Column(nullable=false)
	private String nom;

	@Column(nullable=false)
	private String typeService;

	@Column(nullable=false)
	private int etoile;

	@Column(nullable=false)
	private String photo;

	@Column(nullable=true)
	private String role;


    public Prestataire(){}

	public Prestataire(String username, String password, String role) {
		super();
		this.username = username;
		this.password = password;
		this.role = "USER";
	}
	public Prestataire(String nom, String telephone, String email, String adresse, int capacityEvents, int etoile, String typeService) {
		super();
		this.nom = nom;
		this.adresse = adresse;
		this.telephone = telephone;
		this.email = email;
        this.capacityEvents = capacityEvents;
		this.etoile = etoile;
		this.typeService = typeService;
		this.role = "USER";
	}
	
	public Prestataire(String username, String password, String nom, String telephone, String email, String adresse, int capacityEvents, int etoile, String typeService, String photo) {
		super();
        this.username = username;
		this.password = password;
		this.nom = nom;
		this.adresse = adresse;
		this.telephone = telephone;
		this.email = email;
        this.capacityEvents = capacityEvents;
		this.etoile = etoile;
		this.typeService = typeService;
		this.photo = photo;
		this.role = "USER";
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}

	public String getPhoto() {
		return photo;
	}

	public void setPhoto(String photo) {
		this.photo = photo;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getTypeService() {
		return typeService;
	}

	public void setTypeService(String typeService) {
		this.typeService = typeService;
	}

	public int getEtoile() {
		return etoile;
	}

	public void setEtoile(int etoile) {
		this.etoile = etoile;
	}

	public String getNom() {
		return nom;
	}

	public void setNom(String nom) {
		this.nom = nom;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getTelephone() {
		return telephone;
	}

	public void setTelephone(String telephone) {
		this.telephone = telephone;
	}

	public String getAdresse() {
		return adresse;
	}

	public void setAdresse(String adresse) {
		this.adresse = adresse;
	}

	public int getCapacityEvents()
    {
		return capacityEvents;
	}

	public void setCapacityEvents(int capacityEvents)
	{
		this.capacityEvents = capacityEvents;
	}



    @JsonIgnore
    @ManyToMany
    @JoinColumn(name = "client")
    private List<Client> clients;

    public List<Client> getClient()
    {
        return clients;
    }

    public void setClient(List<Client> clients)
    {
        this.clients = clients;
    }

    // Establish a one-to-one relationship with User

    @ManyToMany
    private List<Evenement> evenements;

	public List<Evenement> getEvenement() {
        return evenements;
    }

    public void setEvenement(List<Evenement> evenements) {
        this.evenements = evenements;
    }

    // Other fields and methods go here

    // ... getters and setters ...


    // Delegate other methods as needed
}
