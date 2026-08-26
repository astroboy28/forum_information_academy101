const JLPT_COLORS = {
  N1: { bg: "var(--color-indigo-50)", fg: "var(--color-indigo-700)" },
  N2: { bg: "var(--color-teal-50)", fg: "var(--color-teal-600)" },
  N3: { bg: "var(--color-amber-50)", fg: "var(--color-amber-600)" },
  N4: { bg: "#F1F2F4", fg: "var(--color-ink-soft)" },
  N5: { bg: "#F1F2F4", fg: "var(--color-ink-soft)" },
  NONE: { bg: "#F1F2F4", fg: "var(--color-ink-soft)" },
};

export function JLPTBadge({ level }) {
  const c = JLPT_COLORS[level] || JLPT_COLORS.NONE;
  return (
    <span className="badge" style={{ background: c.bg, color: c.fg }}>
      {level === "NONE" ? "JLPT —" : `JLPT ${level}`}
    </span>
  );
}

export function StatusBadge({ active }) {
  return (
    <span
      className="badge"
      style={{
        background: active ? "var(--color-teal-50)" : "var(--color-danger-50)",
        color: active ? "var(--color-teal-600)" : "var(--color-danger-500)",
      }}
    >
      {active ? "Active" : "Inactive"}
    </span>
  );
}

// Signature element: a snowflake-spoked ring, a nod to Niigata's snow-country
// setting, that also encodes real attendance data.
export function AttendanceRing({ rate }) {
  const value = rate == null ? 0 : Number(rate);
  const radius = 20;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;
  const color = value >= 90 ? "var(--color-teal-500)" : value >= 75 ? "var(--color-amber-500)" : "var(--color-danger-500)";

  return (
    <div className="relative h-14 w-14 shrink-0">
      <svg viewBox="0 0 48 48" className="h-14 w-14 -rotate-90">
        <circle cx="24" cy="24" r={radius} fill="none" stroke="var(--color-border)" strokeWidth="4" />
        <circle
          cx="24" cy="24" r={radius} fill="none" stroke={color} strokeWidth="4" strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={rate == null ? circumference : offset}
        />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center font-mono text-[11px] font-semibold">
        {rate == null ? "—" : `${Math.round(value)}%`}
      </span>
    </div>
  );
}