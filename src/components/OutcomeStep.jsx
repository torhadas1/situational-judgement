import { renderBody } from "../utils/formatting";

export default function OutcomeStep({ step, answer }) {
  const value = answer?.value;
  const body = (value && step.variants?.[value]) || "";
  return <>{renderBody(body)}</>;
}
