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

export default function Analytics() {
  const { socket, isConnected } = useSocket();
  const [trafficData, setTrafficData] = useState([]);
  const [finesData, setFinesData] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [violationStats, setViolationStats] = useState([]);

  const COLORS = ["#3b82f6", "#22d3ee", "#f97316", "#a855f7", "#ef4444"];

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

    socket.on("trafficStats", (data) => setTrafficData(data || []));
    socket.on("finesStats", (data) => setFinesData(data || []));
    socket.on("alert", (alert) =>
      setAlerts((prev) => [alert, ...prev].slice(0, 50))
    );

    return () => {
      socket.off("trafficStats");
      socket.off("finesStats");
      socket.off("alert");
    };
  }, [socket, isConnected]);

  return (
    <div className="pt-24 p-8 bg-gradient-to-b from-[#0b1120] to-[#111827] min-h-screen font-sans text-white space-y-8">
      <h2 className="text-4xl font-extrabold text-center mb-2">
        Traffic Analytics
      </h2>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Congestion */}
        <div className="bg-[#1e293b] rounded-2xl p-6 shadow-lg border border-slate-700">
          <h3 className="text-xl font-semibold mb-4 text-blue-400">
            Congestion Levels
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart
              data={trafficData.length ? trafficData : [{ time: "", congestion: 0 }]}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="time" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip />
              <Line type="monotone" dataKey="congestion" stroke="#3b82f6" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Fines */}
        <div className="bg-[#1e293b] rounded-2xl p-6 shadow-lg border border-slate-700">
          <h3 className="text-xl font-semibold mb-4 text-blue-400">
            Fines Collected
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={finesData.length ? finesData : [{ day: "", fines: 0 }]}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="day" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip />
              <Legend />
              <Bar dataKey="fines" fill="#22d3ee" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Second Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Violation Types */}
        <div className="bg-[#1e293b] rounded-2xl p-6 shadow-lg border border-slate-700">
          <h3 className="text-xl font-semibold mb-4 text-blue-400">
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
        <div className="bg-[#1e293b] rounded-2xl p-6 shadow-lg border border-slate-700 max-h-[400px] overflow-y-auto scrollbar-thin scrollbar-thumb-cyan-500/50 scrollbar-track-gray-800">
          <h3 className="text-xl font-semibold mb-4 text-blue-400">
            🚨 Live Violation Alerts
          </h3>
          {alerts.length === 0 ? (
            <p className="text-gray-400">No violations yet...</p>
          ) : (
            <ul className="space-y-3">
              {alerts.map((a, i) => (
                <li
                  key={i}
                  className="border border-slate-600 p-3 rounded-xl bg-[#0f172a] hover:bg-[#1e293b] transition-all"
                >
                  <div className="text-sm text-gray-300 space-y-1">
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
  );
}
