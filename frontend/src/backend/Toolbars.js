import React, { useState, useEffect } from 'react';
import './Toolbars.css';
import logo from '../img/log.jpeg'
import SigninClient from '../components/SigninClient'
import SigninPres from '../components/SigninPres'
import Login from '../components/Login'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { faBars,faHome, faSignInAlt, faSignOutAlt, faPowerOff} from '@fortawesome/free-solid-svg-icons';



const Toolbars = ({ setShowSignin, setShowComp, setState, state, who, id, showNotifications, setShowNotifications }) => {
  const [menu1Open, setMenu1Open] = useState(false);
  const [menu2Open, setMenu2Open] = useState(false);
  const [isSmall, setIsSmall] = useState(false);
  // À l'intérieur de votre composant principal



  useEffect(() => {
    const screenRatio = () => {
      const width = window.innerWidth;
      if (width >= 300 && width <= 500) {
        setIsSmall(true);
      }
    };
    screenRatio();
    window.addEventListener('resize', screenRatio);
    return () => {
      window.removeEventListener('resize', screenRatio);
    };
  }, []);

  const toggleMenu1 = () => {
    setMenu1Open(!menu1Open);
  };

  const toggleMenu2 = () => {
    setMenu2Open(!menu2Open);
  };

  const logout = () => {
    if (window.confirm("Are you sure you wanna logout ?")) {
        sessionStorage.removeItem("jwt");
        setState(false);
    }
  };

  const handleSigninClick = (type) => {
    setShowSignin(type);
    setShowComp(type);
    setMenu1Open(false); // Close the menu after selecting an option
  };

  const [notificationsCli, setNotificationsCli] = useState([]);

  useEffect(() => {
      const fetchNotifs = async () => {
        try {
          const response = await fetch("http://localhost:8080/api/notificationsClients");
          if (!response.ok) {
            throw new Error('Erreur lors de la récupération des notifications');
          }
          const notificationsData = await response.json();
          setNotificationsCli(notificationsData);
        } catch (error) {
          console.error('Erreur lors de la récupération des notifications : ', error);
        }
      };
    
      fetchNotifs();
    }, [notificationsCli]);
    

    // console.log("showNotifications:", showNotifications);
    // console.log("notificationsCli:", notificationsCli);



  if (isSmall) {
    if (who=="CLIENT")
    {
      if (state){
        return (
          <div className="toolbar">
            <div className="logo">
              <img src={logo} alt="Logo" />
              <header className='logo'><strong>Events-Management</strong></header>
            </div>
            <div className="menu-right">
              <div className="menu-item" onClick={toggleMenu2}>
                <FontAwesomeIcon icon={faBars} />
                {menu2Open && (
                  <div className="dropdown-menu">
                    <div className="menu-item" onClick={() => handleSigninClick('homes')}>
                      <FontAwesomeIcon icon={faHome} />
                      Home
                    </div>
                    <div className="menu-item" onClick={() => handleSigninClick('clientss')}>Clients</div>
                    <div className="menu-item" onClick={() => handleSigninClick('prestatairess')}>Prestataire</div>
                    <div className="menu-item" onClick={() => handleSigninClick('evenementss')}>Événements</div>
                    <div className="menu-item" onClick={() => handleSigninClick('abouts')}>About</div>
                    <div className="menu-item" onClick={() => handleSigninClick('contacts')}>Contact</div>
                  </div>
                )}
              </div>
            </div>
            <div className="menu-right">
              <div className="menu-item" onClick={() => setShowNotifications(!showNotifications)}>
                <FontAwesomeIcon icon={faBell} />
                {showNotifications && (
                  <div className="dropdowns">
                    {notificationsCli.length > 0 ? (
                      notificationsCli.map((notification) => (
                        <div key={notification.clId} className="notification-item">
                          {notification.msg}
                        </div>
                      ))
                    ) : (
                      <div className="notification-item">Aucune notification</div>
                    )}
                  </div>
                )}
              </div>
            </div>

            <div className="menu-right">
              <div className="menu-item" onClick={toggleMenu1}>
                <FontAwesomeIcon icon={faPowerOff} />
                {menu1Open && (
                  <div className="dropdown-menu">
                    <div className="menu-item" onClick={logout}>
                      <FontAwesomeIcon icon={faSignOutAlt} />
                      Logout
                    </div>
                    <div className="menu-item" onClick={() => handleSigninClick('client')}>
                      <FontAwesomeIcon icon={faSignInAlt} />
                      Signin as Client
                    </div>
                    <div className="menu-item" onClick={() => handleSigninClick('pres')}>
                      <FontAwesomeIcon icon={faSignInAlt} />
                      Signin as Prestataire
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      }
      else{
        return (
          <div className="toolbar">
            <div className="logo">
              <img src={logo} alt="Logo" />
              <header className='logo'><strong>Events-Management</strong></header>
            </div>
            <div className="menu-right">
              <div className="menu-item" onClick={toggleMenu2}>
                <FontAwesomeIcon icon={faBars} />
                {menu2Open && (
                  <div className="dropdown-menu">
                    <div className="menu-item" onClick={() => handleSigninClick('homes')}>
                      <FontAwesomeIcon icon={faHome} />
                      Home
                    </div>
                    <div className="menu-item" onClick={() => handleSigninClick('clientss')}>Clients</div>
                    <div className="menu-item" onClick={() => handleSigninClick('prestatairess')}>Prestataire</div>
                    <div className="menu-item" onClick={() => handleSigninClick('evenementss')}>Événements</div>
                    <div className="menu-item" onClick={() => handleSigninClick('abouts')}>About</div>
                    <div className="menu-item" onClick={() => handleSigninClick('contacts')}>Contact</div>
                  </div>
                )}
              </div>
            </div>
            <div className="menu-right">
              <div className="menu-item" onClick={() => setShowNotifications(!showNotifications)}>
                <FontAwesomeIcon icon={faBell} />
                {showNotifications && (
                  <div className="dropdowns">
                    {notificationsCli.length > 0 ? (
                      notificationsCli.map((notification) => (
                        <div key={notification.clId} className="notification-item">
                          {notification.msg}
                        </div>
                      ))
                    ) : (
                      <div className="notification-item">Aucune notification</div>
                    )}
                  </div>
                )}
              </div>
            </div>

            <div className="menu-right">
              <div className="menu-item" onClick={toggleMenu1}>
                <FontAwesomeIcon icon={faPowerOff} />
                {menu1Open && (
                  <div className="dropdown-menu">
                    <div className="menu-item" onClick={() => handleSigninClick('login')}>
                      <FontAwesomeIcon icon={faSignInAlt} />
                      Login
                    </div>
                    <div className="menu-item" onClick={() => handleSigninClick('client')}>
                      <FontAwesomeIcon icon={faSignInAlt} />
                      Signin as Client
                    </div>
                    <div className="menu-item" onClick={() => handleSigninClick('pres')}>
                      <FontAwesomeIcon icon={faSignInAlt} />
                      Signin as Prestataire
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      }
    }
    else{
      if (state){
        return (
          <div className="toolbar">
            <div className="logo">
              <img src={logo} alt="Logo" />
              <header className='logo'><strong>Events-Management</strong></header>
            </div>
            <div className="menu-right">
              <div className="menu-item" onClick={toggleMenu2}>
                <FontAwesomeIcon icon={faBars} />
                {menu2Open && (
                  <div className="dropdown-menu">
                    <div className="menu-item" onClick={() => handleSigninClick('homes')}>
                      <FontAwesomeIcon icon={faHome} />
                      Home
                    </div>
                    <div className="menu-item" onClick={() => handleSigninClick('clientss')}>Clients</div>
                    <div className="menu-item" onClick={() => handleSigninClick('prestatairess')}>Prestataire</div>
                    <div className="menu-item" onClick={() => handleSigninClick('evenementss')}>Événements</div>
                    <div className="menu-item" onClick={() => handleSigninClick('abouts')}>About</div>
                    <div className="menu-item" onClick={() => handleSigninClick('contacts')}>Contact</div>
                  </div>
                )}
              </div>
            </div>
            
            <div className="menu-right">
              <div className="menu-item" onClick={toggleMenu1}>
                <FontAwesomeIcon icon={faPowerOff} />
                {menu1Open && (
                  <div className="dropdown-menu">
                    <div className="menu-item" onClick={logout}>
                      <FontAwesomeIcon icon={faSignOutAlt} />
                      Logout
                    </div>
                    <div className="menu-item" onClick={() => handleSigninClick('client')}>
                      <FontAwesomeIcon icon={faSignInAlt} />
                      Signin as Client
                    </div>
                    <div className="menu-item" onClick={() => handleSigninClick('pres')}>
                      <FontAwesomeIcon icon={faSignInAlt} />
                      Signin as Prestataire
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      }
      else{
        return (
          <div className="toolbar">
            <div className="logo">
              <img src={logo} alt="Logo" />
              <header className='logo'><strong>Events-Management</strong></header>
            </div>
            <div className="menu-right">
              <div className="menu-item" onClick={toggleMenu2}>
                <FontAwesomeIcon icon={faBars} />
                {menu2Open && (
                  <div className="dropdown-menu">
                    <div className="menu-item" onClick={() => handleSigninClick('homes')}>
                      <FontAwesomeIcon icon={faHome} />
                      Home
                    </div>
                    <div className="menu-item" onClick={() => handleSigninClick('clientss')}>Clients</div>
                    <div className="menu-item" onClick={() => handleSigninClick('prestatairess')}>Prestataire</div>
                    <div className="menu-item" onClick={() => handleSigninClick('evenementss')}>Événements</div>
                    <div className="menu-item" onClick={() => handleSigninClick('abouts')}>About</div>
                    <div className="menu-item" onClick={() => handleSigninClick('contacts')}>Contact</div>
                  </div>
                )}
              </div>
            </div>
            
            <div className="menu-right">
              <div className="menu-item" onClick={toggleMenu1}>
                <FontAwesomeIcon icon={faPowerOff} />
                {menu1Open && (
                  <div className="dropdown-menu">
                    <div className="menu-item" onClick={() => handleSigninClick('login')}>
                      <FontAwesomeIcon icon={faSignInAlt} />
                      Login
                    </div>
                    <div className="menu-item" onClick={() => handleSigninClick('client')}>
                      <FontAwesomeIcon icon={faSignInAlt} />
                      Signin as Client
                    </div>
                    <div className="menu-item" onClick={() => handleSigninClick('pres')}>
                      <FontAwesomeIcon icon={faSignInAlt} />
                      Signin as Prestataire
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      }
    }
    
  }
  else{
    if(who=="CLIENT"){
      if (state)
      {
        return (
          <div className="toolbar">
            <div className="logo">
              <img src={logo} alt="Logo" /><header className='logo'><strong>Events-Management</strong></header>
            </div>
            <div className="menu">
              <div className="menu-item" onClick={() => handleSigninClick('homes')}>
                <FontAwesomeIcon icon={faHome} />
                Home
              </div>
              <div className="menu-item" onClick={() => handleSigninClick('clientss')}>
                Clients
              </div>
              <div className="menu-item" onClick={() => handleSigninClick('prestatairess')}>
                Prestataire
              </div>
              <div className="menu-item" onClick={() => handleSigninClick('evenementss')}>
                Événements
              </div>
              <div className="menu-item" onClick={() => handleSigninClick('abouts')}>
                About
              </div>
              <div className="menu-item" onClick={() => handleSigninClick('contacts')}>
                Contact
              </div>
            </div>
            <div className="menu-right">
              <div className="menu-item" onClick={() => setShowNotifications(!showNotifications)}>
                <FontAwesomeIcon icon={faBell} />
                {showNotifications && (
                  <div className="dropdowns">
                    {notificationsCli.length > 0 ? (
                      notificationsCli.map((notification) => (
                        <div key={notification.clId} className="notification-item">
                          {notification.msg}
                        </div>
                      ))
                    ) : (
                      <div className="notification-item">Aucune notification</div>
                    )}
                  </div>
                )}
              </div>
            </div>

            <div className="menu-right">
              <div className="menu-item" onClick={toggleMenu1}>
                <FontAwesomeIcon icon={faPowerOff} />
                {menu1Open && (
                  <div className="dropdown-menu">
                    <div className="menu-item" onClick={logout}>
                      <FontAwesomeIcon icon={faSignOutAlt} />
                      Logout
                    </div>
                    <div className="menu-item" onClick={() => handleSigninClick('client')}>
                      <FontAwesomeIcon icon={faSignInAlt} />
                      Signin as Client
                    </div>
                    <div className="menu-item" onClick={() => handleSigninClick('pres')}>
                      <FontAwesomeIcon icon={faSignInAlt} />
                      Signin as Prestataire
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      }
      else{
        return (
          <div className="toolbar">
            <div className="logo">
              <img src={logo} alt="Logo" /><header className='logo'><strong>Events-Management</strong></header>
            </div>
            <div className="menu">
              <div className="menu-item" onClick={() => handleSigninClick('homes')}>
                <FontAwesomeIcon icon={faHome} />
                Home
              </div>
              <div className="menu-item" onClick={() => handleSigninClick('clientss')}>
                Clients
              </div>
              <div className="menu-item" onClick={() => handleSigninClick('prestatairess')}>
                Prestataire
              </div>
              <div className="menu-item" onClick={() => handleSigninClick('evenementss')}>
                Événements
              </div>
              <div className="menu-item" onClick={() => handleSigninClick('abouts')}>
                About
              </div>
              <div className="menu-item" onClick={() => handleSigninClick('contacts')}>
                Contact
              </div>
            </div>
            <div className="menu-right">
              <div className="menu-item" onClick={() => setShowNotifications(!showNotifications)}>
                <FontAwesomeIcon icon={faBell} />
                {showNotifications && (
                  <div className="dropdowns">
                    {notificationsCli.length > 0 ? (
                      notificationsCli.map((notification) => (
                        <div key={notification.clId} className="notification-item">
                          {notification.msg}
                        </div>
                      ))
                    ) : (
                      <div className="notification-item">Aucune notification</div>
                    )}
                  </div>
                )}
              </div>
            </div>

            <div className="menu-right">
              <div className="menu-item" onClick={toggleMenu1}>
                <FontAwesomeIcon icon={faPowerOff} />
                {menu1Open && (
                  <div className="dropdown-menu">
                    <div className="menu-item" onClick={() => handleSigninClick('login')}>
                      <FontAwesomeIcon icon={faSignInAlt} />
                      Login
                    </div>
                    <div className="menu-item" onClick={() => handleSigninClick('client')}>
                      <FontAwesomeIcon icon={faSignInAlt} />
                      Signin as Client
                    </div>
                    <div className="menu-item" onClick={() => handleSigninClick('pres')}>
                      <FontAwesomeIcon icon={faSignInAlt} />
                      Signin as Prestataire
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      }
    }
    else{
      if (state)
      {
        return (
          <div className="toolbar">
            <div className="logo">
              <img src={logo} alt="Logo" /><header className='logo'><strong>Events-Management</strong></header>
            </div>
            <div className="menu">
              <div className="menu-item" onClick={() => handleSigninClick('homes')}>
                <FontAwesomeIcon icon={faHome} />
                Home
              </div>
              <div className="menu-item" onClick={() => handleSigninClick('clientss')}>
                Clients
              </div>
              <div className="menu-item" onClick={() => handleSigninClick('prestatairess')}>
                Prestataire
              </div>
              <div className="menu-item" onClick={() => handleSigninClick('evenementss')}>
                Événements
              </div>
              <div className="menu-item" onClick={() => handleSigninClick('abouts')}>
                About
              </div>
              <div className="menu-item" onClick={() => handleSigninClick('contacts')}>
                Contact
              </div>
            </div>
            
            <div className="menu-right">
              <div className="menu-item" onClick={toggleMenu1}>
                <FontAwesomeIcon icon={faPowerOff} />
                {menu1Open && (
                  <div className="dropdown-menu">
                    <div className="menu-item" onClick={logout}>
                      <FontAwesomeIcon icon={faSignOutAlt} />
                      Logout
                    </div>
                    <div className="menu-item" onClick={() => handleSigninClick('client')}>
                      <FontAwesomeIcon icon={faSignInAlt} />
                      Signin as Client
                    </div>
                    <div className="menu-item" onClick={() => handleSigninClick('pres')}>
                      <FontAwesomeIcon icon={faSignInAlt} />
                      Signin as Prestataire
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      }
      else{
        return (
          <div className="toolbar">
            <div className="logo">
              <img src={logo} alt="Logo" /><header className='logo'><strong>Events-Management</strong></header>
            </div>
            <div className="menu">
              <div className="menu-item" onClick={() => handleSigninClick('homes')}>
                <FontAwesomeIcon icon={faHome} />
                Home
              </div>
              <div className="menu-item" onClick={() => handleSigninClick('clientss')}>
                Clients
              </div>
              <div className="menu-item" onClick={() => handleSigninClick('prestatairess')}>
                Prestataire
              </div>
              <div className="menu-item" onClick={() => handleSigninClick('evenementss')}>
                Événements
              </div>
              <div className="menu-item" onClick={() => handleSigninClick('abouts')}>
                About
              </div>
              <div className="menu-item" onClick={() => handleSigninClick('contacts')}>
                Contact
              </div>
            </div>
            
            <div className="menu-right">
              <div className="menu-item" onClick={toggleMenu1}>
                <FontAwesomeIcon icon={faPowerOff} />
                {menu1Open && (
                  <div className="dropdown-menu">
                    <div className="menu-item" onClick={() => handleSigninClick('login')}>
                      <FontAwesomeIcon icon={faSignInAlt} />
                      Login
                    </div>
                    <div className="menu-item" onClick={() => handleSigninClick('client')}>
                      <FontAwesomeIcon icon={faSignInAlt} />
                      Signin as Client
                    </div>
                    <div className="menu-item" onClick={() => handleSigninClick('pres')}>
                      <FontAwesomeIcon icon={faSignInAlt} />
                      Signin as Prestataire
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      }
    }

  }
};

export default Toolbars;