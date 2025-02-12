import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import EventPage from "./pages/EventPage";
import CartPage from "./pages/CartPage";
import NavBar from "./components/NavBar";
import "./styles/global.css";

function App() {


  return (
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/event/:id" element={<EventPage />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
      </Router>
  );
}

export default App;
