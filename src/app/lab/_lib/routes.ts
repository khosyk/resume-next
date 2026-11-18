export type LabStrategy = "Hub" | "SSR" | "SSG" | "ISR" | "CSR" | "Charts" | "3D";

export type LabRouteGroup = "hub" | "rendering" | "visualization";

export interface LabRoute {
	href: string;
	label: string;
	strategy: LabStrategy;
	group: LabRouteGroup;
	description: string;
}

export const labRoutes: LabRoute[] = [
	{
		href: "/lab",
		label: "Hub",
		strategy: "Hub",
		group: "hub",
		description: "Lab 개요 · 전략 맵",
	},
	{
		href: "/lab/ssr",
		label: "SSR",
		strategy: "SSR",
		group: "rendering",
		description: "요청 시 서버에서 HTML 생성",
	},
	{
		href: "/lab/ssg",
		label: "SSG",
		strategy: "SSG",
		group: "rendering",
		description: "빌드 시 HTML 고정",
	},
	{
		href: "/lab/isr",
		label: "ISR",
		strategy: "ISR",
		group: "rendering",
		description: "주기적 HTML 재생성 (60초)",
	},
	{
		href: "/lab/csr",
		label: "CSR",
		strategy: "CSR",
		group: "rendering",
		description: "브라우저에서 API로 데이터 fetch",
	},
	{
		href: "/lab/charts",
		label: "Charts",
		strategy: "Charts",
		group: "visualization",
		description: "Recharts Before/After · Timeline",
	},
	{
		href: "/lab/3d",
		label: "3D",
		strategy: "3D",
		group: "visualization",
		description: "R3F Performance Ring · 2D fallback",
	},
];

export const labRouteGroups: {
	id: LabRouteGroup;
	title: string;
}[] = [
	{ id: "hub", title: "Overview" },
	{ id: "rendering", title: "Rendering" },
	{ id: "visualization", title: "Visualization" },
];

export function getLabRoute(href: string): LabRoute | undefined {
	return labRoutes.find((route) => route.href === href);
}

export function getLabNeighbors(href: string): {
	prev: LabRoute | null;
	next: LabRoute | null;
} {
	const index = labRoutes.findIndex((route) => route.href === href);
	if (index === -1) {
		return { prev: null, next: null };
	}
	return {
		prev: index > 0 ? labRoutes[index - 1] : null,
		next: index < labRoutes.length - 1 ? labRoutes[index + 1] : null,
	};
}

export function getLabRoutesByGroup(group: LabRouteGroup): LabRoute[] {
	return labRoutes.filter((route) => route.group === group);
}

const strategyStyles: Record<LabStrategy, string> = {
	Hub: "bg-brand-primary text-white",
	SSR: "bg-blue-600 text-white",
	SSG: "bg-emerald-600 text-white",
	ISR: "bg-amber-500 text-white",
	CSR: "bg-violet-600 text-white",
	Charts: "bg-cyan-600 text-white",
	"3D": "bg-pink-600 text-white",
};

export function getStrategyBadgeClass(strategy: LabStrategy): string {
	return strategyStyles[strategy];
}
