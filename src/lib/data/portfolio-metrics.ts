export const portfolioMetrics = {
	crashRate: { before: 3.89, after: 0.02, unit: "%" },
	fps: { before: 40, after: 60 },
	qaPass: { before: 60, after: 100, unit: "%" },
	codeReduction: 20,
	users: 550_000,
	mau: 100_000,
} as const;

export type PortfolioMetrics = typeof portfolioMetrics;
