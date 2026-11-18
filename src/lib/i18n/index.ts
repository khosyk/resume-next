import { dictionaries } from "./dictionaries";

export type Lang = keyof typeof dictionaries;

export const langs: Lang[] = ["ko", "en"];

export type Dictionary = (typeof dictionaries)[Lang];

export function isValidLang(value: string): value is Lang {
	return value === "ko" || value === "en";
}

export function getDictionary(lang: Lang): Dictionary {
	return dictionaries[lang];
}

export function getAlternateLang(lang: Lang): Lang {
	return lang === "ko" ? "en" : "ko";
}
