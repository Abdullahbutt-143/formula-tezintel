import React from "react";
import { motion } from "framer-motion";
import { 
  Calculator, 
  TrendingUp, 
  Fuel, 
  ShoppingCart, 
  Coffee,
  Utensils,
  Car,
  Wine,
  Store,
  Hammer,
  DollarSign,
  BarChart3,
  Building,
  Link
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const FormulasListPage = () => {
  const navigate = useNavigate();

  const formulas = [
    {
      name: "Valuation",
      description: "Property valuation calculation",
      path: "/formulas/valuation",
      icon: Calculator,
      color: "blue",
      category: "Financial"
    },
    {
      name: "Forecasting",
      description: "Revenue and growth projections",
      path: "/formulas/forecasting",
      icon: TrendingUp,
      color: "green",
      category: "Financial"
    },
    {
      name: "Monthly Gas Total",
      description: "Total monthly gasoline sales calculation",
      path: "/formulas/monthly-gas-total",
      icon: Fuel,
      color: "orange",
      category: "Fuel Operations"
    },
    {
      name: "Monthly Diesel Total",
      description: "Total monthly diesel sales calculation",
      path: "/formulas/monthly-diesel-total",
      icon: Fuel,
      color: "yellow",
      category: "Fuel Operations"
    },
    {
      name: "C Store Merchandise Sales",
      description: "Convenience store merchandise revenue",
      path: "/formulas/c-store-merchandise",
      icon: ShoppingCart,
      color: "purple",
      category: "Retail Operations"
    },
    {
      name: "QSR",
      description: "Quick Service Restaurant revenue calculation",
      path: "/formulas/qsr",
      icon: Coffee,
      color: "red",
      category: "Food Service"
    },
    {
      name: "Deli",
      description: "Deli department revenue and margins",
      path: "/formulas/deli",
      icon: Utensils,
      color: "pink",
      category: "Food Service"
    },
    {
      name: "Car Wash",
      description: "Car wash revenue and profitability",
      path: "/formulas/car-wash",
      icon: Car,
      color: "cyan",
      category: "Ancillary Services"
    },
    {
      name: "Liquor Store",
      description: "Liquor sales and inventory calculations",
      path: "/formulas/liquor-store",
      icon: Wine,
      color: "amber",
      category: "Retail Operations"
    },
    {
      name: "Wahseteria Store",
      description: "Specialty store revenue calculations",
      path: "/formulas/wahseteria-store",
      icon: Store,
      color: "indigo",
      category: "Retail Operations"
    },
    {
      name: "Construction Cost",
      description: "Building and development cost estimation",
      path: "/formulas/construction-cost",
      icon: Hammer,
      color: "gray",
      category: "Development"
    },
    {
      name: "Gross Operating Income",
      description: "Total operating revenue calculation",
      path: "/formulas/gross-operating-income",
      icon: DollarSign,
      color: "emerald",
      category: "Financial"
    },
    {
      name: "Operating Expense",
      description: "Operating costs and expense ratios",
      path: "/formulas/operating-expense",
      icon: BarChart3,
      color: "rose",
      category: "Financial"
    },
    {
      name: "Retail Tenant Income",
      description: "Rental income from retail tenants",
      path: "/formulas/retail-tenant-income",
      icon: Building,
      color: "violet",
      category: "Real Estate"
    }
  ];

  // Group formulas by category
  const formulasByCategory = formulas.reduce((acc, formula) => {
    if (!acc[formula.category]) {
      acc[formula.category] = [];
    }
    acc[formula.category].push(formula);
    return acc;
  }, {});

  const handleFormulaClick = (path) => {
    navigate(path);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-7xl mx-auto">
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
                Financial Formulas
              </h1>
              <p className="text-gray-600 mt-2 text-lg">
                Complete collection of calculation models and formulas
              </p>
            </div>
          </div>
        </motion.div>

        {/* Stats Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12"
        >
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Calculator className="text-blue-600" size={20} />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Formulas</p>
                <p className="text-2xl font-bold text-gray-900">{formulas.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <BarChart3 className="text-green-600" size={20} />
              </div>
              <div>
                <p className="text-sm text-gray-600">Categories</p>
                <p className="text-2xl font-bold text-gray-900">
                  {Object.keys(formulasByCategory).length}
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Formulas Grid by Category */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          {Object.entries(formulasByCategory).map(([category, categoryFormulas]) => (
            <div key={category}>
              {/* Category Header */}
              <motion.div
                variants={itemVariants}
                className="flex items-center gap-3 mb-6"
              >
                <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full"></div>
                <h2 className="text-2xl font-bold text-gray-900">{category}</h2>
                <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm font-medium">
                  {categoryFormulas.length} formulas
                </span>
              </motion.div>

              {/* Formulas Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {categoryFormulas.map((formula, index) => (
                  <motion.div
                    key={formula.name}
                    variants={itemVariants}
                    whileHover={{ 
                      y: -4,
                      scale: 1.02,
                      transition: { duration: 0.2 }
                    }}
                    className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 cursor-pointer group"
                    onClick={() => handleFormulaClick(formula.path)}
                  >
                    <div className="flex flex-col h-full">
                      {/* Icon and Header */}
                      <div className="flex items-start gap-4 mb-4">
                        <div className={`p-3 bg-${formula.color}-100 rounded-xl flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                          <formula.icon className={`text-${formula.color}-600`} size={24} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-gray-900 text-lg group-hover:text-blue-600 transition-colors">
                            {formula.name}
                          </h3>
                          <p className="text-gray-600 text-sm mt-1 line-clamp-2">
                            {formula.description}
                          </p>
                        </div>
                      </div>

                      {/* Action Indicator */}
                      <div className="mt-auto pt-4 border-t border-gray-100 flex justify-between items-center">
                        <span className="text-xs text-gray-500 font-medium">
                          Click to view details
                        </span>
                        <Link 
                          size={16} 
                          className="text-gray-400 group-hover:text-blue-500 transition-colors" 
                        />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </motion.div>
        {formulas.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20"
          >
            <Calculator className="mx-auto text-gray-400 mb-4" size={48} />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              No Formulas Available
            </h3>
            <p className="text-gray-500">
              Formulas will be added soon. Please check back later.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default FormulasListPage;