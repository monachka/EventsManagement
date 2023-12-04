import React, { useEffect, useState } from 'react';
import '../styles/Clients.css';
import logo from '../img/tak.jpeg';
import star from '../img/star.jpg';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Select, MenuItem, InputLabel } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';




const Clients = ({ state, who, id, token }) => {
  const [events, setEvents] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);

  const fieldStyle = {
    marginBottom: '20px',
    width: '100%',
  };

  const [eventData, setEventData] = useState({
    typeEvent: '',
    adresseEvent: '', // Notez la correction du nom du champ ici
    dateEvent: '',
    heureEvent: '',
    prestataires: [], // Utiliser un tableau pour stocker plusieurs prestataires
  });
  

  const [prestataires, setPrestataires] = useState([]);

  useEffect(() => {
    const fetchPrestataires = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/prestataires");
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des prestataires');
        }
        const prestatairesData = await response.json();
        setPrestataires(prestatairesData);
      } catch (error) {
        console.error('Erreur lors de la récupération des prestataires : ', error);
      }
    };
  
    fetchPrestataires();
  }, []);
  

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        if (id) {
          const response = await fetch("http://localhost:8080/api/evenement/client/" + id);
          
          if (!response.ok) {
            throw new Error('Erreur lors de la récupération des événements');
          }
          const eventsData = await response.json();
          const updatedEvents = Array.isArray(eventsData) ? eventsData : [];
          setEvents(updatedEvents);
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des événements : ', error);
      }
    };
  
    fetchEvents();
  }, [id]);
  

  const handleChange = (event) => {
    const { name, value } = event.target;
    setEventData({ ...eventData, [name]: value });
  };
  

  const handleDialogOpen = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handlePrestataireChange = (event) => {
    const selectedPrestataire = event.target.value;
    const { typeService, id } = selectedPrestataire;
    
    setEventData((prevState) => ({
      ...prevState,
      prestataires: [...prevState.prestataires, { typeService, id }],
    }));
  };
  
  

  const handleSave = () => {
    // Vérification des champs obligatoires
    if (
      eventData.typeEvent.trim() === '' ||
      eventData.adresseEvent.trim() === '' ||
      eventData.dateEvent.trim() === '' ||
      eventData.heureEvent.trim() === '' ||
      eventData.prestataires.length === 0
    ) {
      // Si un champ requis est vide, empêcher l'enregistrement
      alert('Veuillez remplir tous les champs SVP!');
      return;
    }
  
    // Tous les champs sont remplis, procéder à l'enregistrement
    fetch('http://localhost:8080/api/evenement/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
      },
      body: JSON.stringify({
        evenement: {
          typeEvent: eventData.typeEvent,
          adresseEvent: eventData.adresseEvent,
          dateEvent: eventData.dateEvent,
          heureEvent: eventData.heureEvent,
          cId: id,
        },
        prestataires: eventData.prestataires,
      }),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      handleDialogClose();

    })
    .catch(error => {
      console.error('Error:', error);
      // ... (gestion des erreurs)
    });
  };

  const fetchEvents = async () => {
    try {
      if (id) {
        const response = await fetch("http://localhost:8080/api/evenement/client/" + id);
        
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des événements');
        }
        const eventsData = await response.json();
        const updatedEvents = Array.isArray(eventsData) ? eventsData : [];
        setEvents(updatedEvents);
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des événements : ', error);
    }
  };

  const handleUpdateClick = (eventId) => {
    // Ouvrir le dialogue pour la mise à jour de l'événement
    const eventUrl = `http://localhost:8080/api/evenement/${eventId}`;
    handleDialogOpen();

    // Mettre à jour les données de l'événement dans le state
    setEventData({
      typeEvent: eventData.typeEvent,
      adresseEvent: eventData.adresseEvent,
      dateEvent: eventData.dateEvent,
      heureEvent: eventData.heureEvent,
      prestataires: eventData.prestataires,
    });

    updateEvent(eventData, eventUrl);
  };

  const handleDeleteClick = (eventId) => {
    const eventUrl = `http://localhost:8080/api/evenement/${eventId}`;

    onDelClick(eventUrl);
  };

  const updateEvent = (eventData, link) => {
    const token = sessionStorage.getItem("jwt");
    fetch(link, {
      method: "PUT",
      headers: { "Content-Type": "application/json", Authorization: token  },
      body: JSON.stringify(eventData),
    }).then((response) => {
      if (response.ok) {
        fetchEvents();
      } else {
        alert("Something went wrong !!");
      }
    }).catch(err => console.error(err));
  };

  const onDelClick = url => {
    const token = sessionStorage.getItem("jwt");
    if (window.confirm("Are you sure to delete ?")) {
      fetch(url, { 
        method: "DELETE",
        headers: {Authorization: token}, 
      })
        .then((response) => {
          if (response.ok) {
            fetchEvents();
          } else {
            alert("Some thing is wrong !!!!");
          }
        })
        .catch((Err) => console.error(Err));
    }
  };
  
  
  

  return (
    <div className="event-list-container">
      {(state && who === 'CLIENT') ? (
        <>
          <button className="create-event-button" onClick={handleDialogOpen}>
            Créer un événement
          </button>
          <Dialog open={openDialog} onClose={handleDialogClose} PaperProps={{ sx: { width: '90%', height: '70%' } }}>
            <DialogTitle style={{ fontWeight: 'bold' }}>CRÉATION D'ÉVÉNEMENT</DialogTitle>
            <DialogContent>
              <InputLabel id="typeEvent-label">Nom-Evenement</InputLabel>
              <TextField
                type="text"
                label="Nom-Evenement"
                name="typeEvent"
                value={eventData.typeEvent}
                onChange={handleChange}
                style={{ ...fieldStyle, backgroundColor: 'white' }}
                fullWidth
              />

              <InputLabel id="adressEvent-label">Adresse-Evenement</InputLabel>
              <TextField
                type="text"
                label="Adresse-Evenement"
                name="adresseEvent"
                value={eventData.adresseEvent}
                onChange={handleChange}
                style={{ ...fieldStyle, backgroundColor: 'white' }}
                fullWidth
              />

              <InputLabel id="dateEvent-label">Date-Evenement</InputLabel>
              <TextField
                type="text"
                label="Date-Evenement"
                name="dateEvent"
                value={eventData.dateEvent}
                onChange={handleChange}
                style={{ ...fieldStyle, backgroundColor: 'white' }}
                fullWidth
              />

              <InputLabel id="heureEvent-label">Heure-Evenement</InputLabel>
              <TextField
                type="text"
                label="Heure-Evenement"
                name="heureEvent"
                value={eventData.heureEvent}
                onChange={handleChange}
                style={{ ...fieldStyle, backgroundColor: 'white' }}
                fullWidth
              />

                <InputLabel id="prestataire-label">Ajout-Prestataire</InputLabel>
                <Select
                  label="Ajout-Prestataire"
                  name="prestataireEvent"
                  value={""}
                  onChange={handlePrestataireChange}
                  style={{ ...fieldStyle, backgroundColor: 'white' }}
                  fullWidth
                >
                  {prestataires.map((prestataire) => (
                    <MenuItem key={prestataire.id} value={prestataire}>
                      <strong>
                        {prestataire.nom} {prestataire.typeService} {prestataire.etoile}
                        <img src={star} alt='a star' className='star'/>
                      </strong>
                    </MenuItem>
                  ))}
                </Select>

                {/* Afficher la liste des prestataires sélectionnés */}
                <div>
                  <strong>Prestataires sélectionnés :</strong>
                  <ul>
                    {eventData.prestataires.map((prestataire, index) => (
                      <li key={index}>{prestataire.nom} {prestataire.typeService} {prestataire.etoile}<img src={star} alt='a star' className='star'/></li>
                    ))}
                  </ul>
                </div>

            </DialogContent>
            <DialogActions>
              <Button onClick={handleDialogClose} color="secondary">
                Annuler
              </Button>
              <Button onClick={handleSave} color="primary">
                Enregistrer
              </Button>
            </DialogActions>
          </Dialog>
        </>
      ) : (
        <p>
          {state ? 'Veuillez créer un compte client pour ajouter des événements.' : 'Aucun utilisateur connecté. Connectez-vous et bénéficiez des services!'}
        </p>
      )}

    {state && who === 'CLIENT' && events.length>0 ? (
      <>
        <h1 className="event-title">Liste des évènements créés</h1>
          <div className="event-list-box">
            <div className="event-list">
              {events.map((eventData) => (
                <div key={eventData.id} className="event-item">
                  <img className='event-image' src={logo} alt='Event'/>
                  <div className="event-details">
                    <h2 className="event-type">{eventData.typeEvent}</h2>
                    <p><strong>Adresse        :</strong> {eventData.adresseEvent}</p>
                    <p><strong>Date et heure  : </strong>{eventData.dateEvent} à {eventData.heureEvent}</p>
                    <p><strong>Prestataires :</strong></p>
                    <ul className="prestataire-list">
                      {eventData.prestataires.map((prestataire) => (
                        <li key={prestataire.id} className="prestataire-item">
                          {prestataire.nom} -----> {prestataire.typeService} -----> {prestataire.etoile}<img src={star} alt='a star' className='star'/><br/><br/>
                          {prestataire.email} -----> {prestataire.telephone} 
                        </li>
                      ))}
                    </ul>
                    <div className="event-actions">
                    <Button
                      className='actionne'
                      variant="outlined"
                      color="primary"
                      startIcon={<EditIcon />}
                      onClick={() => handleUpdateClick(eventData)}
                    >
                    </Button>
                    <Button
                      className='actionne'
                      variant="outlined"
                      color="error"
                      startIcon={<DeleteIcon />}
                      onClick={() => handleDeleteClick(eventData.id)}
                    >
                    </Button>
                    </div>
                  </div>
                  
                </div>
              ))}
            </div>
          </div>
      </>
    ) : (
      <p>{state && who === 'CLIENT' ? 'Aucun événement enregistré.' : null}</p>
    )}

      <br/><br/><br/><br/>

      <h1 style={{ textAlign: 'left' }}>Découvrez nos top Events</h1>
      <div className="container">
      <div className="photo">
        <div className="photo1">
        </div>
        <h3>ANNIVERSAIRE</h3>
      </div>

      <div className="photo">
        <div className="photo2">

        </div>
        <h3>RECEPTION</h3>

      </div>


      <div className="photo">
        <div className="photo3"></div>
        <h3>MARIAGE</h3>
      </div>
     
      <div className="photo">
        <div className="photo4">
        </div>
        <h3>COCKTAIL</h3>
      </div>

      <div className="photo">
        <div className="photo5">
        </div>
        <h3>SALADE DE FRUIT</h3>
      </div>


      <div className="photo">
        <div className="photo6"></div>
        <h3>GALA</h3>
      </div>
        
      </div>
    </div>
  );
};

export default Clients;