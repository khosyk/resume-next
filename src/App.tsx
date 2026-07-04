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
	Users,
	Award,
	ArrowUp,
} from "lucide-react";
import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";
import { buildPortfolioProjects } from "./domain/project/model/projects";
import { ProjectCard } from "./domain/project/ui/ProjectCard";
import { fadeIn, staggerContainer } from "./shared/lib/motion";
import { ContactModal } from "./shared/ui/ContactModal";
import { ExperienceItem } from "./shared/ui/ExperienceItem";
import { MindsetItem } from "./shared/ui/MindsetItem";
import { StatItem } from "./shared/ui/StatItem";
import { TechCategory } from "./shared/ui/TechCategory";

const WEB_SUMMARY_CWS_URL =
	"https://chromewebstore.google.com/detail/lofcjofakipgchbnkdiliafakccnbhbo";

export default function App() {
	const [scrolled, setScrolled] = useState(false);
	const [activeTab, setActiveTab] = useState("All");
	const [lang, setLang] = useState<"ko" | "en">("ko");
	const [contactOpen, setContactOpen] = useState(false);
	const [showMobileScrollArrow, setShowMobileScrollArrow] = useState(false);
	const scrollContainerRef = useRef<HTMLDivElement>(null);
	const workEthicRef = useRef<HTMLDivElement>(null);
	const web3formsAccessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;

	const t = {
		ko: {
			nav: {
				profile: "프로필",
				impact: "성과",
				stack: "기술",
				projects: "프로젝트",
				career: "경력",
				lab: "Lab",
				contact: "연락하기",
			},
			hero: {
				badge: "성능 최적화 전문가",
				title1: "55만 유저의",
				title2: "안정성을 설계하는 해결사.",
				desc: "복잡한 비즈니스 요구사항을 정교한 기술 스펙으로 번역하여 최적의 비용으로 구현해내는 프론트엔드 엔지니어 이희운입니다.",
				resume: "이력서",
				coverLetter: "자기소개서",
				webSummary: "Web Summary",
				lab: "Technical Lab",
				summaryTitle: "전문가 요약",
				summaryDesc:
					'"최고의 공부는 실전이다"라는 신념 아래, Cursor 및 MCP 등 차세대 AI 도구를 활용한 워크플로우 혁신으로 Swift 네이티브 프레임워크를 단기 습득하여 하드웨어 진단 로직을 구현하는 등 플랫폼의 경계를 넘나드는 압도적 생산성을 증명합니다.',
				summaryPoint1: "비정상 종료율 99% 개선 경험",
				summaryPoint2: "AI 기반 워크플로우 혁신 주도",
				summaryPoint3: "비즈니스-기술 브릿지 역할 수행",
			},
			stats: {
				stability: "서비스 안정성",
				performance: "UX 퍼포먼스",
				productivity: "개발 생산성",
				efficiency: "운영 효율성",
				stabilityDesc: "Crashlytics 기반 에러 추적 및 리팩토링",
				performanceDesc: "Reanimated 기반 인터랙션 최적화",
				productivityDesc: "Atomic Design 기반 컴포넌트 추상화",
				efficiencyDesc: "RBAC 시스템 구축 및 QA 통과율 달성",
			},
			tech: {
				title: "핵심 기술 스택",
				desc: "React·React Native·TypeScript부터 네이티브·Firebase, AI 생산성 도구까지 리포트에 정리한 스택을 중심으로 서비스를 설계합니다.",
				cat1: "프론트엔드 & 상태관리",
				cat2: "네이티브 & 인프라",
				cat3: "AI & 생산성",
				cat4: "특화 기술",
				labTitle: "Engineering Lab",
				labDesc: "Next.js SSR · Recharts · 3D — Lab에서 렌더링 전략·시각화 데모",
				labLink: "Lab 보기 →",
			},
			projects: {
				title: "주요 프로젝트",
				desc: "실제 비즈니스 가치를 창출한 핵심 프로젝트 경험입니다.",
				achievements: "핵심 성과",
				problem: "문제",
				thinking: "사고",
				result: "결과",
				swipeHint: "스크롤",
				cats: ["전체", "앱", "웹", "네이티브/PWA", "확장"],
			},
			mindset: {
				title: "Work Ethic",
				m1Title: "사용자 중심의 사고",
				m1Desc:
					"단순한 기능 구현을 넘어, 실제 사용자가 겪는 불편함을 데이터와 피드백으로 분석하여 최적의 UX를 설계합니다.",
				m2Title: "지속 가능한 코드",
				m2Desc:
					"팀원 누구나 이해할 수 있는 클린 코드를 지향하며, 유지보수가 용이하고 확장성 있는 아키텍처를 고민합니다.",
				m3Title: "능동적인 문제 해결",
				m3Desc:
					"기술적 한계에 부딪혔을 때 포기하지 않고, 다양한 대안을 제시하며 비즈니스 목표 달성을 위한 최선의 경로를 찾습니다.",
				m4Title: "철저한 서비스 안정성",
				m4Desc:
					"장애 발생 가능성을 사전에 차단하기 위해 꼼꼼한 테스트와 모니터링을 생활화하며, 안정적인 서비스 운영을 최우선으로 합니다.",
			},
			career: {
				title: "경력",
				edu: "학력 및 기타",
				connecti: "가입자 55만·MAU 10만 규모 '열달후에' 앱 개발·성능·안정성 개선",
				biskit: "패스룸 케어 앱 및 운영 어드민(RBAC·엑셀 연동 등) 개발",
				univ: "글로벌 비즈니스학과 졸업",
				exchange:
					"대만 Ming Chuan University 교환학생(1년) — 글로벌 서비스에 필요한 적응력·유연한 사고",
				globalTitle: "글로벌 역량",
				globalDesc:
					"비즈니스 영어 커뮤니케이션과 글로벌 버전 기능 구현·유지보수를 전담할 수 있는 역량을 갖추고 있습니다.",
				extraTitle: "성실성 및 책임감",
				extraDesc:
					"30사단 훈련소 훈련 성적 전체 2등(500명 중) 수료, 사단장 표창. 맡은 환경에서 성과를 내는 책임감을 증명했습니다.",
			},
			footer: {
				built: "이희운이 디자인하고 구축함 © 2026",
			},
			contactModal: {
				title: "연락하기",
				nameLabel: "이름",
				emailLabel: "이메일",
				messageLabel: "내용",
				submit: "보내기",
				sending: "전송 중…",
				sent: "메시지가 전송되었습니다. 확인 후 답장 드리겠습니다.",
				sendError:
					"전송에 실패했습니다. 잠시 후 다시 시도하거나 hosy12@gmail.com 으로 직접 메일 주세요.",
				close: "닫기",
				validation: "이름·이메일·내용을 모두 입력하고, 이메일 형식을 확인해 주세요.",
			},
		},
		en: {
			nav: {
				profile: "Profile",
				impact: "Impact",
				stack: "Stack",
				projects: "Projects",
				career: "Career",
				lab: "Lab",
				contact: "Contact",
			},
			hero: {
				badge: "PERFORMANCE OPTIMIZATION EXPERT",
				title1: "Architecting Stability",
				title2: "for 550K Users.",
				desc: "I am Heeun Lee, a frontend engineer who translates complex business requirements into sophisticated technical specifications, delivering optimal value.",
				webSummary: "Web Summary",
				lab: "Technical Lab",
				summaryTitle: "Professional Summary",
				summaryDesc:
					"With a 'learning by doing' mindset, I demonstrate overwhelming productivity across platforms—such as quickly mastering Swift to implement hardware diagnostics through AI-driven workflow innovations like Cursor and MCP.",
				summaryPoint1: "99% Crash Rate Improvement",
				summaryPoint2: "AI-Driven Workflow Innovation",
				summaryPoint3: "Business-Tech Bridge Role",
			},
			stats: {
				stability: "Service Stability",
				performance: "UX Performance",
				productivity: "Development Productivity",
				efficiency: "Operational Efficiency",
				stabilityDesc: "Crashlytics-based error tracking & refactoring",
				performanceDesc: "Reanimated-based interaction optimization",
				productivityDesc: "Atomic Design-based component abstraction",
				efficiencyDesc: "RBAC system & 100% QA pass rate",
			},
			tech: {
				title: "Core Tech Stacks",
				desc: "From frontend core to native integration, infra, and AI tools, I hold a stack that transcends platform boundaries.",
				cat1: "Frontend & State",
				cat2: "Native & Infra",
				cat3: "AI & Productivity",
				cat4: "Specialized Skills",
				labTitle: "Engineering Lab",
				labDesc: "Next.js SSR · Recharts · 3D — rendering & visualization demos in Lab",
				labLink: "View Lab →",
			},
			projects: {
				title: "Featured Projects",
				desc: "Key project experiences that created real business value.",
				achievements: "Key Achievements",
				problem: "Problem",
				thinking: "Thinking",
				result: "Result",
				swipeHint: "SCROLL",
				cats: ["All", "App", "Web", "Native/PWA", "Extension"],
			},
			mindset: {
				title: "Work Ethic",
				m1Title: "User-Centric Thinking",
				m1Desc:
					"Beyond simple implementation, I analyze user pain points with data and feedback to design the optimal UX.",
				m2Title: "Sustainable Code",
				m2Desc:
					"I aim for clean code that any team member can understand, focusing on maintainable and scalable architecture.",
				m3Title: "Proactive Problem Solving",
				m3Desc:
					"I don't give up when facing technical limits; I propose various alternatives to find the best path for business goals.",
				m4Title: "Uncompromising Stability",
				m4Desc:
					"I prioritize stable service operation by making thorough testing and monitoring a habit to prevent potential failures.",
			},
			career: {
				title: "Career",
				edu: "Education & More",
				connecti:
					"Yeoldal app (550K signups, 100K MAU): development, performance, and stability",
				biskit: "Pet IoT app and ops admin (RBAC, Excel integration, etc.)",
				univ: "B.A. in Global Business",
				exchange:
					"Exchange at Ming Chuan University, Taiwan (1 year)—adaptability for global services",
				globalTitle: "Global competence",
				globalDesc:
					"Business English and ownership of global-version features and maintenance.",
				extraTitle: "Diligence & responsibility",
				extraDesc:
					"2nd of 500 at 30th Division training; brigade commander's commendation.",
			},
			footer: {
				built: "Designed & Built by Heeun Lee © 2026",
			},
			contactModal: {
				title: "Contact",
				nameLabel: "Name",
				emailLabel: "Email",
				messageLabel: "Message",
				submit: "Send",
				sending: "Sending…",
				sent: "Your message was sent. I will get back to you soon.",
				sendError:
					"Could not send. Please try again later or email hosy12@gmail.com directly.",
				close: "Close",
				validation: "Please fill in all fields and use a valid email address.",
			},
		},
	}[lang];

	const { scrollY } = useScroll();
	const { scrollYProgress: workEthicProgress } = useScroll({
		target: workEthicRef,
		offset: ["start end", "end start"],
	});

	const y1 = useTransform(scrollY, [0, 1000], [0, 200]);
	const y2 = useTransform(scrollY, [0, 1000], [0, -150]);
	const xWork = useTransform(workEthicProgress, [0, 1], [-200, 200]);
	const xEthic = useTransform(workEthicProgress, [0, 1], [200, -200]);

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
						<button
							type="button"
							onClick={() => setLang(lang === "ko" ? "en" : "ko")}
							className="flex items-center gap-0.5 text-[11px] font-black tracking-widest rounded px-1.5 py-1 hover:opacity-90 transition-opacity cursor-pointer"
							aria-label={lang === "ko" ? "Switch to English" : "한국어로 전환"}
						>
							<span
								className={
									lang === "ko" ? "text-brand-primary" : "text-brand-secondary/22"
								}
							>
								KR
							</span>
							<span className="text-brand-secondary/18 select-none" aria-hidden>
								/
							</span>
							<span
								className={
									lang === "en" ? "text-brand-primary" : "text-brand-secondary/22"
								}
							>
								EN
							</span>
						</button>
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

				{/* Work Ethic Section */}
				<section
					ref={workEthicRef}
					className="py-32 px-6 bg-brand-surface/30 relative overflow-hidden"
				>
					{/* Background Decorative Text */}
					<div className="absolute inset-0 flex flex-col justify-between py-10 pointer-events-none select-none overflow-hidden">
						<motion.div
							style={{ x: xWork, opacity: 0.02 }}
							className="text-[25vw] font-black leading-none"
						>
							WORK
						</motion.div>
						<motion.div
							style={{ x: xEthic, opacity: 0.02 }}
							className="text-[25vw] font-black leading-none self-end"
						>
							ETHIC
						</motion.div>
					</div>

					<div className="max-w-7xl mx-auto relative z-10">
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							className="text-center mb-24"
						>
							<h2 className="text-5xl font-black tracking-tighter uppercase mb-4">
								{t.mindset.title}
							</h2>
							<div className="w-20 h-1.5 bg-brand-accent mx-auto rounded-full" />
						</motion.div>

						<motion.div
							initial="initial"
							whileInView="animate"
							viewport={{ once: true, margin: "-100px" }}
							variants={staggerContainer}
							className="grid md:grid-cols-1 lg:grid-cols-3 gap-8"
						>
							<motion.div variants={fadeIn} className="h-full">
								<MindsetItem
									icon={<Zap size={32} />}
									title={t.mindset.m1Title}
									desc={t.mindset.m1Desc}
								/>
							</motion.div>
							<motion.div variants={fadeIn} className="h-full">
								<MindsetItem
									icon={<Users size={32} />}
									title={t.mindset.m2Title}
									desc={t.mindset.m2Desc}
								/>
							</motion.div>
							<motion.div variants={fadeIn} className="h-full">
								<MindsetItem
									icon={<BrainCircuit size={32} />}
									title={t.mindset.m3Title}
									desc={t.mindset.m3Desc}
								/>
							</motion.div>
						</motion.div>
					</div>
				</section>

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
