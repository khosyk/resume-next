export type DemoStrategy = "Hub" | "SSR" | "SSG" | "ISR" | "CSR" | "Charts" | "3D";

export type DemoRouteGroup = "hub" | "rendering" | "visualization";

export interface DemoRoute {
	href: string;
	label: string;
	strategy: DemoStrategy;
	group: DemoRouteGroup;
	description: string;
}

export const demoRoutes: DemoRoute[] = [
	{
		href: "/demos",
		label: "Hub",
		strategy: "Hub",
		group: "hub",
		description: "Lab 개요 · 전략 맵",
	},
	{
		href: "/demos/ssr",
		label: "SSR",
		strategy: "SSR",
		group: "rendering",
		description: "Server-Side Rendering",
	},
	{
		href: "/demos/ssg",
		label: "SSG",
		strategy: "SSG",
		group: "rendering",
		description: "Static Site Generation",
	},
	{
		href: "/demos/isr",
		label: "ISR",
		strategy: "ISR",
		group: "rendering",
		description: "Incremental Static Regeneration",
	},
	{
		href: "/demos/csr",
		label: "CSR",
		strategy: "CSR",
		group: "rendering",
		description: "Client-Side Rendering",
	},
	{
		href: "/demos/charts",
		label: "Charts",
		strategy: "Charts",
		group: "visualization",
		description: "Recharts 시각화",
	},
	{
		href: "/demos/3d",
		label: "3D",
		strategy: "3D",
		group: "visualization",
		description: "React Three Fiber",
	},
];

export const demoRouteGroups: {
	id: DemoRouteGroup;
	title: string;
}[] = [
	{ id: "hub", title: "Overview" },
	{ id: "rendering", title: "Rendering" },
	{ id: "visualization", title: "Visualization" },
];

export function getDemoRoute(href: string): DemoRoute | undefined {
	return demoRoutes.find((route) => route.href === href);
}

export function getDemoNeighbors(href: string): {
	prev: DemoRoute | null;
	next: DemoRoute | null;
} {
	const index = demoRoutes.findIndex((route) => route.href === href);
	if (index === -1) {
		return { prev: null, next: null };
	}
	return {
		prev: index > 0 ? demoRoutes[index - 1] : null,
		next: index < demoRoutes.length - 1 ? demoRoutes[index + 1] : null,
	};
}

export function getDemoRoutesByGroup(group: DemoRouteGroup): DemoRoute[] {
	return demoRoutes.filter((route) => route.group === group);
}

const strategyStyles: Record<DemoStrategy, string> = {
	Hub: "bg-brand-primary text-white",
	SSR: "bg-blue-600 text-white",
	SSG: "bg-emerald-600 text-white",
	ISR: "bg-amber-500 text-white",
	CSR: "bg-violet-600 text-white",
	Charts: "bg-cyan-600 text-white",
	"3D": "bg-pink-600 text-white",
};

export function getStrategyBadgeClass(strategy: DemoStrategy): string {
	return strategyStyles[strategy];
}
