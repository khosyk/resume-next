import { LabContentSections } from "@/app/lab/_components/LabContentSections";
import { LabPageShell } from "@/app/lab/_components/LabPageShell";
import { MetricsTable } from "@/app/lab/_components/MetricsTable";

// 빌드 시 모듈 평가 — 요청마다 바뀌지 않음
const builtAt = new Date().toISOString();

export default function SsgLabPage() {
	return (
		<LabPageShell href="/lab/ssg" strategy="SSG" title="SSG Lab">
			<LabContentSections
				why={`자주 바뀌지 않는 소개·문서는 빌드 시 HTML로 고정하면 서버 렌더 비용 없이 빠르게 전달할 수 있다.
이 포트폴리오 메인(/ko·/en)과 Lab Hub가 같은 이유로 정적에 가깝다.
SSR과 달리 새로고침해도 builtAt은 rebuild 전까지 동일하다.`}
				live={
					<div className="space-y-4">
						<p className="rounded-lg bg-brand-surface px-3 py-2 font-mono text-xs text-brand-primary">
							빌드 시각 (builtAt): {builtAt}
						</p>
						<MetricsTable />
					</div>
				}
				how={[
					"src/app/lab/ssg/page.tsx — 빌드 시 HTML 생성 (기본 정적)",
					"portfolioMetrics — 빌드 타임에 HTML에 bake-in",
					"builtAt — 모듈 스코프에서 build 시 한 번 기록",
					"(대비) /lab/ssr 은 force-dynamic으로 요청마다 렌더",
				]}
				tradeOffs={{
					pro: "TTFB·비용·단순 배포 — CDN·정적 호스팅에 유리",
					con: "콘텐츠 변경 시 rebuild·redeploy 필요",
				}}
				verify={[
					"yarn build && yarn start 후 /lab/ssg View Source에서 metrics·builtAt 확인",
					"새로고침 여러 번 — builtAt이 동일해야 함",
					"코드 수정 후 다시 build하면 builtAt이 바뀜",
				]}
			/>
		</LabPageShell>
	);
}
