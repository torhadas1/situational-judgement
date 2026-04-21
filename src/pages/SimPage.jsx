import { Navigate } from "react-router-dom";
import SimShell from "../components/SimShell";
import StepRenderer from "../components/StepRenderer";
import { useSim } from "../context/SimContext";

export default function SimPage() {
  const { session, mission, recordAnswer, advance } = useSim();

  if (!session) return <Navigate to="/" replace />;
  if (session.completed) return <Navigate to="/results" replace />;
  if (!mission) return null;

  const question = mission.questions[session.qIndex];
  const step = question.steps[session.stepIndex];
  const answer = session.answers[question.id];

  const isLastStepOfMission =
    session.qIndex === mission.questions.length - 1 &&
    session.stepIndex === question.steps.length - 1;

  const canAdvance = computeCanAdvance(step, answer);

  const handleAnswerChange = (answerObj) => {
    recordAnswer(question.id, answerObj);
  };

  return (
    <SimShell
      title={mission.title}
      startedAt={session.startedAt}
      durationMinutes={mission.durationMinutes}
      qIndex={session.qIndex}
      totalQuestions={mission.questions.length}
      continueEnabled={canAdvance}
      continueLabel={isLastStepOfMission ? "Complete" : "Continue"}
      onContinue={advance}
    >
      <StepRenderer
        step={step}
        questionId={question.id}
        answer={answer}
        onAnswerChange={handleAnswerChange}
      />
    </SimShell>
  );
}

function computeCanAdvance(step, answer) {
  if (step.type === "pick-one") return Boolean(answer?.value);
  return true;
}
