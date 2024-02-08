import React from 'react';
import { Loader } from "@googlemaps/js-api-loader";

const MapContainer = new Loader({
    apiKey: "NEXT_PUBLIC_GOOGLE_MAPS_API_KEY",
    version: "weekly",
  });
  
  Loader.load().then(async () => {
    const { Map } = await google.maps.importLibrary("maps");
  
    map = new Map(document.getElementById("map"), {
      center: { lat: -34.397, lng: 150.644 },
      zoom: 8,
    });
  });

export default MapContainer;
