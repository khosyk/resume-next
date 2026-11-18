import type { ReactNode } from "react";

interface TechCategoryProps {
	title: string;
	icon: ReactNode;
	items: string[];
}

// 기술 스택 태그 — Tailwind keyframes shimmer (Server)
export function TechCategory({ title, icon, items }: TechCategoryProps) {
	return (
		<div className="space-y-4">
			<div className="flex items-center gap-2 text-brand-primary">
				{icon}
				<h4 className="text-sm font-bold uppercase tracking-wider">{title}</h4>
			</div>
			<div className="flex flex-wrap gap-2">
				{items.map((item, i) => (
					<span
						key={item}
						className="group relative overflow-hidden rounded-md border border-brand-border bg-brand-surface px-3 py-1 text-xs font-black transition-transform duration-300 hover:scale-105"
						style={{ animationDelay: `${i * 0.15}s` }}
					>
						<span
							className="pointer-events-none absolute inset-0 z-10 animate-tech-shimmer bg-gradient-to-r from-transparent via-white/60 to-transparent"
							style={{ animationDelay: `${i * 0.15}s` }}
						/>
						<span className="relative z-0">{item}</span>
					</span>
				))}
			</div>
		</div>
	);
}
