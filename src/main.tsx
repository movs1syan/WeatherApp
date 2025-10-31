import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './index.css'
import { CityProvider } from "./providers/CityProvider.tsx";
import Navbar from "./components/Navbar.tsx";
import App from './App.tsx'
import DaysForecast from "./pages/DaysForecast.tsx";
import Favourites from "./pages/Favourites.tsx";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <div className="mx-auto w-300 mt-20">
        <h1 className="font-bold text-4xl my-6">Weather App</h1>
        <Navbar />
        <CityProvider>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/forecast" element={<DaysForecast />} />
            <Route path="/favourites" element={<Favourites />} />
          </Routes>
        </CityProvider>
      </div>
    </Router>
  </StrictMode>
)
