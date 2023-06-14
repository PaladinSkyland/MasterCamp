import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ContactPage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('')

  const returnHome = () => {
    navigate('/', {replace: true});
  };
  const storedToken = localStorage.getItem('token');

  fetch('/protected', {
    headers: {
      'Authorization': `Bearer ${storedToken}`
    }
  }).then(response => 
    response.json()
  ).then(data => {
    setName(data.name)
  })

  return (
    <div>
      <h1>Page de contact {name}</h1>
      <button onClick={returnHome}>retour</button>
      {/* Contenu de la page de contact */}
    </div>
  );
};

export default ContactPage;