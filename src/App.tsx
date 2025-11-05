import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UnitsProvider } from "./providers/UnitsProvider";
import Navbar from "./components/Navbar";
import Homepage from "./pages/Homepage";
import Favourites from "./pages/Favourites";
import SelectedCity from "./pages/SelectedCity";
import NotificationProvider from "./providers/NotificationProvider";

function App () {
  return (
    <div className="mx-auto w-300 mt-20">
      <h1 className="font-bold text-4xl my-6">Weather App</h1>
      <Router>
        <UnitsProvider>
          <Navbar />
          <NotificationProvider>
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/favourites" element={<Favourites />} />
              <Route path="/favourites/:city" element={<SelectedCity />} />
            </Routes>
          </NotificationProvider>
        </UnitsProvider>
      </Router>
    </div>
  );
}

export default App;