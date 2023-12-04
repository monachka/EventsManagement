import React, { useState, useEffect } from 'react';
import '../styles/Prestataires.css';
import events1 from '../img/eventsAlive.jpeg';
import star from '../img/star.jpg';
import '../styles/Clients.css';
import logo from '../img/tak.jpeg';
import { Button } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import CrossIcon from '@mui/icons-material/Clear';
import { SERVER_URL } from './Constantes';





const Prestataires = ({ state, who, id }) => {
  const [eventClients, setEventClients] = useState([]);
  const [pres, setPres] = useState([]);
  const [press, setPress] = useState({});

  useEffect(() =>{
    const fetchPrestataire = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/prestataires/'+id);

        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des prestataires');
        }

        const prestatairesData = await response.json();
        setPress(prestatairesData);
      } catch (error) {
        console.error('Erreur lors de la récupération des prestataires : ', error);
      }
    };
    fetchPrestataire();
  })

  const handleConfirm = async(even) =>{
    const name = even.currentTarget.dataset.name;
    const value = even.currentTarget.dataset.value;

    const message = "Votre demande pour un(e) "+name+" par "+press.nom+" a été acceptée! Veuillez le contacter!";

    try {
      await fetch(SERVER_URL + "api/notificationsClients/newNotif", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clId: value,
          msg: message,
        }),
      });
      alert("Requête envoyée!");
    } catch (err) {
      alert("Requête échouée!");
      console.error(err);
    }

  };

  const handleReject = async(evenn) =>{
    const name = evenn.currentTarget.dataset.name;
    const value = evenn.currentTarget.dataset.value;

    const message = "Votre demande pour un(e) "+name+" n'a pu être confirmée pour "+press.nom+"! Veuillez le remplacer";

    try {
      await fetch(SERVER_URL + "api/notificationsClients/newNotif", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clId: value,
          msg: message,
        }),
      });
      alert("Requête envoyée!");
    } catch (err) {
      alert("Requête échouée!");
      console.error(err);
    }

  };

  const fetchEventClients = async () => {
    try {
      if (id) {
        const response = await fetch(`http://localhost:8080/api/evenement/prestataire/${id}`);
        
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des événements');
        }

        const eventsData = await response.json();

        // Récupérer les détails des clients associés aux événements
        const eventClientsPromises = eventsData.map(async (event) => {
          const clientResponse = await fetch(`http://localhost:8080/api/clients/${event.cid}`);

          if (!clientResponse.ok) {
            throw new Error('Erreur lors de la récupération du client');
          }

          const clientData = await clientResponse.json();
          console.log(clientData);
          return { event, client: clientData };
        });

        const eventClientsData = await Promise.all(eventClientsPromises);
        setEventClients(eventClientsData);
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des données : ', error);
    }
  };

  useEffect(() =>{
    const fetchPrestataires = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/prestataires');

        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des prestataires');
        }

        const prestatairesData = await response.json();
        setPres(prestatairesData);
      } catch (error) {
        console.error('Erreur lors de la récupération des prestataires : ', error);
      }
    };
    fetchPrestataires();
  })

  useEffect(() => {
    fetchEventClients();
  }, [id]);

  // useEffect(() => {
  //   addNotification();
  // });




  return (
    <div>
      {/* ... (affichage des prestataires partenaires) */}

      {state && who === 'PRES' ? (
        <div className="event-list-container">
          <h1 className="event-title">Liste des demandes de prestation de service</h1>
          <div className="event-list-box">
            {state && who === 'PRES' && eventClients.length > 0 ? (
              <div className="event-list-box">
                <div className="event-list">
                  {eventClients.map(({ event, client }) => (
                    <div key={event.id} className="event-item">
                      <img className='event-image' src={logo} alt='Event'/>
                      <div className="event-details">
                        <h2 className="event-type">{event.typeEvent}</h2>
                        <p><strong>Adresse        :</strong> {event.adresseEvent}</p>
                        <p><strong>Date et heure  : </strong>{event.dateEvent} à {event.heureEvent}</p><br/>
                        <p><strong>Infos Client</strong></p>
                        <div>
                        <p>{client.prenom}</p>
                          <p>{client.nom}</p>
                          <p>{client.adresse}</p>
                          <p>{client.telephone}</p>
                          <p>{client.email}</p>
                        </div>
                        <div className="event-actions">
                          <Button
                            className='actionne'
                            variant="outlined"
                            color="primary"
                            startIcon={<CheckIcon />}
                            data-name={event.typeEvent+" du "+event.dateEvent}
                            data-value={event.cid}
                            onClick={(even)=>handleConfirm(even)}
                          />
                          <Button
                            className='actionne'
                            variant="outlined"
                            color="error"
                            startIcon={<CrossIcon />}
                            data-name={event.typeEvent+" du "+event.dateEvent}
                            data-value={event.cid}
                            onClick={(evenn)=>handleReject(evenn)}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <p>{state && who === 'PRES' ? 'Aucune demande pour le moment.' : null}</p>
            )}
          </div>
        </div>
      ) : (
        <p>
          {state ? 'Veuillez créer un compte prestataire et voir les demandes de prestation de services.' : 'Aucun utilisateur connecté. Connectez-vous et bénéficiez des services!'}
        </p>
      )}
      <div className="event-list-container">
        <div className="event-list-box">
          <h1 style={{ textAlign: 'left' }}>Découvrez nos prestataires partenaires </h1>
          <div className="event-list">
            {pres.map(pres => (
              <div key={pres.id} className="event-item">
                <div className="pres-item-container">
                  <div className="pres-image-container">
                    <img src={events1} alt={pres.nom} className="pres-image" />
                  </div>
                  <div className="pres-details">
                    <h3 style={{textAlign: "center"}}>{pres.etoile}<img src={star} alt='a star' className='star'/></h3> 
                    <h3>{pres.nom} </h3>
                    <p>{pres.typeService}</p>
                    <p>{pres.adresse}</p>
                    <p>{pres.telephone}</p>
                    <p>{pres.email}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Prestataires;