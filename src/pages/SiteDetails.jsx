import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";
import {
  ArrowLeft,
  Database,
  BarChart3,
  Calendar,
  DollarSign,
  TrendingUp,
  Fuel,
} from "lucide-react";
import { motion } from "framer-motion";

const SiteDetails = () => {
  const { siteName } = useParams();
  const navigate = useNavigate();
  const [siteData, setSiteData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSiteData = async () => {
      try {
        const response = await fetch("/data/sites.xlsx");
        const buffer = await response.arrayBuffer();
        const workbook = XLSX.read(buffer, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);

        // Filter data for the specific site
        const filteredData = jsonData.filter(
          (row) => row.Site === decodeURIComponent(siteName)
        );

        setSiteData(filteredData);
      } catch (err) {
        console.error("Error loading Excel:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSiteData();
  }, [siteName]);

  const getSiteStats = () => {
    if (siteData.length === 0) return {};

    // Assuming the last row in the file is the latest version
    const latest = siteData[siteData.length - 1];

    const latestValuation = parseFloat(latest.Valuation) || 0;
    const latestForecast = parseFloat(latest.Forecast) || 0;
    const latestGas = parseFloat(latest["Monthly Gas total"]) || 0;
    const latestDiesel = parseFloat(latest["Monthly Diesel Gallons"]) || 0;

    return {
      latestValuation,
      latestForecast,
      latestTotalVolume: latestGas + latestDiesel,
    };
  };

  const stats = getSiteStats();
  const isIMST = siteName?.toLowerCase().includes("imst");

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading site data...</p>
        </div>
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
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-6 transition-colors"
          >
            <ArrowLeft size={20} />
            Back to Dashboard
          </button>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20">
            <div className="flex items-center gap-4 mb-4">
              <div
                className={`p-3 rounded-xl ${
                  isIMST
                    ? "bg-blue-100 text-blue-600"
                    : "bg-green-100 text-green-600"
                }`}
              >
                <Database size={32} />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-2">
                  {decodeURIComponent(siteName)}
                </h1>
                <div className="flex items-center gap-4 text-gray-600">
                  <span className="flex items-center gap-1">
                    <Calendar size={16} />
                    {siteData.length} version
                    {siteData.length > 1 ? "s" : ""}
                  </span>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      isIMST
                        ? "bg-blue-100 text-blue-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {isIMST ? "IMST Site" : "Our Site"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
        >
          {/* Latest Valuation */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <DollarSign className="text-blue-600" size={20} />
              </div>
              <div>
                <p className="text-sm text-gray-600">Latest Valuation</p>
                <p className="text-2xl font-bold text-gray-900">
                  ${stats.latestValuation.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </p>
              </div>
            </div>
          </div>

          {/* Latest Forecast */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <BarChart3 className="text-purple-600" size={20} />
              </div>
              <div>
                <p className="text-sm text-gray-600">Latest Forecast</p>
                <p className="text-2xl font-bold text-gray-900">
                  ${stats.latestForecast.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </p>
              </div>
            </div>
          </div>

          {/* Latest Total Volume */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Fuel className="text-orange-600" size={20} />
              </div>
              <div>
                <p className="text-sm text-gray-600">Latest Total Volume (Gas + Diesel)</p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.latestTotalVolume.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Data Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 overflow-hidden"
        >
          <div className="px-6 py-4 border-b border-gray-100/50">
            <h2 className="text-xl font-semibold text-gray-900">Version Details</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50/80 border-b border-gray-100/50">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Version</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Valuation</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Forecast</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Monthly Gas Total</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Monthly Diesel Gallons</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100/50">
                {siteData.map((row, index) => (
                  <tr key={index} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                        {row.version || "N/A"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-lg font-semibold text-gray-900">
                      ${(row.Valuation || 0).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-gray-700">
                      ${(row.Forecast || 0).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-gray-700">
                      {(row["Monthly Gas total"] || 0).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-gray-700">
                      {(row["Monthly Diesel Gallons"] || 0).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SiteDetails;
