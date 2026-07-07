import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HomePageClient } from "@/features/home/components/HomePageClient";
import { getDictionary, isValidLang, langs, type Lang } from "@/shared/i18n";

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

	return <HomePageClient lang={raw} />;
}
