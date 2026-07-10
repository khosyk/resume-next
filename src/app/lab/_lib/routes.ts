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
		description: "Server-Side Rendering",
	},
	{
		href: "/lab/ssg",
		label: "SSG",
		strategy: "SSG",
		group: "rendering",
		description: "Static Site Generation",
	},
	{
		href: "/lab/isr",
		label: "ISR",
		strategy: "ISR",
		group: "rendering",
		description: "Incremental Static Regeneration",
	},
	{
		href: "/lab/csr",
		label: "CSR",
		strategy: "CSR",
		group: "rendering",
		description: "Client-Side Rendering",
	},
	{
		href: "/lab/charts",
		label: "Charts",
		strategy: "Charts",
		group: "visualization",
		description: "Recharts 시각화",
	},
	{
		href: "/lab/3d",
		label: "3D",
		strategy: "3D",
		group: "visualization",
		description: "React Three Fiber",
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
