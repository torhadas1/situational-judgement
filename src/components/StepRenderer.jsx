import NarrativeStep from "./NarrativeStep";
import PickOneStep from "./PickOneStep";
import ReorderStep from "./ReorderStep";
import OutcomeStep from "./OutcomeStep";

export default function StepRenderer({ step, questionId, answer, onAnswerChange }) {
  switch (step.type) {
    case "narrative":
      return <NarrativeStep step={step} />;
    case "pick-one":
      return (
        <PickOneStep
          step={step}
          answer={answer}
          onChange={(id) => onAnswerChange({ type: "pick-one", value: id })}
        />
      );
    case "reorder":
      return (
        <ReorderStep
          step={step}
          answer={answer}
          onChange={(order) => onAnswerChange({ type: "reorder", value: order })}
        />
      );
    case "outcome":
      return <OutcomeStep step={step} answer={answer} />;
    default:
      console.warn(`Unknown step type: ${step.type}`);
      return null;
  }
}
