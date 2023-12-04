import React, { useState, useEffect } from "react";
import './Signin.css';
import logo from '../img/logo.png';
import axios from "axios";
import {SERVER_URL} from './Constantes'
import { jwtDecode } from 'jwt-decode';


const SigninClients = ({ setShowSignin, setState, setWho, who, setId, setToken }) => {
  const [user, setUser] = useState({
        username: "",
        password: "",
        prenom: "",
        nom: "",
        telephone: "",
        email: "",
        adresse: ""
        // confirmPassword: ""
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

    const [errors, setErrors] = useState({});

    const handleChange =  event =>{
        setUser({...user, [event.target.name]: event.target.value });
        setErrors({ ...errors, [event.target.name]: "" });
    };

    const confirmPasswordElement = document.getElementById("confirmPassword");
    const confirmPassword = confirmPasswordElement ? confirmPasswordElement.value : "";


    const signinClient = async (e) => {
        e.preventDefault();
        const errors = {};
        
        if (!user.prenom ||!user.nom || !user.adresse || !user.email || !user.telephone || !user.username || !user.password || !confirmPassword) {
            // Gérer le cas où un champ est manquant
            errors.prenom = "Veuillez saisir votre prenom!";
            errors.nom = "Veuillez saisir votre nom!";
            errors.adresse = "Veuillez saisir votre adresse!";
            errors.telephone = "Veuillez saisir votre numero de telephone!";
            errors.email = "Veuillez saisir votre email!";
            errors.username = "Veuillez saisir votre nom d'utilisateur!";
            errors.password = "Veuillez saisir votre mot de passe!";
            errors.confirmPassword = "Veuillez confirmer votre mot de passe!";
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

        setErrors(errors);
        

        if (Object.keys(errors).length > 0) {
        // Il y a des erreurs, ne pas soumettre le formulaire
            return;
        }
        else{
            const response = await fetch(SERVER_URL + "api/clients/signin", {
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
                            setWho("CLIENT");
                            
                            const decodedToken = jwtDecode(jwtToken);

                            // Récupérer les informations de l'utilisateur, y compris le rôle
                            const { sub } = decodedToken;

                            const userRes = await fetch(SERVER_URL + "api/clients/byUsername/" + sub, {
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
        };
    };

    useEffect(() => {
        // This effect will run after the component is rendered
        if (isConnected) {
          setShowSignin(null);
          setState(true);
        }
      }, [isConnected, setShowSignin, setState]);




  if (isConnected)
    {
        return null;

    }
    else{
        return(
            <div className="sign-in-container">
            <img src={logo} alt="Logo" width={100} height={100}/>
            <h2 className="sign">INSCRIPTION</h2>
            <form className="sign-in-form" onSubmit={signinClient}>
                <div className="form-group">
                <label htmlFor="prenom">Preom:</label>
                <input
                    type="text"
                    id="prenom"
                    name="prenom"
                    placeholder="Enter your name"
                    value={user.prenom}
                    onChange={handleChange}
                    style={{ borderColor: errors.prenom ? "red" : "initial" }}
                />
                {errors.prenom && <span className="error">{errors.prenom}</span>}
                </div>
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

export default SigninClients;
