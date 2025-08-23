import "./i18n";

import { Suspense } from "react";
import { useLocation, useRoutes } from "react-router-dom";
import { useIP } from "./hook/useIP";
import routesConfig from "./routes";

import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/navigation";
import "swiper/css/pagination";
import './App.css';
import { LottoProvider } from "./context/LottoContext";

function App() {
  const location = useLocation();

  useIP();

  const element = useRoutes(routesConfig, location);
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <LottoProvider>
        <Suspense fallback={<div />}>
          {element}
        </Suspense>
      </LottoProvider>
    </LocalizationProvider>
  );
}
export default App;
