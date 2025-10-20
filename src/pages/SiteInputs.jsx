import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Building,
  Fuel,
  Ruler,
  DollarSign,
  Coffee,
  Store,
  Snowflake,
  Scissors,
  MapPin,
  Navigation,
  Clock,
  TrendingUp,
  BarChart3,
  Database
} from "lucide-react";

const SiteInputs = () => {
  const { siteName } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/data/sites.xlsx")
      .then((res) => res.arrayBuffer())
      .then((buffer) => {
        const workbook = XLSX.read(buffer, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);

        const siteRows = jsonData.filter(
          (row) => row.Site?.toLowerCase() === siteName?.toLowerCase()
        );

        const lastVersion = siteRows.length > 0 ? siteRows[siteRows.length - 1] : null;
        setData(lastVersion);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [siteName]);

  // Field configuration with icons and colors
  const fieldConfig = [
    { key: "MPD", label: "MPD", icon: Fuel, color: "blue" },
    { key: "Diesel", label: "Diesel Hoses", icon: Fuel, color: "orange" },
    { key: "Sq ft", label: "Square Footage", icon: Ruler, color: "emerald" },
    { key: "PricePerSqft", label: "Price per Sq Ft", icon: DollarSign, color: "green" },
    { key: "QSR/Deli", label: "QSR/Deli", icon: Coffee, color: "amber" },
    { key: "Retail Tenant (number and total sqft)", label: "Retail Tenant", icon: Store, color: "purple" },
    { key: "Store", label: "Store", icon: Building, color: "indigo" },
    { key: "Store (Freezer, Cooler)", label: "Freezer/Cooler", icon: Snowflake, color: "cyan" },
    { key: "Curb Cuts", label: "Curb Cuts", icon: Scissors, color: "rose" },
    { key: "frontage", label: "Frontage", icon: MapPin, color: "lime" },
    { key: "Is at intersection", label: "At Intersection", icon: Navigation, color: "violet" },
    { key: "24 hour", label: "24 Hour Operation", icon: Clock, color: "yellow" }
  ];

  const formatValue = (key, value) => {
    if (value === undefined || value === null || value === "") return "N/A";
    
    if (key === "PricePerSqft") {
      return `$${parseFloat(value).toLocaleString()}`;
    }
    if (key === "Sq ft") {
      return `${parseFloat(value).toLocaleString()} sq ft`;
    }
    if (["MPD", "Diesel"].includes(key)) {
      return `${parseFloat(value).toLocaleString()}`;
    }
    return value;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading {siteName} data...</p>
        </motion.div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <Database className="mx-auto text-gray-400 mb-4" size={48} />
          <h2 className="text-2xl font-bold text-gray-700 mb-2">No Data Found</h2>
          <p className="text-gray-500 mb-6">No data available for {siteName}</p>
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-semibold transition-colors"
          >
            Go Back
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-6 transition-colors group"
          >
            <ArrowLeft 
              size={20} 
              className="group-hover:-translate-x-1 transition-transform" 
            />
            Back to Dashboard
          </button>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl">
                <Building className="text-white" size={32} />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-2">
                  {siteName}
                </h1>
                <p className="text-gray-600 text-lg">
                  Latest Site Configuration & Inputs
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {fieldConfig.map(({ key, label, icon: Icon, color }, index) => {
            const value = data[key];
            if (value === undefined || value === null || value === "") return null;

            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className={`p-3 bg-${color}-100 rounded-xl flex-shrink-0`}>
                    <Icon className={`text-${color}-600`} size={24} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 mb-2 text-lg">
                      {label}
                    </h3>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      {formatValue(key, value)}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Additional Features Section */}
        {(data["Is at intersection"] || data["24 hour"] || data["Curb Cuts"]) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-8 bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20"
          >
            <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
              <BarChart3 className="text-blue-600" size={24} />
              Site Features
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {data["Is at intersection"] && (
                <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-xl">
                  <Navigation className="text-blue-600" size={20} />
                  <span className="font-medium text-gray-900">At Intersection</span>
                </div>
              )}
              {data["24 hour"] && (
                <div className="flex items-center gap-3 p-4 bg-green-50 rounded-xl">
                  <Clock className="text-green-600" size={20} />
                  <span className="font-medium text-gray-900">24 Hour Operation</span>
                </div>
              )}
              {data["Curb Cuts"] && (
                <div className="flex items-center gap-3 p-4 bg-purple-50 rounded-xl">
                  <Scissors className="text-purple-600" size={20} />
                  <span className="font-medium text-gray-900">Curb Cuts Available</span>
                </div>
              )}
            </div>
          </motion.div>
        )}
        {fieldConfig.every(({ key }) => !data[key]) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20"
          >
            <Database className="mx-auto text-gray-400 mb-4" size={48} />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              No Input Data Available
            </h3>
            <p className="text-gray-500">
              No user input data found for this site
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};
export default SiteInputs;