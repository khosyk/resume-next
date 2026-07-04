import type { ReactNode } from "react";

interface MindsetItemProps {
	icon: ReactNode;
	title: string;
	desc: string;
}

export function MindsetItem({ icon, title, desc }: MindsetItemProps) {
	return (
		<div className="p-8 border border-brand-border rounded-3xl hover:bg-brand-surface transition-colors h-full flex flex-col">
			<div className="text-brand-accent mb-6">{icon}</div>
			<h4 className="text-xl font-bold mb-4">{title}</h4>
			<p className="text-brand-secondary leading-relaxed text-sm grow">{desc}</p>
		</div>
	);
}
