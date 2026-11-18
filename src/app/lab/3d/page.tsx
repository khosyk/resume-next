import { LabContentSections } from "@/app/lab/_components/LabContentSections";
import { LabPageShell } from "@/app/lab/_components/LabPageShell";
import { Scene3DDynamic } from "@/app/lab/_components/Scene3DDynamic";

export default function ThreeLabPage() {
	return (
		<LabPageShell href="/lab/3d" strategy="3D" title="3D Lab">
			<LabContentSections
				why={`3D·WebGL은 브라우저에서만 동작하므로 CSR Lab의 연장이다.
fps 개선 스토리를 Performance Ring으로 시각화해 “성능에 집착하는 FE” 메시지를 보조한다.
접근성·저사양을 위해 prefers-reduced-motion / WebGL 실패 시 2D fallback을 둔다.`}
				live={<Scene3DDynamic />}
				how={[
					"Scene3DDynamic.tsx — dynamic(ssr: false) Client 래퍼",
					"PerformanceRing — torus + useFrame 애니메이션",
					"Scene3DFallback — prefers-reduced-motion / WebGL fail",
					"portfolioMetrics.fps — 40 → 60 카피 연결",
				]}
				tradeOffs={{
					pro: "임팩트·WebGL·React 통합 스토리",
					con: "번들(three)·GPU·배터리 — 씬 1개로 제한",
				}}
				verify={[
					"WebGL 씬 표시·OrbitControls 드래그 확인",
					"View Page Source에 canvas WebGL 내용 없음",
					"DevTools에서 prefers-reduced-motion emulate → 2D fallback",
				]}
			/>
		</LabPageShell>
	);
}
