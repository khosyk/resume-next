"use client";

import { useEffect, useState } from "react";
import { MetricsTable } from "@/app/lab/_components/MetricsTable";
import type { PortfolioMetrics } from "@/lib/data/portfolio-metrics";

type MetricsResponse = PortfolioMetrics & { fetchedAt: string };

// CSR Live Lab — useEffect + /api/metrics
export function CsrMetricsLab() {
	const [data, setData] = useState<MetricsResponse | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		let cancelled = false;

		async function load() {
			setIsLoading(true);
			setError(null);
			try {
				const res = await fetch("/api/metrics");
				if (!res.ok) {
					throw new Error(`HTTP ${res.status}`);
				}
				const json = (await res.json()) as MetricsResponse;
				if (!cancelled) {
					setData(json);
				}
			} catch (err) {
				if (!cancelled) {
					setError(err instanceof Error ? err.message : "fetch failed");
				}
			} finally {
				if (!cancelled) {
					setIsLoading(false);
				}
			}
		}

		void load();
		return () => {
			cancelled = true;
		};
	}, []);

	if (isLoading) {
		return (
			<div className="space-y-3" aria-busy="true" aria-live="polite">
				<div className="h-8 animate-pulse rounded-lg bg-brand-surface" />
				<div className="h-40 animate-pulse rounded-xl bg-brand-surface" />
				<p className="text-xs text-brand-secondary">/api/metrics 로딩 중… (~500ms)</p>
			</div>
		);
	}

	if (error || !data) {
		return (
			<p className="text-sm text-red-600">
				metrics를 불러오지 못했습니다{error ? `: ${error}` : ""}
			</p>
		);
	}

	const { fetchedAt, crashRate, fps, qaPass, codeReduction, users, mau } = data;

	return (
		<div className="space-y-4">
			<p className="rounded-lg bg-brand-surface px-3 py-2 font-mono text-xs text-brand-primary">
				fetchedAt (클라이언트 표시): {fetchedAt}
			</p>
			<MetricsTable metrics={{ crashRate, fps, qaPass, codeReduction, users, mau }} />
		</div>
	);
}
