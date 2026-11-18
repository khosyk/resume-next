import { LabContentSections } from "@/app/lab/_components/LabContentSections";
import { LabPageShell } from "@/app/lab/_components/LabPageShell";
import { MetricsTable } from "@/app/lab/_components/MetricsTable";

export const revalidate = 60;

export default async function IsrLabPage() {
	const regeneratedAt = new Date().toISOString();

	return (
		<LabPageShell href="/lab/isr" strategy="ISR" title="ISR Lab">
			<LabContentSections
				why={`전체 사이트 rebuild 없이 주기적으로 HTML을 갱신하면 SSR만큼 비싸지 않게 freshness를 맞출 수 있다.
블로그·대시보드·Lab metrics처럼 “대략 최신”이면 충분한 콘텐츠에 적합하다.
revalidate=60은 60초 윈도우 후 백그라운드 재생성을 의미한다.`}
				live={
					<div className="space-y-4">
						<p className="rounded-lg bg-brand-surface px-3 py-2 font-mono text-xs text-brand-primary">
							재생성 시각 (regeneratedAt): {regeneratedAt}
						</p>
						<p className="text-xs text-brand-secondary">
							revalidate = {revalidate}초 — production에서 윈도우 경과 후 갱신될 수 있음
						</p>
						<MetricsTable />
					</div>
				}
				how={[
					"export const revalidate = 60 — 60초 ISR 윈도우",
					"src/app/lab/isr/page.tsx — async Server Component",
					"regeneratedAt — HTML이 마지막으로 생성된 시각",
					"v2: /api/revalidate webhook (LAB_PLAN 보류)",
				]}
				tradeOffs={{
					pro: "SSG 속도 + SSR에 가까운 freshness (주기 한정)",
					con: "stale-while-revalidate 구간 이해 필요 — “실시간”은 아님",
				}}
				verify={[
					"yarn build && yarn start 후 regeneratedAt 기록",
					"60초 이내 새로고침 — 동일할 수 있음 (정상)",
					"60초 이상 대기 후 새로고침 — regeneratedAt 변경 여부 확인",
				]}
			/>
		</LabPageShell>
	);
}
