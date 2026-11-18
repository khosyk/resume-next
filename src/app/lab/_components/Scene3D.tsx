"use client";

import { OrbitControls } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import type { Mesh } from "three";
import { portfolioMetrics } from "@/lib/data/portfolio-metrics";
import { Scene3DFallback } from "./Scene3DFallback";

function usePrefersReducedMotion() {
	const [reduced, setReduced] = useState(false);

	useEffect(() => {
		const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
		const update = () => setReduced(mq.matches);
		update();
		mq.addEventListener("change", update);
		return () => mq.removeEventListener("change", update);
	}, []);

	return reduced;
}

function canUseWebGL() {
	try {
		const canvas = document.createElement("canvas");
		return Boolean(
			canvas.getContext("webgl") || canvas.getContext("experimental-webgl"),
		);
	} catch {
		return false;
	}
}

function PerformanceRing() {
	const meshRef = useRef<Mesh>(null);
	const speed = portfolioMetrics.fps.after / portfolioMetrics.fps.before;

	useFrame((_, delta) => {
		if (meshRef.current) {
			meshRef.current.rotation.z += delta * speed;
		}
	});

	return (
		<mesh ref={meshRef} rotation={[Math.PI / 2, 0, 0]}>
			<torusGeometry args={[1.2, 0.18, 16, 64]} />
			<meshStandardMaterial color="#0070f3" metalness={0.2} roughness={0.4} />
		</mesh>
	);
}

// R3F Canvas — WebGL CSR only
export default function Scene3D() {
	const prefersReducedMotion = usePrefersReducedMotion();
	const [isWebglOk, setIsWebglOk] = useState(true);

	useEffect(() => {
		setIsWebglOk(canUseWebGL());
	}, []);

	if (prefersReducedMotion || !isWebglOk) {
		return <Scene3DFallback />;
	}

	return (
		<div className="space-y-3">
			<p className="text-sm font-bold">
				Performance Ring — FPS {portfolioMetrics.fps.before} →{" "}
				{portfolioMetrics.fps.after}
			</p>
			<p className="text-xs text-brand-secondary">
				드래그로 회전·줌 (OrbitControls). 링 회전 속도는 after/before 비율을 반영합니다.
			</p>
			<div className="h-72 w-full overflow-hidden rounded-xl border border-brand-border bg-brand-surface">
				<Canvas camera={{ position: [0, 1.8, 3.2], fov: 45 }}>
					<ambientLight intensity={0.6} />
					<directionalLight position={[4, 6, 2]} intensity={1.1} />
					<PerformanceRing />
					<OrbitControls enablePan={false} />
				</Canvas>
			</div>
		</div>
	);
}
