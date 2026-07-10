"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { labRouteGroups, labRoutes } from "../_lib/routes";

// Lab 공통 상단 네비
export function LabHeader() {
	const pathname = usePathname();

	return (
		<header className="sticky top-0 z-50 border-b border-brand-border bg-white/80 backdrop-blur-md">
			<div className="max-w-5xl mx-auto px-4 sm:px-6">
				<div className="flex items-center justify-between gap-4 py-3 border-b border-brand-border/60">
					<div className="flex items-center gap-3 min-w-0">
						<Link
							href="/"
							className="shrink-0 text-xs font-bold text-brand-secondary hover:text-brand-primary transition-colors"
						>
							← Portfolio
						</Link>
						<span className="text-brand-border hidden sm:inline" aria-hidden>
							|
						</span>
						<Link
							href="/lab"
							className="truncate text-sm font-black tracking-tight hover:text-brand-accent transition-colors"
						>
							Engineering Lab
						</Link>
					</div>
				</div>

				<nav
					className="flex gap-1 overflow-x-auto no-scrollbar py-2 -mx-1 px-1"
					aria-label="Lab pages"
				>
					{labRoutes.map((route) => {
						const isActive =
							route.href === "/lab"
								? pathname === "/lab"
								: pathname.startsWith(route.href);

						return (
							<Link
								key={route.href}
								href={route.href}
								className={`shrink-0 rounded-lg px-3 py-1.5 text-xs font-bold transition-colors ${
									isActive
										? "bg-brand-primary text-white"
										: "text-brand-secondary hover:bg-brand-surface hover:text-brand-primary"
								}`}
							>
								{route.label}
							</Link>
						);
					})}
				</nav>
			</div>
		</header>
	);
}

interface LabHubSectionsProps {
	currentHref?: string;
}

// Hub 본문용 섹션별 카드 네비
export function LabHubSections({ currentHref = "/lab" }: LabHubSectionsProps) {
	return (
		<div className="space-y-10">
			{labRouteGroups
				.filter((group) => group.id !== "hub")
				.map((group) => {
					const routes = labRoutes.filter((r) => r.group === group.id);
					if (routes.length === 0) return null;

					return (
						<section key={group.id}>
							<h2 className="text-xs font-bold uppercase tracking-widest text-brand-secondary mb-4">
								{group.title}
							</h2>
							<ul className="grid sm:grid-cols-2 gap-3">
								{routes.map((route) => (
									<li key={route.href}>
										<Link
											href={route.href}
											className={`group block rounded-2xl border p-4 transition-colors hover:border-brand-accent hover:bg-brand-surface/50 ${
												currentHref === route.href
													? "border-brand-accent bg-brand-accent/5"
													: "border-brand-border bg-white"
											}`}
										>
											<div className="flex items-center justify-between gap-2 mb-2">
												<span className="text-sm font-black">{route.label}</span>
												<span className="text-brand-secondary group-hover:text-brand-accent text-sm">
													→
												</span>
											</div>
											<p className="text-xs text-brand-secondary">
												{route.description}
											</p>
										</Link>
									</li>
								))}
							</ul>
						</section>
					);
				})}
		</div>
	);
}
