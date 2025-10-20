import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  GitCompare,
  Database,
  DollarSign,
  TrendingUp,
  BarChart3,
  Fuel,
  AlertCircle,
  CheckCircle2,
  XCircle,
} from "lucide-react";

const ComparisonPage = () => {
  const [data, setData] = useState([]);
  const [groupedData, setGroupedData] = useState({});
  const [selectedSites, setSelectedSites] = useState([null, null]);
  const [selectedVersions, setSelectedVersions] = useState([null, null]);
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

        // Group data by site name
        const grouped = jsonData.reduce((acc, row) => {
          const site = row.Site || "Unknown Site";
          if (!acc[site]) acc[site] = [];
          acc[site].push(row);
          return acc;
        }, {});
        setGroupedData(grouped);
      })
      .catch((err) => console.error("Error loading Excel:", err));
  }, []);

  const handleSiteSelect = (index, site) => {
    const newSites = [...selectedSites];
    newSites[index] = site;
    setSelectedSites(newSites);
    // Reset version when site changes
    const newVersions = [...selectedVersions];
    newVersions[index] = null;
    setSelectedVersions(newVersions);
  };

  const handleVersionSelect = (index, version) => {
    const newVersions = [...selectedVersions];
    newVersions[index] = version;
    setSelectedVersions(newVersions);
  };

  const getComparisonData = () => {
    if (!selectedSites[0] || !selectedSites[1] || !selectedVersions[0] || !selectedVersions[1]) {
      return null;
    }

    const site1Data = groupedData[selectedSites[0]]?.find(
      (row) => row.version === selectedVersions[0]
    );
    const site2Data = groupedData[selectedSites[1]]?.find(
      (row) => row.version === selectedVersions[1]
    );

    return [site1Data, site2Data];
  };

  const calculateDifference = (value1, value2) => {
    const num1 = parseFloat(value1) || 0;
    const num2 = parseFloat(value2) || 0;
    const diff = num1 - num2;
    const percentage = num2 !== 0 ? (diff / num2) * 100 : 0;
    
    return {
      value: diff,
      percentage: percentage,
      isPositive: diff >= 0
    };
  };

  const comparisonData = getComparisonData();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-7xl mx-auto">
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
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl">
                <GitCompare className="text-white" size={32} />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-2">
                  Site Comparison
                </h1>
                <p className="text-gray-600 text-lg">
                  Compare different sites and versions side by side
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Selection Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 mb-8"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {[0, 1].map((index) => (
              <div key={index} className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Site {index + 1}
                </h3>
                
                {/* Site Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Site
                  </label>
                  <select
                    value={selectedSites[index] || ""}
                    onChange={(e) => handleSiteSelect(index, e.target.value)}
                    className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white/50 backdrop-blur-sm"
                  >
                    <option value="">Choose a site...</option>
                    {Object.keys(groupedData).map((site) => (
                      <option key={site} value={site}>
                        {site}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Version Selection */}
                {selectedSites[index] && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Select Version
                    </label>
                    <select
                      value={selectedVersions[index] || ""}
                      onChange={(e) => handleVersionSelect(index, e.target.value)}
                      className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white/50 backdrop-blur-sm"
                    >
                      <option value="">Choose a version...</option>
                      {groupedData[selectedSites[index]]?.map((row, i) => (
                        <option key={i} value={row.version}>
                          {row.version || `Version ${i + 1}`}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Comparison Results */}
        {comparisonData && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            {/* Key Metrics Comparison */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">
                Key Metrics Comparison
              </h3>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {[
                  {
                    key: "Valuation",
                    icon: DollarSign,
                    color: "blue",
                    format: (val) => `$${(parseFloat(val) || 0).toLocaleString()}`
                  },
                  {
                    key: "Forecast",
                    icon: BarChart3,
                    color: "purple",
                    format: (val) => `$${(parseFloat(val) || 0).toLocaleString()}`
                  },
                  {
                    key: "Monthly Gas total",
                    icon: Fuel,
                    color: "orange",
                    format: (val) => (parseFloat(val) || 0).toLocaleString()
                  }
                ].map(({ key, icon: Icon, color, format }) => {
                  const value1 = comparisonData[0]?.[key] || 0;
                  const value2 = comparisonData[1]?.[key] || 0;
                  const diff = calculateDifference(value1, value2);

                  return (
                    <div key={key} className="bg-gray-50/50 rounded-xl p-4">
                      <div className="flex items-center gap-3 mb-4">
                        <div className={`p-2 bg-${color}-100 rounded-lg`}>
                          <Icon className={`text-${color}-600`} size={20} />
                        </div>
                        <h4 className="font-semibold text-gray-900">{key}</h4>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Site 1:</span>
                          <span className="font-semibold">{format(value1)}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Site 2:</span>
                          <span className="font-semibold">{format(value2)}</span>
                        </div>
                        <div className="border-t pt-3">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">Difference:</span>
                            <div className="flex items-center gap-2">
                              <span className={`font-semibold ${
                                diff.isPositive ? 'text-green-600' : 'text-red-600'
                              }`}>
                                {diff.isPositive ? '+' : ''}{format(diff.value.toString())}
                              </span>
                              {diff.value !== 0 && (
                                <span className={`text-xs px-2 py-1 rounded-full ${
                                  diff.isPositive 
                                    ? 'bg-green-100 text-green-700' 
                                    : 'bg-red-100 text-red-700'
                                }`}>
                                  {diff.isPositive ? '↑' : '↓'} {Math.abs(diff.percentage).toFixed(1)}%
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Detailed Comparison Table */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100/50">
                <h3 className="text-xl font-semibold text-gray-900">
                  Detailed Comparison
                </h3>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50/80 border-b border-gray-100/50">
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                        Metric
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                        {selectedSites[0]} ({selectedVersions[0]})
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                        {selectedSites[1]} ({selectedVersions[1]})
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                        Difference
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100/50">
                    {[
                      'Valuation', 'Forecast', 'Monthly Gas total', 
                      'Monthly Diesel Gallons', 'Electricity Cost', 'Maintenance Cost'
                    ].map((metric) => {
                      const value1 = comparisonData[0]?.[metric] || 0;
                      const value2 = comparisonData[1]?.[metric] || 0;
                      const diff = calculateDifference(value1, value2);
                      
                      const formatValue = (val) => {
                        if (typeof val === 'number' || !isNaN(val)) {
                          const numVal = parseFloat(val);
                          if (metric.includes('$') || metric.includes('Valuation') || metric.includes('Forecast') || metric.includes('Cost')) {
                            return `$${numVal.toLocaleString()}`;
                          }
                          return numVal.toLocaleString();
                        }
                        return val || 'N/A';
                      };

                      return (
                        <tr key={metric} className="hover:bg-gray-50/50 transition-colors">
                          <td className="px-6 py-4 font-medium text-gray-900">
                            {metric}
                          </td>
                          <td className="px-6 py-4">
                            <span className="font-semibold">
                              {formatValue(value1)}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span className="font-semibold">
                              {formatValue(value2)}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              {diff.value !== 0 ? (
                                <>
                                  <span className={`font-semibold ${
                                    diff.isPositive ? 'text-green-600' : 'text-red-600'
                                  }`}>
                                    {diff.isPositive ? '+' : ''}{formatValue(diff.value.toString())}
                                  </span>
                                  <span className={`text-xs px-2 py-1 rounded-full ${
                                    diff.isPositive 
                                      ? 'bg-green-100 text-green-700' 
                                      : 'bg-red-100 text-red-700'
                                  }`}>
                                    {Math.abs(diff.percentage).toFixed(1)}%
                                  </span>
                                </>
                              ) : (
                                <span className="text-gray-500 flex items-center gap-1">
                                  <CheckCircle2 size={16} className="text-green-500" />
                                  Equal
                                </span>
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}

        {!comparisonData && selectedSites[0] && selectedSites[1] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20"
          >
            <AlertCircle className="mx-auto text-yellow-500 mb-4" size={48} />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              Select Versions to Compare
            </h3>
            <p className="text-gray-500">
              Please select versions for both sites to see the comparison
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ComparisonPage;