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
import ForecastFormula from "./formulas/ForecastFormula";
import GrossOperatingIncomeFormulas from "./formulas/GrossOperatingIncomeFormulas";
import OperatingExpenseFormulas from "./formulas/OperatingExpenseFormulas";
import GasolineVolumeFormula from "./formulas/GasolineVolumeFormula";
import DieselVolumeFormula from "./formulas/DieselVolumeFormula";
import Sites from "./generate_sites/Sites";
import Skippers from "./generate_sites/Skippers";
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
        <Route path="/formulas/forecast" element={<ForecastFormula />} />
        <Route path="/formulas/gross-operating-income" element={<GrossOperatingIncomeFormulas />} />
        <Route path="/formulas/operating-expenses" element={<OperatingExpenseFormulas />} />
        <Route path="/formulas/gasoline-volume" element={<GasolineVolumeFormula />} />
        <Route path="/formulas/diesel-volume" element={<DieselVolumeFormula />} />
        <Route path="/generate-sites" element={<Sites />} />
        <Route path="/skippers" element={<Skippers />} />
      </Routes>
    </Router>
  )
}
export default App;