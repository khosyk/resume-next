import { DemoPageShell } from "@/features/demos/components/DemoPageShell";

export default function SsrDemoPage() {
	return <DemoPageShell href="/demos/ssr" strategy="SSR" title="SSR Demo" />;
}
