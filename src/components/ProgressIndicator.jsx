import "./ProgressIndicator.css";

export default function ProgressIndicator({ qIndex, total }) {
  return (
    <div className="sjs-progress">
      <div className="sjs-progress-label">Progress</div>
      <div className="sjs-progress-counter">{qIndex + 1} / {total}</div>
    </div>
  );
}
