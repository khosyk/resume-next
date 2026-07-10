"use client";

import { useEffect } from "react";
import type { Lang } from "@/lib/i18n";

interface HtmlLangProps {
	lang: Lang;
}

// html lang 속성을 라우트 언어에 맞게 동기화
export function HtmlLang({ lang }: HtmlLangProps) {
	useEffect(() => {
		document.documentElement.lang = lang;
	}, [lang]);

	return null;
}
