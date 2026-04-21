import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSim } from "../context/SimContext";
import "./LoginPage.css";

const USERNAME = "CaseMentor7412";
const PASSWORD = "APT-SIM-rTk2k25";

export default function LoginPage() {
  const [authenticated, setAuthenticated] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );

  if (!authenticated) {
    return <LoginForm onSuccess={() => setAuthenticated(true)} />;
  }

  return <SessionManager />;
}

function LoginForm({ onSuccess }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === USERNAME && password === PASSWORD) {
      localStorage.setItem("isLoggedIn", "true");
      onSuccess();
    } else {
      setError("Invalid username or password.");
    }
  };

  return (
    <div className="app-frame">
      <div className="sjs-login-container">
        <div className="sjs-loginText">Login</div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="sjs-username">Username:</label><br />
          <input
            type="text"
            id="sjs-username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          /><br />
          <label htmlFor="sjs-password">Password:</label><br />
          <input
            type="password"
            id="sjs-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          /><br />
          <input type="submit" value="Login" />
        </form>
        {error && <p className="sjs-login-error">{error}</p>}
      </div>
    </div>
  );
}

function SessionManager() {
  const { session, startSession, resetSession } = useSim();
  const navigate = useNavigate();
  const hasInProgress = session && !session.completed;
  const hasCompleted = session && session.completed;

  const start = () => { startSession("rainforest"); navigate("/sim"); };
  const resume = () => navigate("/sim");
  const viewResults = () => navigate("/results");
  const startOver = () => { resetSession(); startSession("rainforest"); navigate("/sim"); };

  return (
    <div className="app-frame">
      <div className="sjs-login-card">
        <h1 className="sjs-login-title">Situational Judgement Simulation</h1>
        {hasInProgress && (
          <>
            <p>You have a simulation in progress.</p>
            <div className="sjs-login-actions">
              <button className="sjs-login-btn" onClick={resume}>Resume</button>
              <button className="sjs-login-btn sjs-login-btn-secondary" onClick={startOver}>Start Over</button>
            </div>
          </>
        )}
        {hasCompleted && (
          <>
            <p>You&apos;ve completed the simulation.</p>
            <div className="sjs-login-actions">
              <button className="sjs-login-btn" onClick={viewResults}>View Results</button>
              <button className="sjs-login-btn sjs-login-btn-secondary" onClick={startOver}>Start New</button>
            </div>
          </>
        )}
        {!session && (
          <button className="sjs-login-btn" onClick={start}>Start Simulation</button>
        )}
      </div>
    </div>
  );
}
