import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import { motion, AnimatePresence } from "framer-motion";
import {
  Database,
  BarChart3,
  Filter,
  ExternalLink,
  Calendar,
  TrendingUp,
  GitCompare,
  Plus,
} from "lucide-react";
import SiteDetails from "./SiteDetails";
import ComparisonPage from "./ComparisonPage";
import { useNavigate } from "react-router-dom";

const ExcelViewer = () => {
  const [data, setData] = useState([]);
  const [expanded, setExpanded] = useState(null);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/data/sites.xlsx")
      .then((res) => res.arrayBuffer())
      .then((buffer) => {
        const workbook = XLSX.read(buffer, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);
        setData(jsonData);
      })
      .catch((err) => console.error("Error loading Excel:", err));
  }, []);

  const groupedData = data.reduce((acc, row) => {
    const site = row.Site || "Unknown Site";
    if (!acc[site]) acc[site] = [];
    acc[site].push(row);
    return acc;
  }, {});

  const filteredEntries = Object.entries(groupedData)
    .filter(([site]) => {
      const isIMST = site.toLowerCase().includes("imst");
      if (filter === "imst") return isIMST;
      if (filter === "our") return !isIMST;
      return true;
    })
    .filter(([site]) => site.toLowerCase().includes(searchTerm.toLowerCase()));

  const handleViewDetails = (siteName) => {
    navigate(`/site/${encodeURIComponent(siteName)}/detail`);
  };

  const handleCompareSites = () => {
    navigate("/compare");
  };

  const getSiteStats = (rows) => {
    const valuations = rows.map((r) => parseFloat(r.Valuation) || 0);
    const gasTotals = rows.map((r) => parseFloat(r["Monthly Gas total"]) || 0);

    return {
      avgValuation: valuations.reduce((a, b) => a + b, 0) / valuations.length,
      maxValuation: Math.max(...valuations),
      totalGas: gasTotals.reduce((a, b) => a + b, 0),
      versionCount: rows.length,
    };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm rounded-2xl px-6 py-4 shadow-lg border border-white/20 mb-6">
            <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl">
              <BarChart3 className="text-white" size={28} />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-700 bg-clip-text text-transparent">
                Site Valuation Dashboard
              </h1>
              <p className="text-gray-600 mt-2 text-lg">
                Explore uploaded Excel data interactively — view, compare, and
                analyze versions.
              </p>
            </div>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 mb-8"
        >
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="flex-1 w-full lg:max-w-md">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search sites..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white/50 backdrop-blur-sm"
                />
                <Filter
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <div className="flex flex-wrap gap-2">
                {[
                  { key: "all", label: "All Sites", color: "gray" },
                  { key: "our", label: "Our Sites", color: "green" },
                  { key: "imst", label: "IMST Sites", color: "blue" },
                ].map(({ key, label, color }) => {
                  const isActive = filter === key;
                  return (
                    <button
                      key={key}
                      onClick={() => setFilter(key)}
                      className={`px-6 py-3 rounded-xl font-semibold transition-all flex items-center gap-2 ${
                        isActive
                          ? `${
                              key === "all"
                                ? "bg-gray-700 text-white shadow-lg shadow-gray-500/25"
                                : `bg-${color}-500 text-white shadow-lg shadow-${color}-500/25`
                            }`
                          : `bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 hover:border-${color}-200`
                      }`}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
              <button
                onClick={handleCompareSites}
                className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white rounded-xl font-semibold transition-all flex items-center gap-2 shadow-lg shadow-purple-500/25"
              >
                <GitCompare size={20} />
                Compare Sites
              </button>
              <button
                onClick={() => navigate("/formulas")}
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white rounded-xl font-semibold transition-all flex items-center gap-2 shadow-lg shadow-blue-500/25"
              >
                <BarChart3 size={20} />
                Formulas
              </button>
              <button
                onClick={() => navigate("/generate-sites")}
                className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white rounded-xl font-semibold transition-all flex items-center gap-2 shadow-lg shadow-emerald-500/25"
              >
                <Plus size={20} />
                Generate site
              </button>
            </div>
          </div>
        </motion.div>
        {filteredEntries.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8"
          >
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-white/20">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Database className="text-blue-600" size={20} />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Sites</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {filteredEntries.length}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-white/20">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <TrendingUp className="text-green-600" size={20} />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Versions</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {filteredEntries.reduce(
                      (acc, [_, rows]) => acc + rows.length,
                      0
                    )}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
        <div className="space-y-6">
          <AnimatePresence>
            {filteredEntries.map(([site, rows], index) => {
              const isExpanded = expanded === site;
              const isIMST = site.toLowerCase().includes("imst");
              const stats = getSiteStats(rows);
              return (
                <motion.div
                  key={site}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  layout
                  className={`bg-white/80 backdrop-blur-sm border border-white/20 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 ${
                    isIMST ? "hover:border-blue-300" : "hover:border-green-300"
                  }`}
                >
                  <div className="flex justify-between items-center p-6">
                    <div className="flex items-center gap-4 flex-1">
                      <div
                        className={`p-3 rounded-xl ${
                          isIMST
                            ? "bg-blue-100 text-blue-600"
                            : "bg-green-100 text-green-600"
                        }`}
                      >
                        <Database size={24} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h2
                            className={`text-2xl font-bold ${
                              isIMST ? "text-blue-700" : "text-green-700"
                            }`}
                          >
                            {site}
                          </h2>
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              isIMST
                                ? "bg-blue-100 text-blue-700"
                                : "bg-green-100 text-green-700"
                            }`}
                          >
                            {isIMST ? "IMST" : "Our Site"}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                          <span className="flex items-center gap-1">
                            <Calendar size={16} />
                            {rows.length} version{rows.length > 1 ? "s" : ""}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(
                            `/site/${encodeURIComponent(site)}/overview`
                          );
                        }}
                        className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
                          isIMST
                            ? "bg-blue-500 hover:bg-blue-600 text-white"
                            : "bg-green-500 hover:bg-green-600 text-white"
                        }`}
                      >
                        <ExternalLink size={16} />
                        Overview
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/site/${encodeURIComponent(site)}/detail`);
                        }}
                        className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
                          isIMST
                            ? "bg-purple-500 hover:bg-purple-600 text-white"
                            : "bg-indigo-500 hover:bg-indigo-600 text-white"
                        }`}
                      >
                        <BarChart3 size={16} />
                        Full Report
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(
                            `/site/${encodeURIComponent(site)}/user-inputs`
                          );
                        }}
                        className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
                          isIMST
                            ? "bg-pink-500 hover:bg-pink-600 text-white"
                            : "bg-orange-500 hover:bg-orange-600 text-white"
                        }`}
                      >
                        <GitCompare size={16} />
                        User Inputs
                      </button>
                    </div>
                  </div>
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        key="content"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                        className="border-t border-gray-100/50"
                      >
                        <div className="p-6">
                          <SiteDetails site={site} rows={rows} />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </AnimatePresence>
          {filteredEntries.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20"
            >
              <Database className="mx-auto text-gray-400 mb-4" size={48} />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                No sites found
              </h3>
              <p className="text-gray-500">
                {searchTerm
                  ? "Try adjusting your search terms"
                  : "No data available for the selected filter"}
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};
export default ExcelViewer;
