import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CareerSection } from "@/app/[lang]/_components/CareerSection";
import { FooterSection } from "@/app/[lang]/_components/FooterSection";
import { HeroSection } from "@/app/[lang]/_components/HeroSection";
import { HomePageClient } from "@/app/[lang]/_components/HomePageClient";
import { ProjectsSection } from "@/app/[lang]/_components/ProjectsSection";
import { StatsSection } from "@/app/[lang]/_components/StatsSection";
import { TechSection } from "@/app/[lang]/_components/TechSection";
import { WorkEthicSection } from "@/app/[lang]/_components/WorkEthicSection";
import { getDictionary, isValidLang, langs, type Lang } from "@/lib/i18n";

interface LangPageProps {
	params: Promise<{ lang: string }>;
}

export function generateStaticParams() {
	return langs.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: LangPageProps): Promise<Metadata> {
	const { lang: raw } = await params;

	if (!isValidLang(raw)) {
		return {};
	}

	const lang = raw as Lang;
	const t = getDictionary(lang);
	const alternate = lang === "ko" ? "en" : "ko";

	return {
		title:
			lang === "ko"
				? "이희운 — 프론트엔드 포트폴리오"
				: "Heeun Lee — Frontend Portfolio",
		description: t.hero.desc,
		alternates: {
			languages: {
				ko: "/ko",
				en: "/en",
			},
			canonical: `/${lang}`,
		},
		openGraph: {
			locale: lang === "ko" ? "ko_KR" : "en_US",
			alternateLocale: alternate === "ko" ? "ko_KR" : "en_US",
		},
	};
}

export default async function LangHomePage({ params }: LangPageProps) {
	const { lang: raw } = await params;

	if (!isValidLang(raw)) {
		notFound();
	}

	const lang = raw as Lang;
	const t = getDictionary(lang);

	return (
		<HomePageClient lang={lang}>
			<HeroSection lang={lang} />
			<StatsSection lang={lang} />
			<TechSection lang={lang} />
			<ProjectsSection lang={lang} />
			<WorkEthicSection mindset={t.mindset} />
			<CareerSection lang={lang} />
			<FooterSection lang={lang} />
		</HomePageClient>
	);
}
