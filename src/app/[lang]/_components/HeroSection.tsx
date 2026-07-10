import { CheckCircle2, Github, Linkedin, Mail, Phone, Zap } from "lucide-react";
import Link from "next/link";
import { profileLinks } from "@/lib/data/links";
import { getDictionary, type Lang } from "@/lib/i18n";

interface HeroSectionProps {
	lang: Lang;
}

// Hero — SSG Server (fade-up CSS)
export function HeroSection({ lang }: HeroSectionProps) {
	const t = getDictionary(lang);

	return (
		<section id="profile" className="overflow-hidden px-6 pb-20 pt-32">
			<div className="mx-auto max-w-7xl">
				<div className="grid items-end gap-12 lg:grid-cols-[1fr_400px]">
					<div>
						<div
							className="animate-fade-up mb-6 inline-flex items-center gap-2 rounded-full border border-brand-border bg-brand-surface px-3 py-1 text-xs font-bold text-brand-accent"
							style={{ animationDelay: "0s" }}
						>
							<Zap size={14} />
							<span>{t.hero.badge}</span>
						</div>
						<h1
							className="animate-fade-up mb-8 text-6xl font-black leading-[0.95] tracking-tighter text-brand-primary md:text-8xl"
							style={{ animationDelay: "0.1s" }}
						>
							{lang === "ko" ? (
								<>
									<span className="text-[calc(1em+4px)]">55만</span>
									<span className="text-[calc(1em-4px)]"> 유저의</span>
									<br />
									<span className="text-[calc(1em+6px)]">안정성을</span>
									<br />
									<span className="text-[calc(1em+6px)]">설계하는</span>
									<span className="text-[calc(1em-4px)]"> 해결사.</span>
								</>
							) : (
								<>
									<span className="text-[calc(1em+6px)]">Architecting</span>
									<span className="text-[calc(1em-4px)]"> </span>
									<span className="text-[calc(1em+6px)]">Stability</span>
									<br />
									<span className="text-[calc(1em-4px)]">for </span>
									<span className="text-[calc(1em+4px)]">550K</span>
									<span className="text-[calc(1em-4px)]"> Users.</span>
								</>
							)}
						</h1>
						<p
							className="animate-fade-up text-balance mb-10 max-w-2xl text-xl leading-relaxed text-brand-secondary md:text-2xl"
							style={{ animationDelay: "0.2s" }}
						>
							{t.hero.desc}
						</p>

						<div
							className="animate-fade-up flex flex-wrap items-center gap-6"
							style={{ animationDelay: "0.3s" }}
						>
							<div className="flex items-center gap-2 text-sm font-medium">
								<Mail size={18} className="text-brand-accent" />
								<span>{profileLinks.email}</span>
							</div>
							<div className="flex items-center gap-2 text-sm font-medium">
								<Phone size={18} className="text-brand-accent" />
								<span>{profileLinks.phone}</span>
							</div>
							<div className="flex flex-wrap items-center gap-3">
								{lang === "ko" && (
									<>
										<a
											href={profileLinks.notion.resume}
											target="_blank"
											rel="noopener noreferrer"
											className="inline-flex items-center gap-2 rounded-full border border-brand-border px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-brand-primary transition-colors hover:bg-brand-surface hover:text-brand-accent"
										>
											<span
												className="inline-flex shrink-0 items-center justify-center rounded-full p-2 text-[15px] font-black leading-none text-brand-secondary"
												aria-hidden
											>
												N
											</span>
											<span className="leading-none">{t.hero.resume}</span>
										</a>
										<a
											href={profileLinks.notion.coverLetter}
											target="_blank"
											rel="noopener noreferrer"
											className="inline-flex items-center gap-2 rounded-full border border-brand-border px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-brand-primary transition-colors hover:bg-brand-surface hover:text-brand-accent"
										>
											<span
												className="inline-flex shrink-0 items-center justify-center rounded-full p-2 text-[15px] font-black leading-none text-brand-secondary"
												aria-hidden
											>
												N
											</span>
											<span className="leading-none">{t.hero.coverLetter}</span>
										</a>
									</>
								)}
								<a
									href={profileLinks.chromeWebStore}
									target="_blank"
									rel="noopener noreferrer"
									className="inline-flex items-center gap-2 rounded-full border border-brand-border px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-brand-primary transition-colors hover:bg-brand-surface hover:text-brand-accent"
								>
									<span
										className="inline-flex shrink-0 items-center justify-center rounded-full p-2 text-[15px] font-black leading-none text-brand-secondary"
										aria-hidden
									>
										C
									</span>
									<span className="leading-none">{t.hero.webSummary}</span>
								</a>
								<Link
									href="/lab"
									className="inline-flex items-center gap-2 rounded-full border border-brand-accent/30 bg-brand-accent/5 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-brand-accent transition-colors hover:bg-brand-accent hover:text-white"
								>
									<span
										className="inline-flex shrink-0 items-center justify-center rounded-full p-2 text-[15px] font-black leading-none"
										aria-hidden
									>
										L
									</span>
									<span className="leading-none">{t.hero.lab}</span>
								</Link>
							</div>
							<div className="flex gap-4">
								<a
									href={profileLinks.github}
									target="_blank"
									rel="noreferrer"
									className="rounded-full border border-brand-border p-2 transition-colors hover:bg-brand-surface"
								>
									<Github size={20} />
								</a>
								<a
									href={profileLinks.linkedin}
									target="_blank"
									rel="noreferrer"
									className="rounded-full border border-brand-border p-2 transition-colors hover:bg-brand-surface"
								>
									<Linkedin size={20} />
								</a>
							</div>
						</div>
					</div>

					<div
						className="animate-fade-up rounded-3xl border border-brand-border bg-brand-surface p-8 shadow-xl lg:translate-y-12"
						style={{ animationDelay: "0.4s" }}
					>
						<h3 className="mb-6 text-xs font-bold uppercase tracking-widest text-brand-secondary">
							{t.hero.summaryTitle}
						</h3>
						<p className="mb-6 text-sm leading-relaxed text-brand-secondary">
							{t.hero.summaryDesc}
						</p>
						<div className="space-y-4">
							<div className="flex items-center gap-3">
								<CheckCircle2 size={16} className="text-brand-accent" />
								<span className="text-xs font-semibold">{t.hero.summaryPoint1}</span>
							</div>
							<div className="flex items-center gap-3">
								<CheckCircle2 size={16} className="text-brand-accent" />
								<span className="text-xs font-semibold">{t.hero.summaryPoint2}</span>
							</div>
							<div className="flex items-center gap-3">
								<CheckCircle2 size={16} className="text-brand-accent" />
								<span className="text-xs font-semibold">{t.hero.summaryPoint3}</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
