import { readSession, writeSession, clearSession, SESSION_KEY } from "./storage";

beforeEach(() => { localStorage.clear(); });

test("readSession returns null when no session exists", () => {
  expect(readSession()).toBeNull();
});

test("writeSession then readSession round-trips", () => {
  const s = { missionId: "rainforest", startedAt: 123, qIndex: 0, stepIndex: 0, answers: {}, completed: false };
  writeSession(s);
  expect(readSession()).toEqual(s);
});

test("clearSession removes the key", () => {
  writeSession({ foo: 1 });
  clearSession();
  expect(readSession()).toBeNull();
});

test("readSession returns null on malformed JSON", () => {
  localStorage.setItem(SESSION_KEY, "{{not json");
  expect(readSession()).toBeNull();
});

test("writeSession swallows storage errors silently", () => {
  const orig = Storage.prototype.setItem;
  Storage.prototype.setItem = () => { throw new Error("quota"); };
  expect(() => writeSession({ foo: 1 })).not.toThrow();
  Storage.prototype.setItem = orig;
});
