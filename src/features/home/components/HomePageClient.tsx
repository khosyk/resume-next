/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

"use client";

import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import {
	Mail,
	Phone,
	Github,
	Linkedin,
	Zap,
	Layers,
	Smartphone,
	Globe,
	Terminal,
	CheckCircle2,
	ChevronRight,
	BrainCircuit,
	Award,
	ArrowUp,
} from "lucide-react";
import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";
import { buildPortfolioProjects } from "@/domain/project/model/projects";
import { ProjectCard } from "@/domain/project/ui/ProjectCard";
import { fadeIn, staggerContainer } from "@/shared/lib/motion";
import { ContactModal } from "@/shared/ui/ContactModal";
import { ExperienceItem } from "@/shared/ui/ExperienceItem";
import { StatItem } from "@/shared/ui/StatItem";
import { TechCategory } from "@/shared/ui/TechCategory";
import { getDictionary, type Lang } from "@/shared/i18n";
import { WorkEthicSection } from "@/features/home/components/WorkEthicSection";

interface HomePageClientProps {
	lang: Lang;
}

const WEB_SUMMARY_CWS_URL =
	"https://chromewebstore.google.com/detail/lofcjofakipgchbnkdiliafakccnbhbo";

export function HomePageClient({ lang }: HomePageClientProps) {
	const [scrolled, setScrolled] = useState(false);
	const [activeTab, setActiveTab] = useState("All");
	const [contactOpen, setContactOpen] = useState(false);
	const [showMobileScrollArrow, setShowMobileScrollArrow] = useState(false);
	const scrollContainerRef = useRef<HTMLDivElement>(null);
	const web3formsAccessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;

	const t = getDictionary(lang);

	const { scrollY } = useScroll();

	const y1 = useTransform(scrollY, [0, 1000], [0, 200]);
	const y2 = useTransform(scrollY, [0, 1000], [0, -150]);

	useEffect(() => {
		const handleScroll = () => setScrolled(window.scrollY > 50);
		window.addEventListener("scroll", handleScroll);

		// Drag to scroll logic (only enhance on desktop)
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

			// Prevent click if dragged
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
			window.removeEventListener("scroll", handleScroll);
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
		container.addEventListener("scroll", updateCueVisibility, {
			passive: true,
		});
		window.addEventListener("resize", updateCueVisibility);

		return () => {
			container.removeEventListener("scroll", updateCueVisibility);
			window.removeEventListener("resize", updateCueVisibility);
		};
	}, []);

	const projects = buildPortfolioProjects(lang);

	const filteredProjects =
		activeTab === "All" ? projects : projects.filter((p) => p.category === activeTab);

	return (
		<div className="min-h-screen bg-brand-bg text-brand-primary selection:bg-brand-accent selection:text-white relative overflow-x-hidden">
			{/* Parallax Background Elements */}
			<div className="fixed inset-0 pointer-events-none z-0">
				<motion.div
					style={{ y: y1 }}
					className="absolute top-[10%] left-[5%] w-64 h-64 bg-brand-accent/5 rounded-full blur-3xl"
				/>
				<motion.div
					style={{ y: y2 }}
					className="absolute top-[60%] right-[5%] w-96 h-96 bg-brand-primary/5 rounded-full blur-3xl"
				/>
				<div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] mix-blend-overlay" />
			</div>

			{/* Navigation */}
			<nav
				className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "glass py-3 shadow-sm" : "py-6"}`}
			>
				<div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
					<div className="flex items-center gap-2">
						<div className="w-8 h-8 bg-brand-primary rounded-full flex items-center justify-center text-white font-bold text-xs">
							HW
						</div>
						<span className="font-bold tracking-tighter text-xl">HEEUN LEE</span>
					</div>
					<div className="hidden md:flex items-center gap-8 text-sm font-medium text-brand-secondary">
						<a href="#profile" className="hover:text-brand-primary transition-colors">
							{t.nav.profile}
						</a>
						<a href="#stats" className="hover:text-brand-primary transition-colors">
							{t.nav.impact}
						</a>
						<a href="#tech" className="hover:text-brand-primary transition-colors">
							{t.nav.stack}
						</a>
						<a href="#projects" className="hover:text-brand-primary transition-colors">
							{t.nav.projects}
						</a>
						<a href="#career" className="hover:text-brand-primary transition-colors">
							{t.nav.career}
						</a>
						<Link href="/demos" className="hover:text-brand-primary transition-colors">
							{t.nav.lab}
						</Link>
					</div>
					<div className="flex items-center gap-4">
						<div
							className="flex items-center gap-0.5 text-[11px] font-black tracking-widest rounded px-1.5 py-1"
							aria-label={lang === "ko" ? "Switch to English" : "한국어로 전환"}
						>
							<Link
								href="/ko"
								prefetch
								className={
									lang === "ko"
										? "text-brand-primary"
										: "text-brand-secondary/22 hover:text-brand-primary transition-colors"
								}
							>
								KR
							</Link>
							<span className="text-brand-secondary/18 select-none" aria-hidden>
								/
							</span>
							<Link
								href="/en"
								prefetch
								className={
									lang === "en"
										? "text-brand-primary"
										: "text-brand-secondary/22 hover:text-brand-primary transition-colors"
								}
							>
								EN
							</Link>
						</div>
						<button
							type="button"
							onClick={() => setContactOpen(true)}
							className="px-4 py-2 bg-brand-primary text-white text-sm font-semibold rounded-full hover:bg-brand-secondary transition-all"
						>
							{t.nav.contact}
						</button>
					</div>
				</div>
			</nav>

			<main>
				{/* Hero Section */}
				<section id="profile" className="pt-32 pb-20 px-6 overflow-hidden">
					<div className="max-w-7xl mx-auto">
						<motion.div
							initial="initial"
							animate="animate"
							variants={staggerContainer}
							className="grid lg:grid-cols-[1fr_400px] gap-12 items-end"
						>
							<motion.div>
								<motion.div
									variants={fadeIn}
									className="inline-flex items-center gap-2 px-3 py-1 bg-brand-surface border border-brand-border rounded-full text-xs font-bold text-brand-accent mb-6"
								>
									<Zap size={14} />
									<span>{t.hero.badge}</span>
								</motion.div>
								<motion.h1
									variants={fadeIn}
									className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.95] mb-8 text-brand-primary"
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
								</motion.h1>
								<motion.p
									variants={fadeIn}
									className="text-xl md:text-2xl text-brand-secondary max-w-2xl leading-relaxed mb-10 text-balance"
								>
									{t.hero.desc}
								</motion.p>

								<motion.div
									variants={fadeIn}
									className="flex flex-wrap gap-6 items-center"
								>
									<div className="flex items-center gap-2 text-sm font-medium">
										<Mail size={18} className="text-brand-accent" />
										<span>hosy12@gmail.com</span>
									</div>
									<div className="flex items-center gap-2 text-sm font-medium">
										<Phone size={18} className="text-brand-accent" />
										<span>010-8362-3454</span>
									</div>
									<div className="flex flex-wrap gap-3 items-center">
										{lang === "ko" && (
											<>
												<a
													href="https://heeunlee.notion.site/325e4eb522558063b927e485e4511c28?pvs=74"
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
													href="https://heeunlee.notion.site/321e4eb522558019a22ef41d4080ed30?pvs=74"
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
											href={WEB_SUMMARY_CWS_URL}
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
											href="/demos"
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
											href="https://github.com/khosyk"
											target="_blank"
											rel="noreferrer"
											className="p-2 border border-brand-border rounded-full hover:bg-brand-surface transition-colors"
										>
											<Github size={20} />
										</a>
										<a
											href="https://www.linkedin.com/in/heeun-lee-19911111hosy/?locale=ko"
											target="_blank"
											rel="noreferrer"
											className="p-2 border border-brand-border rounded-full hover:bg-brand-surface transition-colors"
										>
											<Linkedin size={20} />
										</a>
									</div>
								</motion.div>
							</motion.div>

							<motion.div
								variants={fadeIn}
								className="bg-brand-surface border border-brand-border p-8 rounded-3xl shadow-xl lg:translate-y-12"
							>
								<h3 className="text-xs font-bold uppercase tracking-widest text-brand-secondary mb-6">
									{t.hero.summaryTitle}
								</h3>
								<p className="text-sm leading-relaxed text-brand-secondary mb-6">
									{t.hero.summaryDesc}
								</p>
								<div className="space-y-4">
									<div className="flex items-center gap-3">
										<CheckCircle2 size={16} className="text-brand-accent" />
										<span className="text-xs font-semibold">
											{t.hero.summaryPoint1}
										</span>
									</div>
									<div className="flex items-center gap-3">
										<CheckCircle2 size={16} className="text-brand-accent" />
										<span className="text-xs font-semibold">
											{t.hero.summaryPoint2}
										</span>
									</div>
									<div className="flex items-center gap-3">
										<CheckCircle2 size={16} className="text-brand-accent" />
										<span className="text-xs font-semibold">
											{t.hero.summaryPoint3}
										</span>
									</div>
								</div>
							</motion.div>
						</motion.div>
					</div>
				</section>

				{/* Stats Section */}
				<section
					id="stats"
					className="pt-12 pb-20 bg-brand-primary text-white overflow-hidden relative"
				>
					<div className="max-w-7xl mx-auto px-6">
						<motion.div
							initial="initial"
							whileInView="animate"
							viewport={{ once: true }}
							variants={staggerContainer}
							className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12"
						>
							<motion.div variants={fadeIn}>
								<StatItem
									label={t.stats.stability}
									value="0.02%"
									subValue={lang === "ko" ? "기존 3.89% 대비" : "vs. prior 3.89%"}
									desc={t.stats.stabilityDesc}
									color="text-white"
								/>
							</motion.div>
							<motion.div variants={fadeIn} className="md:translate-y-8">
								<StatItem
									label={t.stats.performance}
									value="60fps"
									subValue="40fps → 60fps"
									desc={t.stats.performanceDesc}
									color="text-white"
								/>
							</motion.div>
							<motion.div variants={fadeIn}>
								<StatItem
									label={t.stats.productivity}
									value="+20%"
									subValue={lang === "ko" ? "코드량 절감" : "Code reduction"}
									desc={t.stats.productivityDesc}
									color="text-white"
								/>
							</motion.div>
							<motion.div variants={fadeIn} className="md:translate-y-8">
								<StatItem
									label={t.stats.efficiency}
									value="100%"
									subValue="60% → 100%"
									desc={t.stats.efficiencyDesc}
									color="text-white"
								/>
							</motion.div>
						</motion.div>
					</div>
				</section>

				{/* Tech Stack Section */}
				<section id="tech" className="py-24 px-6 border-b border-brand-border">
					<div className="max-w-7xl mx-auto">
						<motion.div
							initial="initial"
							whileInView="animate"
							viewport={{ once: true, margin: "-100px" }}
							variants={staggerContainer}
							className="flex flex-col md:flex-row gap-12"
						>
							<motion.div variants={fadeIn} className="md:w-1/3">
								<h2 className="text-4xl font-black tracking-tighter mb-6 uppercase">
									{t.tech.title}
								</h2>
								<p className="text-brand-secondary leading-relaxed">{t.tech.desc}</p>
							</motion.div>
							<div className="md:w-2/3 grid sm:grid-cols-2 gap-8">
								<motion.div variants={fadeIn}>
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
								</motion.div>
								<motion.div variants={fadeIn}>
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
								</motion.div>
								<motion.div variants={fadeIn}>
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
								</motion.div>
								<motion.div variants={fadeIn}>
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
								</motion.div>
							</div>
						</motion.div>
						<motion.div
							variants={fadeIn}
							initial="initial"
							whileInView="animate"
							viewport={{ once: true, margin: "-80px" }}
							className="mt-12"
						>
							<Link
								href="/demos"
								className="group flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-2xl border border-brand-border bg-brand-surface p-6 transition-colors hover:border-brand-accent hover:bg-white"
							>
								<div>
									<p className="text-xs font-bold uppercase tracking-widest text-brand-accent mb-2">
										{t.tech.labTitle}
									</p>
									<p className="text-sm text-brand-secondary leading-relaxed">
										{t.tech.labDesc}
									</p>
								</div>
								<span className="text-sm font-bold text-brand-primary group-hover:text-brand-accent shrink-0">
									{t.tech.labLink}
								</span>
							</Link>
						</motion.div>
					</div>
				</section>

				{/* Projects Section — 헤더만 max-w-7xl, 가로 스크롤은 풀 너비(잘리지 않도록 overflow-hidden 미사용) */}
				<section id="projects" className="py-24 bg-brand-surface">
					<div className="max-w-7xl mx-auto w-full px-4 md:px-6 mb-12">
						<div className="flex flex-col md:flex-row justify-between items-center md:items-end gap-8 text-center md:text-left">
							<div className="flex flex-col items-center md:items-start">
								<h2 className="text-5xl font-black tracking-tighter uppercase mb-4">
									{t.projects.title}
								</h2>
								<p className="text-brand-secondary">{t.projects.desc}</p>
							</div>

							{/* Tabs */}
							<div className="flex bg-white p-1 rounded-xl border border-brand-border shadow-sm">
								{t.projects.cats.map((cat: string, i: number) => {
									const internalCat = ["All", "App", "Web", "Native/PWA", "Extension"][
										i
									];
									return (
										<button
											key={internalCat}
											onClick={() => setActiveTab(internalCat)}
											className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${
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

					<div className="relative w-full min-w-0 group">
						{/* Navigation Buttons — 뷰포트 좌우 여백에 맞춤 */}
						<div className="absolute top-1/2 -translate-y-1/2 left-2 sm:left-4 z-10 hidden lg:block pointer-events-none">
							<button
								type="button"
								onClick={() => {
									const el = document.getElementById("project-scroll-container");
									if (el) el.scrollBy({ left: -580, behavior: "smooth" });
								}}
								className="pointer-events-auto p-3 md:p-4 bg-white border border-brand-border rounded-full shadow-xl hover:bg-brand-primary hover:text-white transition-all"
							>
								<ChevronRight size={24} className="rotate-180" />
							</button>
						</div>
						<div className="absolute top-1/2 -translate-y-1/2 right-2 sm:right-4 z-10 hidden lg:block pointer-events-none">
							<button
								type="button"
								onClick={() => {
									const el = document.getElementById("project-scroll-container");
									if (el) el.scrollBy({ left: 580, behavior: "smooth" });
								}}
								className="pointer-events-auto p-3 md:p-4 bg-white border border-brand-border rounded-full shadow-xl hover:bg-brand-primary hover:text-white transition-all"
							>
								<ChevronRight size={24} />
							</button>
						</div>

						<div
							id="project-scroll-container"
							ref={scrollContainerRef}
							className="flex gap-4 md:gap-8 overflow-x-auto overflow-y-visible pb-12 pt-1 snap-x snap-mandatory no-scrollbar scroll-smooth cursor-grab active:cursor-grabbing select-none w-full min-w-0 px-4 sm:px-6 lg:px-10 xl:px-[max(1.25rem,calc((100vw-80rem)/2+1.25rem))]"
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
										// 모든 카드 동일 너비(브레이크포인트별 고정) — 스크롤만 넘치고 양옆은 잘리지 않음
										className="shrink-0 snap-center w-[min(100%,calc(100vw-1.5rem))] min-w-[min(100%,calc(100vw-1.5rem))] max-w-[min(100%,calc(100vw-1.5rem))] sm:w-[28rem] sm:max-w-[28rem] sm:min-w-[28rem] md:w-[30rem] md:max-w-[30rem] md:min-w-[30rem] lg:w-[32rem] lg:max-w-[32rem] lg:min-w-[32rem] xl:w-[34rem] xl:max-w-[34rem] xl:min-w-[34rem]"
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
									className="pointer-events-none absolute right-4 top-[46%] -translate-y-1/2 md:hidden text-brand-primary"
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

						<div className="flex justify-center gap-2 mt-4 md:hidden px-4">
							{filteredProjects.map((_, i) => (
								<div key={i} className="w-1.5 h-1.5 rounded-full bg-brand-border" />
							))}
						</div>
					</div>
				</section>

				<WorkEthicSection mindset={t.mindset} />

				{/* Experience & Education */}
				<section id="career" className="py-24 px-6 bg-brand-primary text-white">
					<div className="max-w-7xl mx-auto">
						<motion.div
							initial="initial"
							whileInView="animate"
							viewport={{ once: true, margin: "-100px" }}
							variants={staggerContainer}
							className="grid md:grid-cols-2 gap-20"
						>
							<motion.div variants={fadeIn}>
								<h2 className="text-4xl font-black tracking-tighter uppercase mb-12 flex items-center gap-4">
									<Award className="text-brand-accent" /> {t.career.title}
								</h2>
								<div className="space-y-12">
									<ExperienceItem
										company="커넥트아이 (Connect-i)"
										role="App Developer"
										period="2024.05 ~ 현재"
										desc={t.career.connecti}
									/>
									<ExperienceItem
										company="비스키트 (Biskit)"
										role="Junior Developer"
										period="2022.04 ~ 2023.10"
										desc={t.career.biskit}
									/>
								</div>
							</motion.div>
							<motion.div variants={fadeIn}>
								<h2 className="text-4xl font-black tracking-tighter uppercase mb-12 flex items-center gap-4">
									<Globe className="text-brand-accent" /> {t.career.edu}
								</h2>
								<div className="space-y-12">
									<ExperienceItem
										company={lang === "ko" ? "수원대학교" : "Suwon University"}
										role={t.career.univ}
										period="2010.03 ~ 2018.03"
										desc={t.career.exchange}
									/>
									<div className="p-6 border border-white/10 rounded-2xl bg-white/5">
										<h4 className="text-lg font-bold mb-2">{t.career.globalTitle}</h4>
										<p className="text-sm text-white/60 leading-relaxed">
											{t.career.globalDesc}
										</p>
									</div>
									<div className="p-6 border border-white/10 rounded-2xl bg-white/5">
										<h4 className="text-lg font-bold mb-2">{t.career.extraTitle}</h4>
										<p className="text-sm text-white/60 leading-relaxed">
											{t.career.extraDesc}
										</p>
									</div>
								</div>
							</motion.div>
						</motion.div>
					</div>
				</section>
			</main>

			<footer className="py-12 px-6 border-t border-brand-border text-center">
				<div className="max-w-7xl mx-auto flex flex-col items-center gap-6">
					<div className="flex gap-4">
						<a
							href="https://github.com/khosyk"
							target="_blank"
							rel="noreferrer"
							className="p-2 border border-brand-border rounded-full text-brand-secondary hover:bg-brand-surface hover:text-brand-primary transition-colors"
						>
							<Github size={20} />
						</a>
						<a
							href="https://www.linkedin.com/in/heeun-lee-19911111hosy/?locale=ko"
							target="_blank"
							rel="noreferrer"
							className="p-2 border border-brand-border rounded-full text-brand-secondary hover:bg-brand-surface hover:text-brand-primary transition-colors"
						>
							<Linkedin size={20} />
						</a>
						{lang === "ko" && (
							<a
								href="https://heeunlee.notion.site/325e4eb522558063b927e485e4511c28?pvs=74"
								target="_blank"
								rel="noopener noreferrer"
								className="w-9 h-9 border border-brand-border rounded-full text-brand-secondary hover:bg-brand-surface hover:text-brand-primary transition-colors flex items-center justify-center font-black text-sm"
								title="Notion"
							>
								N
							</a>
						)}
					</div>
					<p className="text-xs font-bold text-brand-secondary uppercase tracking-widest">
						{t.footer.built}
					</p>
				</div>
			</footer>

			{/* Scroll to Top Button */}
			<AnimatePresence>
				{scrolled && (
					<motion.button
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: 20 }}
						onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
						className="fixed bottom-8 right-8 z-50 p-4 bg-brand-primary text-white rounded-full shadow-2xl hover:bg-brand-secondary transition-all"
					>
						<ArrowUp size={24} />
					</motion.button>
				)}
			</AnimatePresence>

			<ContactModal
				isOpen={contactOpen}
				onClose={() => setContactOpen(false)}
				copy={t.contactModal}
				accessKey={web3formsAccessKey}
			/>
		</div>
	);
}
