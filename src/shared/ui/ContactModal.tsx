import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";
import React, { useEffect, useState } from "react";

export interface ContactModalCopy {
	title: string;
	nameLabel: string;
	emailLabel: string;
	messageLabel: string;
	submit: string;
	sending: string;
	sent: string;
	sendError: string;
	close: string;
	validation: string;
}

interface ContactModalProps {
	isOpen: boolean;
	onClose: () => void;
	copy: ContactModalCopy;
	accessKey: string | undefined;
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function ContactModal({ isOpen, onClose, copy, accessKey }: ContactModalProps) {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [message, setMessage] = useState("");
	const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">(
		"idle",
	);
	const [validationError, setValidationError] = useState("");

	useEffect(() => {
		if (!isOpen) return;
		setStatus("idle");
		setValidationError("");
	}, [isOpen]);

	useEffect(() => {
		if (!isOpen) return;
		const onKey = (e: KeyboardEvent) => {
			if (e.key === "Escape") onClose();
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [isOpen, onClose]);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setValidationError("");

		const trimmedName = name.trim();
		const trimmedEmail = email.trim();
		const trimmedMessage = message.trim();

		if (!trimmedName || !trimmedEmail || !trimmedMessage) {
			setValidationError(copy.validation);
			return;
		}
		if (!emailPattern.test(trimmedEmail)) {
			setValidationError(copy.validation);
			return;
		}
		if (!accessKey) {
			setStatus("error");
			return;
		}

		setStatus("sending");
		try {
			const res = await fetch("https://api.web3forms.com/submit", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
				},
				body: JSON.stringify({
					access_key: accessKey,
					subject: `[Portfolio] ${trimmedName}`,
					name: trimmedName,
					email: trimmedEmail,
					message: trimmedMessage,
					replyto: trimmedEmail,
					from_name: trimmedName,
					botcheck: "",
				}),
			});
			const data = (await res.json()) as { success?: boolean; message?: string };
			if (res.ok && data.success) {
				setStatus("success");
				setName("");
				setEmail("");
				setMessage("");
			} else {
				setStatus("error");
			}
		} catch {
			setStatus("error");
		}
	};

	return (
		<AnimatePresence>
			{isOpen && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
					onClick={onClose}
					role="presentation"
				>
					<motion.div
						initial={{ scale: 0.96, y: 12 }}
						animate={{ scale: 1, y: 0 }}
						exit={{ scale: 0.96, y: 12 }}
						transition={{ duration: 0.2 }}
						className="relative w-full max-w-md rounded-3xl border border-brand-border bg-white p-6 shadow-2xl"
						onClick={(ev) => ev.stopPropagation()}
						role="dialog"
						aria-modal="true"
						aria-labelledby="contact-modal-title"
					>
						<div className="mb-6 flex items-start justify-between gap-4">
							<h2
								id="contact-modal-title"
								className="text-xl font-black tracking-tight text-brand-primary"
							>
								{copy.title}
							</h2>
							<button
								type="button"
								onClick={onClose}
								className="shrink-0 rounded-full p-2 text-brand-secondary hover:bg-brand-surface hover:text-brand-primary transition-colors"
								aria-label={copy.close}
							>
								<X size={20} />
							</button>
						</div>

						{status === "success" ? (
							<div className="space-y-4">
								<p className="text-sm font-medium text-brand-secondary">{copy.sent}</p>
								<div className="flex justify-end">
									<button
										type="button"
										onClick={onClose}
										className="rounded-full bg-brand-primary px-4 py-2 text-xs font-bold text-white hover:bg-brand-secondary transition-colors"
									>
										{copy.close}
									</button>
								</div>
							</div>
						) : (
							<form onSubmit={handleSubmit} className="space-y-4">
								<div>
									<label
										htmlFor="contact-name"
										className="mb-1 block text-xs font-bold uppercase tracking-wider text-brand-secondary"
									>
										{copy.nameLabel}
									</label>
									<input
										id="contact-name"
										type="text"
										value={name}
										onChange={(ev) => setName(ev.target.value)}
										autoComplete="name"
										className="w-full rounded-xl border border-brand-border px-3 py-2.5 text-sm text-brand-primary outline-none ring-brand-accent focus:ring-2"
									/>
								</div>
								<div>
									<label
										htmlFor="contact-email"
										className="mb-1 block text-xs font-bold uppercase tracking-wider text-brand-secondary"
									>
										{copy.emailLabel}
									</label>
									<input
										id="contact-email"
										type="email"
										value={email}
										onChange={(ev) => setEmail(ev.target.value)}
										autoComplete="email"
										className="w-full rounded-xl border border-brand-border px-3 py-2.5 text-sm text-brand-primary outline-none ring-brand-accent focus:ring-2"
									/>
								</div>
								<div>
									<label
										htmlFor="contact-message"
										className="mb-1 block text-xs font-bold uppercase tracking-wider text-brand-secondary"
									>
										{copy.messageLabel}
									</label>
									<textarea
										id="contact-message"
										value={message}
										onChange={(ev) => setMessage(ev.target.value)}
										rows={5}
										className="w-full resize-y rounded-xl border border-brand-border px-3 py-2.5 text-sm text-brand-primary outline-none ring-brand-accent focus:ring-2"
									/>
								</div>

								{validationError && (
									<p className="text-xs font-medium text-red-600">{validationError}</p>
								)}
								{status === "error" && (
									<p className="text-xs font-medium text-red-600">{copy.sendError}</p>
								)}

								<div className="flex justify-end gap-2 pt-2">
									<button
										type="button"
										onClick={onClose}
										className="rounded-full border border-brand-border px-4 py-2 text-xs font-bold text-brand-secondary hover:bg-brand-surface transition-colors"
									>
										{copy.close}
									</button>
									<button
										type="submit"
										disabled={status === "sending" || !accessKey}
										className="rounded-full bg-brand-primary px-4 py-2 text-xs font-bold text-white hover:bg-brand-secondary disabled:opacity-50 transition-colors"
									>
										{status === "sending" ? copy.sending : copy.submit}
									</button>
								</div>
							</form>
						)}
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	);
}
