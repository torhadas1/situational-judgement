import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { SimProvider } from "./context/SimContext";
import LoginPage from "./pages/LoginPage";
import SimPage from "./pages/SimPage";
import ResultPage from "./pages/ResultPage";
import "./App.css";

function LoadingFrame({ label }) {
  return <div className="app-frame"><div style={{ margin: "auto", padding: 40 }}>{label}</div></div>;
}

export default function App() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const base = process.env.PUBLIC_URL || "";
    fetch(`${base}/db.json`)
      .then(r => r.ok ? r.json() : Promise.reject(new Error("db.json not found")))
      .then(setData)
      .catch(e => setError(e.message));
  }, []);

  if (error) return <LoadingFrame label={`Content failed to load: ${error}`} />;
  if (!data) return <LoadingFrame label="Loading..." />;

  return (
    <SimProvider data={data}>
      <BrowserRouter basename="/situational-judgement">
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/sim" element={<SimPage />} />
          <Route path="/results" element={<ResultPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </SimProvider>
  );
}
