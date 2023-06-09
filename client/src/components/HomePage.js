import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {

    const handleClick =  async ()  => {
        
        const data = await fetch('/api')
        const response = data.json()
        response.then(r => {
          console.log(r)
          console.log("icccci")
        })
      }
  return (
    <div>
      <h1>Page d'accueil</h1>
      <Link to="/contact">Aller à la page de contact</Link>
      <button onClick={handleClick}>
        Test
      </button>
    </div>
  );
};

export default HomePage;