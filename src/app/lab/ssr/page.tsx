import { LabContentSections } from "@/app/lab/_components/LabContentSections";
import { LabPageShell } from "@/app/lab/_components/LabPageShell";
import { MetricsTable } from "@/app/lab/_components/MetricsTable";

export const dynamic = "force-dynamic";

export default async function SsrLabPage() {
	const generatedAt = new Date().toISOString();

	return (
		<LabPageShell href="/lab/ssr" strategy="SSR" title="SSR Lab">
			<LabContentSections
				why={`검색·SNS 크롤러는 JavaScript 실행 전 첫 HTML만 본다.
의미 있는 metrics·소개 문구를 서버에서 HTML에 넣으면 JS 없이도 콘텐츠가 전달된다.
이 Lab은 요청마다 서버가 HTML을 다시 그려 View Source에 숫자와 생성 시각이 남는 것을 보여 준다.`}
				live={
					<div className="space-y-4">
						<p className="rounded-lg bg-brand-surface px-3 py-2 font-mono text-xs text-brand-primary">
							생성 시각 (서버): {generatedAt}
						</p>
						<MetricsTable />
					</div>
				}
				how={[
					"src/app/lab/ssr/page.tsx — async Server Component",
					"portfolioMetrics — lib/data/portfolio-metrics.ts import",
					"generatedAt — 요청 시 서버에서 new Date().toISOString()",
					"export const dynamic = 'force-dynamic' — 정적 캐시 비활성",
				]}
				tradeOffs={{
					pro: "첫 HTML에 데이터·SEO 친화, 크롤러가 JS 없이도 내용을 읽음",
					con: "TTFB·서버 부하 — 트래픽마다 서버 렌더 비용",
				}}
				verify={[
					"View Page Source에서 0.02·550,000 등 metrics 숫자 검색",
					"generatedAt ISO 문자열이 HTML에 있는지 확인",
					"새로고침 후 generatedAt이 바뀌는지 확인 (Elements가 아닌 View Source)",
				]}
			/>
		</LabPageShell>
	);
}
