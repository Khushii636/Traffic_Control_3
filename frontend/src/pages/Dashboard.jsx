import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect, useState } from "react";
import useSocket from "../hooks/useSocket";

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

    return () => {
      socket.off("vehicleUpdate");
    };
  }, [socket, isConnected]);

  return (
    <div className="bg-gradient-to-b from-[#0b1120] to-[#111827] min-h-screen font-sans text-white">
      {/* Top spacing for fixed navbar */}
      <div className="pt-24 px-8 space-y-8">
        <h2 className="text-4xl font-extrabold text-center mb-2">
          Live Vehicle Tracking
        </h2>

        <p
          className={`text-center font-medium mb-8 ${
            isConnected ? "text-emerald-400" : "text-rose-500"
          }`}
        >
          {isConnected ? "🟢 Connected to server" : "🔴 Disconnected"}
        </p>

        {/* Map */}
        <div className="w-full h-[80vh] rounded-2xl overflow-hidden border-4 border-blue-500 shadow-xl">
          <MapContainer
            center={[20.5937, 78.9629]}
            zoom={5}
            className="w-full h-full rounded-2xl"
            scrollWheelZoom={false}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="&copy; OpenStreetMap contributors"
            />
            {vehicles
              .filter((v) => v.lat != null && v.lng != null)
              .map((v) => (
                <Marker key={v.id || v._id} position={[v.lat, v.lng]}>
                  <Popup className="bg-gray-900 text-white p-2 rounded-lg shadow-lg">
                    <b>Vehicle ID:</b> {v.id || v._id} <br />
                    <b>Speed:</b> {v.speed || 0} km/h <br />
                    <b>Status:</b> {v.status || "Unknown"}
                  </Popup>
                </Marker>
              ))}
          </MapContainer>
        </div>
      </div>
    </div>
  );
}
