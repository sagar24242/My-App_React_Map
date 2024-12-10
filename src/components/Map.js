import React, { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polygon,
  useMapEvents,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./Map.css"; // Import the external CSS file

// Custom marker icon
const customIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/833/833314.png",
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40],
});

function GamingMap() {
  const predefinedCoordinates = [
    { id: 1, name: "Location 1", lat: 23.011334318375788, lng: 72.51124620437623 },
  ];

  const polygons = [
    [
      [37.79355826122319, -122.3945307868109],
      [37.79380847861161, -122.3942143526941],
      [37.79359218905435, -122.39395691476861],
      [37.79336741688275, -122.39428943875573],
    ],
  ];

  const [userLocation, setUserLocation] = useState(null);
  const [selectedPosition, setSelectedPosition] = useState(null);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    if (userData && userData.location) {
      setUserLocation({
        lat: userData.location.latitude,
        lng: userData.location.longitude,
      });
    } else {
      setUserLocation({ lat: 23.0115008, lng: 72.5112673 });
    }
  }, []);

  const handleMarkerClick = (coordinate) => {
    setSelectedPosition(coordinate);
    console.log(`Selected Marker: ${coordinate.name}`);
  };

    // Calculate the coordinates of a 3x3 grid centered on the user's location
    const calculateGrid = (center, cellSize) => {
      const latOffset = cellSize / 111000; // Latitude offset (1 degree ≈ 111 km)
      const lngOffset = cellSize / (111000 * Math.cos((center.lat * Math.PI) / 180)); // Longitude offset
  
      const grid = [];
      for (let row = -1; row <= 1; row++) {
        for (let col = -1; col <= 1; col++) {
          const topLeft = [center.lat + row * latOffset, center.lng + col * lngOffset];
          const topRight = [center.lat + row * latOffset, center.lng + (col + 1) * lngOffset];
          const bottomRight = [center.lat + (row - 1) * latOffset, center.lng + (col + 1) * lngOffset];
          const bottomLeft = [center.lat + (row - 1) * latOffset, center.lng + col * lngOffset];
  
          grid.push([topLeft, topRight, bottomRight, bottomLeft]);
        }
      }
      return grid;
    };

  const calculateSquare = (center, size) => {
    const latOffset = size / 111000;
    const lngOffset = size / (111000 * Math.cos((center.lat * Math.PI) / 180));

    return [
      [center.lat + latOffset, center.lng - lngOffset],
      [center.lat + latOffset, center.lng + lngOffset],
      [center.lat - latOffset, center.lng + lngOffset],
      [center.lat - latOffset, center.lng - lngOffset],
    ];
  };

  const createSquareMask = (center, size) => {
    const latOffset = size / 111000;
    const lngOffset = size / (111000 * Math.cos((center.lat * Math.PI) / 180));

    const squareCoords = [
      [center.lat + latOffset, center.lng - lngOffset],
      [center.lat + latOffset, center.lng + lngOffset],
      [center.lat - latOffset, center.lng + lngOffset],
      [center.lat - latOffset, center.lng - lngOffset],
    ];

    const outerBounds = [
      [-90, -180],
      [-90, 180],
      [90, 180],
      [90, -180],
      [-90, -180],
    ];

    return [outerBounds, squareCoords];
  };

  const MapClickHandler = () => {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        console.log(`Clicked Location - Latitude: ${lat}, Longitude: ${lng}`);
      },
    });
    return null;
  };

  return (
    <div className="map-container">
      <div className="admin-info">
        <img
          src="https://cdn-icons-png.flaticon.com/512/847/847969.png"
          alt="User Avatar"
        />
        <strong>Admin</strong>
      </div>

      {userLocation ? (
        <MapContainer
          center={[userLocation.lat, userLocation.lng]}
          zoom={15}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; OpenStreetMap contributors"
          />

          <Marker position={[userLocation.lat, userLocation.lng]} icon={customIcon}>
            <Popup>
              <strong>Your Location</strong>
              <br />
              Latitude: {userLocation.lat}
              <br />
              Longitude: {userLocation.lng}
            </Popup>
          </Marker>

          

          {/* Draw the 3x3 matrix */}
          {calculateGrid(userLocation, 500).map((square, index) => (
            <Polygon
              key={index}
              positions={square}
              pathOptions={{
                color: index === 4 ? "green" : "blue", // Center square is green, others are blue
                fillOpacity: 0.2,
              }}
            />
          ))}


          <Polygon
            positions={calculateSquare(userLocation, 1000)}
            pathOptions={{ color: "blue", fillOpacity: 0.2 }}
          />

          <Polygon
            positions={createSquareMask(userLocation, 1000)}
            pathOptions={{ color: "black", fillColor: "black", fillOpacity: 0.9 }}
          />

          {predefinedCoordinates.map((coordinate) => (
            <Marker
              key={coordinate.id}
              position={[coordinate.lat, coordinate.lng]}
              icon={customIcon}
              eventHandlers={{
                click: () => handleMarkerClick(coordinate),
              }}
            >
              <Popup>
                <strong>{coordinate.name}</strong>
                <br />
                Latitude: {coordinate.lat}
                <br />
                Longitude: {coordinate.lng}
              </Popup>
            </Marker>
          ))}

          {polygons.map((polygonCoords, index) => (
            <Polygon
              key={index}
              positions={polygonCoords}
              pathOptions={{ color: "green", fillOpacity: 0.4 }}
            />
          ))}

          <MapClickHandler />
        </MapContainer>
      ) : (
        <div>Loading map...</div>
      )}

      {selectedPosition && (
        <div className="selected-position">
          <strong>Selected Position:</strong>
          <div>Name: {selectedPosition.name}</div>
          <div>Latitude: {selectedPosition.lat}</div>
          <div>Longitude: {selectedPosition.lng}</div>
        </div>
      )}
    </div>
  );
}

export default GamingMap;
