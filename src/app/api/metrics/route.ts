import { NextResponse } from "next/server";
import { portfolioMetrics } from "@/lib/data/portfolio-metrics";

const DELAY_MS = 500;

// CSR Lab용 BFF — 의도적 delay로 skeleton 체감
export async function GET() {
	await new Promise((resolve) => setTimeout(resolve, DELAY_MS));

	return NextResponse.json({
		...portfolioMetrics,
		fetchedAt: new Date().toISOString(),
	});
}
