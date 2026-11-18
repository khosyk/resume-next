import { StatItem } from "@/components/ui/StatItem";
import { portfolioMetrics } from "@/lib/data/portfolio-metrics";
import { getDictionary, type Lang } from "@/lib/i18n";

interface StatsSectionProps {
	lang: Lang;
}

// 성과 지표 — SSG Server (portfolioMetrics SSOT)
export function StatsSection({ lang }: StatsSectionProps) {
	const t = getDictionary(lang);
	const { crashRate, fps, qaPass, codeReduction } = portfolioMetrics;

	return (
		<section
			id="stats"
			className="relative overflow-hidden bg-brand-primary pb-20 pt-12 text-white"
		>
			<div className="mx-auto max-w-7xl px-6">
				<div className="grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-12">
					<div className="animate-fade-up" style={{ animationDelay: "0s" }}>
						<StatItem
							label={t.stats.stability}
							value={`${crashRate.after}${crashRate.unit}`}
							subValue={
								lang === "ko"
									? `기존 ${crashRate.before}${crashRate.unit} 대비`
									: `vs. prior ${crashRate.before}${crashRate.unit}`
							}
							desc={t.stats.stabilityDesc}
							color="text-white"
						/>
					</div>
					<div
						className="animate-fade-up md:translate-y-8"
						style={{ animationDelay: "0.1s" }}
					>
						<StatItem
							label={t.stats.performance}
							value={`${fps.after}fps`}
							subValue={`${fps.before}fps → ${fps.after}fps`}
							desc={t.stats.performanceDesc}
							color="text-white"
						/>
					</div>
					<div className="animate-fade-up" style={{ animationDelay: "0.2s" }}>
						<StatItem
							label={t.stats.productivity}
							value={`+${codeReduction}%`}
							subValue={lang === "ko" ? "코드량 절감" : "Code reduction"}
							desc={t.stats.productivityDesc}
							color="text-white"
						/>
					</div>
					<div
						className="animate-fade-up md:translate-y-8"
						style={{ animationDelay: "0.3s" }}
					>
						<StatItem
							label={t.stats.efficiency}
							value={`${qaPass.after}${qaPass.unit}`}
							subValue={`${qaPass.before}${qaPass.unit} → ${qaPass.after}${qaPass.unit}`}
							desc={t.stats.efficiencyDesc}
							color="text-white"
						/>
					</div>
				</div>
			</div>
		</section>
	);
}
