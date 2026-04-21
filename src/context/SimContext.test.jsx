import { render, act } from "@testing-library/react";
import { SimProvider, useSim } from "./SimContext";

const FIXTURE = {
  missions: [{
    id: "test", title: "T", durationMinutes: 1,
    questions: [
      { id: 1, steps: [
        { type: "narrative", body: "hi" },
        { type: "pick-one", prompt: "p", options: [{ id: "A", text: "a" }, { id: "B", text: "b" }] },
        { type: "outcome", variants: { A: "A out", B: "B out" } }
      ]},
      { id: 2, steps: [
        { type: "reorder", prompt: "r", options: [{ id: "O1", text: "1" }, { id: "O2", text: "2" }] }
      ]}
    ]
  }]
};

let latestCtx;
function Probe() {
  latestCtx = useSim();
  return null;
}

function setup(initialSession) {
  localStorage.clear();
  if (initialSession) localStorage.setItem("sjs.session", JSON.stringify(initialSession));
  return render(
    <SimProvider data={FIXTURE}>
      <Probe />
    </SimProvider>
  );
}

beforeEach(() => { localStorage.clear(); });

test("starts with no session", () => {
  setup();
  expect(latestCtx.session).toBeNull();
});

test("startSession initializes indices and startedAt", () => {
  setup();
  act(() => latestCtx.startSession("test"));
  expect(latestCtx.session.missionId).toBe("test");
  expect(latestCtx.session.qIndex).toBe(0);
  expect(latestCtx.session.stepIndex).toBe(0);
  expect(latestCtx.session.completed).toBe(false);
  expect(typeof latestCtx.session.startedAt).toBe("number");
});

test("recordAnswer stores pick-one answer by question id", () => {
  setup();
  act(() => latestCtx.startSession("test"));
  act(() => latestCtx.recordAnswer(1, { type: "pick-one", value: "A" }));
  expect(latestCtx.session.answers[1]).toEqual({ type: "pick-one", value: "A" });
});

test("advance moves stepIndex then qIndex then completes", () => {
  setup();
  act(() => latestCtx.startSession("test"));
  // Q1 has 3 steps
  act(() => latestCtx.advance());
  expect(latestCtx.session.stepIndex).toBe(1);
  act(() => latestCtx.advance());
  expect(latestCtx.session.stepIndex).toBe(2);
  act(() => latestCtx.advance());
  // rolls to Q2
  expect(latestCtx.session.qIndex).toBe(1);
  expect(latestCtx.session.stepIndex).toBe(0);
  // Q2 has 1 step — next advance completes
  act(() => latestCtx.advance());
  expect(latestCtx.session.completed).toBe(true);
});

test("state persists to localStorage on every mutation", () => {
  setup();
  act(() => latestCtx.startSession("test"));
  const stored = JSON.parse(localStorage.getItem("sjs.session"));
  expect(stored.missionId).toBe("test");
});

test("rehydrates from localStorage on mount", () => {
  setup({ missionId: "test", startedAt: 1, qIndex: 1, stepIndex: 0, answers: {}, completed: false });
  expect(latestCtx.session.qIndex).toBe(1);
});

test("resetSession clears state and storage", () => {
  setup();
  act(() => latestCtx.startSession("test"));
  act(() => latestCtx.resetSession());
  expect(latestCtx.session).toBeNull();
  expect(localStorage.getItem("sjs.session")).toBeNull();
});
