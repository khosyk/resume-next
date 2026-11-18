import { HtmlLang } from "@/app/[lang]/_components/HtmlLang";
import { isValidLang, type Lang } from "@/lib/i18n";
import { notFound } from "next/navigation";

interface LangLayoutProps {
	children: React.ReactNode;
	params: Promise<{ lang: string }>;
}

export default async function LangLayout({ children, params }: LangLayoutProps) {
	const { lang } = await params;

	if (!isValidLang(lang)) {
		notFound();
	}

	return (
		<>
			<HtmlLang lang={lang as Lang} />
			{children}
		</>
	);
}
