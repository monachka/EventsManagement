import React, { useState, useEffect } from "react";
import { SERVER_URL } from "./Constantess.js";
import Snackbar from '@mui/material/Snackbar';
import './Login.css';
import logo from '../img/logo.png';
import axios from "axios";
import { jwtDecode } from 'jwt-decode';

function Logins({ setShowSignin, setState, setWho, setId, id, who, setToken }) {
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

        let userData = null;
        userData = await userRes.json();

        setWho(userData.role);
        setId(userData.id);
        
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

export default Logins;
