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
					Engineering Lab
				</h1>
				<p className="text-sm text-brand-secondary max-w-2xl leading-relaxed">
					채용 담당자·리뷰어가 Next.js 렌더링·시각화 역량을 짧은 시간에 확인하도록 만든
					페이지 모음이다. 각 페이지는 동일한 portfolioMetrics로 전략만 다르게 보여
					준다.
				</p>
			</div>

			<LabHubSections />

			<section className="mt-12">
				<h2 className="mb-4 text-xs font-bold uppercase tracking-widest text-brand-secondary">
					렌더링 비교
				</h2>
				<div className="overflow-x-auto rounded-2xl border border-brand-border bg-white">
					<table className="w-full min-w-[36rem] text-left text-sm">
						<thead className="border-b border-brand-border bg-brand-surface/60 text-xs uppercase tracking-wider text-brand-secondary">
							<tr>
								<th className="px-4 py-3 font-bold">항목</th>
								<th className="px-4 py-3 font-bold">SSR</th>
								<th className="px-4 py-3 font-bold">SSG</th>
								<th className="px-4 py-3 font-bold">ISR</th>
								<th className="px-4 py-3 font-bold">CSR</th>
							</tr>
						</thead>
						<tbody className="text-brand-primary">
							<tr className="border-b border-brand-border/70">
								<td className="px-4 py-2.5 font-semibold">HTML 생성</td>
								<td className="px-4 py-2.5">요청마다 서버</td>
								<td className="px-4 py-2.5">빌드 시</td>
								<td className="px-4 py-2.5">빌드 + 주기 재생성</td>
								<td className="px-4 py-2.5">브라우저(JS)</td>
							</tr>
							<tr className="border-b border-brand-border/70">
								<td className="px-4 py-2.5 font-semibold">시간 필드</td>
								<td className="px-4 py-2.5">generatedAt 매번 변경</td>
								<td className="px-4 py-2.5">builtAt 고정</td>
								<td className="px-4 py-2.5">regeneratedAt 주기</td>
								<td className="px-4 py-2.5">fetchedAt (API)</td>
							</tr>
							<tr className="border-b border-brand-border/70">
								<td className="px-4 py-2.5 font-semibold">View Source</td>
								<td className="px-4 py-2.5">metrics 있음</td>
								<td className="px-4 py-2.5">metrics 있음</td>
								<td className="px-4 py-2.5">metrics 있음</td>
								<td className="px-4 py-2.5">metrics 없음</td>
							</tr>
							<tr>
								<td className="px-4 py-2.5 font-semibold">이 프로젝트</td>
								<td className="px-4 py-2.5">
									<Link
										href="/lab/ssr"
										className="font-bold text-brand-accent hover:underline"
									>
										/lab/ssr
									</Link>
								</td>
								<td className="px-4 py-2.5">
									<Link
										href="/lab/ssg"
										className="font-bold text-brand-accent hover:underline"
									>
										/lab/ssg
									</Link>
								</td>
								<td className="px-4 py-2.5">
									<Link
										href="/lab/isr"
										className="font-bold text-brand-accent hover:underline"
									>
										/lab/isr
									</Link>
								</td>
								<td className="px-4 py-2.5">
									<Link
										href="/lab/csr"
										className="font-bold text-brand-accent hover:underline"
									>
										/lab/csr
									</Link>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</section>

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
