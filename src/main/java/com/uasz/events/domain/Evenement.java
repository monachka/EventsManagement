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


@Entity
public class Evenement extends BaseEntity {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(nullable=false, updatable=false)
	private Long id;

	@Column
	private String typeEvent, adresseEvent, dateEvent, heureEvent;
	

	public Evenement(){}

	public Evenement(String typeEvent, String adresseEvent, String dateEvent, String heureEvent)
	{
		super();
		this.typeEvent = typeEvent;
		this.adresseEvent = adresseEvent;
		this.dateEvent = dateEvent;
		this.heureEvent = heureEvent;
	}

	@JsonIgnore
    @ManyToMany
    private List<Client> clients;

    public List<Client> getClient()
    {
        return clients;
    }

    public void setClient(List<Client> clients)
    {
        this.clients = clients;
    }

	@ManyToMany
    private List<Prestataire> prestataires;

	public List<Prestataire> getPrestataire() {
        return prestataires;
    }

    public void setPrestataire(List<Prestataire> prestataires) {
        this.prestataires = prestataires;
    }


	
	public String getTypeEvent()
	{
		return typeEvent;
	}
	public Long getId()
	{
		return id;
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

	public void setTypeEvent(String typeEvent)
	{
		this.typeEvent = typeEvent;
	}
	public void setAdresseEvent(String adresseEvent)
	{
		this.adresseEvent = adresseEvent;
	}
	public void setDateEvent()
	{
		this.dateEvent = dateEvent;
	}
	public void setHeureEvent()
	{
		this.heureEvent = heureEvent;
	}

}


