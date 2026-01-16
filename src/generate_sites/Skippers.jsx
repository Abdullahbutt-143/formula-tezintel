import { useEffect, useState } from "react";

const Skippers = () => {
  const [valuation, setValuation] = useState(null);
  const [forecasting, setForecasting] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const createAndFetchProject = async () => {
      try {
        const token = localStorage.getItem("access_token");
        if (!token) {
          throw new Error("No access token found");
        }

        const payload = {
          name: "skippers_port",
          project_type: "projectval",
          facility_type: "gas_station",
          development_type: "new",
          business_leads: [],
          addons: [],
          retail_unit: [
            {
              cstoresalespermonth: 0,
              foodsalespermonth: 0,
              carwashpermonth: 0,
            },
          ],
          devStrategyAddon: [],
          strategies: [
            {
              num_mpds: 6,
              num_auto_diesel_hoses: 12,
              store_size: 6000,
              gas_brand_consideration: "branded",
              qsr_private_deli_brand: "deli",
              qsr_private_deli_size: "300",
              num_cooler_doors: 18,
              num_freezers_doors: 4,
              is_beer_cave: "yes",
              is_24_hour_ops: "yes",
              is_truck_stop: "false",
            },
          ],
          industrial_sites: [
            {
              report_title: "skippers port",
              address: "2124 Marina Bay Drive, Kemah, TX",
              state: "TX",
              is_at_intersection: "yes",
              total_area_sqft: 87120,
              estimated_purchase_per_price_sq_ft: 17,
              is_site_plan_provided: "yes",
              curb_cuts_pri: 2,
              frontage_footage_pri: 80,
              is_functioning_retail: "no",
              lat: 29.5426423,
              lng: -95.0511118,
            },
          ],
          category_type: "commercial",
        };

        // STEP 1
        const res1 = await fetch(
          "https://staging.tezintel.com/api/CommercialViewSet/",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(payload),
          }
        );

        const data1 = await res1.json();
        if (!data1.pid) throw new Error("PID not returned");

        // STEP 2
        const res2 = await fetch(
          "https://staging.tezintel.com/api/CommercialViewSet/",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ ...payload, pid: data1.pid }),
          }
        );

        const finalResult = await res2.json();
        console.log("Final Result:", finalResult);

        // 🔹 SAFE EXTRACTION
        setValuation(finalResult?.valuation || finalResult?.valuation_result);
        setForecasting(finalResult?.forecasting || finalResult?.forecast_result);

      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    createAndFetchProject();
  }, []);

  if (loading) return <p>Loading valuation...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div style={{ padding: "24px", fontFamily: "sans-serif" }}>
      <h2>Project Valuation</h2>

      {valuation ? (
        <div className="card">
          <pre>{JSON.stringify(valuation, null, 2)}</pre>
        </div>
      ) : (
        <p>No valuation data available</p>
      )}

      <h2 style={{ marginTop: "32px" }}>Forecasting</h2>

      {forecasting ? (
        <div className="card">
          <pre>{JSON.stringify(forecasting, null, 2)}</pre>
        </div>
      ) : (
        <p>No forecasting data available</p>
      )}
    </div>
  );
};

export default Skippers;
