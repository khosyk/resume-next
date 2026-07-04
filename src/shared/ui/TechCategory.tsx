import { motion } from "motion/react";
import type { ReactNode } from "react";

interface TechCategoryProps {
	title: string;
	icon: ReactNode;
	items: string[];
}

export function TechCategory({ title, icon, items }: TechCategoryProps) {
	return (
		<div className="space-y-4">
			<div className="flex items-center gap-2 text-brand-primary">
				{icon}
				<h4 className="font-bold text-sm uppercase tracking-wider">{title}</h4>
			</div>
			<div className="flex flex-wrap gap-2">
				{items.map((item, i) => (
					<motion.span
						key={item}
						initial={{
							backgroundColor: "rgba(248, 249, 250, 1)",
							color: "rgba(108, 117, 125, 1)",
							scale: 1,
						}}
						whileInView={{
							backgroundColor: [
								"rgba(248, 249, 250, 1)",
								"rgba(226, 232, 240, 1)",
								"rgba(255, 255, 255, 1)",
								"rgba(226, 232, 240, 1)",
								"rgba(248, 249, 250, 1)",
							],
							color: [
								"rgba(108, 117, 125, 1)",
								"rgba(15, 23, 42, 1)",
								"rgba(0, 0, 0, 1)",
								"rgba(15, 23, 42, 1)",
								"rgba(108, 117, 125, 1)",
							],
							scale: [1, 1.05, 1.1, 1.05, 1],
							boxShadow: [
								"0 0 0 rgba(0,0,0,0)",
								"0 0 15px rgba(255,255,255,0.5)",
								"0 0 30px rgba(255,255,255,0.9), inset 0 0 15px rgba(255,255,255,0.8)",
								"0 0 15px rgba(255,255,255,0.5)",
								"0 0 0 rgba(0,0,0,0)",
							],
							borderColor: [
								"rgba(222, 226, 230, 1)",
								"rgba(255, 255, 255, 1)",
								"rgba(255, 255, 255, 1)",
								"rgba(255, 255, 255, 1)",
								"rgba(222, 226, 230, 1)",
							],
						}}
						viewport={{ once: false, amount: 0.8 }}
						transition={{
							duration: 2,
							delay: i * 0.15,
							ease: "easeInOut",
							repeat: Infinity,
							repeatDelay: 4,
						}}
						className="px-3 py-1 bg-brand-surface border border-brand-border rounded-md text-xs font-black relative overflow-hidden group"
					>
						<motion.div
							initial={{ x: "-150%", skewX: -20 }}
							whileInView={{ x: "250%" }}
							transition={{
								duration: 1.2,
								delay: i * 0.15,
								repeat: Infinity,
								repeatDelay: 4.8,
								ease: "linear",
							}}
							className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent pointer-events-none z-10"
						/>
						<span className="relative z-0">{item}</span>
					</motion.span>
				))}
			</div>
		</div>
	);
}
