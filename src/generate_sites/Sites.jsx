import React from "react";
import { motion } from "framer-motion";
import { MapPin, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const sites = [
  { name: "Skippers Port", id: "skippers-port" },
  { name: "Onalaska", id: "onalaska" },
  { name: "Livingston", id: "livingston" },
  { name: "Hit the Road", id: "hit-the-road" },
];

const Sites = () => {
    const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-700 bg-clip-text text-transparent mb-4">
            Generate Site Report
          </h1>
          <p className="text-gray-600 text-lg">
            Select a site below to generate a detailed report.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sites.map((site, index) => (
            <motion.div
              key={site.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 cursor-pointer group hover:border-blue-300 transition-all"
              onClick={() => {
                  // Placeholder for navigation or action
                  console.log(`Selected site: ${site.name}`);
              }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-blue-100 rounded-xl text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <MapPin size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 group-hover:text-blue-700 transition-colors">
                    {site.name}
                  </h3>
                </div>
                <ArrowRight className="text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" size={24} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sites;
