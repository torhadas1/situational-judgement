import Timer from "./Timer";
import ProgressIndicator from "./ProgressIndicator";
import ContinueButton from "./ContinueButton";
import "./SimShell.css";

export default function SimShell({
  title,
  children,
  startedAt,
  durationMinutes,
  qIndex,
  totalQuestions,
  continueEnabled,
  continueLabel = "Continue",
  onContinue
}) {
  return (
    <div className="app-frame">
      <aside className="sjs-rail">
        <Timer startedAt={startedAt} durationMinutes={durationMinutes} />
        <ProgressIndicator qIndex={qIndex} total={totalQuestions} />
      </aside>
      <main className="sjs-card">
        <header className="sjs-card-title">{title}</header>
        <div className="sjs-card-body scrollable">
          {children}
        </div>
        <footer className="sjs-card-footer">
          <ContinueButton enabled={continueEnabled} label={continueLabel} onClick={onContinue} />
        </footer>
      </main>
    </div>
  );
}
