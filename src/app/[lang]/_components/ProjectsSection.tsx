"use client";

import { AnimatePresence, motion } from "motion/react";
import { ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { buildPortfolioProjects } from "@/lib/data/projects/projects";
import { ProjectCard } from "@/app/[lang]/_components/ProjectCard";
import { getDictionary, type Lang } from "@/lib/i18n";

interface ProjectsSectionProps {
	lang: Lang;
}

const PROJECT_CATEGORIES = ["All", "App", "Web", "Native/PWA", "Extension"] as const;

// 프로젝트 캐러셀 — 탭·드래그 스크롤 (Client)
export function ProjectsSection({ lang }: ProjectsSectionProps) {
	const [activeTab, setActiveTab] = useState("All");
	const [showMobileScrollArrow, setShowMobileScrollArrow] = useState(false);
	const scrollContainerRef = useRef<HTMLDivElement>(null);

	const t = getDictionary(lang);
	const projects = buildPortfolioProjects(lang);
	const filteredProjects =
		activeTab === "All" ? projects : projects.filter((p) => p.category === activeTab);

	useEffect(() => {
		const container = scrollContainerRef.current;
		if (!container) return;

		const isDesktop = window.matchMedia("(min-width: 768px)").matches;

		let isDown = false;
		let startX: number;
		let scrollLeft: number;

		const handleMouseDown = (e: MouseEvent) => {
			if (!isDesktop) return;
			isDown = true;
			container.classList.add("active");
			startX = e.clientX;
			scrollLeft = container.scrollLeft;
		};

		const handleMouseLeave = () => {
			if (!isDesktop) return;
			isDown = false;
			container.classList.remove("active");
		};

		const handleMouseUp = (e: MouseEvent) => {
			if (!isDesktop) return;
			isDown = false;
			container.classList.remove("active");

			const walk = Math.abs(e.clientX - startX);
			if (walk > 5) {
				const preventClick = (ev: MouseEvent) => {
					ev.stopImmediatePropagation();
					container.removeEventListener("click", preventClick, true);
				};
				container.addEventListener("click", preventClick, true);
			}
		};

		const handleMouseMove = (e: MouseEvent) => {
			if (!isDesktop || !isDown) return;
			e.preventDefault();
			const walk = e.clientX - startX;
			container.scrollLeft = scrollLeft - walk;
		};

		container.addEventListener("mousedown", handleMouseDown);
		container.addEventListener("mouseleave", handleMouseLeave);
		container.addEventListener("mouseup", handleMouseUp);
		container.addEventListener("mousemove", handleMouseMove);

		return () => {
			container.removeEventListener("mousedown", handleMouseDown);
			container.removeEventListener("mouseleave", handleMouseLeave);
			container.removeEventListener("mouseup", handleMouseUp);
			container.removeEventListener("mousemove", handleMouseMove);
		};
	}, []);

	useEffect(() => {
		const container = scrollContainerRef.current;
		if (!container) return;

		const updateCueVisibility = () => {
			const isMobile = window.matchMedia("(max-width: 680px)").matches;
			if (!isMobile) {
				setShowMobileScrollArrow(false);
				return;
			}
			setShowMobileScrollArrow(container.scrollLeft < 16);
		};

		updateCueVisibility();
		container.addEventListener("scroll", updateCueVisibility, { passive: true });
		window.addEventListener("resize", updateCueVisibility);

		return () => {
			container.removeEventListener("scroll", updateCueVisibility);
			window.removeEventListener("resize", updateCueVisibility);
		};
	}, [activeTab]);

	const scrollBy = (delta: number) => {
		const el = document.getElementById("project-scroll-container");
		if (el) el.scrollBy({ left: delta, behavior: "smooth" });
	};

	return (
		<section id="projects" className="bg-brand-surface py-24">
			<div className="mx-auto mb-12 w-full max-w-7xl px-4 md:px-6">
				<div className="flex flex-col items-center justify-between gap-8 text-center md:flex-row md:items-end md:text-left">
					<div className="flex flex-col items-center md:items-start">
						<h2 className="mb-4 text-5xl font-black uppercase tracking-tighter">
							{t.projects.title}
						</h2>
						<p className="text-brand-secondary">{t.projects.desc}</p>
					</div>

					<div className="flex rounded-xl border border-brand-border bg-white p-1 shadow-sm">
						{t.projects.cats.map((cat: string, i: number) => {
							const internalCat = PROJECT_CATEGORIES[i];
							return (
								<button
									key={internalCat}
									type="button"
									onClick={() => setActiveTab(internalCat)}
									className={`rounded-lg px-4 py-2 text-xs font-bold transition-all ${
										activeTab === internalCat
											? "bg-brand-primary text-white shadow-md"
											: "text-brand-secondary hover:bg-brand-surface"
									}`}
								>
									{cat}
								</button>
							);
						})}
					</div>
				</div>
			</div>

			<div className="group relative w-full min-w-0">
				<div className="pointer-events-none absolute left-2 top-1/2 z-10 hidden -translate-y-1/2 lg:block sm:left-4">
					<button
						type="button"
						onClick={() => scrollBy(-580)}
						className="pointer-events-auto rounded-full border border-brand-border bg-white p-3 shadow-xl transition-all hover:bg-brand-primary hover:text-white md:p-4"
					>
						<ChevronRight size={24} className="rotate-180" />
					</button>
				</div>
				<div className="pointer-events-none absolute right-2 top-1/2 z-10 hidden -translate-y-1/2 lg:block sm:right-4">
					<button
						type="button"
						onClick={() => scrollBy(580)}
						className="pointer-events-auto rounded-full border border-brand-border bg-white p-3 shadow-xl transition-all hover:bg-brand-primary hover:text-white md:p-4"
					>
						<ChevronRight size={24} />
					</button>
				</div>

				<div
					id="project-scroll-container"
					ref={scrollContainerRef}
					className="no-scrollbar flex w-full min-w-0 cursor-grab select-none snap-x snap-mandatory gap-4 overflow-x-auto overflow-y-visible scroll-smooth px-4 pb-12 pt-1 active:cursor-grabbing sm:px-6 lg:px-10 xl:px-[max(1.25rem,calc((100vw-80rem)/2+1.25rem))] md:gap-8"
				>
					<AnimatePresence mode="popLayout">
						{filteredProjects.map((project) => (
							<motion.div
								key={project.id}
								layout
								initial={{ opacity: 0, scale: 0.9 }}
								animate={{ opacity: 1, scale: 1 }}
								exit={{ opacity: 0, scale: 0.9 }}
								transition={{ duration: 0.4 }}
								className="w-[min(100%,calc(100vw-1.5rem))] min-w-[min(100%,calc(100vw-1.5rem))] max-w-[min(100%,calc(100vw-1.5rem))] shrink-0 snap-center sm:w-[28rem] sm:min-w-[28rem] sm:max-w-[28rem] md:w-[30rem] md:min-w-[30rem] md:max-w-[30rem] lg:w-[32rem] lg:min-w-[32rem] lg:max-w-[32rem] xl:w-[34rem] xl:min-w-[34rem] xl:max-w-[34rem]"
							>
								<ProjectCard project={project} t={t.projects} />
							</motion.div>
						))}
					</AnimatePresence>
				</div>

				<AnimatePresence>
					{showMobileScrollArrow && (
						<motion.div
							initial={{ opacity: 0, x: 8 }}
							animate={{ opacity: 1, x: 0 }}
							exit={{ opacity: 0, x: 8 }}
							className="pointer-events-none absolute right-4 top-[46%] -translate-y-1/2 text-brand-primary md:hidden"
						>
							<motion.span
								className="inline-block text-[28px] font-light leading-none"
								animate={{ x: [0, 6, 0], opacity: [0.35, 1, 0.35] }}
								transition={{
									duration: 1,
									repeat: Infinity,
									ease: "easeInOut",
								}}
							>
								&gt;
							</motion.span>
						</motion.div>
					)}
				</AnimatePresence>

				<div className="mt-4 flex justify-center gap-2 px-4 md:hidden">
					{filteredProjects.map((_, i) => (
						<div key={i} className="h-1.5 w-1.5 rounded-full bg-brand-border" />
					))}
				</div>
			</div>
		</section>
	);
}
