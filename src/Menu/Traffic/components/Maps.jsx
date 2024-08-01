import React from "react";
import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Importing marker icon
import markerIconUrl from "leaflet/dist/images/marker-icon.png";
import markerIconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
import markerShadowUrl from "leaflet/dist/images/marker-shadow.png";
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIconRetinaUrl,
  iconUrl: markerIconUrl,
  shadowUrl: markerShadowUrl,
});

const Maps = ({ ipLocations }) => {
  return (
    <MapContainer
      center={[0, 0]} // Center coordinates of the world
      zoom={1}
      scrollWheelZoom={false}
      className="rounded-lg -z-0 border"
      style={{ height: "450px", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        opacity={0.9}
      />
      {/* Showing markers for each unique IP location */}
      {Object.entries(ipLocations).map(([ip, location]) => {
        if (location.loc) {
          const [latitude, longitude] = location.loc.split(",").map(Number); // Parsing latitude and longitude
          return (
            <Marker key={ip} position={[latitude, longitude]}>
              <Popup>
                <div>
                  <h4 className="font-semibold">{location.city}</h4>
                  <p>
                    {location.region}, {location.country}
                  </p>
                  <p>
                    <strong>IP:</strong> {ip}
                  </p>
                </div>
              </Popup>
              {/* Adding a circle at the location */}
              <Circle
                center={[latitude, longitude]}
                radius={50000} // Radius in meters
                pathOptions={{
                  color: "red",
                  fillColor: "red",
                  fillOpacity: 0.1,
                }}
              />
            </Marker>
          );
        }
        return null; // If location does not have loc property, skip rendering
      })}
    </MapContainer>
  );
};

export default Maps;
