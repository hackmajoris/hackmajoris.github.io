import { Injectable } from '@angular/core';
import { CvData } from '../models/cv.model';

@Injectable({
  providedIn: 'root',
})
export class CvDataService {
  readonly cv: CvData = {
    firstName: 'ALEXANDRU',
    lastName: 'ILIES',
    title: 'senior software engineer · cloud architect',
    photo: 'assets/profile.jpg',
    cvPdf: 'assets/cv.pdf',
    contact: {
      email: 'alex.ilies@icloud.com',
      location: 'Cluj, RO',
      linkedin: 'linkedin.com/in/alex-ilies',
      github: 'github.com/hackmajoris',
    },
    quote: "You miss 100% of the shots you don't take.",
    profile:
      "Senior Software Engineer and AWS-certified Cloud Architect with 11 years of experience designing and delivering production systems at scale. I specialize in building event-driven, serverless architectures on AWS and leading teams through complex full-stack projects — from infrastructure to deployment.\n\nAcross 5+ projects I've grown from junior developer to technical lead, mentoring teams of up to 10, architecting platforms serving 35,000+ users, and owning the full cloud infrastructure lifecycle. I hold 4 AWS certifications including Security Specialty and DevOps Professional.\n\nI care about writing clean, well-tested code, automating everything that can be automated, and solving hard problems that make a real difference.",
    workExperience: [
      {
        title: 'Lead Software Engineer',
        company: 'msg.group',
        location: 'Cluj, RO',
        period: 'Jan 2020 – Present',
        bullets: [
          'Architected and owned the complete cloud infrastructure for a crowd testing platform serving 35,000+ users, using 20+ AWS services including ECS, Lambda (30+), SQS, SNS, EventBridge, and CloudWatch.',
          'Led a team of up to 10 developers across frontend and backend, driving code quality through structured reviews, automated testing, and mentorship programs.',
          'Implemented event-driven, serverless architectures that improved system scalability and reduced operational costs through continuous optimization.',
          'Established CI/CD pipelines with GitHub Actions and GitLab CI, enabling multiple deployments per day with zero-downtime releases.',
          'Defined and enforced security best practices across all projects — WAF, IAM policies, secrets management — aligned with AWS Security Specialty certification.',
        ],
        sideProjects: [
          {
            name: 'Passbrains',
            role: 'Lead Developer & Cloud Architect',
            stack: 'AWS (ECS, Lambda, SQS, SNS, EventBridge, CloudWatch, CDK), Angular, TypeScript, NestJS',
            links: {},
            bullets: [
              'Led the complete re-architecture of a public crowd testing platform serving 35,000+ users, from monolith to event-driven serverless.',
              'Designed and deployed 30+ Lambda functions orchestrated via EventBridge and SQS/SNS for asynchronous processing.',
              'Built full-stack features end-to-end using Angular, TypeScript, and NestJS, delivering both frontend UX and backend API layers.',
              'Managed infrastructure as code with CDK and Terraform, enabling reproducible multi-environment deployments.',
              'Drove DevSecOps adoption — automated vulnerability scanning, secrets rotation, and compliance checks in CI/CD pipelines.',
            ],
          },
        ],
      },
      {
        title: 'Software Engineer',
        company: 'msg.group',
        location: 'Cluj, RO',
        period: 'July 2015 – Dec 2019',
        bullets: [
          'Progressed from junior to mid-level engineer across multiple client projects, building full-stack web applications with Angular, TypeScript, and Node.js.',
          'Designed and implemented secure user authentication systems and automated monitoring solutions using CloudWatch.',
          'Delivered full feature modules — ticketing, user rewards, and public-facing portals — for a German public sector platform (Dipko) serving citizens nationwide.',
          'Built first cloud-native solutions on AWS, gaining hands-on expertise that led to 4 AWS certifications.',
        ],
        sideProjects: [
          {
            name: 'Dipko',
            role: 'Full-Stack Developer',
            stack: 'AWS, Angular, TypeScript, Node.js',
            links: {},
            bullets: [
              'Built a German public sector platform aggregating government institutions into a unified citizen-facing portal.',
              'Delivered end-to-end feature modules including ticketing systems and user reward mechanics.',
              'Deployed cloud-based solutions on AWS tailored to public sector compliance and availability requirements.',
            ],
          },
          {
            name: 'Personal Tools & Side Projects',
            role: 'Solo Developer',
            stack: 'AWS, Angular, React, TypeScript, Node.js, Go, Java',
            links: { url: 'https://l.dot-core.com' },
            bullets: [
              'Built a reverse proxy and link shortener service powering all links in this CV, deployed as a serverless application on AWS.',
            ],
          },
        ],
      },
    ],
    education: [
      {
        degree: 'Bachelor in Computer Science',
        institution: 'Technical University of Cluj-Napoca',
        location: 'Cluj, RO',
        period: 'Oct. 2012 – July 2016',
      },
    ],
    skills: [
      {
        category: 'Programming Languages',
        items: ['TypeScript', 'JavaScript', 'Go', 'Java', 'Python', 'Swift'],
      },
      {
        category: 'Frameworks & Runtime',
        items: ['Angular', 'React', 'NestJS', 'Node.js', 'Spring', 'Tailwind', 'iOS/WatchOS'],
      },
      {
        category: 'Cloud & Infrastructure',
        items: ['AWS (ECS, Lambda, SQS, SNS, EventBridge, CloudWatch, RDS, DynamoDB)', 'Terraform', 'CDK', 'CloudFormation', 'Docker'],
      },
      {
        category: 'Databases',
        items: ['PostgreSQL', 'DynamoDB (Single/Multi-Table)', 'MongoDB', 'Aurora', 'Redis'],
      },
      {
        category: 'DevOps & Tooling',
        items: ['GitHub Actions', 'GitLab CI/CD', 'Docker', 'Nx', 'Git'],
      },
      {
        category: 'Architecture & Leadership',
        items: ['Event-Driven Architecture', 'Serverless', 'Microservices', 'Technical Mentoring', 'System Design'],
      },
    ],
    certifications: [
      { name: 'AWS Security Specialty', url: 'https://links.dot-core.com/a338e1' },
      { name: 'AWS DevOps Professional', url: 'https://links.dot-core.com/1f077f' },
      { name: 'AWS Associate Developer', url: 'https://links.dot-core.com/f74686' },
      { name: 'AWS Associate Architect', url: 'https://links.dot-core.com/e6f1c2' },
    ],
  };
}
