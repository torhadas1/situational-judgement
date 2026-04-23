import { useRef, useState, useEffect } from "react";
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
  const bodyRef = useRef(null);
  const [overflows, setOverflows] = useState(false);

  useEffect(() => {
    const el = bodyRef.current;
    if (!el) return;
    const check = () => setOverflows(el.scrollHeight > el.clientHeight);
    check();
    const ro = new ResizeObserver(check);
    ro.observe(el);
    return () => ro.disconnect();
  }, [children]);

  return (
    <div className="app-frame">
      <aside className="sjs-rail">
        <Timer startedAt={startedAt} durationMinutes={durationMinutes} />
        <ProgressIndicator qIndex={qIndex} total={totalQuestions} />
      </aside>
      <main className="sjs-card">
        <header className="sjs-card-title">{title}</header>
        <div ref={bodyRef} className="sjs-card-body scrollable">
          {children}
          {overflows && (
            <div className="sjs-card-footer-inline">
              <ContinueButton enabled={continueEnabled} label={continueLabel} onClick={onContinue} />
            </div>
          )}
        </div>
        {!overflows && (
          <footer className="sjs-card-footer">
            <ContinueButton enabled={continueEnabled} label={continueLabel} onClick={onContinue} />
          </footer>
        )}
      </main>
    </div>
  );
}
