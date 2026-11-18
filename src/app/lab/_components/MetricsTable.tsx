import { portfolioMetrics, type PortfolioMetrics } from "@/lib/data/portfolio-metrics";

interface MetricsTableProps {
	metrics?: PortfolioMetrics;
}

// Lab Live용 metrics 표 (SSR/SSG/ISR/CSR 공통)
export function MetricsTable({ metrics = portfolioMetrics }: MetricsTableProps) {
	const rows = [
		{
			label: "Crash Rate",
			value: `${metrics.crashRate.after}${metrics.crashRate.unit}`,
			detail: `${metrics.crashRate.before}${metrics.crashRate.unit} → ${metrics.crashRate.after}${metrics.crashRate.unit}`,
		},
		{
			label: "FPS",
			value: `${metrics.fps.after}`,
			detail: `${metrics.fps.before} → ${metrics.fps.after}`,
		},
		{
			label: "QA Pass",
			value: `${metrics.qaPass.after}${metrics.qaPass.unit}`,
			detail: `${metrics.qaPass.before}${metrics.qaPass.unit} → ${metrics.qaPass.after}${metrics.qaPass.unit}`,
		},
		{
			label: "Code Reduction",
			value: `+${metrics.codeReduction}%`,
			detail: "공통 컴포넌트·자동화",
		},
		{
			label: "Users",
			value: metrics.users.toLocaleString("en-US"),
			detail: "누적 사용자",
		},
		{
			label: "MAU",
			value: metrics.mau.toLocaleString("en-US"),
			detail: "월간 활성",
		},
	];

	return (
		<div className="overflow-x-auto rounded-xl border border-brand-border bg-white">
			<table className="w-full text-left text-sm">
				<thead className="border-b border-brand-border bg-brand-surface/60 text-xs uppercase tracking-wider text-brand-secondary">
					<tr>
						<th className="px-4 py-3 font-bold">Metric</th>
						<th className="px-4 py-3 font-bold">Value</th>
						<th className="px-4 py-3 font-bold">Detail</th>
					</tr>
				</thead>
				<tbody>
					{rows.map((row) => (
						<tr
							key={row.label}
							className="border-b border-brand-border/70 last:border-0"
						>
							<td className="px-4 py-2.5 font-semibold">{row.label}</td>
							<td className="px-4 py-2.5 font-mono text-brand-accent">{row.value}</td>
							<td className="px-4 py-2.5 text-brand-secondary">{row.detail}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
