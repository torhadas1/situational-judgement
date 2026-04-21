export function buildCsv(answers, questions) {
  const rows = [["Question", "Answer"]];
  for (const q of questions) {
    const a = answers[q.id];
    let cell = "";
    if (a?.type === "pick-one") cell = a.value;
    else if (a?.type === "reorder") cell = a.value.join(" > ");
    rows.push([String(q.id), cell]);
  }
  return rows.map(r => r.map(escapeCell).join(",")).join("\r\n");
}

function escapeCell(s) {
  if (/[",\r\n]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
  return s;
}

export function downloadCsv(csv, filename) {
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function buildFilename(now = new Date()) {
  const pad = n => String(n).padStart(2, "0");
  const ts = `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}-${pad(now.getHours())}${pad(now.getMinutes())}`;
  return `situational_judgement_results_${ts}.csv`;
}
