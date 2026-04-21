import React from "react";

export function renderBody(body) {
  if (!body) return null;
  const paragraphs = body.split(/\n{2,}/);
  return paragraphs.map((p, i) => renderParagraph(p, i));
}

function renderParagraph(p, key) {
  const lines = p.split("\n");
  const isBulletBlock = lines.every(l => l.startsWith("- "));
  if (isBulletBlock) {
    return (
      <ul key={key}>
        {lines.map((l, i) => <li key={i}>{renderInline(l.slice(2))}</li>)}
      </ul>
    );
  }
  // Single-line bold heading: "**Title**"
  const boldMatch = /^\*\*(.+)\*\*$/.exec(p.trim());
  if (boldMatch) {
    return <p key={key}><strong>{boldMatch[1]}</strong></p>;
  }
  return <p key={key}>{renderInline(p)}</p>;
}

function renderInline(text) {
  // Split on **bold** segments
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    const m = /^\*\*(.+)\*\*$/.exec(part);
    if (m) return <strong key={i}>{m[1]}</strong>;
    return <React.Fragment key={i}>{part}</React.Fragment>;
  });
}
