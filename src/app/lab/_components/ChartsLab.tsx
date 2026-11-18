"use client";

import {
	Bar,
	BarChart,
	CartesianGrid,
	Legend,
	Line,
	LineChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";
import { portfolioMetrics } from "@/lib/data/portfolio-metrics";

const barData = [
	{
		name: "Crash",
		before: portfolioMetrics.crashRate.before,
		after: portfolioMetrics.crashRate.after,
	},
	{
		name: "FPS",
		before: portfolioMetrics.fps.before,
		after: portfolioMetrics.fps.after,
	},
	{
		name: "QA",
		before: portfolioMetrics.qaPass.before,
		after: portfolioMetrics.qaPass.after,
	},
];

// 스토리텔링용 합성 timeline (실데이터 API 아님)
const lineData = [
	{ month: "M1", crash: 3.89 },
	{ month: "M2", crash: 2.1 },
	{ month: "M3", crash: 0.8 },
	{ month: "M4", crash: 0.2 },
	{ month: "M5", crash: 0.02 },
];

// Recharts Client island — Bar + Line
export default function ChartsLab() {
	return (
		<div className="space-y-8">
			<div>
				<h3 className="mb-2 text-sm font-bold">품질 지표 Before → After</h3>
				<div className="h-64 w-full">
					<ResponsiveContainer width="100%" height="100%">
						<BarChart data={barData} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
							<CartesianGrid strokeDasharray="3 3" stroke="#eaeaea" />
							<XAxis dataKey="name" tick={{ fontSize: 12 }} />
							<YAxis tick={{ fontSize: 12 }} />
							<Tooltip />
							<Legend />
							<Bar
								dataKey="before"
								fill="#666666"
								name="Before"
								radius={[4, 4, 0, 0]}
							/>
							<Bar dataKey="after" fill="#0070f3" name="After" radius={[4, 4, 0, 0]} />
						</BarChart>
					</ResponsiveContainer>
				</div>
			</div>

			<div>
				<h3 className="mb-2 text-sm font-bold">Crash Rate 추이 (샘플 시리즈)</h3>
				<p className="mb-2 text-xs text-brand-secondary">
					실데이터 API가 아니라 portfolio narrative용 합성 시리즈입니다.
				</p>
				<div className="h-64 w-full">
					<ResponsiveContainer width="100%" height="100%">
						<LineChart
							data={lineData}
							margin={{ top: 8, right: 8, left: 0, bottom: 0 }}
						>
							<CartesianGrid strokeDasharray="3 3" stroke="#eaeaea" />
							<XAxis dataKey="month" tick={{ fontSize: 12 }} />
							<YAxis tick={{ fontSize: 12 }} domain={[0, 4]} />
							<Tooltip />
							<Line
								type="monotone"
								dataKey="crash"
								stroke="#0070f3"
								strokeWidth={2}
								dot={{ r: 3 }}
								name="Crash %"
							/>
						</LineChart>
					</ResponsiveContainer>
				</div>
			</div>
		</div>
	);
}
