import React from "react";
import { motion } from "framer-motion";
import { 
  Calculator, 
  DollarSign, 
  Building, 
  LandPlot, 
  Hammer,
  TrendingUp,
  FileText,
  Copy,
  CheckCircle2
} from "lucide-react";

const ValuationFormulas = () => {
  const formulas = [
    {
      name: "Valuation Formula",
      formula: "Valuation = Gross Operating Income + Land Value + Total Construction Cost",
      description: "The total property valuation calculated from income, land, and construction components",
      variables: [
        { name: "Gross Operating Income", symbol: "GOI", description: "Total income generated from property operations" },
        { name: "Land Value", symbol: "LV", description: "Current market value of the land" },
        { name: "Total Construction Cost", symbol: "TCC", description: "Complete construction and development costs" }
      ],
      icon: Calculator,
      color: "blue"
    }
  ];

  const [copied, setCopied] = React.useState(false);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm rounded-2xl px-6 py-4 shadow-lg border border-white/20 mb-6">
            <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl">
              <Calculator className="text-white" size={28} />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-700 bg-clip-text text-transparent">
                Valuation Formulas
              </h1>
              <p className="text-gray-600 mt-2 text-lg">
                Mathematical models and calculations for property valuation
              </p>
            </div>
          </div>
        </motion.div>

        {/* Formula Cards */}
        <div className="space-y-6">
          {formulas.map((formula, index) => (
            <motion.div
              key={formula.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 overflow-hidden"
            >
              {/* Formula Header */}
              <div className={`p-6 bg-gradient-to-r from-${formula.color}-500 to-${formula.color}-600 text-white`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <formula.icon size={24} />
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
                <p className="mt-2 text-blue-100">{formula.description}</p>
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
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {formula.variables.map((variable, varIndex) => (
                    <motion.div
                      key={variable.symbol}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.2 + varIndex * 0.1 }}
                      className="bg-gray-50 rounded-xl p-4 border border-gray-200 hover:border-blue-300 transition-colors"
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <div className={`p-2 bg-${formula.color}-100 rounded-lg`}>
                          {varIndex === 0 && <TrendingUp className={`text-${formula.color}-600`} size={16} />}
                          {varIndex === 1 && <LandPlot className={`text-${formula.color}-600`} size={16} />}
                          {varIndex === 2 && <Hammer className={`text-${formula.color}-600`} size={16} />}
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
                    <div className="ml-4">V = Property Valuation</div>
                    <div className="ml-4">GOI = Gross Operating Income</div>
                    <div className="ml-4">LV = Land Value</div>
                    <div className="ml-4">TCC = Total Construction Cost</div>
                    <div className="mt-3 font-semibold">V = GOI + LV + TCC</div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8 bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20"
        >
          <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Building className="text-blue-600" size={24} />
            Application Notes
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-700">
            <div className="space-y-2">
              <h4 className="font-semibold text-gray-900">When to Use</h4>
              <ul className="list-disc list-inside space-y-1">
                <li>Commercial property valuation</li>
                <li>Investment analysis</li>
                <li>Development feasibility studies</li>
                <li>Portfolio management</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-gray-900">Key Considerations</h4>
              <ul className="list-disc list-inside space-y-1">
                <li>Use current market data for inputs</li>
                <li>Consider location-specific factors</li>
                <li>Adjust for property condition and age</li>
                <li>Include all relevant operating expenses</li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Quick Calculation Example */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-6 shadow-lg text-white"
        >
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <DollarSign size={24} />
            Example Calculation
          </h3>
          <div className="font-mono text-sm space-y-2 bg-white/10 rounded-lg p-4">
            <div>GOI = $500,000</div>
            <div>LV = $300,000</div>
            <div>TCC = $700,000</div>
            <div className="border-t border-white/30 pt-2 mt-2 font-bold">
              V = $500,000 + $300,000 + $700,000 = $1,500,000
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ValuationFormulas;