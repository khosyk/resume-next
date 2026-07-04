import { motion } from "motion/react";

interface StatItemProps {
	label: string;
	value: string;
	subValue: string;
	desc: string;
	color?: string;
	subValueColor?: string;
}

export function StatItem({
	label,
	value,
	subValue,
	desc,
	color = "text-white",
	subValueColor = "bg-brand-accent/20 text-brand-accent",
}: StatItemProps) {
	return (
		<motion.div whileHover={{ y: -5 }} className="flex flex-col">
			<span className="text-xs font-bold text-white/50 uppercase tracking-widest mb-2">
				{label}
			</span>
			<span className={`text-5xl font-black tracking-tighter mb-1 ${color}`}>
				{value}
			</span>
			<div
				className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold w-fit mb-4 ${subValueColor}`}
			>
				{subValue}
			</div>
			<p className="text-xs text-white/40 leading-tight">{desc}</p>
		</motion.div>
	);
}
