// Dans une page, par exemple pages/index.js
import React from 'react';
import DynamicMap from '../pages/DynamicMap'; // Ajustez le chemin selon votre structure

const HomePage = () => {
  return (
    <div>
      <h1>Page d'accueil</h1>
      <DynamicMap />
    </div>
  );
};

export default HomePage;
