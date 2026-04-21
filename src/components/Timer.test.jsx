import { render, screen } from "@testing-library/react";
import Timer from "./Timer";

beforeEach(() => { jest.useFakeTimers(); });
afterEach(() => { jest.useRealTimers(); });

test("shows full minutes only, rounding down", () => {
  const startedAt = Date.now() - 1000; // 1 second elapsed
  render(<Timer startedAt={startedAt} durationMinutes={20} />);
  // 20 min - 1 sec = 19:59 → floor(1199/60) = 19
  expect(screen.getByText("19")).toBeInTheDocument();
  expect(screen.getByText("min")).toBeInTheDocument();
});

test("shows 0 at the last minute of counting", () => {
  const startedAt = Date.now() - (20 * 60 * 1000 - 5 * 1000); // 5 sec remaining
  render(<Timer startedAt={startedAt} durationMinutes={20} />);
  expect(screen.getByText("0")).toBeInTheDocument();
});

test("shows Time's up when remaining is zero or negative", () => {
  const startedAt = Date.now() - 21 * 60 * 1000;
  render(<Timer startedAt={startedAt} durationMinutes={20} />);
  expect(screen.getByText(/time's up/i)).toBeInTheDocument();
});
