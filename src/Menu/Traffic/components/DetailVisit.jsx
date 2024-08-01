import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaChevronDown } from "react-icons/fa";
import Maps from "./Maps";
import { motion } from "framer-motion";

// Function to get flag URL based on country code
const getFlagUrl = (countryCode) => {
  return `https://flagcdn.com/w320/${countryCode.toLowerCase()}.png`;
};

const DetailVisit = ({ data }) => {
  const [ipLocations, setIpLocations] = useState({});
  const [expandedIps, setExpandedIps] = useState(new Set());

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
      const response = await axios.get(`https://ipinfo.io/${ip}/json`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching location for IP ${ip}:`, error);
      return null;
    }
  };

  useEffect(() => {
    const fetchLocations = async () => {
      const today = new Date();
      today.setHours(today.getHours() + 7); // Adjusting to WIB
      const todayString = today.toISOString().split("T")[0]; // Format YYYY-MM-DD

      // Filtering data for today only
      const todayData = data.filter((day) => day.date.startsWith(todayString));

      const uniqueIps = new Set();
      todayData.forEach((day) => {
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

  const toggleExpandIp = (ip) => {
    setExpandedIps((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(ip)) {
        newSet.delete(ip);
      } else {
        newSet.add(ip);
      }
      return newSet;
    });
  };

  // Getting today's date
  const today = new Date();
  today.setHours(today.getHours() + 7); // Adjusting to WIB
  const todayString = today.toISOString().split("T")[0]; // Format YYYY-MM-DD

  // Filtering data for today only
  const todayData = data.filter((day) => day.date.startsWith(todayString));

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
                <strong className="">Total Kunjungan</strong> ({day.totalVisits})
              </p>
            </div>

            {/* Grouping visits by IP */}
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
                <div className="flex justify-between">
                  <div className="flex flex-col">
                    <p
                      className="font-semibold text-lg cursor-pointer"
                      onClick={() => toggleExpandIp(ip)}
                    >
                      <strong>IP:</strong> {ip} ({visitsGroup.length})
                    </p>
                    {ipLocations[ip] ? (
                      <p className="text-gray-600">
                        <strong>Location:</strong> {ipLocations[ip].city},{" "}
                        {ipLocations[ip].region}, {ipLocations[ip].country}
                      </p>
                    ) : (
                      <>Memuat Lokasi...</>
                    )}
                  </div>
                  {ipLocations[ip] && (
                    <img
                      src={getFlagUrl(ipLocations[ip].country)} // Displaying the flag
                      alt={`${ipLocations[ip].country} flag`}
                      className="w-8 h-5 mt-2 border"
                    />
                  )}
                </div>
                <motion.div
                  initial={{ height: 0, opacity: 0 }} // Initial state
                  animate={expandedIps.has(ip) ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }} // Animation based on expanded state
                  transition={{ duration: 0.3 }} // Durasi transisi
                  className="overflow-hidden" // Menghindari overflow saat ditutup
                >
                  {visitsGroup.map((visit, index) => {
                    const deviceInfo = JSON.parse(visit.device); // Parsing JSON string to object

                    return (
                      <div
                        key={index}
                        className="mb-2 p-2 border border-gray-300 rounded"
                      >
                        <p className="font-medium">
                          <strong>URL:</strong>{" "}
                          <a
                            href={`https://boezangapple.com${visit.page}`}
                            className="text-gray-500 font-bold hover:underline"
                          >
                            https://boezangapple.com{visit.page}
                          </a>
                        </p>
                        <p className="font-medium">Device Info:</p>
                        <ul className="list-disc list-inside text-gray-700">
                          <li>
                            <strong>User Agent:</strong>{" "}
                            {deviceInfo?.ua || "N/A"}
                          </li>
                          <li>
                            <strong>Browser:</strong>{" "}
                            {deviceInfo?.browser?.name || "N/A"}{" "}
                            {deviceInfo?.browser?.version || "N/A"}
                          </li>
                          <li>
                            <strong>Operating System:</strong>{" "}
                            {deviceInfo?.os?.name || "N/A"}{" "}
                            {deviceInfo?.os?.version || "N/A"}
                          </li>
                          <li>
                            <strong>CPU Architecture:</strong>{" "}
                            {deviceInfo?.cpu?.architecture || "-"}
                          </li>
                        </ul>
                        <p className="text-gray-600">
                          <strong>Jam:</strong>{" "}
                          {(() => {
                            const adjustedVisitTime = new Date(visit.visitTime);
                            adjustedVisitTime.setHours(
                              adjustedVisitTime.getHours() - 7
                            );
                            return adjustedVisitTime
                              .toLocaleTimeString("id-ID", {
                                hour: "2-digit",
                                minute: "2-digit",
                                hour12: false,
                              })
                              .replace(/:/g, ".");
                          })()}
                        </p>
                      </div>
                    );
                  })}
                </motion.div>
                <div className="flex justify-center">
                  <motion.button
                    onClick={() => toggleExpandIp(ip)}
                    className="text-black font-bold hover:underline text-center"
                    initial={{ scale: 1 }} // Scale awal
                    animate={{ scale: expandedIps.has(ip) ? 1 : 1.1 }} // Scale saat dibuka/tutup
                    transition={{ type: "spring", stiffness: 300 }} // Transisi untuk efek bounce
                  >
                    {expandedIps.has(ip) ? "Tutup Detail" : <FaChevronDown className="animate-bounce" />}
                  </motion.button>
                </div>
              </div>
            ))}
          </div>
        ))
      )}

      {/* Map to show visitor locations */}
      <h3 className="text-xl font-bold mb-2">Lokasi Pengunjung</h3>
      <Maps ipLocations={ipLocations} />
    </div>
  );
};

export default DetailVisit;
