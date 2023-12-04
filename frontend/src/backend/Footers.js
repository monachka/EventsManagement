import React, {useEffect, useState} from 'react';
import './Footer.css';
import logo from '../img/log.jpeg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';


function Footers() {
  const [isSmall, setIsSmall] = useState(false);
  
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


  if (isSmall)
  {
    return (
      <div className="footer">
        <div className="footer-logo">
            <img src={logo} alt="Logo" /><br/>
            <h3>Events-Management</h3>
          </div>
          <div className="footer-info">
            <h4 className='titre'>À propos de nous</h4>
            <p>Always closest to you! We're here as a team to support your needs and help you with less efforts organize everything by giving you everything you'd need!</p>
          </div>
          <div className="footer-categories">
            <h4 className='titre'>Catégories</h4>
            <ul>
              <li><a href="#">Actualités</a></li>
              <li><a href="#">Blog</a></li>
              <li><a href="#">Tutoriels</a></li>
              <li><a href="#">Contact</a></li>
              <li><a href="#">Centre d'aide</a></li>
            </ul>
          </div>
          <div className="footer-contact">
            <h4 className='titre'>Contactez-nous</h4>
            <p>mnckkane2000@gmail.com</p>
            <p>safietoudiallo862@gmail.com</p>
            <p>djibyf573@gmail.com</p>
          </div>
        <div className="footer-social">
              <a href="#" className='social'>
                  <FontAwesomeIcon icon={faFacebook} />
              </a>
              <a href="#" className='social'>
                  <FontAwesomeIcon icon={faTwitter} />
              </a>
              <a href="#" className='social'>
                  <FontAwesomeIcon icon={faInstagram} />
              </a>
          </div><br/>
        <div className="footer-bottom">
          <p>&copy; 2023 #MONACHKA #Safy #Djiby #Salif. 
            <br/>Tous droits réservés.</p>
        </div>
      </div>
    );
  }
  else
  {
    return (
      <div className="footer">
        <div className="footer-logo">
            <img src={logo} alt="Logo" /><br/>
            <h3>Events-Management</h3>
          </div>
        <div className="footer-content">
          <div className="footer-info">
            <h4 className='titre'>À propos de nous</h4>
            <p>Always closest to you! We're here as a team to support your needs and help you with less efforts organize everything by giving you everything you'd need!</p>
          </div>
          <div className="footer-categories">
            <h4 className='titre'>Catégories</h4>
            <ul>
              <li><a href="#">Actualités</a></li>
              <li><a href="#">Blog</a></li>
              <li><a href="#">Tutoriels</a></li>
              <li><a href="#">Contact</a></li>
              <li><a href="#">Centre d'aide</a></li>
            </ul>
          </div>
          <div className="footer-contact">
            <h4 className='titre'>Contactez-nous</h4>
            <p>mnckkane2000@gmail.com</p>
            <p>safietoudiallo862@gmail.com</p>
            <p>djibyf573@gmail.com</p>
          </div>
        </div>
        <div className="footer-social">
              <a href="#" className='social'>
                  <FontAwesomeIcon icon={faFacebook} />
              </a>
              <a href="#" className='social'>
                  <FontAwesomeIcon icon={faTwitter} />
              </a>
              <a href="#" className='social'>
                  <FontAwesomeIcon icon={faInstagram} />
              </a>
          </div><br/>
        <div className="footer-bottom">
          <p>&copy; 2023 #MONACHKA #Safy #Djiby #Salif. 
            <br/>Tous droits réservés.</p>
        </div>
      </div>
    );
  }
}

export default Footers;