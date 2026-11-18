interface LabContentSectionsProps {
	why: string;
	live: React.ReactNode;
	how: string[];
	tradeOffs: { pro: string; con: string };
	verify: string[];
}

// Lab 페이지 공통 섹션 레이아웃 (Why → Live → How → Trade-offs → Verify)
export function LabContentSections({
	why,
	live,
	how,
	tradeOffs,
	verify,
}: LabContentSectionsProps) {
	return (
		<div className="space-y-8 text-sm leading-relaxed">
			<section>
				<h2 className="mb-2 text-xs font-black uppercase tracking-widest text-brand-secondary">
					Why
				</h2>
				<p className="text-brand-primary whitespace-pre-line">{why}</p>
			</section>

			<section>
				<h2 className="mb-3 text-xs font-black uppercase tracking-widest text-brand-secondary">
					Live Lab
				</h2>
				{live}
			</section>

			<section>
				<h2 className="mb-2 text-xs font-black uppercase tracking-widest text-brand-secondary">
					How
				</h2>
				<ul className="list-disc space-y-1 pl-5 text-brand-primary">
					{how.map((item) => (
						<li key={item}>{item}</li>
					))}
				</ul>
			</section>

			<section>
				<h2 className="mb-2 text-xs font-black uppercase tracking-widest text-brand-secondary">
					Trade-offs
				</h2>
				<ul className="list-disc space-y-1 pl-5 text-brand-primary">
					<li>
						<span className="font-semibold">장점:</span> {tradeOffs.pro}
					</li>
					<li>
						<span className="font-semibold">단점:</span> {tradeOffs.con}
					</li>
				</ul>
			</section>

			<section>
				<h2 className="mb-2 text-xs font-black uppercase tracking-widest text-brand-secondary">
					Verify
				</h2>
				<ol className="list-decimal space-y-1 pl-5 text-brand-primary">
					{verify.map((item) => (
						<li key={item}>{item}</li>
					))}
				</ol>
			</section>
		</div>
	);
}
