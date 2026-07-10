import { Github, Linkedin } from "lucide-react";
import { profileLinks } from "@/lib/data/links";
import { getDictionary, type Lang } from "@/lib/i18n";

interface FooterSectionProps {
	lang: Lang;
}

// 푸터 — SSG Server
export function FooterSection({ lang }: FooterSectionProps) {
	const t = getDictionary(lang);

	return (
		<footer className="border-t border-brand-border px-6 py-12 text-center">
			<div className="mx-auto flex max-w-7xl flex-col items-center gap-6">
				<div className="flex gap-4">
					<a
						href={profileLinks.github}
						target="_blank"
						rel="noreferrer"
						className="rounded-full border border-brand-border p-2 text-brand-secondary transition-colors hover:bg-brand-surface hover:text-brand-primary"
					>
						<Github size={20} />
					</a>
					<a
						href={profileLinks.linkedin}
						target="_blank"
						rel="noreferrer"
						className="rounded-full border border-brand-border p-2 text-brand-secondary transition-colors hover:bg-brand-surface hover:text-brand-primary"
					>
						<Linkedin size={20} />
					</a>
					{lang === "ko" && (
						<a
							href={profileLinks.notion.resume}
							target="_blank"
							rel="noopener noreferrer"
							className="flex h-9 w-9 items-center justify-center rounded-full border border-brand-border text-sm font-black text-brand-secondary transition-colors hover:bg-brand-surface hover:text-brand-primary"
							title="Notion"
						>
							N
						</a>
					)}
				</div>
				<p className="text-xs font-bold uppercase tracking-widest text-brand-secondary">
					{t.footer.built}
				</p>
			</div>
		</footer>
	);
}
