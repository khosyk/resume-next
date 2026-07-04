interface ExperienceItemProps {
	company: string;
	role: string;
	period: string;
	desc: string;
}

export function ExperienceItem({ company, role, period, desc }: ExperienceItemProps) {
	return (
		<div className="relative pl-8 border-l border-white/10">
			<div className="absolute left-[-5px] top-0 w-[9px] h-[9px] rounded-full bg-brand-accent" />
			<span className="text-xs font-bold text-brand-accent uppercase tracking-widest mb-2 block">
				{period}
			</span>
			<h3 className="text-2xl font-bold mb-1">{company}</h3>
			<p className="text-white/60 font-medium mb-4">{role}</p>
			<p className="text-sm text-white/40 leading-relaxed">{desc}</p>
		</div>
	);
}
