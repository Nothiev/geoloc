// components/DynamicMap.js ou components/MapComponent.js
import dynamic from 'next/dynamic';
import React from 'react';

const MapComponentWithNoSSR = dynamic(() => import('../pages/MapContainer'), {
  ssr: false, // Ne pas utiliser le rendu côté serveur pour ce composant
});

const DynamicMap = () => <MapComponentWithNoSSR />;

export default DynamicMap;
