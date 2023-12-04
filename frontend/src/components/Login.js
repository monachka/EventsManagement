import React, { useState, useEffect } from "react";
import { SERVER_URL } from "./Constantes.js";
import Snackbar from '@mui/material/Snackbar';
import '../styles/Login.css';
import logo from '../img/logo.png';
import axios from "axios";
import { jwtDecode } from 'jwt-decode';

function Login({ setShowSignin, setState, setWho, setId, id, who, setToken }) {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const [open, setOpen] = useState(false);
  const [isConnected, setConnect] = useState(false);

  const handleChange = event => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  const login = async () => {
    try {
      const res = await fetch(SERVER_URL + "login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });

      const jwtToken = res.headers.get("Authorization");
      if (jwtToken != null) {
        sessionStorage.setItem("jwt", jwtToken);
        setConnect(true);
        setToken(jwtToken);

        // Décoder le jeton JWT
        const decodedToken = jwtDecode(jwtToken);

        // Récupérer les informations de l'utilisateur, y compris le rôle
        const { sub } = decodedToken;

        const userRes = await fetch(SERVER_URL +"api/"+ sub, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });


        let responseBodyText;

        try {
          responseBodyText = await userRes.text();
        
          // Récupérer l'id et le rôle à partir de la réponse texte
          const idStartIndex = responseBodyText.indexOf('"id":') + 5;
          const idEndIndex = responseBodyText.indexOf(',', idStartIndex);
          const id = responseBodyText.substring(idStartIndex, idEndIndex);
        
          const roleStartIndex = responseBodyText.indexOf('"role":"') + 8;
          const roleEndIndex = responseBodyText.indexOf('"', roleStartIndex);
          const role = responseBodyText.substring(roleStartIndex, roleEndIndex);
        
          // Utiliser les valeurs récupérées
          setWho(role);
          setId(id);
        
        } catch (error) {
          console.error("Erreur lors de la lecture de la réponse texte :", error);
          console.log("Réponse non JSON :", responseBodyText);
        
          // Vérifier si le corps de la réponse n'est pas vide (contient un message d'erreur)
          if (responseBodyText.trim() !== "") {
            // Afficher ou gérer le message d'erreur non JSON
            console.log("Message d'erreur :", responseBodyText);
        
            // Par exemple, afficher le message d'erreur à l'utilisateur
            alert("Erreur d'authentification : " + responseBodyText);
          } else {
            // Gérer le cas où le corps de la réponse est vide ou n'est pas du JSON valide
            console.log("Réponse inattendue :", responseBodyText);
        
            // Par exemple, rediriger l'utilisateur vers une page de connexion
            // history.push("/login"); // Utiliser react-router ou similaire
          }
        }
          
        try {
          const userData = await userRes.json();
          console.log(userData);
          setWho(userData.role);
          setId(userData.id);
        } catch (error) {
          console.error("Error parsing JSON:", error);
          // Handle the non-JSON response appropriately (e.g., display an error message)
        }
        
        
      } else {
        setOpen(true);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    // This effect will run after the component is rendered
    if (isConnected) {
      setShowSignin(null);
      setState(true);
    }
  }, [isConnected, setShowSignin, setState]);



  if (isConnected) {
    return null;

  } else {
    return (
      <div className="sign-in-containers">
        <img src={logo} alt="Logo" width={100} height={100} />
        <h2 className="sign">CONNEXION</h2>
        <form className="sign-in-form">
          <div className="form-group">
            <label htmlFor="username">Nom d'utilisateur:</label>
            <input onChange={handleChange} type="text" id="username" name="username" placeholder="Enter your username" />
          </div>
          <div className="form-group">
            <label htmlFor="password">Mot de passe:</label>
            <input onChange={handleChange} type="password" id="password" name="password" placeholder="Enter your password" />
          </div>
          <button type="button" onClick={login}>SE CONNECTER</button>
        </form>
        <Snackbar
          className="connect"
          open={open}
          autoHideDuration={3000}
          onClose={() => setOpen(false)}
          message="Login failed: Check your username or password"
        />
      </div>
    );
  }
}

export default Login;
