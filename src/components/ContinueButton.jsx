import "./ContinueButton.css";

export default function ContinueButton({ enabled = true, label = "Continue", onClick }) {
  return (
    <button
      className={`sjs-continue ${enabled ? "" : "sjs-continue-disabled"}`}
      disabled={!enabled}
      onClick={onClick}
    >
      {label}
    </button>
  );
}
