import { Award, Globe } from "lucide-react";
import { ExperienceItem } from "@/components/ui/ExperienceItem";
import { getDictionary, type Lang } from "@/lib/i18n";

interface CareerSectionProps {
	lang: Lang;
}

// 경력·학력 — SSG Server
export function CareerSection({ lang }: CareerSectionProps) {
	const t = getDictionary(lang);

	return (
		<section id="career" className="bg-brand-primary px-6 py-24 text-white">
			<div className="mx-auto max-w-7xl">
				<div className="grid gap-20 md:grid-cols-2">
					<div className="animate-fade-up" style={{ animationDelay: "0s" }}>
						<h2 className="mb-12 flex items-center gap-4 text-4xl font-black uppercase tracking-tighter">
							<Award className="text-brand-accent" /> {t.career.title}
						</h2>
						<div className="space-y-12">
							<ExperienceItem
								company={t.career.connectiCompany}
								role={t.career.connectiRole}
								period={t.career.connectiPeriod}
								desc={t.career.connecti}
							/>
							<ExperienceItem
								company={t.career.biskitCompany}
								role={t.career.biskitRole}
								period={t.career.biskitPeriod}
								desc={t.career.biskit}
							/>
						</div>
					</div>
					<div className="animate-fade-up" style={{ animationDelay: "0.15s" }}>
						<h2 className="mb-12 flex items-center gap-4 text-4xl font-black uppercase tracking-tighter">
							<Globe className="text-brand-accent" /> {t.career.edu}
						</h2>
						<div className="space-y-12">
							<ExperienceItem
								company={t.career.univCompany}
								role={t.career.univ}
								period={t.career.univPeriod}
								desc={t.career.exchange}
							/>
							<div className="rounded-2xl border border-white/10 bg-white/5 p-6">
								<h4 className="mb-2 text-lg font-bold">{t.career.globalTitle}</h4>
								<p className="text-sm leading-relaxed text-white/60">
									{t.career.globalDesc}
								</p>
							</div>
							<div className="rounded-2xl border border-white/10 bg-white/5 p-6">
								<h4 className="mb-2 text-lg font-bold">{t.career.extraTitle}</h4>
								<p className="text-sm leading-relaxed text-white/60">
									{t.career.extraDesc}
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
