import { buildCsv, buildFilename } from "./csvHelpers";

const QUESTIONS = [{ id: 1 }, { id: 2 }, { id: 3 }];

test("header row + pick-one answer", () => {
  const csv = buildCsv({ 2: { type: "pick-one", value: "A" } }, QUESTIONS);
  expect(csv).toBe("Question,Answer\r\n1,\r\n2,A\r\n3,");
});

test("reorder answer renders as arrow-separated join", () => {
  const csv = buildCsv({ 1: { type: "reorder", value: ["O3", "O1", "O2"] } }, [{ id: 1 }]);
  expect(csv).toBe("Question,Answer\r\n1,O3 > O1 > O2");
});

test("answer containing a comma gets quoted and quoted quotes escaped", () => {
  const csv = buildCsv({ 1: { type: "pick-one", value: 'he said "hi", bye' } }, [{ id: 1 }]);
  expect(csv).toBe('Question,Answer\r\n1,"he said ""hi"", bye"');
});

test("buildFilename uses yyyymmdd-hhmm timestamp", () => {
  const d = new Date(2026, 3, 19, 15, 42); // Apr is month index 3
  const name = buildFilename(d);
  expect(name).toBe("situational_judgement_results_20260419-1542.csv");
});
