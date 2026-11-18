"use client";

import { AnimatePresence, motion, useScroll, useTransform } from "motion/react";
import { ArrowUp } from "lucide-react";
import Link from "next/link";
import { useEffect, useState, type ReactNode } from "react";
import { ContactModal } from "@/components/ui/ContactModal";
import { getDictionary, type Lang } from "@/lib/i18n";

interface HomePageClientProps {
	lang: Lang;
	children: ReactNode;
}

// 네비·패럴랙스·연락 모달 — Server 섹션은 children으로 주입
export function HomePageClient({ lang, children }: HomePageClientProps) {
	const [scrolled, setScrolled] = useState(false);
	const [contactOpen, setContactOpen] = useState(false);
	const web3formsAccessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;

	const t = getDictionary(lang);
	const { scrollY } = useScroll();
	const y1 = useTransform(scrollY, [0, 1000], [0, 200]);
	const y2 = useTransform(scrollY, [0, 1000], [0, -150]);

	useEffect(() => {
		const handleScroll = () => setScrolled(window.scrollY > 50);
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	return (
		<div className="relative min-h-screen overflow-x-hidden bg-brand-bg text-brand-primary selection:bg-brand-accent selection:text-white">
			<div className="pointer-events-none fixed inset-0 z-0">
				<motion.div
					style={{ y: y1 }}
					className="absolute left-[5%] top-[10%] h-64 w-64 rounded-full bg-brand-accent/5 blur-3xl"
				/>
				<motion.div
					style={{ y: y2 }}
					className="absolute right-[5%] top-[60%] h-96 w-96 rounded-full bg-brand-primary/5 blur-3xl"
				/>
				<div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] mix-blend-overlay" />
			</div>

			<nav
				className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${scrolled ? "glass py-3 shadow-sm" : "py-6"}`}
			>
				<div className="mx-auto flex max-w-7xl items-center justify-between px-6">
					<div className="flex items-center gap-2">
						<div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-primary text-xs font-bold text-white">
							HW
						</div>
						<span className="text-xl font-bold tracking-tighter">HEEUN LEE</span>
					</div>
					<div className="hidden items-center gap-8 text-sm font-medium text-brand-secondary md:flex">
						<a href="#profile" className="transition-colors hover:text-brand-primary">
							{t.nav.profile}
						</a>
						<a href="#stats" className="transition-colors hover:text-brand-primary">
							{t.nav.impact}
						</a>
						<a href="#tech" className="transition-colors hover:text-brand-primary">
							{t.nav.stack}
						</a>
						<a href="#projects" className="transition-colors hover:text-brand-primary">
							{t.nav.projects}
						</a>
						<a href="#career" className="transition-colors hover:text-brand-primary">
							{t.nav.career}
						</a>
						<Link href="/lab" className="transition-colors hover:text-brand-primary">
							{t.nav.lab}
						</Link>
					</div>
					<div className="flex items-center gap-4">
						<div
							className="flex items-center gap-0.5 rounded px-1.5 py-1 text-[11px] font-black tracking-widest"
							aria-label={lang === "ko" ? "Switch to English" : "한국어로 전환"}
						>
							<Link
								href="/ko"
								prefetch
								className={
									lang === "ko"
										? "text-brand-primary"
										: "text-brand-secondary/22 transition-colors hover:text-brand-primary"
								}
							>
								KR
							</Link>
							<span className="select-none text-brand-secondary/18" aria-hidden>
								/
							</span>
							<Link
								href="/en"
								prefetch
								className={
									lang === "en"
										? "text-brand-primary"
										: "text-brand-secondary/22 transition-colors hover:text-brand-primary"
								}
							>
								EN
							</Link>
						</div>
						<button
							type="button"
							onClick={() => setContactOpen(true)}
							className="rounded-full bg-brand-primary px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-brand-secondary"
						>
							{t.nav.contact}
						</button>
					</div>
				</div>
			</nav>

			<main>{children}</main>

			<AnimatePresence>
				{scrolled && (
					<motion.button
						type="button"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: 20 }}
						onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
						className="fixed bottom-8 right-8 z-50 rounded-full bg-brand-primary p-4 text-white shadow-2xl transition-all hover:bg-brand-secondary"
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
