import React, { useState, useEffect } from "react";
import '../styles/Home.css';
import Image1 from '../img/safy.jpeg'; // Première image existante
import Image2 from '../img/mnck.jpeg'; // Nouvelle image ajoutée
import Image3 from '../img/fall.jpeg'; // Première image existante
import Image4 from '../img/salif.jpeg'; // Nouvelle image ajoutée


const Home = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = [Image1]; // Tableau contenant les images

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="content">
      <br/><br/><br/>
      <div className="slideshow-container">
          <div className="text-overlay">
            <h1 className="title">BIENVENUE DANS <br/>EVENTS-MANAGEMENT</h1>
            <p>
              <strong>
                Nous sommes ravis de vous accueillir!!!<br/> 
                Explorez notre univers où vous trouverez une multitude de produits et de  
                services adaptés à vos besoins.<br/> Découvrez nos offres spéciales, nos nouveautés  
                et plongez dans une expérience unique.<br/> N'hésitez pas à parcourir nos différentes  
                sections pour trouver ce qui vous intéresse.<br/> Nous espérons que votre visite sera 
                agréable et enrichissante.<br/> Merci de nous avoir choisis, et n'hésitez pas à nous  
                contacter si vous avez des questions ou besoin d'assistance.<br/> Bonne découverte !
              </strong>
            </p>
          </div>
          
          
          <div className="team-photos-container">
            <div className="team-title-container">
              <h2 className="team-title">DEVELOPPEURS</h2>
            </div>
            <div className="team-member">
              <img src={Image1} alt="Developer 1" className="team-photo" />
              <p className="photo-description">Safiétou DIALLO</p>
            </div>
            <div className="team-member">
              <img src={Image2} alt="Developer 2" className="team-photo" />
              <p className="photo-description">Mouhamad Nassour Chérif KANE</p>
            </div>
            <div className="team-member">
              <img src={Image3} alt="Developer 3" className="team-photo" />
              <p className="photo-description">Djiby FALL</p>
            </div>
            <div className="team-member">
              <img src={Image4} alt="Developer 4" className="team-photo" />
              <p className="photo-description">Salif SOUANE</p>
            </div>
          </div>

      </div>

      <br/><br/><br/>

      <div style={{backgroundColor:'rgb(207, 121, 8)', color:'white',height:"60px"}}>
        <h1> TOP EVENTS</h1>
      </div>
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

export default Home;
