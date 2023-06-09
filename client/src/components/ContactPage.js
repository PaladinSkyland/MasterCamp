import React from 'react';
import { Link } from 'react-router-dom';

const ContactPage = () => {
  return (
    <div>
      <h1>Page de contact</h1>
      <Link to="/">Aller à la page home</Link>
      {/* Contenu de la page de contact */}
    </div>
  );
};

export default ContactPage;