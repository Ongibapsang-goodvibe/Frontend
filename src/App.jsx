import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ReceiptCheck from "./pages/delivery-feedback/receipt-check";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/receipt-check" element={<ReceiptCheck />} />
      </Routes>
    </Router>
  );
}

export default App;