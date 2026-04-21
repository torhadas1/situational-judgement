import { renderBody } from "../utils/formatting";
import "./PickOneStep.css";

export default function PickOneStep({ step, answer, onChange }) {
  const selected = answer?.value;
  return (
    <div>
      <div className="sjs-prompt">{renderBody(step.prompt)}</div>
      <div className="sjs-options">
        {step.options.map(opt => {
          const isSelected = opt.id === selected;
          return (
            <div
              key={opt.id}
              role="button"
              tabIndex={0}
              className={`sjs-option ${isSelected ? "sjs-option-selected" : ""}`}
              onClick={() => onChange(opt.id)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onChange(opt.id);
                }
              }}
            >
              <div className="sjs-option-id">{opt.id}</div>
              <div className="sjs-option-text">{opt.text}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
