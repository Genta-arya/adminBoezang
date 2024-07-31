import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { Line } from "react-chartjs-2";
import { Bar } from "react-chartjs-2"; // Import Bar dari Chart.js
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { format } from "date-fns";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const TrafficChart = ({ visitorsData }) => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Number of Visits",
        data: [],
        fill: true,
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        tension: 0.1,
      },
    ],
  });

  useEffect(() => {
    if (visitorsData.length > 0) {
      const groupedByIP = {};

      visitorsData.forEach((visitor) => {
        visitor.visits.forEach((visit) => {
          const ip = visit.ip;

          if (!groupedByIP[ip]) {
            groupedByIP[ip] = 0;
          }
          groupedByIP[ip]++;
        });
      });

      const labels = visitorsData.map((visitor) =>
        format(new Date(visitor.date), "dd - MM - yyyy")
      ); // Mengubah format tanggal
      const dataValues = visitorsData.map((visitor) => visitor.totalVisits);

      setChartData({
        labels: labels,
        datasets: [
          {
            label: "Pengunjung",
            data: dataValues,
            fill: true,
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderColor: "rgba(75, 192, 192, 1)",
            tension: 0.1,
          },
        ],
      });

  
    }
  }, [visitorsData]);

  return (
    <div className="flex justify-center mt-8">
      <div style={{ height: "400px", width: "80%" }}>
        {chartData.datasets[0].data.length === 1 ? (
          <Bar
            data={chartData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                tooltip: {
                  callbacks: {
                    label: function (context) {
                      const label = context.dataset.label || "";
                      const date = context.label;
                      const visits =
                        visitorsData.find(
                          (visitor) =>
                            format(new Date(visitor.date), "dd - MM - yyyy") ===
                            date
                        )?.visits || [];
                      const totalVisits = visits.length;
                      return `${label}: ${totalVisits} visits`;
                    },
                    footer: function (context) {
                      const date = context[0].label;
                      const visits =
                        visitorsData.find(
                          (visitor) =>
                            format(new Date(visitor.date), "dd - MM - yyyy") ===
                            date
                        )?.visits || [];
                      const groupedVisits = {};

                      visits.forEach((visit) => {
                        const ip = visit.ip;
                        if (!groupedVisits[ip]) {
                          groupedVisits[ip] = 0;
                        }
                        groupedVisits[ip]++;
                      });

                      const details = Object.entries(groupedVisits)
                        .map(([ip, count]) => `IP: ${ip} (${count})`)
                        .join("\n");
                      return details || "No visits";
                    },
                  },
                },
              },
            }}
          />
        ) : (
          <Line
            data={chartData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                tooltip: {
                  callbacks: {
                    label: function (context) {
                      const label = context.dataset.label || "";
                      const date = context.label;
                      const visits =
                        visitorsData.find(
                          (visitor) =>
                            format(new Date(visitor.date), "dd - MM - yyyy") ===
                            date
                        )?.visits || [];
                      const totalVisits = visits.length;
                      return `${label}: ${totalVisits} visits`;
                    },
                    footer: function (context) {
                      const date = context[0].label;
                      const visits =
                        visitorsData.find(
                          (visitor) =>
                            format(new Date(visitor.date), "dd - MM - yyyy") ===
                            date
                        )?.visits || [];
                      const groupedVisits = {};

                      visits.forEach((visit) => {
                        const ip = visit.ip;
                        if (!groupedVisits[ip]) {
                          groupedVisits[ip] = 0;
                        }
                        groupedVisits[ip]++;
                      });

                      const details = Object.entries(groupedVisits)
                        .map(([ip, count]) => `IP: ${ip} (${count})`)
                        .join("\n");
                      return details || "No visits";
                    },
                  },
                },
              },
            }}
          />
        )}
      </div>
    </div>
  );
};

export default TrafficChart;
