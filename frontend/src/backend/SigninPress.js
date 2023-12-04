import React, { useState } from "react";
import './Signin.css';
import logo from '../img/logo.png';
import {SERVER_URL} from './Constantess'
import axios from "axios";
import { jwtDecode } from 'jwt-decode';



const SigninPress = ({ setShowSignin, setState, who,setWho, setToken, setId }) => {
  const [user, setUser] = useState({
        username: "",
        password: "",
        nom: "",
        telephone: "",
        email: "",
        adresse: "",
        capacityEvents: 1,
        etoile: 0,
        typeService: "",
        photo: ""
    });

    const [open, setOpen] = useState(false);
    const [isConnected, setConnect] = useState(false);

    const validateEmail = email => {
        // Vérification du format de l'email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };
    
    const validatePhoneNumber = phoneNumber => {
        // Vérification du format du numéro de téléphone (format sénégalais)
        const phoneRegex = /^((\+)221)?[ -]*(7[0678])[ -]*([0-9]{3})[ -]*([0-9]{2})[ -]*([0-9]{2})$/;
        return phoneRegex.test(phoneNumber);
    };

    const isValidImageUrl = (url) => {
        const imageUrlRegex = /^https:\/\/.*\/.*\.(jpg|jpeg|png|svg).*$/;
      
        return imageUrlRegex.test(url);
    };

    const [errors, setErrors] = useState({});

    const handleChange =  event =>{
        setUser({...user, [event.target.name]: event.target.value });
        setErrors({ ...errors, [event.target.name]: "" });
    };

    const confirmPasswordElement = document.getElementById("confirmPassword");
    const confirmPassword = confirmPasswordElement ? confirmPasswordElement.value : "";


    const signinPres = async (e) => {
        e.preventDefault();
        const errors = {};
    
        if (!user.nom || !user.adresse || !user.email || !user.telephone || !user.typeService || !user.etoile || !user.capacityEvents || !user.username || !user.password || !confirmPassword) {
            // Gérer le cas où un champ est manquant
            errors.nom = "Veuillez saisir votre nom!";
            errors.adresse = "Veuillez saisir votre adresse!";
            errors.telephone = "Veuillez saisir votre numero de telephone!";
            errors.email = "Veuillez saisir votre email!";
            errors.typeService = "Veuillez saisir votre type de service!";
            // errors.etoile = "Veuillez saisir votre nombre d'etoiles!";
            // errors.capacityEvents = "Veuillez saisir le nombre d'evenements par jour que vous pouvez gerer!";
            errors.username = "Veuillez saisir votre nom d'utilisateur!";
            errors.password = "Veuillez saisir votre mot de passe!";
            errors.confirmPassword = "Veuillez confirmer votre mot de passe!";
            // errors.photoPath = "Veuillez ajouter une photo svp!";
        }

        // const { password, confirmPassword, email, telephone } = user;

        // Vérification de la correspondance des mots de passe
        if (user.password !== confirmPassword) {
            errors.confirmPassword = "Les mots de passe ne correspondent pas!"
        }

        // Vérification du format de l'email
        if (!validateEmail(user.email)) {
            errors.email = "Veuillez saisir une email valide!"
        }

        // Vérification du format du numéro de téléphone
        if (!validatePhoneNumber(user.telephone)) {
            errors.telephone = "Veuillez saisir un numero de telephone SN valide et veuillez aux espaces nécessaires par défaut!"
        }

        if (!isValidImageUrl(user.photo)){
            user.photo = "../img/logo.png";
        }

        setErrors(errors);

        if (Object.keys(errors).length > 0) {
        // Il y a des erreurs, ne pas soumettre le formulaire
            return;
        }
        else{
            const response = await fetch(SERVER_URL + "api/prestataires/signin", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(user),
            });
        
            if (response.ok) {
                // Inscription réussie, procéder à la connexion
                try {
                    const loginResponse = await fetch(SERVER_URL + "login", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ username: user.username, password: user.password }),
                    });
        
                    if (loginResponse.ok) {
                        const jwtToken = loginResponse.headers.get("Authorization");
                        if (jwtToken) {
                            sessionStorage.setItem("jwt", jwtToken);
                            setConnect(true);
                            setToken(jwtToken);
                            setWho("PRES");

                            const decodedToken = jwtDecode(jwtToken);

                            // Récupérer les informations de l'utilisateur, y compris le rôle
                            const { sub } = decodedToken;

                            const userRes = await fetch(SERVER_URL + "api/prestataires/byUsername/" + sub, {
                                method: "GET",
                                headers: { "Content-Type": "application/json" },
                              });
                      
                              const userData = await userRes.json();
                              setId(userData.id);
                        } else {
                            setOpen(true);
                        }
                    } else {
                        setOpen(true);
                    }
                } catch (error) {
                    console.error(error);
                    setOpen(true);
                }
            } else {
                setOpen(true);
            }
        }
    };


  if (isConnected)
    {
        setShowSignin(null);
        setState(true);
        return null;
        // return(
        //     <App/>
        // );
    }
    else{
        return(
            <div className="sign-in-container">
            <img src={logo} alt="Logo" width={100} height={100}/>
            <h2 className="sign">INSCRIPTION</h2>
            <form className="sign-in-form" onSubmit={signinPres}>
                <div className="form-group">
                <label htmlFor="nom">Nom:</label>
                <input
                    type="text"
                    id="nom"
                    name="nom"
                    placeholder="Enter your name"
                    value={user.nom}
                    onChange={handleChange}
                    style={{ borderColor: errors.nom ? "red" : "initial" }}
                />
                {errors.nom && <span className="error">{errors.nom}</span>}
                </div>
                <div className="form-group">
                <label htmlFor="adresse">Adresse:</label>
                <input
                    type="text"
                    id="adresse"
                    name="adresse"
                    placeholder="Enter your adresse"
                    value={user.adresse}
                    onChange={handleChange}
                    style={{ borderColor: errors.adresse ? "red" : "initial" }}
                />
                {errors.adresse && <span className="error">{errors.adresse}</span>}
                </div>
                <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input
                    type="text"
                    id="email"
                    name="email"
                    placeholder="Enter your email"
                    value={user.email}
                    onChange={handleChange}
                    style={{ borderColor: errors.email ? "red" : "initial" }}
                />
                {errors.email && <span className="error">{errors.email}</span>}
                </div>
                <div className="form-group">
                <label htmlFor="telephone">Telephone:</label>
                <input
                    type="text"
                    id="telephone"
                    name="telephone"
                    placeholder="Enter your phone number"
                    value={user.telephone}
                    onChange={handleChange}
                    style={{ borderColor: errors.telephone ? "red" : "initial" }}
                />
                {errors.telephone && <span className="error">{errors.telephone}</span>}
                </div>
                <div className="form-group">
                <label htmlFor="typeService">Type de Service:</label>
                <input
                    type="text"
                    id="typeService"
                    name="typeService"
                    placeholder="Enter your service offer"
                    value={user.typeService}
                    onChange={handleChange}
                    style={{ borderColor: errors.typeService ? "red" : "initial" }}
                />
                {errors.typeService && <span className="error">{errors.typeService}</span>}
                </div>
                <div className="form-group">
                <label htmlFor="etoile">Nombre d'etoiles:</label>
                <input
                    type="number"
                    id="etoile"
                    name="etoile"
                    placeholder="Enter your stars number"
                    value={user.etoile}
                    onChange={handleChange}
                    style={{ borderColor: errors.etoile ? "red" : "initial" }}
                />
                {errors.etoile && <span className="error">{errors.etoile}</span>}
                </div>
                <div className="form-group">
                <label htmlFor="capacityEvents">Nombre d'evenements journaliers:</label>
                <input
                    type="number"
                    id="capacityEvents"
                    name="capacityEvents"
                    placeholder="Enter your number of daily events"
                    value={user.capacityEvents}
                    onChange={handleChange}
                    style={{ borderColor: errors.capacityEvents ? "red" : "initial" }}
                />
                {errors.capacityEvents && <span className="error">{errors.capacityEvents}</span>}
                </div>
                <div className="form-group">
                <label htmlFor="photo">Lien complet de votre photo:</label>
                <input 
                    type="text" 
                    id="photo" 
                    name="photo" 
                    placeholder="Exemple: https://exemple.com/quelquechose VotreImage.JPG autrechose" 
                    value={user.photo}
                    onChange={handleChange}
                    style={{ borderColor: errors.photo ? "red" : "initial" }}
                />
                {errors.photo && <span className="error">{errors.photo}</span>}
                </div>
                <div className="form-group">
                <label htmlFor="username">Nom d'utilisateur:</label>
                <input 
                    type="text" 
                    id="username" 
                    name="username" 
                    placeholder="Enter your username" 
                    value={user.username}
                    onChange={handleChange}
                    style={{ borderColor: errors.username ? "red" : "initial" }}
                />
                {errors.username && <span className="error">{errors.username}</span>}
                </div>
                <div className="form-group">
                <label htmlFor="password">Mot de passe:</label>
                <input 
                    type="password" 
                    id="password" 
                    name="password" 
                    placeholder="Enter your password" 
                    value={user.password}
                    onChange={handleChange}
                    style={{ borderColor: errors.password ? "red" : "initial" }}
                />
                {errors.password && <span className="error">{errors.password}</span>}
                </div>
                <div className="form-group">
                <label htmlFor="confirmPassword">Confirmer mot de passe:</label>
                <input 
                    type="password" 
                    id="confirmPassword" 
                    name="confirmPassword" 
                    placeholder="Confirm your password" 
                    value={confirmPassword}
                    onChange={handleChange}
                    style={{ borderColor: errors.confirmPassword ? "red" : "initial" }}
                />
                {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}
                </div>
                <button type="submit">S'INSCRIRE</button>
            </form>
            </div>
        );
        
    }
};

export default SigninPress;
