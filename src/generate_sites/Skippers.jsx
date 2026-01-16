import { useEffect, useState } from "react";
import * as XLSX from "xlsx";

const Skippers = () => {
  const [valuation, setValuation] = useState(null);
  const [forecasting, setForecasting] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [projectId, setProjectId] = useState(null);
  const [responseData, setResponseData] = useState(null);
  const [excelData, setExcelData] = useState(null);
  useEffect(() => {
    fetch("/data/sites.xlsx")
      .then((res) => res.arrayBuffer())
      .then((buffer) => {
        const workbook = XLSX.read(buffer, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);
        const skippersRecords = jsonData.filter(
          (row) => row.Site && row.Site.toLowerCase().includes("skippers port")
        );
        if (skippersRecords.length > 0) {
          setExcelData(skippersRecords[skippersRecords.length - 1]);
        }
      })
      .catch((err) => console.error("Error loading Excel:", err));
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
          finalResult?.custom_data?.new_monthly_volume_projections?.table_data?.Year1?.[
          "Monthly Gasoline Volume (Gallons)"
          ];
        const monthlyDiesel =
          finalResult?.custom_data?.new_monthly_volume_projections?.table_data?.Year1?.[
            "Diesel Volume (Gallons)"
          ];
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
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "400px",
          fontSize: "18px",
          color: "#666",
        }}
      >
        <div>
          <div style={{ textAlign: "center", marginBottom: "16px" }}>
            <div className="spinner"></div>
          </div>
          <p>Loading valuation data...</p>
          {projectId && (
            <p style={{ fontSize: "14px", color: "#888" }}>
              Project ID: {projectId}
            </p>
          )}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        style={{
          padding: "24px",
          backgroundColor: "#fee",
          border: "1px solid #fcc",
          borderRadius: "8px",
          margin: "20px",
        }}
      >
        <h3 style={{ color: "#c00", marginBottom: "16px" }}>Error</h3>
        <p style={{ color: "#900", marginBottom: "12px" }}>{error}</p>
        <button
          onClick={() => window.location.reload()}
          style={{
            padding: "8px 16px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: "24px", fontFamily: "sans-serif" }}>
      <h2>Project Analysis Comparison</h2>

      <div style={{ overflowX: "auto", marginTop: "20px" }}>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            backgroundColor: "white",
            boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
          }}
        >
          <thead>
            <tr
              style={{
                backgroundColor: "#f3f4f6",
                borderBottom: "2px solid #e5e7eb",
              }}
            >
              <th
                style={{ padding: "12px", textAlign: "left", color: "#374151" }}
              >
                Metric
              </th>
              <th
                style={{ padding: "12px", textAlign: "left", color: "#059669" }}
              >
                TezIntel API
              </th>
              <th
                style={{ padding: "12px", textAlign: "left", color: "#2563eb" }}
              >
                Excel Record (Latest)
              </th>
              <th
                style={{ padding: "12px", textAlign: "left", color: "#6b7280" }}
              >
                Difference
              </th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: "1px solid #e5e7eb" }}>
              <td style={{ padding: "12px", fontWeight: "500" }}>
                Total Valuation
              </td>
              <td
                style={{
                  padding: "12px",
                  fontFamily: "monospace",
                  fontSize: "1.1em",
                }}
              >
                ${valuation?.total || "N/A"}
              </td>
              <td
                style={{
                  padding: "12px",
                  fontFamily: "monospace",
                  fontSize: "1.1em",
                }}
              >
                {excelData && excelData.Valuation
                  ? `$${new Intl.NumberFormat("en-US").format(
                      excelData.Valuation
                    )}`
                  : "N/A"}
              </td>
              <td
                style={{
                  padding: "12px",
                  color: "#6b7280",
                  fontFamily: "monospace",
                }}
              >
                {valuation?.total && excelData?.Valuation
                  ? (
                      parseFloat(valuation.total.replace(/,/g, "")) -
                      parseFloat(excelData.Valuation)
                    ).toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                    })
                  : "-"}
              </td>
            </tr>
            <tr style={{ borderBottom: "1px solid #e5e7eb" }}>
              <td style={{ padding: "12px", fontWeight: "500" }}>
                Forecasted Monthly Income
              </td>
              <td
                style={{
                  padding: "12px",
                  fontFamily: "monospace",
                  fontSize: "1.1em",
                }}
              >
                {valuation?.total?.substring(0, 0)}
                {forecasting?.revenue ? `$${forecasting.revenue}` : "N/A"}
              </td>
              <td
                style={{
                  padding: "12px",
                  fontFamily: "monospace",
                  fontSize: "1.1em",
                }}
              >
                N/A
              </td>
              <td
                style={{
                  padding: "12px",
                  color: "#6b7280",
                  fontFamily: "monospace",
                }}
              >
                -
              </td>
            </tr>
            <tr style={{ borderBottom: "1px solid #e5e7eb" }}>
              <td style={{ padding: "12px", fontWeight: "500" }}>
                Monthly Gasoline Volume (Gallons)
              </td>
              <td
                style={{
                  padding: "12px",
                  fontFamily: "monospace",
                  fontSize: "1.1em",
                }}
              >
                {valuation?.monthlyGas || "N/A"}
              </td>
              <td
                style={{
                  padding: "12px",
                  fontFamily: "monospace",
                  fontSize: "1.1em",
                }}
              >
                {excelData && excelData["Monthly Gasoline Volume"]
                  ? new Intl.NumberFormat("en-US").format(
                      excelData["Monthly Gasoline Volume"]
                    )
                  : "N/A"}
              </td>
              <td
                style={{
                  padding: "12px",
                  color: "#6b7280",
                  fontFamily: "monospace",
                }}
              >
                -
              </td>
            </tr>
            {/* Diesel Volume Row */}
            <tr style={{ borderBottom: "1px solid #e5e7eb" }}>
              <td style={{ padding: "12px", fontWeight: "500" }}>
                Monthly Diesel Volume (Gallons)
              </td>
              <td
                style={{
                  padding: "12px",
                  fontFamily: "monospace",
                  fontSize: "1.1em",
                }}
              >
                {valuation?.monthlyDiesel || "N/A"}
              </td>
              <td
                style={{
                  padding: "12px",
                  fontFamily: "monospace",
                  fontSize: "1.1em",
                }}
              >
                {excelData && excelData["Monthly Diesel Volume"]
                  ? new Intl.NumberFormat("en-US").format(
                      excelData["Monthly Diesel Volume"]
                    )
                  : "N/A"}
              </td>
              <td
                style={{
                  padding: "12px",
                  color: "#6b7280",
                  fontFamily: "monospace",
                }}
              >
                -
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div style={{ marginTop: "32px" }}>
        <details>
          <summary
            style={{
              padding: "12px",
              cursor: "pointer",
              backgroundColor: "#f9fafb",
              borderRadius: "6px",
            }}
          >
            View Full API Response
          </summary>
          <pre
            style={{
              marginTop: "10px",
              padding: "16px",
              backgroundColor: "#1f2937",
              color: "#f3f4f6",
              borderRadius: "8px",
              overflowX: "auto",
              maxHeight: "400px",
            }}
          >
            {JSON.stringify(responseData, null, 2)}
          </pre>
        </details>
      </div>
      <style>{`
        .spinner {
          display: inline-block;
          width: 40px;
          height: 40px;
          border: 4px solid rgba(0, 0, 0, 0.1);
          border-radius: 50%;
          border-top-color: #1a237e;
          animation: spin 1s ease-in-out infinite;
        }
        
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default Skippers;
