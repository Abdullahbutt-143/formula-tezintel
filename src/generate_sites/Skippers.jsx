import { useEffect } from "react";

const Skippers = () => {
  useEffect(() => {
    const createAndFetchProject = async () => {
      try {
        const token = localStorage.getItem("access_token");

        if (!token) {
          console.error("No access token found");
          return;
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
              att_qsrSize: 0,
              att_qsr_brand: "",
              qsr_private_deli_brand: "deli",
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
              qsrPrivateDeliBrand: "deli",
              qsrPrivateDeliSize: "300",
              qsrBrand: "",
              qsrSize: 0,
              liquor_store_size: 0,
              washateria_size: 0,
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
              curb_cuts_sec: "greater_than_30_ft_and_less_than_50_ft",
              frontage_footage_pri: 80,
              frontage_footage_sec: 80,
              is_functioning_retail: "no",
              lat: 29.5426423,
              lng: -95.0511118,
            },
          ],
          category_type: "commercial",
        };
        const response1 = await fetch(
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
        if (!response1.ok) {
          throw new Error("Step 1 API failed");
        }
        const data1 = await response1.json();
        console.log("Step 1 Response:", data1);
        const pid = data1.pid;
        if (!pid) {
          console.error("PID not returned");
          return;
        }
        const payloadWithPid = {
          ...payload,
          pid: pid,
        };

        const response2 = await fetch(
          "https://staging.tezintel.com/api/CommercialViewSet/",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(payloadWithPid),
          }
        );

        if (!response2.ok) {
          throw new Error("Step 2 API failed");
        }

        const finalResult = await response2.json();
        console.log("Final Project Result:", finalResult);

      } catch (error) {
        console.error("Commercial project error:", error);
      }
    };

    createAndFetchProject();
  }, []);

  return null; 
};

export default Skippers;
