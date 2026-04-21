import { renderBody } from "../utils/formatting";

export default function NarrativeStep({ step }) {
  return <>{renderBody(step.body)}</>;
}
