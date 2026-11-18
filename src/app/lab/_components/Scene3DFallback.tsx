"use client";

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { portfolioMetrics } from "@/lib/data/portfolio-metrics";

const fallbackData = [
	{ label: "Before", fps: portfolioMetrics.fps.before },
	{ label: "After", fps: portfolioMetrics.fps.after },
];

// WebGL / reduced-motion 대체 2D
export function Scene3DFallback() {
	return (
		<div className="space-y-3 rounded-xl border border-brand-border bg-white p-4">
			<p className="text-sm font-bold">
				2D Fallback — FPS {portfolioMetrics.fps.before} → {portfolioMetrics.fps.after}
			</p>
			<p className="text-xs text-brand-secondary">
				prefers-reduced-motion 또는 WebGL 불가 환경에서는 정적 차트로 대체합니다.
			</p>
			<div className="h-48 w-full">
				<ResponsiveContainer width="100%" height="100%">
					<LineChart data={fallbackData}>
						<XAxis dataKey="label" tick={{ fontSize: 12 }} />
						<YAxis domain={[0, 70]} tick={{ fontSize: 12 }} />
						<Tooltip />
						<Line
							type="monotone"
							dataKey="fps"
							stroke="#0070f3"
							strokeWidth={2}
							dot={{ r: 4 }}
						/>
					</LineChart>
				</ResponsiveContainer>
			</div>
		</div>
	);
}
