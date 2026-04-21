import { Navigate, useNavigate } from "react-router-dom";
import { useSim } from "../context/SimContext";
import { buildCsv, buildFilename, downloadCsv } from "../utils/csvHelpers";
import "./ResultPage.css";

export default function ResultPage() {
  const { session, mission, resetSession } = useSim();
  const navigate = useNavigate();

  if (!session) return <Navigate to="/" replace />;
  if (!session.completed) return <Navigate to="/sim" replace />;
  if (!mission) return <Navigate to="/" replace />;

  const questions = mission.questions;
  const rows = questions.map(q => {
    const a = session.answers[q.id];
    let answerText = "";
    if (a?.type === "pick-one") answerText = a.value;
    else if (a?.type === "reorder") answerText = a.value.join(" > ");
    return { id: q.id, answerText };
  });

  const handleDownload = () => {
    const csv = buildCsv(session.answers, questions);
    downloadCsv(csv, buildFilename());
  };

  const handleReset = () => {
    resetSession();
    navigate("/");
  };

  return (
    <div className="app-frame">
      <div className="sjs-result-card">
        <h1 className="sjs-result-title">Answer Key</h1>
        <div className="sjs-result-table-wrap scrollable">
          <table className="sjs-result-table">
            <thead>
              <tr><th>Question #</th><th>Answer</th></tr>
            </thead>
            <tbody>
              {rows.map(r => (
                <tr key={r.id}>
                  <td>{r.id}</td>
                  <td>{r.answerText}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="sjs-result-actions">
          <button className="sjs-result-btn sjs-result-btn-secondary" onClick={handleReset}>Reset</button>
          <button className="sjs-result-btn" onClick={handleDownload}>Download</button>
        </div>
      </div>
    </div>
  );
}
