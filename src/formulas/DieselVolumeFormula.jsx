import React from "react";
import { motion } from "framer-motion";
import {
  Calculator,
  Fuel,
  Copy,
  CheckCircle2,
  FileText,
  Building,
  Clock,
  MapPin,
  Beer,
  Users,
  Home,
  Wallet,
  Car,
  Route
} from "lucide-react";

const DieselVolumeFormula = () => {
  const formula = {
    name: "Diesel Volume Sold Formula",
    formula: "Total Diesel Volume Sold = Starting Point + All Factors",
    description: "Estimate diesel volume based on station type, infrastructure, and demographic factors",
    color: "amber",
    startingPoints: [
      { type: "Basic Station", value: "350 (3,500 if truck stop)", description: "Standard station baseline" },
      { type: "Full Service", value: "4,000", description: "Station with additional amenities" },
      { type: "Premium", value: "5,500", description: "High-end station with extensive services" }
    ],
    factors: [
      { name: "24-Hour Operation", icon: Clock },
      { name: "Curb Cuts", icon: Route },
      { name: "Road Frontage", icon: MapPin },
      { name: "Intersection", icon: MapPin },
      { name: "Beer Coverage", icon: Beer },
      { name: "Total Population", icon: Users },
      { name: "Average Home Value", icon: Home },
      { name: "Average Income", icon: Wallet },
      { name: "Road Traffic", icon: Car }
    ]
  };

  const [copied, setCopied] = React.useState(false);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-amber-50 to-orange-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm rounded-2xl px-6 py-4 shadow-lg border border-white/20 mb-6">
            <div className="p-2 bg-gradient-to-r from-amber-500 to-orange-600 rounded-xl">
              <Calculator className="text-white" size={28} />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-amber-600 to-orange-700 bg-clip-text text-transparent">
                Diesel Volume Sold Formula
              </h1>
              <p className="text-gray-600 mt-2 text-lg">
                Predictive model for diesel fuel throughput
              </p>
            </div>
          </div>
        </motion.div>

        {/* Formula Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 overflow-hidden mb-8"
        >
          <div className="p-6 bg-gradient-to-r from-amber-500 to-orange-600 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Fuel size={24} />
                <h2 className="text-2xl font-bold">Volume Calculation</h2>
              </div>
              <div className="relative group">
                <button
                  onClick={() => copyToClipboard(formula.formula)}
                  className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
                >
                  {copied ? <CheckCircle2 size={20} className="text-green-300" /> : <Copy size={20} />}
                </button>
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  Copy Formula
                </div>
              </div>
            </div>
            <p className="mt-2 text-amber-100">{formula.description}</p>
          </div>

          <div className="p-6 border-b border-gray-100">
            <div className="bg-gray-50 rounded-xl p-6">
              <div className="font-mono text-xl text-gray-800 text-center leading-relaxed">
                {formula.formula}
              </div>
            </div>
          </div>

          {/* Variables Breakdown */}
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <FileText size={20} className="text-gray-600" />
              Starting Points (Baseline)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              {formula.startingPoints.map((sp, index) => (
                <motion.div
                  key={sp.type}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="bg-amber-50 rounded-xl p-4 border border-amber-100"
                >
                  <h4 className="font-semibold text-amber-900">{sp.type}</h4>
                  <div className="text-2xl font-bold text-amber-600 my-2">{sp.value}</div>
                  <p className="text-sm text-amber-700">{sp.description}</p>
                </motion.div>
              ))}
            </div>

            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Calculator size={20} className="text-gray-600" />
              Adjustment Factors
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {formula.factors.map((factor, index) => (
                <motion.div
                  key={factor.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + index * 0.05 }}
                  className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200"
                >
                  <factor.icon size={18} className="text-amber-500" />
                  <span className="text-gray-700 font-medium text-sm">{factor.name}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Mathematical Notation */}
          <div className="p-6 bg-gray-50 border-t border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <Calculator size={20} className="text-gray-600" />
              Mathematical Notation
            </h3>
            <div className="bg-white rounded-lg p-4 border border-gray-200 font-mono text-sm text-gray-700">
              <p>V = SP + Σ(F)</p>
              <div className="mt-4 space-y-1 pl-4 border-l-2 border-amber-200">
                <p>V = Total Volume</p>
                <p>SP = Starting Point (Base Volume)</p>
                <p>F = Adjustment Factors (Sum of all applicable factors)</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Example Calculation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-gradient-to-r from-amber-600 to-orange-600 rounded-2xl p-6 shadow-lg text-white mb-8"
        >
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Calculator size={24} />
            Example Calculation
          </h3>
          <div className="bg-white/10 rounded-lg p-4 font-mono text-sm space-y-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-amber-200">Scenario:</p>
                <p>Full Service Station</p>
                <p>Factors Sum: +800</p>
              </div>
              <div>
                <p className="text-amber-200">Values:</p>
                <p>SP = 4,000</p>
                <p>Factors = 800</p>
              </div>
            </div>
            <div className="border-t border-white/20 pt-3 mt-2">
              <p className="font-bold text-lg">Total = 4,000 + 800 = 4,800 gallons</p>
            </div>
          </div>
        </motion.div>

        {/* Application Notes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20"
        >
          <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Building className="text-amber-600" size={24} />
            Application Notes
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">When to Use</h4>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                <li>Projecting diesel sales for new developments</li>
                <li>Evaluating potential acquisitions</li>
                <li>Benchmarking existing station performance</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Key Considerations</h4>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                <li>Truck traffic is a major driver for diesel sales</li>
                <li>Proximity to highways and industrial areas is critical</li>
                <li>Station layout (ease of access for large vehicles) matters</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default DieselVolumeFormula;
