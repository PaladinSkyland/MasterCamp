import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ContactPage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('')

  const returnHome = () => {
    navigate('/', {replace: true});
  };
  const storedToken = localStorage.getItem('token');

  useEffect(() => {
    fetch('/protected', {
      headers: {
        'Authorization': `Bearer ${storedToken}`
      }
    }).then(response =>
      response.json()).then(data => {
      localStorage.setItem('token',data.newToken)
      setName(data.Name)
    })  
  }, [])

  

  return (
    <div>
      <h1>Page de contact {name}</h1>
      <button onClick={returnHome}>retour</button>
    </div>
  );
};

export default ContactPage;