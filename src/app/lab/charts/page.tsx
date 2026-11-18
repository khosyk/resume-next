import { ChartsLabDynamic } from "@/app/lab/_components/ChartsLabDynamic";
import { LabContentSections } from "@/app/lab/_components/LabContentSections";
import { LabPageShell } from "@/app/lab/_components/LabPageShell";

export default function ChartsLabPage() {
	return (
		<LabPageShell href="/lab/charts" strategy="Charts" title="Charts Lab">
			<LabContentSections
				why={`Admin·앱에서 차트로 지표를 설득한 경험이 있어, Web Lab에서도 동일한 portfolioMetrics를 Recharts로 시각화한다.
Recharts는 React 컴포넌트 모델과 번들 크기 면에서 이 사이트 v1에 맞다.
차트는 DOM·브라우저 크기에 의존하므로 dynamic(ssr: false) Client island로 둔다.`}
				live={<ChartsLabDynamic />}
				how={[
					"ChartsLabDynamic.tsx — dynamic(..., { ssr: false }) Client 래퍼",
					"ChartsLab.tsx — Bar + Line, portfolioMetrics",
					"recharts ResponsiveContainer — 모바일 width 대응",
					"(대비) SSR 페이지는 metrics를 HTML 테이블로 bake-in",
				]}
				tradeOffs={{
					pro: "React 친화, 학습 곡선 낮음, Lab 2차트에 충분",
					con: "ECharts 대비 고급 차트·대용량 성능 — v1은 2개로 제한",
				}}
				verify={[
					"Bar·Line 두 차트가 렌더되는지 확인",
					"View Page Source에 차트 SVG 데이터가 거의 없음 (loading/문구만)",
					"모바일 뷰포트에서 ResponsiveContainer가 깨지지 않는지 확인",
				]}
			/>
		</LabPageShell>
	);
}
