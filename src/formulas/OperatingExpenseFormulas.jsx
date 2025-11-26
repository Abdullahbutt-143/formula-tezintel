import React from "react";
import { motion } from "framer-motion";
import { 
  Calculator, 
  DollarSign, 
  Building, 
  Fuel, 
  Utensils, 
  Store, 
  ShoppingBag, 
  Car, 
  Copy, 
  CheckCircle2, 
  FileText,
  TrendingUp
} from "lucide-react";

const OperatingExpenseFormulas = () => {
  const formulas = [
    {
      id: "operating-expense",
      name: "Operating Expense Formula",
      formula: "Operating Expense = Gas Expense + Diesel Expense + Foodservice Expense + Deli Expense + Retail Tenants Expense + Car Wash Expense",
      description: "Total operating expense calculated from various property cost components",
      variables: [
        { name: "Gas Expense", symbol: "GE", description: "Cost of gas usage", icon: Fuel },
        { name: "Diesel Expense", symbol: "DE", description: "Cost of diesel usage", icon: Fuel },
        { name: "Foodservice Expense", symbol: "FE", description: "Costs related to property foodservice operations", icon: Utensils },
        { name: "Deli Expense", symbol: "DelE", description: "Costs related to deli operations", icon: Store },
        { name: "Retail Tenants Expense", symbol: "RTE", description: "Expenses charged to retail tenants", icon: ShoppingBag },
        { name: "Car Wash Expense", symbol: "CWE", description: "Costs for car wash operations", icon: Car }
      ],
      color: "blue",
      icon: Calculator,
      example: {
        inputs: [
          { label: "Gas", value: "$500" },
          { label: "Diesel", value: "$200" },
          { label: "Foodservice", value: "$300" },
          { label: "Deli", value: "$100" },
          { label: "Retail Tenants", value: "$400" },
          { label: "Car Wash", value: "$150" }
        ],
        result: "$1,650",
        calculation: "OE = $500 + $200 + $300 + $100 + $400 + $150 = $1,650"
      },
      notation: {
        main: "OE = GE + DE + FE + DelE + RTE + CWE",
        definitions: [
          { symbol: "OE", name: "Operating Expense" },
          { symbol: "GE", name: "Gas Expense" },
          { symbol: "DE", name: "Diesel Expense" },
          { symbol: "FE", name: "Foodservice Expense" },
          { symbol: "DelE", name: "Deli Expense" },
          { symbol: "RTE", name: "Retail Tenants Expense" },
          { symbol: "CWE", name: "Car Wash Expense" }
        ]
      }
    },
    {
      id: "c-store-expense",
      name: "C-Store Expense Formula",
      formula: "C-Store Expense = Direct Expenses + Indirect Expenses",
      description: "Convenience store expenses broken down into direct and indirect expenses",
      variables: [
        { name: "Direct Expenses", symbol: "DE", description: "Costs directly attributable to C-store operations", icon: DollarSign },
        { name: "Indirect Expenses", symbol: "IE", description: "Overhead and indirect costs", icon: TrendingUp }
      ],
      color: "green",
      icon: DollarSign,
      example: {
        inputs: [
          { label: "Direct", value: "$500" },
          { label: "Indirect", value: "$200" }
        ],
        result: "$700",
        calculation: "CSE = $500 + $200 = $700"
      },
      notation: {
        main: "CSE = DE + IE",
        definitions: [
          { symbol: "CSE", name: "C-Store Expense" },
          { symbol: "DE", name: "Direct Expenses" },
          { symbol: "IE", name: "Indirect Expenses" }
        ]
      }
    }
  ];

  const [copied, setCopied] = React.useState(null);

  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
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
                Operating Expense Formulas
              </h1>
              <p className="text-gray-600 mt-2 text-lg">
                Mathematical models and calculations for operating expenses in properties
              </p>
            </div>
          </div>
        </motion.div>

        <div className="space-y-12">
          {formulas.map((formula, index) => (
            <motion.div
              key={formula.id}
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
                    onClick={() => copyToClipboard(formula.formula, formula.id)}
                    className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
                    title="Copy formula"
                  >
                    {copied === formula.id ? (
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
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {formula.variables.map((variable, varIndex) => (
                    <motion.div
                      key={variable.symbol}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.2 + varIndex * 0.1 }}
                      className={`bg-gray-50 rounded-xl p-4 border border-gray-200 hover:border-${formula.color}-300 transition-colors`}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <div className={`p-2 bg-${formula.color}-100 rounded-lg`}>
                          <variable.icon className={`text-${formula.color}-600`} size={16} />
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
                    {formula.notation.definitions.map(def => (
                      <div key={def.symbol} className="ml-4">{def.symbol} = {def.name}</div>
                    ))}
                    <div className="mt-3 font-semibold">{formula.notation.main}</div>
                  </div>
                </div>
              </div>

              {/* Example Calculation */}
              <div className={`p-6 bg-gradient-to-r from-${formula.color}-500 to-${formula.color}-600 text-white`}>
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <DollarSign size={20} />
                  Example Calculation
                </h3>
                <div className="font-mono text-sm space-y-2 bg-white/10 rounded-lg p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-2">
                    {formula.example.inputs.map((input, i) => (
                      <div key={i}>{input.label} = {input.value}</div>
                    ))}
                  </div>
                  <div className="border-t border-white/30 pt-2 mt-2 font-bold">
                    {formula.example.calculation}
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
          className="mt-12 bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20"
        >
          <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Building className="text-blue-600" size={24} />
            Application Notes
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-700">
            <div className="space-y-2">
              <h4 className="font-semibold text-gray-900">When to Use</h4>
              <ul className="list-disc list-inside space-y-1">
                <li>Operating expense analysis</li>
                <li>Budgeting</li>
                <li>Property management</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-gray-900">Key Considerations</h4>
              <ul className="list-disc list-inside space-y-1">
                <li>Use accurate data</li>
                <li>Separate direct/indirect costs</li>
                <li>Consider seasonal variations</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default OperatingExpenseFormulas;
