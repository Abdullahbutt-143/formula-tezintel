import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";
import { MapPin, Layers, Compass, Building2, ArrowLeft } from "lucide-react";

const SiteOverview = () => {
  const { siteName } = useParams();
  const navigate = useNavigate();
  const [siteData, setSiteData] = useState(null);

  useEffect(() => {
    fetch("/data/sites.xlsx")
      .then((res) => res.arrayBuffer())
      .then((buffer) => {
        const workbook = XLSX.read(buffer, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);

        const filtered = jsonData.filter((r) => r.Site === siteName);
        if (filtered.length > 0) {
          setSiteData(filtered);
        }
      })
      .catch((err) => console.error("Error loading Excel:", err));
  }, [siteName]);

  if (!siteData) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading site details...
      </div>
    );
  }

  const totalVersions = siteData.length;
  const { Address, Coordinates, Type } = siteData[0];
  let latitude = null;
  let longitude = null;

  if (Coordinates) {
    const parts = Coordinates.split(",").map((v) => v.trim());
    if (parts.length === 2) {
      latitude = parts[0];
      longitude = parts[1];
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-10 px-6">
      <div className="max-w-3xl mx-auto bg-white/90 rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-blue-700 mb-6">
          {siteName} Overview
        </h1>

        <div className="space-y-6 text-lg text-gray-700">
          <div className="flex items-center gap-3">
            <Layers className="text-blue-600" />
            <span>
              <strong>Total Versions:</strong> {totalVersions}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <MapPin className="text-green-600" />
            <span>
              <strong>Address:</strong> {Address || "No address found"}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Compass className="text-purple-600" />
            <span>
              <strong>Coordinates:</strong>{" "}
              {latitude && longitude
                ? `${latitude}, ${longitude}`
                : "No coordinates found"}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Building2 className="text-orange-600" />
            <span>
              <strong>Type:</strong> {Type ?? "No type available"}
            </span>
          </div>
        </div>

        {/* Back to Dashboard Button */}
        <div className="mt-10 flex justify-center">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl shadow-md hover:bg-blue-700 transition-all"
          >
            <ArrowLeft size={20} />
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};
export default SiteOverview;