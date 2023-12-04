package com.uasz.events.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.CascadeType;
import jakarta.persistence.OneToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.JoinColumn;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.FetchType;

import java.util.List;
import java.util.Arrays;
import java.util.ArrayList;
import java.lang.Long;
import java.util.Collections;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import jakarta.persistence.JoinTable;
import java.util.Optional;

import com.uasz.events.domain.Prestataire;
import com.uasz.events.domain.Client;
import com.uasz.events.domain.BaseEntity;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;



@Entity
// @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Evenement extends BaseEntity {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(nullable=false, updatable=false)
	private long id;

	@Column(nullable=false)
	private String typeEvent, adresseEvent, dateEvent, heureEvent;
	@Column
	private long cId;

	public Evenement(){}

	public Evenement(String typeEvent, String adresseEvent, String dateEvent, String heureEvent) {
		super();
		this.typeEvent = typeEvent;
		this.adresseEvent = adresseEvent;
		this.dateEvent = dateEvent;
		this.heureEvent = heureEvent;
		// this.createur = createur;
	}

	public Evenement(String typeEvent, String adresseEvent, String dateEvent, String heureEvent, long createur) {
		super();
		this.typeEvent = typeEvent;
		this.adresseEvent = adresseEvent;
		this.dateEvent = dateEvent;
		this.heureEvent = heureEvent;
		this.cId = createur;
	}


	public String getTypeEvent()
	{
		return typeEvent;
	}
	public long getId()
	{
		return id;
	}
	public long getCId()
	{
		return cId;
	}
	public String getAdresseEvent()
	{
		return adresseEvent;
	}
	public String getDateEvent()
	{
		return dateEvent;
	}
	public String getHeureEvent()
	{
		return heureEvent;
	}
//----------------------------------------------------------------------------------------------

	public void setCId(long cId)
	{
		this.cId = cId;
	}
	public void setTypeEvent(String typeEvent)
	{
		this.typeEvent = typeEvent;
	}
	public void setAdresseEvent(String adresseEvent)
	{
		this.adresseEvent = adresseEvent;
	}
	public void setDateEvent(String dateEvent)
	{
		this.dateEvent = dateEvent;
	}
	public void setHeureEvent(String heureEvent)
	{
		this.heureEvent = heureEvent;
	}



    @ManyToOne(fetch = FetchType.LAZY) // Lazy loading pour la relation ManyToOne
    @JoinColumn(name = "client_id")
    private Client client;

    @ManyToMany(fetch = FetchType.LAZY) // Lazy loading pour la relation ManyToMany
    @JoinTable(
        name = "evenement_prestataire",
        joinColumns = @JoinColumn(name = "evenement_id"),
        inverseJoinColumns = @JoinColumn(name = "prestataire_id")
    )
    private List<Prestataire> prestataires;

	// Méthode pour associer un client à l'événement
    public void setClient(Client client) {
        this.client = client;
    }

    // Méthode pour associer une liste de prestataires à l'événement
    public void setPrestataires(List<Prestataire> prestataires) {
        this.prestataires = prestataires;
    }

	public List<Prestataire> getPrestataires()
	{
		return prestataires;
	}

}


