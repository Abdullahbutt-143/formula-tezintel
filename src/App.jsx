import { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ExcelViewer from "./pages/ExcelViewer";
import SiteDetails from "./pages/SiteDetails";
import ComparisonPage from "./pages/ComparisonPage";
import SiteOverview from "./pages/SiteOverview";
import SiteInputs from "./pages/SiteInputs";
import FormulasListPage from "./formulas/FormulasListPage";
import ValuationFormulas from "./formulas/ValuationFormulas";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ExcelViewer />} />
        <Route path="/site/:siteName/detail" element={<SiteDetails />} />
        <Route path="/compare" element={<ComparisonPage />} />
        <Route path="/site/:siteName/overview" element={<SiteOverview />} />
        <Route path="/site/:siteName/user-inputs" element={<SiteInputs />} />
        <Route path="/formulas" element={<FormulasListPage />} />
        <Route path="/formulas/valuation" element={<ValuationFormulas />} />
      </Routes>
    </Router>
  )
}
export default App;