import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UnitsProvider } from "./providers/UnitsProvider.tsx";
import Navbar from "./components/Navbar.tsx";
import Homepage from "./pages/Homepage.tsx";
import Favourites from "./pages/Favourites.tsx";
import SelectedCity from "./pages/SelectedCity.tsx";

function App () {
  return (
    <div className="mx-auto w-300 mt-20">
      <h1 className="font-bold text-4xl my-6">Weather App</h1>
      <Router>
        <UnitsProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/favourites" element={<Favourites />} />
            <Route path="/favourites/:city" element={<SelectedCity />} />
          </Routes>
        </UnitsProvider>
      </Router>
    </div>
  );
}

export default App;