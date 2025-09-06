import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import Hero from "../components/Hero";
import { useEffect, useState } from "react";
import useSocket from "../hooks/useSocket";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

// Fix Leaflet default marker issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

export default function Dashboard() {
  const { socket, isConnected } = useSocket();
  const [vehicles, setVehicles] = useState([]);
  const [trafficData, setTrafficData] = useState([]);
  const [finesData, setFinesData] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [violationStats, setViolationStats] = useState([]);

  const COLORS = ["#ff4d4f", "#1890ff", "#faad14", "#722ed1", "#13c2c2"];

  useEffect(() => {
    async function fetchViolationStats() {
      try {
        const res = await fetch("http://localhost:5000/api/violations/stats");
        const data = await res.json();
        setViolationStats(data);
      } catch (err) {
        console.error("Error fetching violation stats:", err);
      }
    }
    fetchViolationStats();
  }, []);

  useEffect(() => {
    if (!socket || !isConnected) return;

    socket.on("vehicleUpdate", (data) => {
      setVehicles((prev) => {
        const updated = [...prev];
        const idx = updated.findIndex(
          (v) => v.id === data.id || v._id === data._id
        );
        if (idx !== -1) updated[idx] = { ...updated[idx], ...data };
        else updated.push(data);
        return updated;
      });
    });

    socket.on("trafficStats", (data) => setTrafficData(data || []));
    socket.on("finesStats", (data) => setFinesData(data || []));
    socket.on("alert", (alert) =>
      setAlerts((prev) => [alert, ...prev].slice(0, 50))
    );

    return () => {
      socket.off("vehicleUpdate");
      socket.off("trafficStats");
      socket.off("finesStats");
      socket.off("alert");
    };
  }, [socket, isConnected]);

  return (
    <>
    <div className="p-6 bg-gray-50 min-h-screen font-sans">
      <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
        Live Traffic Dashboard
      </h2>

      <p
        className={`text-center font-medium mb-6 ${
          isConnected ? "text-green-600" : "text-red-600"
        }`}
      >
        {isConnected ? "🟢 Connected to server" : "🔴 Disconnected"}
      </p>

      {/* Map */}
      <div className="w-full h-96 mb-6 rounded-xl overflow-hidden shadow-lg">
        <MapContainer
          center={[20.5937, 78.9629]}
          zoom={5}
          className="w-full h-full"
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; OpenStreetMap contributors"
          />
          {vehicles
            .filter((v) => v.lat != null && v.lng != null)
            .map((v) => (
              <Marker key={v.id || v._id} position={[v.lat, v.lng]}>
                <Popup>
                  <b>Vehicle ID:</b> {v.id || v._id} <br />
                  <b>Speed:</b> {v.speed || 0} km/h <br />
                  <b>Status:</b> {v.status || "Unknown"}
                </Popup>
              </Marker>
            ))}
        </MapContainer>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Congestion */}
        <div className="bg-white rounded-xl p-6 shadow hover:shadow-lg transition">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">
            Congestion Levels
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart
              data={trafficData.length ? trafficData : [{ time: "", congestion: 0 }]}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="congestion" stroke="#6366f1" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Fines */}
        <div className="bg-white rounded-xl p-6 shadow hover:shadow-lg transition">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">
            Fines Collected
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={finesData.length ? finesData : [{ day: "", fines: 0 }]}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="fines" fill="#34d399" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Second Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Violation Types */}
        <div className="bg-white rounded-xl p-6 shadow hover:shadow-lg transition">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">
            Violation Types
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={violationStats.length ? violationStats : [{ name: "No Data", value: 1 }]}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {(violationStats.length ? violationStats : [{ name: "No Data", value: 1 }]).map(
                  (_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />
                )}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Live Alerts */}
        <div className="bg-white rounded-xl p-6 shadow hover:shadow-lg transition max-h-[400px] overflow-y-auto">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">
            🚨 Live Violation Alerts
          </h3>
          {alerts.length === 0 ? (
            <p className="text-gray-500">No violations yet...</p>
          ) : (
            <ul className="space-y-3">
              {alerts.map((a, i) => (
                <li
                  key={i}
                  className="border border-gray-200 p-3 rounded-lg hover:bg-gray-50 transition"
                >
                  <div className="text-sm text-gray-700 space-y-1">
                    <span><b>Vehicle:</b> {a.vehicle}</span>
                    <span><b>Type:</b> {a.type}</span>
                    <span><b>Fine:</b> ₹{a.fine}</span>
                    <span><b>Speed:</b> {a.speed ?? "N/A"} km/h</span>
                    <span><b>Loc:</b> {a.lat ?? "N/A"}, {a.lng ?? "N/A"}</span>
                    <span><b>Time:</b> {a.timestamp ? new Date(a.timestamp).toLocaleString() : "N/A"}</span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
    </>
  );
}
