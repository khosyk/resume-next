"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { BrainCircuit, Users, Zap } from "lucide-react";
import { fadeIn, staggerContainer } from "@/lib/motion";
import { MindsetItem } from "@/components/ui/MindsetItem";
import type { Dictionary } from "@/lib/i18n";

interface WorkEthicSectionProps {
	mindset: Dictionary["mindset"];
}

// Work Ethic — scroll parallax는 섹션 내부 ref + relative 로 격리
export function WorkEthicSection({ mindset }: WorkEthicSectionProps) {
	const sectionRef = useRef<HTMLElement>(null);
	const { scrollYProgress } = useScroll({
		target: sectionRef,
		offset: ["start end", "end start"],
	});
	const xWork = useTransform(scrollYProgress, [0, 1], [-200, 200]);
	const xEthic = useTransform(scrollYProgress, [0, 1], [200, -200]);

	return (
		<section
			ref={sectionRef}
			className="relative py-32 px-6 bg-brand-surface/30 overflow-hidden"
		>
			<div className="pointer-events-none absolute inset-0 flex select-none flex-col justify-between overflow-hidden py-10">
				<motion.div
					style={{ x: xWork, opacity: 0.02 }}
					className="text-[25vw] font-black leading-none"
				>
					WORK
				</motion.div>
				<motion.div
					style={{ x: xEthic, opacity: 0.02 }}
					className="self-end text-[25vw] font-black leading-none"
				>
					ETHIC
				</motion.div>
			</div>

			<div className="relative z-10 mx-auto max-w-7xl">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					className="mb-24 text-center"
				>
					<h2 className="mb-4 text-5xl font-black uppercase tracking-tighter">
						{mindset.title}
					</h2>
					<div className="mx-auto h-1.5 w-20 rounded-full bg-brand-accent" />
				</motion.div>

				<motion.div
					initial="initial"
					whileInView="animate"
					viewport={{ once: true, margin: "-100px" }}
					variants={staggerContainer}
					className="grid gap-8 md:grid-cols-1 lg:grid-cols-3"
				>
					<motion.div variants={fadeIn} className="h-full">
						<MindsetItem
							icon={<Zap size={32} />}
							title={mindset.m1Title}
							desc={mindset.m1Desc}
						/>
					</motion.div>
					<motion.div variants={fadeIn} className="h-full">
						<MindsetItem
							icon={<Users size={32} />}
							title={mindset.m2Title}
							desc={mindset.m2Desc}
						/>
					</motion.div>
					<motion.div variants={fadeIn} className="h-full">
						<MindsetItem
							icon={<BrainCircuit size={32} />}
							title={mindset.m3Title}
							desc={mindset.m3Desc}
						/>
					</motion.div>
				</motion.div>
			</div>
		</section>
	);
}
