import { ProjectData } from "../types";
import { TeknofestProject } from "../types/github";
import projectsDataJson from "./projectsData.json";
import teknofestDataJson from "./teknofestData.json";

export const projects: ProjectData[] = projectsDataJson.projects;
export const teknofestProjects: TeknofestProject[] = teknofestDataJson.teknofestProjects;