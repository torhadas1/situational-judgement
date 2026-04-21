import { renderBody } from "./formatting";
import { render } from "@testing-library/react";

test("renders plain paragraphs split by blank lines", () => {
  const { container } = render(<>{renderBody("Para 1.\n\nPara 2.")}</>);
  const paragraphs = container.querySelectorAll("p");
  expect(paragraphs.length).toBe(2);
  expect(paragraphs[0].textContent).toBe("Para 1.");
  expect(paragraphs[1].textContent).toBe("Para 2.");
});

test("renders a bullet list when lines start with '- '", () => {
  const { container } = render(<>{renderBody("Intro.\n\n- First\n- Second\n- Third")}</>);
  expect(container.querySelectorAll("ul").length).toBe(1);
  expect(container.querySelectorAll("li").length).toBe(3);
});

test("treats lines wrapped in **text** as bold headings", () => {
  const { container } = render(<>{renderBody("**Background Information**\n\nBody text.")}</>);
  expect(container.querySelector("strong")).not.toBeNull();
  expect(container.querySelector("strong").textContent).toBe("Background Information");
});

test("handles empty body safely", () => {
  const { container } = render(<>{renderBody("")}</>);
  expect(container.textContent).toBe("");
});
