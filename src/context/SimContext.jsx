import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { readSession, writeSession, clearSession } from "../utils/storage";

const SimCtx = createContext(null);

export function SimProvider({ data, children }) {
  const [session, setSession] = useState(() => readSession());
  const mission = data?.missions?.find(m => m.id === session?.missionId) ||
                  data?.missions?.[0] || null;

  useEffect(() => {
    if (session) writeSession(session);
  }, [session]);

  const startSession = useCallback((missionId) => {
    const m = data.missions.find(x => x.id === missionId) || data.missions[0];
    setSession({
      missionId: m.id,
      startedAt: Date.now(),
      qIndex: 0,
      stepIndex: 0,
      answers: {},
      completed: false
    });
  }, [data]);

  const recordAnswer = useCallback((questionId, answer) => {
    setSession(s => ({ ...s, answers: { ...s.answers, [questionId]: answer } }));
  }, []);

  const advance = useCallback(() => {
    setSession(s => {
      const m = data.missions.find(x => x.id === s.missionId);
      const q = m.questions[s.qIndex];
      if (s.stepIndex < q.steps.length - 1) {
        return { ...s, stepIndex: s.stepIndex + 1 };
      }
      if (s.qIndex < m.questions.length - 1) {
        return { ...s, qIndex: s.qIndex + 1, stepIndex: 0 };
      }
      return { ...s, completed: true };
    });
  }, [data]);

  const resetSession = useCallback(() => {
    clearSession();
    setSession(null);
  }, []);

  const value = { session, mission, data, startSession, recordAnswer, advance, resetSession };
  return <SimCtx.Provider value={value}>{children}</SimCtx.Provider>;
}

export function useSim() {
  const ctx = useContext(SimCtx);
  if (!ctx) throw new Error("useSim must be used inside <SimProvider>");
  return ctx;
}
