"use client";

import { useState } from "react";

// Validated categorical palette (dataviz six-checks, light surface):
// wine / gold / green — worst adjacent CVD ΔE 12.4. Value labels carry the
// gold contrast WARN. Fixed order, never cycled.
const PALETTE = ["#B23A48", "#C9A227", "#2F8F5B"] as const;
const STATUS = { good: "#2F8F5B", warning: "#C9A227" } as const;
const SINGLE = "#B23A48"; // single-hue magnitude (trend bars)

type Slice = { label: string; value: number; color: string };

function Card({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white border border-[color:var(--line)] rounded-lg p-6">
      <h3 className="font-display text-[1.05rem] font-semibold text-ink">{title}</h3>
      {subtitle && <p className="font-sans text-[0.8rem] text-ink-soft mt-0.5">{subtitle}</p>}
      <div className="mt-5">{children}</div>
    </div>
  );
}

/* ---------------------------------- Donut --------------------------------- */

function Donut({ data }: { data: Slice[] }) {
  const [hi, setHi] = useState<number | null>(null);
  const size = 180;
  const thickness = 24;
  const r = (size - thickness) / 2;
  const c = 2 * Math.PI * r;
  const cx = size / 2;
  const cy = size / 2;
  const total = data.reduce((s, d) => s + d.value, 0);

  let offset = 0;
  const gap = total > 0 ? 3 : 0;
  const segs = data.map((d, i) => {
    const frac = total > 0 ? d.value / total : 0;
    const len = Math.max(frac * c - gap, 0.0001);
    const seg = { ...d, i, dash: `${len} ${c - len}`, dashoffset: -offset };
    offset += frac * c;
    return seg;
  });

  const centerValue = hi != null ? data[hi].value : total;
  const centerLabel = hi != null ? data[hi].label : "Total";

  return (
    <div className="flex flex-col sm:flex-row items-center gap-6">
      <svg viewBox={`0 0 ${size} ${size}`} className="w-[160px] h-[160px] shrink-0" role="img">
        <g transform={`rotate(-90 ${cx} ${cy})`}>
          <circle cx={cx} cy={cy} r={r} fill="none" stroke="var(--line)" strokeWidth={thickness} />
          {segs.map((s) => (
            <circle
              key={s.i}
              cx={cx}
              cy={cy}
              r={r}
              fill="none"
              stroke={s.color}
              strokeWidth={hi === s.i ? thickness + 4 : thickness}
              strokeDasharray={s.dash}
              strokeDashoffset={s.dashoffset}
              opacity={hi === null || hi === s.i ? 1 : 0.35}
              style={{ transition: "opacity .15s, stroke-width .15s", cursor: "pointer" }}
              onMouseEnter={() => setHi(s.i)}
              onMouseLeave={() => setHi(null)}
            />
          ))}
        </g>
        <text
          x={cx}
          y={cy - 4}
          textAnchor="middle"
          className="fill-ink font-display"
          style={{ fontSize: 30, fontWeight: 600 }}
        >
          {centerValue}
        </text>
        <text x={cx} y={cy + 16} textAnchor="middle" className="fill-ink-soft" style={{ fontSize: 11 }}>
          {centerLabel}
        </text>
      </svg>

      <ul className="w-full space-y-2">
        {data.map((d, i) => {
          const pct = total > 0 ? Math.round((d.value / total) * 100) : 0;
          return (
            <li
              key={d.label}
              onMouseEnter={() => setHi(i)}
              onMouseLeave={() => setHi(null)}
              className={`flex items-center gap-2.5 font-sans text-[0.85rem] rounded-md px-2 py-1 -mx-2 cursor-pointer transition-colors ${
                hi === i ? "bg-cream-dim" : ""
              }`}
            >
              <span className="w-3 h-3 rounded-[3px] shrink-0" style={{ background: d.color }} />
              <span className="text-ink-soft flex-1">{d.label}</span>
              <span className="font-semibold text-ink">{d.value}</span>
              <span className="text-ink-soft/70 w-9 text-right">{pct}%</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/* ------------------------------ Trend (bars) ------------------------------ */

function MiniTrend({
  title,
  months,
  values,
}: {
  title: string;
  months: string[];
  values: number[];
}) {
  const [hi, setHi] = useState<number | null>(null);
  const max = Math.max(1, ...values);
  const totalRecent = values.reduce((a, b) => a + b, 0);

  return (
    <div>
      <div className="flex items-baseline justify-between mb-2">
        <span className="font-sans text-[0.82rem] font-medium text-ink">{title}</span>
        <span className="font-sans text-[0.74rem] text-ink-soft">{totalRecent} in 6 mo</span>
      </div>
      <div className="flex items-end gap-1.5 h-[72px]">
        {values.map((v, i) => (
          <div
            key={i}
            className="flex-1 flex flex-col items-center justify-end h-full group relative"
            onMouseEnter={() => setHi(i)}
            onMouseLeave={() => setHi(null)}
          >
            {hi === i && (
              <div className="absolute -top-1 z-10 -translate-y-full whitespace-nowrap bg-ink text-cream text-[0.7rem] font-sans px-2 py-1 rounded pointer-events-none">
                {months[i]}: {v}
              </div>
            )}
            <div
              className="w-full rounded-t-[4px] transition-opacity"
              style={{
                height: `${Math.max((v / max) * 100, v > 0 ? 6 : 2)}%`,
                background: v > 0 ? SINGLE : "var(--line)",
                opacity: hi === null || hi === i ? 1 : 0.4,
              }}
              title={`${months[i]}: ${v}`}
            />
          </div>
        ))}
      </div>
      <div className="flex gap-1.5 mt-1.5">
        {months.map((m, i) => (
          <span key={i} className="flex-1 text-center font-sans text-[0.64rem] text-ink-soft/70">
            {m}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ----------------------------- Ratings bars ------------------------------- */

function Stars({ value, size = 15 }: { value: number; size?: number }) {
  return (
    <span className="inline-flex">
      {[1, 2, 3, 4, 5].map((n) => (
        <svg key={n} width={size} height={size} viewBox="0 0 24 24" fill={n <= value ? "#C9A227" : "none"} stroke="#C9A227" strokeWidth="1.4">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </span>
  );
}

function Ratings({ total, average, dist }: { total: number; average: number; dist: number[] }) {
  // dist is [5★,4★,3★,2★,1★]
  const max = Math.max(1, ...dist);
  return (
    <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start">
      <div className="text-center shrink-0">
        <div className="font-display text-[2.6rem] font-semibold text-ink leading-none">
          {average.toFixed(1)}
        </div>
        <div className="mt-1.5">
          <Stars value={Math.round(average)} />
        </div>
        <div className="font-sans text-[0.78rem] text-ink-soft mt-1">
          {total} {total === 1 ? "review" : "reviews"}
        </div>
      </div>
      <div className="w-full space-y-1.5">
        {dist.map((count, idx) => {
          const star = 5 - idx;
          return (
            <div key={star} className="flex items-center gap-2 font-sans text-[0.8rem]">
              <span className="text-ink-soft w-8 shrink-0">{star}★</span>
              <div className="flex-1 h-2.5 bg-cream-dim rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full"
                  style={{ width: `${(count / max) * 100}%`, background: STATUS.warning }}
                />
              </div>
              <span className="text-ink w-6 text-right font-medium">{count}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* -------------------------------- Layout ---------------------------------- */

export type ChartData = {
  contentMix: { label: string; value: number }[];
  prayerStatus: { prayed: number; pending: number };
  submissions: { months: string[]; series: { label: string; values: number[] }[] };
  ratings: { total: number; average: number; dist: number[] };
};

export default function AdminCharts({ data }: { data: ChartData }) {
  const contentSlices: Slice[] = data.contentMix.map((d, i) => ({
    ...d,
    color: PALETTE[i % PALETTE.length],
  }));
  const prayerSlices: Slice[] = [
    { label: "Prayed for", value: data.prayerStatus.prayed, color: STATUS.good },
    { label: "Awaiting", value: data.prayerStatus.pending, color: STATUS.warning },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Content library" subtitle="Published items by type">
          <Donut data={contentSlices} />
        </Card>
        <Card title="Prayer requests" subtitle="Follow-up status">
          <Donut data={prayerSlices} />
        </Card>
      </div>

      <Card title="Submissions" subtitle="New entries over the last 6 months">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-x-6 gap-y-7">
          {data.submissions.series.map((s) => (
            <MiniTrend key={s.label} title={s.label} months={data.submissions.months} values={s.values} />
          ))}
        </div>
      </Card>

      {data.ratings.total > 0 && (
        <Card title="Ratings & reviews" subtitle="Across blog posts and sermons">
          <Ratings total={data.ratings.total} average={data.ratings.average} dist={data.ratings.dist} />
        </Card>
      )}
    </div>
  );
}
