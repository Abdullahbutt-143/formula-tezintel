import React from "react";
import { motion } from "framer-motion";
import { 
  TrendingUp, 
  Calculator, 
  DollarSign, 
  Fuel, 
  Utensils, 
  Store, 
  ShoppingBag, 
  Car, 
  Copy, 
  CheckCircle2, 
  FileText,
  Building
} from "lucide-react";

const GrossOperatingIncomeFormulas = () => {
  const formula = {
    name: "Gross Operating Income (GOI)",
    formula: "GOI = Gas Income + Diesel Income + Foodservice Income + Deli Income + Retail Tenants Income + Car Wash Income",
    description: "The total operating income generated from all property revenue streams",
    variables: [
      { name: "Gas Income", symbol: "GI", description: "Revenue from gas sales", icon: Fuel },
      { name: "Diesel Income", symbol: "DI", description: "Revenue from diesel sales", icon: Fuel },
      { name: "Foodservice Income", symbol: "FI", description: "Revenue from foodservice operations", icon: Utensils },
      { name: "Deli Income", symbol: "DelI", description: "Revenue from deli operations", icon: Store },
      { name: "Retail Tenants Income", symbol: "RTI", description: "Revenue from retail tenants", icon: ShoppingBag },
      { name: "Car Wash Income", symbol: "CWI", description: "Revenue from car wash services", icon: Car }
    ],
    color: "green"
  };

  const [copied, setCopied] = React.useState(false);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-green-50 to-emerald-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm rounded-2xl px-6 py-4 shadow-lg border border-white/20 mb-6">
            <div className="p-2 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl">
              <TrendingUp className="text-white" size={28} />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-700 bg-clip-text text-transparent">
                Gross Operating Income Formulas
              </h1>
              <p className="text-gray-600 mt-2 text-lg">
                Detailed breakdown of revenue streams contributing to total operating income
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
          {/* Formula Header */}
          <div className="p-6 bg-gradient-to-r from-green-500 to-emerald-600 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Calculator size={24} />
                <h2 className="text-2xl font-bold">{formula.name}</h2>
              </div>
              <button
                onClick={() => copyToClipboard(formula.formula)}
                className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
                title="Copy formula"
              >
                {copied ? (
                  <CheckCircle2 size={20} className="text-green-300" />
                ) : (
                  <Copy size={20} />
                )}
              </button>
            </div>
            <p className="mt-2 text-green-100">{formula.description}</p>
          </div>

          {/* Formula Display */}
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
              Formula Components
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {formula.variables.map((variable, index) => (
                <motion.div
                  key={variable.symbol}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="bg-gray-50 rounded-xl p-4 border border-gray-200 hover:border-green-300 transition-colors"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <variable.icon className="text-green-600" size={16} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{variable.name}</h4>
                      <span className="text-sm text-gray-600 font-mono">({variable.symbol})</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">{variable.description}</p>
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
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <div className="font-mono text-sm text-gray-700 space-y-2">
                <div>Let:</div>
                <div className="ml-4">GOI = Gross Operating Income</div>
                {formula.variables.map(v => (
                  <div key={v.symbol} className="ml-4">{v.symbol} = {v.name}</div>
                ))}
                <div className="mt-3 font-semibold">GOI = GI + DI + FI + DelI + RTI + CWI</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Additional Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-8 bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20"
        >
          <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Building className="text-green-600" size={24} />
            Application Notes
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-700">
            <div className="space-y-2">
              <h4 className="font-semibold text-gray-900">When to Use</h4>
              <ul className="list-disc list-inside space-y-1">
                <li>Commercial property revenue analysis</li>
                <li>Budgeting</li>
                <li>Forecasting</li>
                <li>Investment analysis</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-gray-900">Key Considerations</h4>
              <ul className="list-disc list-inside space-y-1">
                <li>Use accurate income data</li>
                <li>Seasonal adjustments</li>
                <li>Location-specific trends</li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Example Calculation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-6 shadow-lg text-white"
        >
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <DollarSign size={24} />
            Example Calculation
          </h3>
          <div className="font-mono text-sm space-y-2 bg-white/10 rounded-lg p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
              <div>GI = $400,000</div>
              <div>DI = $150,000</div>
              <div>FI = $200,000</div>
              <div>DelI = $50,000</div>
              <div>RTI = $100,000</div>
              <div>CWI = $30,000</div>
            </div>
            <div className="border-t border-white/30 pt-2 mt-2 font-bold">
              GOI = $400,000 + $150,000 + $200,000 + $50,000 + $100,000 + $30,000 = $930,000
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default GrossOperatingIncomeFormulas;
