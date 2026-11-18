"use client";

import dynamic from "next/dynamic";

const ChartsLab = dynamic(() => import("@/app/lab/_components/ChartsLab"), {
	ssr: false,
	loading: () => <p className="text-sm text-brand-secondary">차트 로딩 중…</p>,
});

// Server page에서 ssr:false dynamic을 쓰기 위한 Client 래퍼
export function ChartsLabDynamic() {
	return <ChartsLab />;
}
