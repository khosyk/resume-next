import Link from "next/link";
import { LabHubSections } from "@/app/lab/_components/LabNav";

export default function LabHubPage() {
	return (
		<main className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
			<div className="mb-10">
				<p className="text-xs font-bold uppercase tracking-widest text-brand-accent mb-3">
					Engineering Lab
				</p>
				<h1 className="text-3xl sm:text-4xl font-black tracking-tighter mb-3">
					Lab Hub
				</h1>
				<p className="text-sm text-brand-secondary max-w-2xl leading-relaxed">
					Next.js 렌더링 전략(SSR · SSG · ISR · CSR)과 Recharts · 3D 시각화. 각
					페이지에서 Why · How · Trade-offs 를 함께 작성합니다.
				</p>
			</div>

			<LabHubSections />

			<div className="mt-12 pt-8 border-t border-brand-border">
				<Link
					href="/"
					className="text-sm font-bold text-brand-secondary hover:text-brand-primary transition-colors"
				>
					← 포트폴리오로 돌아가기
				</Link>
			</div>
		</main>
	);
}
