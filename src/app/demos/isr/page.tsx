import { DemoPageShell } from "@/features/demos/components/DemoPageShell";

export const revalidate = 60;

export default function IsrDemoPage() {
	return <DemoPageShell href="/demos/isr" strategy="ISR" title="ISR Demo" />;
}
