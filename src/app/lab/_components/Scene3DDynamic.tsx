"use client";

import dynamic from "next/dynamic";

const Scene3D = dynamic(() => import("@/app/lab/_components/Scene3D"), {
	ssr: false,
	loading: () => <p className="text-sm text-brand-secondary">3D 씬 로딩 중…</p>,
});

// Server page에서 ssr:false dynamic을 쓰기 위한 Client 래퍼
export function Scene3DDynamic() {
	return <Scene3D />;
}
