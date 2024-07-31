import React, { useEffect, useState } from "react";
import axios from "axios";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Mengimpor ikon marker
import markerIconUrl from 'leaflet/dist/images/marker-icon.png';
import markerIconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import markerShadowUrl from 'leaflet/dist/images/marker-shadow.png';

// Mengatur ikon marker
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIconRetinaUrl,
  iconUrl: markerIconUrl,
  shadowUrl: markerShadowUrl,
});

const DetailVisit = ({ data }) => {
  const [ipLocations, setIpLocations] = useState({});

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = {
      weekday: "long",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    };
    const formattedDate = date
      .toLocaleDateString("id-ID", options)
      .replace(/(\d{2})\/(\d{2})\/(\d{4})/, "$1 - $2 - $3"); // Format dd - mm - yyyy
    return formattedDate;
  };

  const fetchIpLocation = async (ip) => {
    try {
      const response = await axios.get(`https://ipapi.co/${ip}/json/`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching location for IP ${ip}:`, error);
      return null;
    }
  };

  useEffect(() => {
    const fetchLocations = async () => {
      const uniqueIps = new Set();
      data.forEach((day) => {
        day.visits.forEach((visit) => {
          uniqueIps.add(visit.ip);
        });
      });

      const locations = {};
      for (const ip of uniqueIps) {
        const locationData = await fetchIpLocation(ip);
        if (locationData) {
          locations[ip] = locationData;
        }
      }
      setIpLocations(locations);
    };

    fetchLocations();
  }, [data]);

  // Mendapatkan tanggal hari ini sesuai dengan zona waktu Jakarta
  const getJakartaDateString = () => {
    const jakartaOffset = 7 * 60; // Jakarta is UTC+7
    const localOffset = new Date().getTimezoneOffset();
    const utcTimestamp = Date.now() + (localOffset * 60 * 1000);
    const jakartaTimestamp = utcTimestamp + (jakartaOffset * 60 * 1000);
    const jakartaDate = new Date(jakartaTimestamp);
    return jakartaDate.toISOString().split('T')[0];
  };

  const todayString = getJakartaDateString();

  // Menyaring data untuk hari ini saja
  const todayData = data.filter(day => day.date.startsWith(todayString));

  return (
    <div className="p-6 bg-gray-50 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Detail Kunjungan Hari Ini</h2>
      {todayData.length === 0 ? (
        <p className="text-gray-600">Tidak ada kunjungan hari ini.</p>
      ) : (
        todayData.map((day) => (
          <div key={day.date} className="mb-6 bg-white p-4 rounded-lg shadow">
            <div className="flex justify-between">
              <h3 className="text-xl font-bold mb-2">{formatDate(day.date)}</h3>
              <p className="text-gray-600">
                <strong>Total Visits:</strong> {day.totalVisits}
              </p>
            </div>

            {/* Mengelompokkan kunjungan berdasarkan IP */}
            {Object.entries(
              day.visits.reduce((acc, visit) => {
                if (!acc[visit.ip]) {
                  acc[visit.ip] = [];
                }
                acc[visit.ip].push(visit);
                return acc;
              }, {})
            ).map(([ip, visitsGroup]) => (
              <div key={ip} className="mb-4 border-t border-gray-200 pt-4">
                <p className="font-semibold text-lg">
                  <strong>IP:</strong> {ip}
                </p>
                {ipLocations[ip] && (
                  <p className="text-gray-600">
                    <strong>Location:</strong> {ipLocations[ip].city},{" "}
                    {ipLocations[ip].region}, {ipLocations[ip].country}
                  </p>
                )}
                {visitsGroup.map((visit, index) => (
                  <div
                    key={index}
                    className="mb-2 p-2 border border-gray-300 rounded"
                  >
                    <p className="font-medium">
                      <strong>Page:</strong>{" "}
                      <a
                        href={`https://boezangapple.com${visit.page}`}
                        className="text-blue-500 hover:underline"
                      >
                        {visit.page}
                      </a>
                    </p>
                    <p className="font-medium">Device Info:</p>
                    <ul className="list-disc list-inside text-gray-700">
                      <li>
                        <strong>User Agent:</strong> {visit.device.ua}
                      </li>
                      <li>
                        <strong>Browser:</strong> {visit.device.browser.name}{" "}
                        {visit.device.browser.version}
                      </li>
                      <li>
                        <strong>Operating System:</strong> {visit.device.os.name}{" "}
                        {visit.device.os.version}
                      </li>
                      <li>
                        <strong>CPU Architecture:</strong>{" "}
                        {visit.device.cpu.architecture}
                      </li>
                    </ul>
                    <p className="text-gray-600">
                      <strong>Visit Time:</strong>{" "}
                      {new Date(visit.visitTime).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        ))
      )}
      
      {/* Peta untuk menampilkan lokasi pengunjung */}
      <h3 className="text-xl font-bold mb-2">Lokasi Pengunjung</h3>
      <MapContainer center={[-6.200000, 106.816666]} zoom={2} style={{ height: "400px", width: "100%" }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {/* Menampilkan marker untuk setiap lokasi IP unik */}
        {Object.entries(ipLocations).map(([ip, location]) => (
          <Marker key={ip} position={[location.latitude, location.longitude]}>
            <Popup>
              {location.city}, {location.region}, {location.country}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default DetailVisit;
