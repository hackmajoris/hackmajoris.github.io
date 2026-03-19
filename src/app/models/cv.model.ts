export interface ContactInfo {
  email: string;
  location: string;
  linkedin: string;
  github: string;
}

export interface ProjectLink {
  url?: string;
  github?: string;
}

export interface SideProject {
  name: string;
  role: string;
  stack: string;
  links: ProjectLink;
  bullets: string[];
}

export interface WorkExperience {
  title: string;
  company: string;
  location: string;
  period: string;
  bullets: string[];
  sideProjects?: SideProject[];
}

export interface Education {
  degree: string;
  institution: string;
  location: string;
  period: string;
}

export interface Skill {
  category: string;
  items: string[];
}

export interface Certification {
  name: string;
  url: string;
}

export interface CvData {
  firstName: string;
  lastName: string;
  title: string;
  photo: string;
  cvPdf: string;
  contact: ContactInfo;
  quote: string;
  profile: string;
  workExperience: WorkExperience[];
  education: Education[];
  skills: Skill[];
  certifications: Certification[];
}
