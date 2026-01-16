import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Database,
  BarChart3,
  DollarSign,
  Droplets,
  Fuel,
} from "lucide-react";

const Skippers = () => {
  const [valuation, setValuation] = useState(null);
  const [forecasting, setForecasting] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [projectId, setProjectId] = useState(null);
  const [responseData, setResponseData] = useState(null);
  const [excelData, setExcelData] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchExcelData = async () => {
      try {
        const response = await fetch("/data/sites.xlsx");
        const buffer = await response.arrayBuffer();
        const workbook = XLSX.read(buffer, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);
        const skippersRecords = jsonData.filter(
          (row) => row.Site && row.Site.toLowerCase().trim() === "skippers port"
        );

        if (skippersRecords.length > 0) {
          setExcelData(skippersRecords[skippersRecords.length - 1]);
        } else {
          console.log("No Skippers Port record found in Excel");
        }
      } catch (err) {
        console.error("Error loading Excel:", err);
      }
    };

    fetchExcelData();
  }, []);

  useEffect(() => {
    const createAndFetchProject = async () => {
      try {
        const token = localStorage.getItem("access_token");
        if (!token) {
          throw new Error("No access token found");
        }
        const formData = new FormData();
        formData.append("name", "skippers_port");
        formData.append("project_type", "projectval");
        formData.append("facility_type", "gas_station");
        formData.append("development_type", "new");
        formData.append("category_type", "commercial");
        formData.append("business_leads", JSON.stringify([]));
        formData.append("addons", JSON.stringify([]));
        formData.append("devStrategyAddon", JSON.stringify([]));
        formData.append(
          "retail_unit",
          JSON.stringify([
            {
              cstoresalespermonth: 0,
              foodsalespermonth: 0,
              carwashpermonth: 0,
            },
          ])
        );
        formData.append(
          "strategies",
          JSON.stringify([
            {
              num_mpds: 6,
              num_auto_diesel_hoses: 12,
              store_size: 6000,
              gas_brand_consideration: "unbranded",
              att_qsrSize: 0,
              att_qsr_brand: "",
              qsr_private_deli_brand: "Deli",
              qsr_private_deli_size: "300",
              no_of_retail_tenant: 0,
              numCarWash: 0,
              car_wash_type: "no",
              num_cooler_doors: 18,
              num_freezers_doors: 4,
              is_beer_cave: "yes",
              is_24_hour_ops: "yes",
              type_of_truck_stop: "",
              is_truck_stop: "false",
              qsrPrivateDeliBrand: "Deli",
              qsrPrivateDeliSize: "300",
              qsrBrand: "",
              qsrSize: 0,
              liquor_store_size: 0,
              washateria_size: 0,
            },
          ])
        );
        formData.append(
          "industrial_sites",
          JSON.stringify([
            {
              report_title: "skippers port",
              address: "2124 Marina Bay Drive, Kemah, TX",
              state: "TX",
              is_at_intersection: "yes",
              total_area_sqft: 87120,
              estimated_purchase_per_price_sq_ft: 17,
              is_site_plan_provided: "yes",
              curb_cuts_pri: 2,
              curb_cuts_sec: "greater_than_50_ft",
              frontage_footage_pri: 80,
              frontage_footage_sec: 80,
              is_functioning_retail: "no",
              lat: 29.5426423,
              lng: -95.0511118,
            },
          ])
        );

        const res1 = await fetch(
          "https://staging.tezintel.com/api/CommercialViewSet/",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
            },
            body: formData,
          }
        );
        const data1 = await res1.json();
        if (!data1.pid) {
          throw new Error(
            `PID not returned from Step 1: ${JSON.stringify(data1)}`
          );
        }
        setProjectId(data1.pid);
        const formData2 = new FormData();
        formData2.append("pid", data1.pid);
        formData2.append("name", "skippers_port");
        formData2.append("project_type", "projectval");
        formData2.append("facility_type", "gas_station");
        formData2.append("development_type", "new");
        formData2.append("category_type", "commercial");
        formData2.append("business_leads", JSON.stringify([]));
        formData2.append("addons", JSON.stringify([]));
        formData2.append("devStrategyAddon", JSON.stringify([]));
        formData2.append(
          "retail_unit",
          JSON.stringify([
            {
              cstoresalespermonth: 0,
              foodsalespermonth: 0,
              carwashpermonth: 0,
            },
          ])
        );
        formData2.append(
          "strategies",
          JSON.stringify([
            {
              num_mpds: 6,
              num_auto_diesel_hoses: 12,
              store_size: 6000,
              gas_brand_consideration: "unbranded",
              att_qsrSize: 0,
              att_qsr_brand: "",
              qsr_private_deli_brand: "Deli",
              qsr_private_deli_size: "300",
              no_of_retail_tenant: 0,
              numCarWash: 0,
              car_wash_type: "no",
              num_cooler_doors: 18,
              num_freezers_doors: 4,
              is_beer_cave: "yes",
              is_24_hour_ops: "yes",
              type_of_truck_stop: "",
              is_truck_stop: "false",
              qsrPrivateDeliBrand: "Deli",
              qsrPrivateDeliSize: "300",
              qsrBrand: "",
              qsrSize: 0,
              liquor_store_size: 0,
              washateria_size: 0,
            },
          ])
        );
        formData2.append(
          "industrial_sites",
          JSON.stringify([
            {
              report_title: "skippers port",
              address: "2124 Marina Bay Drive, Kemah, TX",
              state: "TX",
              is_at_intersection: "yes",
              total_area_sqft: 87120,
              estimated_purchase_per_price_sq_ft: 17,
              is_site_plan_provided: "yes",
              curb_cuts_pri: 2,
              curb_cuts_sec: "greater_than_50_ft",
              frontage_footage_pri: 80,
              frontage_footage_sec: 80,
              is_functioning_retail: "no",
              lat: 29.5426423,
              lng: -95.0511118,
            },
          ])
        );

        const res2 = await fetch(
          "https://staging.tezintel.com/api/CommercialViewSet/",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
            },
            body: formData2,
          }
        );

        const finalResult = await res2.json();
        setResponseData(finalResult);
        const customValuation = finalResult.custom_data?.valuation___;
        const customForecast = finalResult.custom_data?.forecast___;
        const monthlyGas =
          finalResult?.custom_data?.new_monthly_volume_projections?.table_data
            ?.Year1?.["Monthly Gasoline Volume (Gallons)"];
        const monthlyDiesel =
          finalResult?.custom_data?.new_monthly_volume_projections?.table_data
            ?.Year1?.["Diesel Volume (Gallons)"];
        console.log("monthlyGas", monthlyGas);
        setValuation({
          total: customValuation,
          monthlyGas: monthlyGas,
          monthlyDiesel: monthlyDiesel,
        });
        setForecasting({
          revenue: customForecast,
        });
      } catch (err) {
        console.error("Skippers project error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    createAndFetchProject();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center bg-white/50 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-white/40">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-lg font-medium text-gray-700">
            Analyzing Site Data...
          </p>
          {projectId && (
            <p className="text-sm text-gray-500 mt-2">
              Project ID: {projectId}
            </p>
          )}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-red-100 max-w-md w-full">
          <h3 className="text-xl font-bold text-red-600 mb-2">
            Analysis Failed
          </h3>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-all shadow-lg shadow-blue-500/25"
          >
            Retry Analysis
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <button
            onClick={() => navigate(-1)}
            className="group flex items-center gap-2 text-gray-600 hover:text-blue-600 mb-6 transition-colors font-medium"
          >
            <div className="p-2 bg-white rounded-lg shadow-sm group-hover:shadow-md transition-all">
              <ArrowLeft size={20} />
            </div>
            Back to Dashboard
          </button>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20">
            <div className="flex items-center gap-4">
              <div className="p-4 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl text-white shadow-lg shadow-blue-500/30">
                <Database size={32} />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-1">
                  Skippers Port Analysis
                </h1>
                <p className="text-gray-600">
                  Comprehensive Valuation & Forecasting Report
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 overflow-hidden"
        >
          <div className="p-6 border-b border-gray-100/50 flex justify-between items-center bg-gray-50/50">
            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              <BarChart3 className="text-blue-600" size={24} />
              Data Comparison
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50/80 border-b border-gray-200/60">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
                    Metric
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-green-700 uppercase tracking-wider">
                    TezIntel API
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-blue-700 uppercase tracking-wider">
                    Excel Record (Latest)
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-500 uppercase tracking-wider">
                    Difference
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100/50">
                {/* Valuation Row */}
                <tr className="hover:bg-blue-50/30 transition-colors">
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-green-100 rounded-lg text-green-600">
                        <DollarSign size={18} />
                      </div>
                      <span className="font-medium text-gray-700">
                        Total Valuation
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-5 font-mono text-lg font-semibold text-gray-900">
                    ${valuation?.total || "N/A"}
                  </td>
                  <td className="px-6 py-5 font-mono text-lg font-medium text-gray-600">
                    {excelData && excelData.Valuation
                      ? `$${new Intl.NumberFormat("en-US").format(
                          excelData.Valuation
                        )}`
                      : "N/A"}
                  </td>
                  <td className="px-6 py-5 font-mono text-gray-500">
                    {valuation?.total && excelData?.Valuation ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
                        {(
                          parseFloat(valuation.total.replace(/,/g, "")) -
                          parseFloat(excelData.Valuation)
                        ).toLocaleString("en-US", {
                          style: "currency",
                          currency: "USD",
                        })}
                      </span>
                    ) : (
                      "-"
                    )}
                  </td>
                </tr>

                {/* Forecast Row */}
                <tr className="hover:bg-blue-50/30 transition-colors">
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-purple-100 rounded-lg text-purple-600">
                        <BarChart3 size={18} />
                      </div>
                      <span className="font-medium text-gray-700">
                        Forecasted Monthly Income
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-5 font-mono text-lg font-semibold text-gray-900">
                    {forecasting?.revenue ? `$${forecasting.revenue}` : "N/A"}
                  </td>
                  <td className="px-6 py-5 font-mono text-lg font-medium text-gray-600">
                    {excelData && excelData.Forecast
                      ? `$${new Intl.NumberFormat("en-US").format(
                          excelData.Forecast
                        )}`
                      : "N/A"}
                  </td>
                  <td className="px-6 py-5 font-mono text-gray-500">
                    {forecasting?.revenue && excelData?.Forecast ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
                        {(
                          parseFloat(forecasting.revenue.replace(/,/g, "")) -
                          parseFloat(excelData.Forecast)
                        ).toLocaleString("en-US", {
                          style: "currency",
                          currency: "USD",
                        })}
                      </span>
                    ) : (
                      "-"
                    )}
                  </td>
                </tr>

                {/* Gasoline Volume Row */}
                <tr className="hover:bg-blue-50/30 transition-colors">
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-orange-100 rounded-lg text-orange-600">
                        <Fuel size={18} />
                      </div>
                      <span className="font-medium text-gray-700">
                        Monthly Gasoline Volume
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-5 font-mono text-lg font-semibold text-gray-900">
                    {valuation?.monthlyGas || "N/A"}
                  </td>
                  <td className="px-6 py-5 font-mono text-lg font-medium text-gray-600">
                    {excelData && excelData["Monthly Gas total"]
                      ? new Intl.NumberFormat("en-US").format(
                          excelData["Monthly Gas total"]
                        )
                      : "N/A"}
                  </td>
                  <td className="px-6 py-5 font-mono text-gray-500">
                    {valuation?.monthlyGas && excelData?.["Monthly Gas total"] ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
                        {new Intl.NumberFormat("en-US").format(
                          parseFloat(valuation.monthlyGas.replace(/,/g, "")) -
                            parseFloat(excelData["Monthly Gas total"])
                        )}
                      </span>
                    ) : (
                      "-"
                    )}
                  </td>
                </tr>

                {/* Diesel Volume Row */}
                <tr className="hover:bg-blue-50/30 transition-colors">
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-slate-100 rounded-lg text-slate-600">
                        <Droplets size={18} />
                      </div>
                      <span className="font-medium text-gray-700">
                        Monthly Diesel Volume
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-5 font-mono text-lg font-semibold text-gray-900">
                    {valuation?.monthlyDiesel || "N/A"}
                  </td>
                  <td className="px-6 py-5 font-mono text-lg font-medium text-gray-600">
                    {excelData && excelData["Monthly Diesel Gallons"]
                      ? new Intl.NumberFormat("en-US").format(
                          excelData["Monthly Diesel Gallons"]
                        )
                      : "N/A"}
                  </td>
                  <td className="px-6 py-5 font-mono text-gray-500">
                    {valuation?.monthlyDiesel &&
                    excelData?.["Monthly Diesel Gallons"] ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
                        {new Intl.NumberFormat("en-US").format(
                          parseFloat(
                            valuation.monthlyDiesel.replace(/,/g, "")
                          ) - parseFloat(excelData["Monthly Diesel Gallons"])
                        )}
                      </span>
                    ) : (
                      "-"
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-8"
        >
          <details className="group bg-white/50 backdrop-blur-sm rounded-xl border border-white/40 overflow-hidden transition-all duration-300 hover:bg-white/80 open:bg-white/80 open:shadow-lg">
            <summary className="flex items-center justify-between p-4 cursor-pointer select-none">
              <span className="font-medium text-gray-600 group-open:text-blue-600 transition-colors">
                View Raw API Response
              </span>
              <div className="p-1 rounded-full bg-gray-100 group-open:bg-blue-100 group-open:text-blue-600 transition-all text-gray-400">
                <Database size={16} />
              </div>
            </summary>
            <div className="p-4 pt-0 border-t border-gray-100/50">
              <pre className="bg-slate-900 text-slate-50 p-4 rounded-lg overflow-x-auto text-xs font-mono max-h-96 shadow-inner">
                {JSON.stringify(responseData, null, 2)}
              </pre>
            </div>
          </details>
        </motion.div>
      </div>
    </div>
  );
};

export default Skippers;
