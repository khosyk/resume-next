export interface ProjectAchievement {
	problem: string;
	thinking: string;
	result: string;
}

export interface ResumeProject {
	id: string;
	title: string;
	category: string;
	subtitle: string;
	tags: string[];
	link?: string;
	images: string[];
	achievements: ProjectAchievement[];
	color: string;
}
