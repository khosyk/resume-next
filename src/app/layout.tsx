import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
	title: "Heeun Lee's Portfolio",
	description:
		"프론트엔드 엔지니어 이희운 — 55만 유저 서비스 안정성·성능 최적화·Next.js Engineering Lab",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="ko">
			<body>{children}</body>
		</html>
	);
}
