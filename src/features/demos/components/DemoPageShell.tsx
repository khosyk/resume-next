import Link from "next/link";
import {
	getDemoNeighbors,
	getDemoRoute,
	getStrategyBadgeClass,
	type DemoStrategy,
} from "../config/routes";

interface DemoPageShellProps {
	href: string;
	strategy: DemoStrategy;
	title: string;
	children?: React.ReactNode;
}

// 데모 하위 페이지 공통 레이아웃 (콘텐츠는 children으로 채움)
export function DemoPageShell({ href, strategy, title, children }: DemoPageShellProps) {
	const route = getDemoRoute(href);
	const { prev, next } = getDemoNeighbors(href);

	return (
		<div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
			<div className="mb-8">
				<span
					className={`inline-block rounded-full px-2.5 py-1 text-[10px] font-black uppercase tracking-widest ${getStrategyBadgeClass(strategy)}`}
				>
					{strategy}
				</span>
				<h1 className="mt-4 text-3xl sm:text-4xl font-black tracking-tighter">
					{title}
				</h1>
				{route && (
					<p className="mt-2 text-sm text-brand-secondary">{route.description}</p>
				)}
			</div>

			<div className="min-h-[12rem] rounded-2xl border border-dashed border-brand-border bg-brand-surface/30 p-6 sm:p-8">
				{children ?? (
					<p className="text-sm text-brand-secondary">
						콘텐츠 작성 영역 — Why · How · Trade-offs · Verify 를 여기에 함께
						작성합니다.
					</p>
				)}
			</div>

			<nav
				className="mt-10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-8 border-t border-brand-border"
				aria-label="Demo page navigation"
			>
				{prev ? (
					<Link
						href={prev.href}
						className="inline-flex items-center gap-2 rounded-xl border border-brand-border px-4 py-3 text-sm font-bold hover:bg-brand-surface transition-colors"
					>
						<span aria-hidden>←</span>
						<span>{prev.label}</span>
					</Link>
				) : (
					<Link
						href="/demos"
						className="inline-flex items-center gap-2 rounded-xl border border-brand-border px-4 py-3 text-sm font-bold hover:bg-brand-surface transition-colors"
					>
						<span aria-hidden>←</span>
						<span>Hub</span>
					</Link>
				)}

				<Link
					href="/demos"
					className="text-center text-xs font-bold uppercase tracking-widest text-brand-secondary hover:text-brand-primary transition-colors py-3"
				>
					Hub
				</Link>

				{next ? (
					<Link
						href={next.href}
						className="inline-flex items-center justify-end gap-2 rounded-xl border border-brand-border px-4 py-3 text-sm font-bold hover:bg-brand-surface transition-colors sm:text-right"
					>
						<span>{next.label}</span>
						<span aria-hidden>→</span>
					</Link>
				) : (
					<Link
						href="/"
						className="inline-flex items-center justify-end gap-2 rounded-xl border border-brand-border px-4 py-3 text-sm font-bold hover:bg-brand-surface transition-colors"
					>
						<span>Portfolio</span>
						<span aria-hidden>→</span>
					</Link>
				)}
			</nav>
		</div>
	);
}
