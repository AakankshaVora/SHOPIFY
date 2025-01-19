import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CategoriesPage from "./pages/CategoriesPage";
import FAQsPage from "./pages/FAQsPage";
import RatingsPage from "./pages/RatingsPage";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/categories" element={<CategoriesPage />} />
      <Route path="/faqs" element={<FAQsPage />} />
      <Route path="/ratings" element={<RatingsPage />} />
    </Routes>
  );
};

export default App;
