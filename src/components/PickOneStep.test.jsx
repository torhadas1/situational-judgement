import { render, screen, fireEvent } from "@testing-library/react";
import PickOneStep from "./PickOneStep";

const STEP = {
  type: "pick-one",
  prompt: "Which one?",
  options: [
    { id: "A", text: "Alpha" },
    { id: "B", text: "Bravo" }
  ]
};

test("renders prompt and options", () => {
  render(<PickOneStep step={STEP} answer={undefined} onChange={() => {}} />);
  expect(screen.getByText("Which one?")).toBeInTheDocument();
  expect(screen.getByText("Alpha")).toBeInTheDocument();
  expect(screen.getByText("Bravo")).toBeInTheDocument();
});

test("clicking an option calls onChange with the id", () => {
  const onChange = jest.fn();
  render(<PickOneStep step={STEP} answer={undefined} onChange={onChange} />);
  fireEvent.click(screen.getByText("Alpha"));
  expect(onChange).toHaveBeenCalledWith("A");
});

test("selected option gets the selected class", () => {
  render(<PickOneStep step={STEP} answer={{ type: "pick-one", value: "B" }} onChange={() => {}} />);
  const bravo = screen.getByText("Bravo").closest(".sjs-option");
  expect(bravo.className).toMatch(/sjs-option-selected/);
});
