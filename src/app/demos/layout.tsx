import { DemoLabHeader } from "@/features/demos/components/DemoLabNav";

export default function DemosLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div className="min-h-screen bg-brand-bg text-brand-primary">
			<DemoLabHeader />
			{children}
		</div>
	);
}
