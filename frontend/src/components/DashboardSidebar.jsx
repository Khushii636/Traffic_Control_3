// src/components/DashboardSidebar.jsx
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Receipt,
  DollarSign,
  Car,
  BarChart3,
  Shield
} from "lucide-react";

// All navigation links
const navigation = [
  { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { name: "Fines Management", href: "/dashboard/fines", icon: Receipt },
  { name: "Toll Management", href: "/dashboard/tolls", icon: DollarSign },
  { name: "Vehicle Management", href: "/dashboard/vehicles", icon: Car },
  { name: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
];

export function DashboardSidebar() {
  return (
    <div className="w-64 min-h-screen bg-white border-r border-gray-200 shadow-md">
      <div className="p-6">
        {/* Logo / Header */}
        <div className="flex items-center space-x-2 mb-10">
          <Shield className="h-8 w-8 text-indigo-600" />
          <span className="text-xl font-bold text-gray-800">
            Traffic Admin
          </span>
        </div>

        {/* Navigation */}
        <nav className="space-y-1">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              end={item.href === "/dashboard"}
              className={({ isActive }) =>
                [
                  "flex items-center space-x-3 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200",
                  isActive
                    ? "bg-indigo-600 text-white shadow-sm"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                ].join(" ")
              }
            >
              <item.icon className="h-5 w-5" />
              <span>{item.name}</span>
            </NavLink>
          ))}
        </nav>
      </div>
    </div>
  );
}
