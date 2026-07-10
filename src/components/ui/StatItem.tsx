interface StatItemProps {
	label: string;
	value: string;
	subValue: string;
	desc: string;
	color?: string;
	subValueColor?: string;
}

// 성과 지표 카드 — hover는 CSS transform (Server)
export function StatItem({
	label,
	value,
	subValue,
	desc,
	color = "text-white",
	subValueColor = "bg-brand-accent/20 text-brand-accent",
}: StatItemProps) {
	return (
		<div className="flex flex-col transition-transform duration-200 hover:-translate-y-1">
			<span className="mb-2 text-xs font-bold uppercase tracking-widest text-white/50">
				{label}
			</span>
			<span className={`mb-1 text-5xl font-black tracking-tighter ${color}`}>
				{value}
			</span>
			<div
				className={`mb-4 inline-flex w-fit items-center rounded-full px-2 py-0.5 text-[10px] font-bold ${subValueColor}`}
			>
				{subValue}
			</div>
			<p className="text-xs leading-tight text-white/40">{desc}</p>
		</div>
	);
}
