import { StatItem } from "@/components/ui/StatItem";
import { getDictionary, type Lang } from "@/lib/i18n";

interface StatsSectionProps {
	lang: Lang;
}

// 성과 지표 — SSG Server
export function StatsSection({ lang }: StatsSectionProps) {
	const t = getDictionary(lang);

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
							value="0.02%"
							subValue={lang === "ko" ? "기존 3.89% 대비" : "vs. prior 3.89%"}
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
							value="60fps"
							subValue="40fps → 60fps"
							desc={t.stats.performanceDesc}
							color="text-white"
						/>
					</div>
					<div className="animate-fade-up" style={{ animationDelay: "0.2s" }}>
						<StatItem
							label={t.stats.productivity}
							value="+20%"
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
							value="100%"
							subValue="60% → 100%"
							desc={t.stats.efficiencyDesc}
							color="text-white"
						/>
					</div>
				</div>
			</div>
		</section>
	);
}
