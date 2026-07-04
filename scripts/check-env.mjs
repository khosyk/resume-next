import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import dotenv from "dotenv";

const REQUIRED_KEYS = ["NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY"];
const rootDir = process.cwd();
const envPath = path.join(rootDir, ".env");

if (fs.existsSync(envPath)) {
	const parsed = dotenv.parse(fs.readFileSync(envPath, "utf8"));
	for (const [key, value] of Object.entries(parsed)) {
		if (!(key in process.env)) {
			process.env[key] = value;
		}
	}
}

// Vite → Next 마이그레이션: 기존 .env 키 fallback
if (
	!process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY?.trim() &&
	process.env.VITE_WEB3FORMS_ACCESS_KEY?.trim()
) {
	process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY = process.env.VITE_WEB3FORMS_ACCESS_KEY;
	console.warn(
		"[check:env] VITE_WEB3FORMS_ACCESS_KEY → rename to NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY",
	);
}

const missing = REQUIRED_KEYS.filter((key) => {
	const value = process.env[key];
	return typeof value !== "string" || value.trim().length === 0;
});

if (missing.length > 0) {
	console.error("[check:env] Missing required environment variables:");
	for (const key of missing) {
		console.error(`- ${key}`);
	}
	console.error("Create a .env file from .env.example and fill in required values.");
	process.exit(1);
}

console.log("[check:env] OK");
