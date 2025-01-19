// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import App from './App.jsx'
// import '@shopify/polaris/build/esm/styles.css';


// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )

import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "@shopify/polaris/build/esm/styles.css";
import { AppProvider } from "@shopify/polaris";

ReactDOM.render(
  <AppProvider i18n={{}}>
    <App />
  </AppProvider>,
  document.getElementById("root")
);

