"use client";

import { useState } from "react";
import {
  ResponsiveContainer,
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import type { AnalyticsWeekPoint } from "@/lib/data/types";

const SERIES = {
  proposalsSent: { label: "Proposals sent", color: "var(--chart-sent)" },
  won: { label: "Won", color: "var(--chart-won)" },
};

export function WeeklyTrendChart({ data }: { data: AnalyticsWeekPoint[] }) {
  const [showTable, setShowTable] = useState(false);

  return (
    <div className="viz-root">
      <style>{`
        .viz-root {
          --chart-sent: #eb6834;
          --chart-won: #1baf7a;
          --chart-grid: #e1e0d9;
          --chart-axis: #898781;
        }
        :root[data-theme="dark"] .viz-root {
          --chart-sent: #d95926;
          --chart-won: #199e70;
          --chart-grid: #2c2c2a;
          --chart-axis: #898781;
        }
      `}</style>

      <div className="flex items-center justify-end mb-1">
        <button
          onClick={() => setShowTable((v) => !v)}
          className="text-xs text-brand hover:underline"
        >
          {showTable ? "View as chart" : "View as table"}
        </button>
      </div>

      {showTable ? (
        <div className="overflow-x-auto scrollbar-thin">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-ink-muted border-b border-border">
                <th className="py-2 pr-4 font-medium">Week of</th>
                <th className="py-2 pr-4 font-medium">Proposals sent</th>
                <th className="py-2 font-medium">Won</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row) => (
                <tr key={row.week} className="border-b border-border last:border-0">
                  <td className="py-2 pr-4">{row.week}</td>
                  <td className="py-2 pr-4">{row.proposalsSent}</td>
                  <td className="py-2">{row.won}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={data} margin={{ top: 4, right: 8, left: -16, bottom: 0 }}>
              <CartesianGrid vertical={false} stroke="var(--chart-grid)" />
              <XAxis
                dataKey="week"
                tick={{ fontSize: 12, fill: "var(--chart-axis)" }}
                axisLine={{ stroke: "var(--chart-grid)" }}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 12, fill: "var(--chart-axis)" }}
                axisLine={false}
                tickLine={false}
                width={28}
                allowDecimals={false}
                domain={[0, "dataMax + 1"]}
                tickCount={5}
              />
              <Tooltip
                contentStyle={{
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  borderRadius: 8,
                  fontSize: 12,
                }}
              />
              <Legend
                verticalAlign="top"
                align="right"
                height={28}
                formatter={(value: string) => (
                  <span style={{ color: "var(--ink-muted)", fontSize: 12 }}>{value}</span>
                )}
              />
              <Bar
                dataKey="proposalsSent"
                name={SERIES.proposalsSent.label}
                fill={SERIES.proposalsSent.color}
                radius={[4, 4, 0, 0]}
                barSize={18}
              />
              <Line
                type="monotone"
                dataKey="won"
                name={SERIES.won.label}
                stroke={SERIES.won.color}
                strokeWidth={2}
                dot={{ r: 4, fill: SERIES.won.color, strokeWidth: 0 }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
