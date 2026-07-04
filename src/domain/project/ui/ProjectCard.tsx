import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, Globe, Puzzle, Smartphone } from "lucide-react";
import React, { useState } from "react";
import type { ResumeProject } from "../model/types";

export interface ProjectCardStrings {
	achievements: string;
	problem: string;
	thinking: string;
	result: string;
}

interface ProjectCardProps {
	project: ResumeProject;
	t: ProjectCardStrings;
}

function categoryIcon(category: string) {
	const cls = "text-brand-accent shrink-0 w-[22px] h-[22px] md:w-6 md:h-6";
	if (category === "Web") {
		return <Globe className={cls} strokeWidth={2} />;
	}
	if (category === "Extension") {
		return <Puzzle className={cls} strokeWidth={2} />;
	}
	return <Smartphone className={cls} strokeWidth={2} />;
}

export function ProjectCard({ project, t }: ProjectCardProps) {
	const [expandedIndices, setExpandedIndices] = useState<number[]>([0]);

	const toggleExpand = (index: number) => {
		setExpandedIndices((prev) =>
			prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index],
		);
	};

	return (
		<div className="h-full flex flex-col bg-white border border-brand-border rounded-2xl md:rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 group/card relative">
			<div
				className={`p-4 md:p-8 ${project.color} border-b border-brand-border flex justify-between items-start`}
			>
				<div className="w-full min-w-0">
					<div className="w-11 h-11 md:w-12 md:h-12 bg-white rounded-xl md:rounded-2xl flex items-center justify-center mb-4 md:mb-6 shadow-sm group-hover/card:scale-110 transition-transform duration-500 text-brand-accent">
						{categoryIcon(project.category)}
					</div>
					<h3 className="text-xl md:text-3xl font-black tracking-tighter mb-2">
						{project.title}
					</h3>
					<p className="text-brand-secondary font-bold text-sm mb-4">
						{project.subtitle}
					</p>
					<div className="flex flex-wrap gap-1.5 md:gap-2 mt-3 md:mt-4">
						{project.tags.map((tag: string) => (
							<span
								key={tag}
								className="text-[9px] font-black uppercase tracking-widest px-2 py-1 bg-brand-primary text-white rounded"
							>
								{tag}
							</span>
						))}
					</div>
				</div>
			</div>
			<div className="p-4 md:p-8 pb-8 md:pb-10 grow flex flex-col min-w-0">
				<h4 className="text-[10px] font-black text-brand-secondary uppercase tracking-[0.2em] mb-4 md:mb-6 flex items-center gap-2">
					<div className="w-4 h-px bg-brand-accent" />
					{t.achievements}
				</h4>
				<div className="space-y-3 md:space-y-4 grow w-full min-w-0">
					{project.achievements.map((item, i) => {
						const isExpanded = expandedIndices.includes(i);
						return (
							<div
								key={i}
								className="w-full rounded-2xl md:rounded-3xl border border-brand-border bg-white overflow-hidden transition-all duration-300"
							>
								<button
									type="button"
									onClick={() => toggleExpand(i)}
									className="w-full text-left p-3 md:p-5 flex gap-3 md:gap-4 items-start hover:bg-brand-surface/50 transition-colors outline-none focus:outline-none focus-visible:outline-none ring-0"
								>
									<div className="grow pr-2 min-w-0">
										<h5 className="text-[11px] font-black text-brand-primary uppercase tracking-widest mb-1">
											{t.result}
										</h5>
										<p className="text-brand-primary text-sm font-bold leading-relaxed whitespace-pre-wrap wrap-break-word">
											{item.result}
										</p>
									</div>
									<div
										className={`shrink-0 mt-1 transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}
									>
										<ChevronDown size={18} className="text-brand-secondary" />
									</div>
								</button>
								<AnimatePresence initial={false}>
									{isExpanded && (
										<motion.div
											initial={{ height: 0, opacity: 0 }}
											animate={{ height: "auto", opacity: 1 }}
											exit={{ height: 0, opacity: 0 }}
											transition={{
												duration: 0.35,
												ease: [0.04, 0.62, 0.23, 0.98],
											}}
											className="overflow-hidden"
										>
											<div className="px-3 pb-4 pt-0 md:px-6 md:pb-6 space-y-4 bg-brand-surface/30 border-t border-brand-border/40 text-left">
												<div className="w-full min-w-0 pt-4">
													<h5 className="text-[11px] font-black text-red-600 uppercase tracking-widest mb-2">
														{t.problem}
													</h5>
													<p className="text-brand-secondary text-[13px] md:text-sm font-medium leading-relaxed whitespace-pre-wrap wrap-break-word">
														{item.problem}
													</p>
												</div>
												<div className="h-px w-full bg-brand-border/40" />
												<div className="w-full min-w-0">
													<h5 className="text-[11px] font-black text-brand-accent uppercase tracking-widest mb-2">
														{t.thinking}
													</h5>
													<p className="text-brand-secondary text-[13px] md:text-sm font-medium leading-relaxed italic whitespace-pre-wrap wrap-break-word">
														{item.thinking}
													</p>
												</div>
											</div>
										</motion.div>
									)}
								</AnimatePresence>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
}
