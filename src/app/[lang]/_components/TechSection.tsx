import { BrainCircuit, Layers, Smartphone, Terminal } from "lucide-react";
import Link from "next/link";
import { TechCategory } from "@/components/ui/TechCategory";
import { getDictionary, type Lang } from "@/lib/i18n";

interface TechSectionProps {
	lang: Lang;
}

// 기술 스택 — SSG Server (TechCategory CSS shimmer)
export function TechSection({ lang }: TechSectionProps) {
	const t = getDictionary(lang);

	return (
		<section id="tech" className="border-b border-brand-border px-6 py-24">
			<div className="mx-auto max-w-7xl">
				<div className="flex flex-col gap-12 md:flex-row">
					<div className="animate-fade-up md:w-1/3" style={{ animationDelay: "0s" }}>
						<h2 className="mb-6 text-4xl font-black uppercase tracking-tighter">
							{t.tech.title}
						</h2>
						<p className="leading-relaxed text-brand-secondary">{t.tech.desc}</p>
					</div>
					<div className="grid gap-8 sm:grid-cols-2 md:w-2/3">
						<div className="animate-fade-up" style={{ animationDelay: "0.1s" }}>
							<TechCategory
								title={t.tech.cat1}
								icon={<Layers size={20} />}
								items={[
									"React Native",
									"React",
									"TypeScript",
									"JavaScript",
									"PWA",
									"MobX",
									"Redux Toolkit",
									"Zustand",
									"TanStack Query",
									"Reanimated",
									"Styled Components",
									"MUI",
									"Lottie",
									"Figma",
								]}
							/>
						</div>
						<div className="animate-fade-up" style={{ animationDelay: "0.2s" }}>
							<TechCategory
								title={t.tech.cat2}
								icon={<Smartphone size={20} />}
								items={[
									"Swift 5.x",
									"Android Native Module",
									"Singleton/Delegate",
									"Firebase (FCM, Dynamic Links)",
									"AWS S3",
									"REST API",
									"WebSocket",
									"Axios Interceptor",
								]}
							/>
						</div>
						<div className="animate-fade-up" style={{ animationDelay: "0.3s" }}>
							<TechCategory
								title={t.tech.cat3}
								icon={<BrainCircuit size={20} />}
								items={[
									"Cursor",
									"MCP",
									"Claude",
									"Stitch AI",
									"Git",
									"Jira",
									"App Store Connect",
									"Google Play Console",
								]}
							/>
						</div>
						<div className="animate-fade-up" style={{ animationDelay: "0.4s" }}>
							<TechCategory
								title={t.tech.cat4}
								icon={<Terminal size={20} />}
								items={[
									lang === "ko" ? "PWA Blob·미디어 처리" : "PWA Blob & media",
									lang === "ko"
										? "Android 15 (SDK 35) 16KB 페이지"
										: "Android 15 SDK 35 16KB pages",
									"Atomic Design",
									"RBAC",
								]}
							/>
						</div>
					</div>
				</div>
				<div className="animate-fade-up mt-12" style={{ animationDelay: "0.5s" }}>
					<Link
						href="/lab"
						className="group flex flex-col gap-4 rounded-2xl border border-brand-border bg-brand-surface p-6 transition-colors hover:border-brand-accent hover:bg-white sm:flex-row sm:items-center sm:justify-between"
					>
						<div>
							<p className="mb-2 text-xs font-bold uppercase tracking-widest text-brand-accent">
								{t.tech.labTitle}
							</p>
							<p className="text-sm leading-relaxed text-brand-secondary">
								{t.tech.labDesc}
							</p>
						</div>
						<span className="shrink-0 text-sm font-bold text-brand-primary group-hover:text-brand-accent">
							{t.tech.labLink}
						</span>
					</Link>
				</div>
			</div>
		</section>
	);
}
