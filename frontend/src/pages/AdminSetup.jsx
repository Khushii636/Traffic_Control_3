import { 
  Receipt, DollarSign, Car, TrendingUp, 
  AlertTriangle, CheckCircle, Plus, Eye, 
  RefreshCw, BarChart3
} from "lucide-react";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { DashboardSidebar } from "../components/DashboardSidebar"; // <-- Import Sidebar

const metrics = [
  {
    title: "Total Fines",
    value: "2,847",
    change: "+12%",
    changeType: "increase",
    icon: Receipt,
    color: "text-red-500",
    bgColor: "bg-red-500/10"
  },
  {
    title: "Toll Revenue",
    value: "$45,230",
    change: "+8.2%",
    changeType: "increase",
    icon: DollarSign,
    color: "text-green-500",
    bgColor: "bg-green-500/10"
  },
  {
    title: "Registered Vehicles",
    value: "18,592",
    change: "+3.1%",
    changeType: "increase",
    icon: Car,
    color: "text-blue-500",
    bgColor: "bg-blue-500/10"
  },
  {
    title: "Active Violations",
    value: "156",
    change: "-15%",
    changeType: "decrease",
    icon: AlertTriangle,
    color: "text-yellow-500",
    bgColor: "bg-yellow-500/10"
  },
];

const recentFines = [
  { id: "F001", vehicle: "ABC-123", amount: "$150", type: "Speeding", status: "Pending" },
  { id: "F002", vehicle: "XYZ-789", amount: "$75", type: "Parking", status: "Paid" },
  { id: "F003", vehicle: "DEF-456", amount: "$200", type: "Red Light", status: "Pending" },
  { id: "F004", vehicle: "GHI-321", amount: "$100", type: "No Seat Belt", status: "Paid" },
];

const recentTolls = [
  { id: "T001", location: "Highway 101 North", revenue: "$2,340", vehicles: 156 },
  { id: "T002", location: "Bridge Crossing", revenue: "$1,890", vehicles: 98 },
  { id: "T003", location: "Downtown Tunnel", revenue: "$3,450", vehicles: 203 },
];

export default function Dashboard() {
  const { logout } = useContext(AuthContext);
  const [showSidebar, setShowSidebar] = useState(false); // <-- State to toggle sidebar

  const handleQuickAction = () => setShowSidebar((prev) => !prev);
  const handleViewFines = () => alert("Navigating to fines management...");
  const handleViewTolls = () => alert("Loading toll performance details...");
  const handleMetricClick = (title) => alert(`Viewing detailed analytics for ${title}`);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar (conditionally visible) */}
      {showSidebar && <DashboardSidebar />}

      {/* Main Dashboard Content */}
      <div className="flex-1 space-y-6 p-6 bg-slate-900 text-slate-100">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold">Dashboard Overview</h2>
          <div className="flex space-x-3">
            <button 
              onClick={() => window.location.reload()}
              className="flex items-center px-4 py-2 rounded-lg border border-slate-600 hover:bg-slate-800 transition"
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              Refresh
            </button>
            <button 
              onClick={handleQuickAction}
              className="flex items-center px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 transition"
            >
              <Plus className="mr-2 h-4 w-4" />
              Quick Actions
            </button>
            {/* Logout Button */}
            <button
              onClick={logout}
              className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-lg hover:bg-red-600 transition-all hover:scale-105 shadow-md shadow-red-500/30"
            >
              Log out
            </button>
          </div>
        </div>

        {/* Metrics */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {metrics.map((metric, idx) => (
            <div 
              key={idx}
              onClick={() => handleMetricClick(metric.title)}
              className="rounded-xl p-4 bg-slate-800 shadow hover:shadow-lg hover:scale-105 cursor-pointer transition group"
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-sm font-medium text-slate-400 group-hover:text-slate-100">
                  {metric.title}
                </h3>
                <div className={`p-2 rounded-lg ${metric.bgColor}`}>
                  <metric.icon className={`h-4 w-4 ${metric.color}`} />
                </div>
              </div>
              <div className="text-2xl font-bold">{metric.value}</div>
              <div className="flex items-center space-x-2 text-xs mt-1">
                <TrendingUp className={`h-3 w-3 ${metric.changeType === 'increase' ? 'text-green-500' : 'text-red-500'}`} />
                <span className={metric.changeType === 'increase' ? 'text-green-500' : 'text-red-500'}>
                  {metric.change}
                </span>
                <span className="text-slate-500">from last month</span>
              </div>
            </div>
          ))}
        </div>

        {/* Two panels: Recent Fines + Toll Performance */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Recent Fines */}
          <div className="rounded-xl bg-slate-800 shadow hover:shadow-lg transition p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Recent Fines</h3>
              <button 
                onClick={handleViewFines}
                className="flex items-center px-3 py-1 rounded-lg border border-slate-600 hover:bg-slate-700 transition text-sm"
              >
                <Eye className="mr-2 h-4 w-4" /> View All
              </button>
            </div>
            <div className="space-y-3">
              {recentFines.map(fine => (
                <div 
                  key={fine.id}
                  className="flex justify-between items-center p-3 rounded-lg bg-slate-700 hover:bg-slate-600 cursor-pointer transition"
                >
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold">{fine.id}</span>
                      <span className="px-2 py-0.5 text-xs border border-slate-500 rounded">{fine.vehicle}</span>
                    </div>
                    <p className="text-xs text-slate-400">{fine.type}</p>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">{fine.amount}</div>
                    <span className={`px-2 py-0.5 text-xs rounded ${fine.status === 'Paid' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                      {fine.status === 'Paid' && <CheckCircle className="inline h-3 w-3 mr-1" />}
                      {fine.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Toll Performance */}
          <div className="rounded-xl bg-slate-800 shadow hover:shadow-lg transition p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Toll Performance</h3>
              <button 
                onClick={handleViewTolls}
                className="flex items-center px-3 py-1 rounded-lg border border-slate-600 hover:bg-slate-700 transition text-sm"
              >
                <BarChart3 className="mr-2 h-4 w-4" /> View Details
              </button>
            </div>
            <div className="space-y-3">
              {recentTolls.map(toll => (
                <div 
                  key={toll.id}
                  className="flex justify-between items-center p-3 rounded-lg bg-slate-700 hover:bg-slate-600 cursor-pointer transition"
                >
                  <div>
                    <div className="font-semibold">{toll.location}</div>
                    <p className="text-xs text-slate-400">{toll.vehicles} vehicles</p>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-green-400">{toll.revenue}</div>
                    <p className="text-xs text-slate-400">Today</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
