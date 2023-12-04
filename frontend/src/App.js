import React, {useState} from 'react';
import './App.css';
import Toolbar from './components/Toolbar';
import Footer from './components/Footer';
import Home from './components/Home';
import Login from './components/Login';
import SigninClient from './components/SigninClient';
import SigninPres from './components/SigninPres';
import Clients from './components/Clients';
import Prestataires from './components/Prestataires';
import Evenements from './components/Evenements';
import About from './components/About';
import Contact from './components/Contact';


import Homes from './backend/Homes';
import Toolbars from './backend/Toolbars';
import Clientss from './backend/Clientss';
import Prestatairess from './backend/Prestatairess';
import Evenementss from './backend/Evenementss';
import Abouts from './backend/Abouts';
import Contacts from './backend/Contacts';




function App() {
  const [showSignin, setShowSignin] = useState(null);
  const [showComp, setShowComp] = useState(null);
  const [state, setState] = useState(false);
  const [who, setWho] = useState("");
  const [id, setId] = useState(null);
  const [token, setToken] = useState("");
  const [notificationsCli, setNotificationsCli] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [notificationsPres, setNotificationsPres] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);

  console.log("Current who:", who);
  console.log("Current showComp:", showComp);

  const renderComponent = () => {
    if (who === 'ADMIN') {
      console.log("Rendering backend components for ADMIN");
      // Si l'utilisateur est ADMIN, afficher les composants backend
      if (showComp === 'home') {
        return <Homes />;
      } else if (showComp === 'clients') {
        return <Clientss />;
      } else if (showComp === 'prestataires') {
        return <Prestatairess />;
      } else if (showComp === 'evenements') {
        return <Evenementss />;
      } else if (showComp === 'about') {
        return <Abouts />;
      } else if (showComp === 'contact') {
        return <Contacts />;
      }
      else{
        return <Homes/>
      }
    } else {
      console.log("Rendering regular components");
      // Si l'utilisateur n'est pas ADMIN, utiliser la logique existante
      if (showSignin === 'pres') {
        return <SigninPres setShowSignin={setShowSignin} setState={setState} setWho={setWho} who={who} setId={setId} setToken={setToken}/>;
      } else if (showSignin === 'client') {
        return <SigninClient setShowSignin={setShowSignin} setState={setState} setWho={setWho} who={who} setId={setId} setToken={setToken}/>;
      } else if (showSignin === 'login') {
        return <Login setShowSignin={setShowSignin} setState={setState} setWho={setWho} who={who} setId={setId} id={id} setToken={setToken}/>;
      } else if (showComp === 'home') {
        return <Home />;
      } else if (showComp === 'clients') {
        return <Clients state={state} who={who} id={id} token={token} setToken={setToken} notificationsPres={notificationsPres} setNotificationsPres={setNotificationsPres} showNotifications={showNotifications} setShowNotifications={setShowNotifications} />;
      } else if (showComp === 'prestataires') {
        return <Prestataires state={state} who={who} id={id} token={token} setToken={setToken} notificationsCli={notificationsCli} setNotificationsCli={setNotificationsCli} showNotifications={showNotifications} setShowNotifications={setShowNotifications}/>;
      } else if (showComp === 'evenements') {
        return <Evenements state={state} who={who} id={id} token={token} setToken={setToken}/>;
      } else if (showComp === 'about') {
        return <About />;
      } else if (showComp === 'contact') {
        return <Contact />;
      }
      else{
        return <Home/>
      }
    }
  };

  return (
    <div className="App">
      {(showSignin === 'pres' || showSignin === 'client' || showSignin === 'login') ? null : <Toolbar setShowSignin={setShowSignin} setShowComp={setShowComp} setState={setState} state={state} setWho={setWho} who={who} setId={setId} id={id} token={token} setToken={setToken} notifications={notifications} setNotifications={setNotifications} notificationsPres={notificationsPres} setNotificationsPres={setNotificationsPres} showNotifications={showNotifications} setShowNotifications={setShowNotifications} />}
      <div className="contents">
        {renderComponent()}
      </div>
      {(showSignin === 'pres' || showSignin === 'client' || showSignin === 'login') ? null : <Footer />}
    </div>
  );

}

export default App;








// import React, {useState} from 'react';
// import './App.css';
// import Toolbar from './components/Toolbar';
// import Footer from './components/Footer';
// import Home from './components/Home';
// import Login from './components/Login';
// import SigninClient from './components/SigninClient';
// import SigninPres from './components/SigninPres';
// import Clients from './components/Clients';
// import Prestataires from './components/Prestataires';
// import Evenements from './components/Evenements';
// import About from './components/About';
// import Contact from './components/Contact';


// function App() {
//   const [showSignin, setShowSignin] = useState(null);
//   const [showComp, setShowComp] = useState(null);
//   const [state, setState] = useState(false);
//   const [who, setWho] = useState("");
//   const [id, setId] = useState(null);
//   const [token, setToken] = useState("");
//   const [notificationsCli, setNotificationsCli] = useState([]);
//   const [notifications, setNotifications] = useState([]);
//   const [notificationsPres, setNotificationsPres] = useState([]);
//   const [showNotifications, setShowNotifications] = useState(false);



//   // Fonction pour déterminer quel composant doit être rendu
//   const renderComponent = () => {
//     if (showSignin === 'pres') {
//       return <SigninPres setShowSignin={setShowSignin} setState={setState} setWho={setWho} who={who} setId={setId} setToken={setToken}/>;
//     } else if (showSignin === 'client') {
//       return <SigninClient setShowSignin={setShowSignin} setState={setState} setWho={setWho} who={who} setId={setId} setToken={setToken}/>;
//     } else if (showSignin === 'login') {
//       return <Login setShowSignin={setShowSignin} setState={setState} setWho={setWho} who={who} setId={setId} id={id} setToken={setToken}/>;
//     } else if (showComp === 'home') {
//       return <Home />;
//     } else if (showComp === 'clients') {
//       return <Clients state={state} who={who} id={id} token={token} setToken={setToken} notificationsPres={notificationsPres} setNotificationsPres={setNotificationsPres} showNotifications={showNotifications} setShowNotifications={setShowNotifications} />;
//     } else if (showComp === 'prestataires') {
//       return <Prestataires state={state} who={who} id={id} token={token} setToken={setToken} notificationsCli={notificationsCli} setNotificationsCli={setNotificationsCli} showNotifications={showNotifications} setShowNotifications={setShowNotifications}/>;
//     } else if (showComp === 'evenements') {
//       return <Evenements state={state} who={who} id={id} token={token} setToken={setToken}/>;
//     } else if (showComp === 'about') {
//       return <About />;
//     } else if (showComp === 'contact') {
//       return <Contact />;
//     }

//     // Si aucune condition n'est satisfaite, renvoyer null ou un composant par défaut
//     return <Home />;
    
//   };


//   return (
//     <div className="App">
//       {(showSignin === 'pres' || showSignin === 'client' || showSignin === 'login') ? null : <Toolbar setShowSignin={setShowSignin} setShowComp={setShowComp} setState={setState} state={state} setWho={setWho} who={who} setId={setId} id={id} token={token} setToken={setToken} notifications={notifications} setNotifications={setNotifications} notificationsPres={notificationsPres} setNotificationsPres={setNotificationsPres} showNotifications={showNotifications} setShowNotifications={setShowNotifications} />}
//       <div className="contents">
//         {renderComponent()}
//       </div>
//       {(showSignin === 'pres' || showSignin === 'client' || showSignin === 'login') ? null : <Footer />}
//     </div>
//   );
// }

// export default App;