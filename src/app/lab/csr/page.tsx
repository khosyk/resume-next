import { CsrMetricsLab } from "@/app/lab/_components/CsrMetricsLab";
import { LabContentSections } from "@/app/lab/_components/LabContentSections";
import { LabPageShell } from "@/app/lab/_components/LabPageShell";

export default function CsrLabPage() {
	return (
		<LabPageShell href="/lab/csr" strategy="CSR" title="CSR Lab">
			<LabContentSections
				why={`검색이 필요 없고 사용자 인터랙션이 많은 UI는 클라이언트에서 데이터를 가져와 그리는 편이 단순하다.
3D·실시간 필터는 서버 HTML에 넣을 수 없어 CSR 영역이 된다.
이 페이지는 첫 HTML에 metrics가 없고, JS 실행 후 /api/metrics로 채운다.`}
				live={<CsrMetricsLab />}
				how={[
					"CsrMetricsLab.tsx — useEffect + fetch('/api/metrics')",
					"GET /api/metrics — 500ms delay BFF (Route Handler)",
					"portfolioMetrics — API JSON body의 SSOT",
					"page.tsx — Server Component, View Source에 숫자 없음",
				]}
				tradeOffs={{
					pro: "실시간·인터랙션·서버 HTML 단순 — SPA 패턴과 동일",
					con: "첫 페인트 지연, SEO·View Source 빈약, JS 필수",
				}}
				verify={[
					"View Page Source에서 0.02·550000 등 metrics 숫자가 없어야 함",
					"DevTools Network에서 /api/metrics 200·~500ms 확인",
					"(선택) JS 비활성 시 metrics가 안 보임",
				]}
			/>
		</LabPageShell>
	);
}
