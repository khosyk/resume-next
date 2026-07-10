import { LabPageShell } from "@/app/lab/_components/LabPageShell";

export const revalidate = 60;

export default function IsrLabPage() {
	return <LabPageShell href="/lab/isr" strategy="ISR" title="ISR Lab" />;
}
