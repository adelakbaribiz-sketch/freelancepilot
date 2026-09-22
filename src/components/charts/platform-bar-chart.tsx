"use client";

import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import type { PlatformBreakdown } from "@/lib/data/types";

const platformLabels: Record<string, string> = {
  upwork: "Upwork",
  freelancer: "Freelancer.com",
  fiverr: "Fiverr",
  toptal: "Toptal",
};

export function PlatformBarChart({ data }: { data: PlatformBreakdown[] }) {
  const chartData = data.map((d) => ({
    platform: platformLabels[d.platform] ?? d.platform,
    winRate: Math.round(d.winRate * 100),
  }));

  return (
    <div className="viz-root">
      <style>{`
        .viz-root { --chart-bar: #2a78d6; --chart-grid: #e1e0d9; --chart-axis: #898781; }
        :root[data-theme="dark"] .viz-root { --chart-bar: #3987e5; --chart-grid: #2c2c2a; --chart-axis: #898781; }
      `}</style>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} layout="vertical" margin={{ top: 4, right: 16, left: 0, bottom: 0 }}>
            <CartesianGrid horizontal={false} stroke="var(--chart-grid)" />
            <XAxis
              type="number"
              tick={{ fontSize: 12, fill: "var(--chart-axis)" }}
              axisLine={false}
              tickLine={false}
              unit="%"
            />
            <YAxis
              type="category"
              dataKey="platform"
              tick={{ fontSize: 12, fill: "var(--chart-axis)" }}
              axisLine={false}
              tickLine={false}
              width={100}
            />
            <Tooltip
              formatter={(value) => [`${value}%`, "Win rate"]}
              contentStyle={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: 8,
                fontSize: 12,
              }}
            />
            <Bar dataKey="winRate" fill="var(--chart-bar)" radius={[0, 4, 4, 0]} barSize={20} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
