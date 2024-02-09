import React, { useEffect, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const MapComponent = () => {
    const [mapId] = useState(() => `map-container-${Date.now()}`);
    const [duration, setDuration] = useState(null);

    useEffect(() => {
        const map = L.map(mapId).setView([48.8566, 2.3522], 13);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
        }).addTo(map);

        const routeServiceUrl = 'https://api.openrouteservice.org/v2/directions/';
        const apiKey = '5b3ce3597851110001cf6248bd894a29191449b2858a483541280765'; // Remplacez par votre clé API d'OpenRouteService

        // Définissez les coordonnées de départ et d'arrivée
        const start = '2.3522,48.8566'; // Paris
        const end = '2.2945,48.8584'; // Tour Eiffel

        // Paramètres de la requête
        const params = {
            api_key: apiKey,
            start: start,
            end: end,
            profile: 'foot-walking' // Pour le temps de marche, 'foot-walking', pour le vélo, 'cycling-regular'
        };

        // Effectuer la requête pour obtenir les informations sur l'itinéraire
        fetch(`${routeServiceUrl}foot-walking?${new URLSearchParams(params)}`)
    .then(response => response.json())
    .then(data => {
        if (data.features && data.features.length > 0) {
            const { features } = data;
            const durationInSeconds = features[0].properties.summary.duration;
            setDuration(durationInSeconds);

            const coordinates = features[0].geometry.coordinates;
            const latLngs = coordinates.map(coord => [coord[1], coord[0]]);
            const polyline = L.polyline(latLngs, { color: 'blue' }).addTo(map);
            map.fitBounds(polyline.getBounds());
        } else {
            console.error('No features found in the response.');
        }
    })
    .catch(error => console.log(error));


        return () => map.remove();
    }, [mapId]); // Réexécuter cet effet seulement si mapId change

    return (
        <div>
            <div id={mapId} style={{ height: '500px', width: '100%' }} />
            {duration !== null && (
                <div>
                    <p>Temps de trajet: {Math.round(duration / 60)} minutes</p>
                </div>
            )}
        </div>
    );
};

export default MapComponent;
