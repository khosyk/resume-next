import { LabHeader } from "@/app/lab/_components/LabNav";

export default function LabLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div className="min-h-screen bg-brand-bg text-brand-primary">
			<LabHeader />
			{children}
		</div>
	);
}
