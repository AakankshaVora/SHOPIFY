import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CategoriesPage from "./pages/CategoriesPage";
import FAQsPage from "./pages/FAQPage.jsx";
import RatingsPage from "./pages/RatingsPage";
import EmailModal from "./components/EmailModal.jsx";
import FAQ from "./components/Faq.jsx";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/categories" element={<CategoriesPage />} />
      <Route path="/faqs" element={<FAQsPage />} />
      <Route path="/faq" element={<FAQ />} />
      <Route path="/ratings" element={<RatingsPage />} />
      <Route path="/change-email" element={<EmailModal />} />
    </Routes>
  );
};

export default App;
