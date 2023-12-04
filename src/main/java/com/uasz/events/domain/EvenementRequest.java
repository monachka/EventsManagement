package com.uasz.events.domain;

import com.uasz.events.domain.Prestataire;
import com.uasz.events.domain.Client;
import com.uasz.events.domain.Evenement;
import java.util.List;




public class EvenementRequest {

    private Evenement evenement;
    private List<PrestataireInfo> prestataires;
    private long cId;
    private Client client;

    // Getter and Setter for the client ID
    public Long getCId() {
        return cId;
    }

    public void setClientId(long cId) {
        this.cId = cId;
    }

    public Client getClient() {
        return client;
    }

    public void setClient(Client client) {
        this.client = client;
    }

    // Constructors, getters, and setters...

    // Getter for the list of PrestataireInfos
    public List<PrestataireInfo> getPrestataires() {
        return prestataires;
    }

    // Setter for the list of PrestataireInfos
    public void setPrestataires(List<PrestataireInfo> prestataires) {
        this.prestataires = prestataires;
    }

    // Getter for the Evenement
    public Evenement getEvenement() {
        return evenement;
    }

    // Setter for the Evenement
    public void setEvenement(Evenement evenement) {
        this.evenement = evenement;
    }
}
