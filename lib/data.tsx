import { Braces, Brain, Cloud, Code, Database, LayoutDashboard, Server, Shield, Mail } from "lucide-react";
import React from "react";

const GithubIcon = (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
);

const LinkedinIcon = (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
);

const XTwitterIcon = (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.402 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
);

export const portfolioData = {
    personal: {
        name: "Mohammad Umar",
        alternateName: "Shaikh Mohammad Umar",
        lastName: "Shaikh",
        title: "Full Stack Software Developer",
        titleShort: "Full-Stack Developer",
        heroSubtitle:
            "Full Stack Developer — crafting intelligent enterprise solutions with Java, Spring Boot, React, and AI-driven architectures.",
        email: "mohammadumar.dev@gmail.com",
        phone: "+91-9607056810",
        location: {
            city: "Pune",
            region: "Maharashtra",
            country: "IN",
        },
        bio: [
            "I'm Mohammad Umar, a Full Stack Software Developer with over a year of experience building enterprise applications at the intersection of AI, healthcare, and fintech. I specialize in Java, Spring Boot, React, Next.js, TypeScript, PostgreSQL, Python, FastAPI, and multi-agent AI architectures — delivering solutions that improve performance and drive measurable business impact.",
            "Currently completing my Computer Science degree in Pune with a 9.091 SGPA, I'm passionate about systems programming, microservices, and AI integration. I've shipped everything from security-first password managers to full-stack laboratory management systems, consistently focusing on scalability and user experience.",
            "Beyond code, I explore cutting-edge AI research, contribute to open source, and continuously learn new technologies that push boundaries.",
        ],
        pullQuote:
            "Great code doesn't just work — it solves real problems, scales effortlessly, and empowers users to achieve more.",
        availability: "Currently available for full-time roles and select freelance projects.",
    },

    socials: [
        {
            icon: GithubIcon,
            label: "GitHub",
            href: "https://github.com/mohammadumar-dev",
        },
        {
            icon: LinkedinIcon,
            label: "LinkedIn",
            href: "https://www.linkedin.com/in/shaikh-mohammad-umar",
        },
        {
            icon: XTwitterIcon,
            label: "X / Twitter",
            href: "https://x.com/_s_h_a_i_k_h_",
        },
        {
            icon: <Mail className="h-[17px] w-[17px]" />,
            label: "Email",
            href: "mailto:mohammadumar.dev@gmail.com",
        },
    ],

    stats: [
        { number: "1+", label: "Years Experience" },
        { number: "10+", label: "Projects Shipped" },
        { number: "—", label: "GitHub Commits" },
    ],

    pillars: [
        {
            icon: <Code className="h-5 w-5" />,
            title: "Systems-Level Thinking",
            desc: "From algorithms to architecture — building solutions that scale efficiently and perform reliably.",
        },
        {
            icon: <Brain className="h-5 w-5" />,
            title: "AI-Driven Innovation",
            desc: "Leveraging multi-agent architectures and intelligent automation to solve complex problems.",
        },
        {
            icon: <Shield className="h-5 w-5" />,
            title: "Security-First Design",
            desc: "Enterprise-grade security with encryption, authentication, and compliance at every layer.",
        },
    ],

    nav: [
        { label: "About", href: "#about" },
        { label: "Work", href: "#projects" },
        { label: "Experience", href: "#experience" },
        { label: "Contact", href: "#contact" },
    ],

    skills: [
        {
            label: "Languages",
            count: 8,
            color: "coral" as const,
            icon: <Braces className="h-5 w-5" />,
            skills: [
                { name: "Java", tip: "Primary language — Spring ecosystem expert" },
                { name: "Python", tip: "Backend, AI/ML, scripting" },
                { name: "JavaScript", tip: "ES6+, full-stack development" },
                { name: "TypeScript", tip: "Type-safe React & Next.js apps" },
                { name: "C++", tip: "Systems programming, DSA, competitive coding" },
                { name: "C", tip: "Low-level programming, memory management" },
                { name: "SQL", tip: "PostgreSQL, complex queries, optimization" },
                { name: "FTL", tip: "FreeMarker Template Language for dynamic content" },
            ],
        },
        {
            label: "Backend & APIs",
            count: 7,
            color: "blue" as const,
            icon: <Server className="h-5 w-5" />,
            skills: [
                { name: "Spring Boot", tip: "Enterprise apps — production experience" },
                { name: "FastAPI", tip: "Python async APIs, high performance" },
                { name: "Node.js", tip: "JavaScript runtime, event-driven backend" },
                { name: "RESTful APIs", tip: "API design, implementation, best practices" },
                { name: "Microservices", tip: "Distributed architecture, scalability" },
                { name: "Hibernate", tip: "ORM, JPA, entity relationship mapping" },
                { name: "JDBC", tip: "Database connectivity, transaction management" },
            ],
        },
        {
            label: "Frontend & UI",
            count: 7,
            color: "green" as const,
            icon: <LayoutDashboard className="h-5 w-5" />,
            skills: [
                { name: "React", tip: "Component architecture — production" },
                { name: "Next.js", tip: "SSR, SSG, App Router, performance optimization" },
                { name: "TypeScript", tip: "Type-safe component development" },
                { name: "AngularJS", tip: "Enterprise frontend framework" },
                { name: "Tailwind CSS", tip: "Utility-first styling, responsive design" },
                { name: "Shadcn UI", tip: "Modern, accessible component library" },
                { name: "HTML & CSS", tip: "Semantic markup, responsive web design" },
            ],
        },
        {
            label: "Databases & ORM",
            count: 5,
            color: "coral" as const,
            icon: <Database className="h-5 w-5" />,
            skills: [
                { name: "PostgreSQL", tip: "Primary database — indexing, optimization expert" },
                { name: "MongoDB", tip: "NoSQL, document databases, aggregation" },
                { name: "Hibernate", tip: "JPA implementation, entity management" },
                { name: "Prisma", tip: "Type-safe database client, schema migrations" },
                { name: "Flyway", tip: "Database version control, automated migrations" },
            ],
        },
        {
            label: "DevOps & Cloud",
            count: 6,
            color: "blue" as const,
            icon: <Cloud className="h-5 w-5" />,
            skills: [
                { name: "Docker", tip: "Containerization, compose, multi-stage builds" },
                { name: "AWS", tip: "EC2, S3, RDS, Lambda, cloud-native deployments" },
                { name: "Git & GitHub", tip: "Version control, collaboration, workflows" },
                { name: "Linux", tip: "Red Hat certified, system administration, shell scripting" },
                { name: "CI/CD", tip: "Automated testing, deployment pipelines" },
                { name: "Kubernetes", tip: "Container orchestration — actively learning" },
            ],
        },
        {
            label: "AI & Advanced",
            count: 7,
            color: "green" as const,
            icon: <Brain className="h-5 w-5" />,
            skills: [
                { name: "Multi-Agent AI", tip: "Sequential pipeline architectures, autonomous agents" },
                { name: "Spring AI", tip: "AI integration with Spring Boot applications" },
                { name: "RAG", tip: "Retrieval-Augmented Generation for context-aware AI" },
                { name: "Machine Learning", tip: "Scikit-learn, Pandas, NumPy, model training" },
                { name: "Data Structures", tip: "Advanced algorithms, optimization techniques" },
                { name: "Cryptography", tip: "AES-GCM, Argon2, zero-knowledge architecture" },
                { name: "JWT & RBAC", tip: "Secure authentication, role-based authorization" },
            ],
        },
    ],

    projects: {
        featured: {
            tag: "Featured Project",
            repoName: "resumeagent",
            title: "ResumeAgent",
            desc: "AI-driven resume optimization platform using multi-agent architecture with sequential pipeline processing. Generates ATS-optimized resumes from structured JSON data with zero hallucinations, subscription quotas, and version control.",
            badges: [
                "Java",
                "Spring Boot",
                "Spring AI",
                "Next.js",
                "PostgreSQL",
                "TypeScript",
                "Shadcn UI",
                "Tailwind CSS",
                "JWT & RBAC",
                "Multi-Agent AI",
                "OpenRouter",
                "Docker",
                "CI / CD",
            ],
            metrics: [
                { value: "5", label: "AI Agents" },
                { value: "90%", label: "Accuracy" },
                { value: "DOCX", label: "Editable" },
            ],
            liveUrl: "https://github.com/mohammadumar-dev/resumeagent",
            githubUrl: "https://github.com/mohammadumar-dev/resumeagent",
        },
        items: [
            {
                category: "Healthcare Tech",
                repoName: "pathlab",
                title: "PathLab",
                desc: "Full-stack Laboratory Information Management System automating workflows from test booking to result generation with multi-status sample tracking, RBAC, and audit logging.",
                badges: [
                    "Java",
                    "Spring Boot",
                    "React",
                    "Vite",
                    "TypeScript",
                    "PostgreSQL",
                    "Freemarker",
                    "JWT & RBAC",
                    "Tailwind CSS",
                    "Shadcn UI",
                    "Docker",
                    "CI / CD",
                    "PDF",
                ],
                accent: "blue" as const,
                url: "https://github.com/mohammadumar-dev/pathlab",
            },
            {
                category: "E-Commerce Platform",
                repoName: "carventory",
                title: "Carventory",
                desc: "Automotive inventory management platform with Spring Boot backend, React dashboard, and Next.js marketplace. Features multi-tenancy architecture and secure cloud storage.",
                badges: [
                    "Java",
                    "Spring Boot",
                    "React",
                    "Vite",
                    "Next.js",
                    "TypeScript",
                    "PostgreSQL",
                    "Tailwind CSS",
                    "Shadcn UI",
                    "JWT & RBAC",
                    "FreeMarker",
                    "Docker",
                    "CI / CD",
                    "Caching",
                    "Multi-tenancy",
                    "Cloudinary",
                    "PDF",
                ],
                accent: "green" as const,
                url: "https://github.com/mohammadumar-dev/carventory",
            },
            {
                category: "Security Tool",
                repoName: "passkeys-cli",
                title: "Passkeys CLI",
                desc: "Self-hosted password manager with zero-knowledge architecture using Argon2 hashing and AES-256-GCM encryption. Cross-platform support for Linux, Windows, MacOS, and Android.",
                badges: ["Python", "PostgreSQL", "AES-GCM", "Argon2", "CLI"],
                accent: "coral" as const,
                url: "https://github.com/mohammadumar-dev/passkeys-cli",
            },
            {
                category: "Browser Extension",
                repoName: "dwui-new-tab",
                title: "DWUI - New Tab",
                desc: "Privacy-first browser extension with glassmorphism design, WebGL Aurora background, and customizable shortcuts. Available on Chrome Web Store and Edge Add-ons.",
                badges: [
                    "React",
                    "TypeScript",
                    "WebGL",
                    "Vite",
                    "Shadcn UI",
                    "Tailwind CSS",
                    "Chrome Extension",
                    "Edge Add-ons",
                ],
                accent: "blue" as const,
                url: "https://github.com/mohammadumar-dev/dwui-new-tab",
            },
        ],
        allReposUrl: "https://github.com/mohammadumar-dev?tab=repositories",
    },

    experience: [
        {
            company: "Data Innovation Technologies",
            url: "https://datainn.io",
            role: "Full Stack Software Developer",
            date: "Apr 2025 – Present",
            desc: "Engineering enterprise AI applications for the fintech and healthcare sectors. Architecting scalable multi-tenant systems, RESTful APIs, and intelligent automation solutions.",
            achievement: "Delivered production APIs that improved system performance.",
            isCurrent: true,
            tags: ["Spring Boot", "React", "Spring AI", "PostgreSQL", "Docker"],
        },
        {
            company: "Data Innovation Technologies",
            url: "https://datainn.io",
            role: "Software Development Intern",
            date: "Aug 2024 – Apr 2025",
            desc: "Developed full-stack applications for financial analytics and healthcare management. Implemented secure REST APIs, built responsive frontends, and collaborated with the engineering team.",
            achievement:
                "Delivered enterprise-grade applications in a collaborative development environment.",
            isCurrent: false,
            tags: ["Java", "Spring Boot", "TypeScript", "PostgreSQL", "CI/CD"],
        },
        {
            company: "Savitribai Phule Pune University",
            url: "#",
            role: "B.Sc. in Computer Science",
            date: "2023 – 2026",
            desc: "Studying a comprehensive computer science curriculum covering AI/ML, systems programming, data structures, algorithms, web technologies, AngularJS, Django, and software engineering, while maintaining strong academic performance.",
            achievement: "SGPA: 9.091 | Google Startup School – Prompt to Prototype",
            isCurrent: true,
            tags: ["Java", "Python", "C/C++", "AI/ML", "DSA", "JavaScript"],
        },
    ],

    schema: {
        employer: {
            name: "Data Innovation Technologies",
            url: "https://datainn.io",
        },
        education: {
            name: "Savitribai Phule Pune University",
        },
        knowsAbout: [
            "Spring Boot",
            "React",
            "Next.js",
            "Java",
            "TypeScript",
            "PostgreSQL",
            "Multi-Agent AI",
            "Spring AI",
            "Machine Learning",
            "Full Stack Development",
            "Enterprise Applications",
            "Microservices",
            "RESTful APIs",
        ],
    },

    certifications: [
        "Red Hat Application Development I: Programming in Java EE",
        "Linux Fundamentals 9.1",
        "Git Training - IIT Bombay",
    ],

    seoKeywords: [
        // Name & Brand
        "Mohammad",
        "Muhammad",
        "Muhammed",
        "Umar",
        "Omar",
        "Shaikh",
        "Mohammad Umar",
        "Mohammad Umar Shaikh",
        "Shaikh Mohammad Umar",
        "mohammadumar-dev",
        "mohammadumar",
        "mohammadumarshaikh",

        // Role & Expertise
        "Full Stack Developer",
        "Full Stack Software Engineer",
        "Enterprise Java Developer",
        "Spring Boot Developer",
        "React Developer",
        "AI Engineer",
        "Backend Developer",
        "Frontend Developer",
        "Developer",
        "Software Engineer",
        "Software",
        "Software Development Engineer",

        // Technologies - Backend
        "Spring Boot Expert",
        "Spring",
        "Spring Boot",
        "Spring AI",
        "Spring AI Developer",
        "Java Developer",
        "Java 21 Developer",
        "FastAPI Developer",
        "RESTful API Developer",
        "Microservices Architecture",
        "PostgreSQL Expert",

        // Technologies - Frontend
        "React Developer",
        "Next.js Developer",
        "TypeScript Developer",
        "Modern Web Development",
        "Responsive UI Developer",

        // AI & Specialized
        "Multi-Agent AI",
        "Spring AI",
        "RAG Implementation",
        "AI Integration",
        "Machine Learning Developer",
        "Generative AI",

        // Domains
        "Fintech Developer",
        "Healthcare Software Developer",
        "SaaS Application Developer",
        "Enterprise Applications",

        // Certifications
        "Google Startup School",
        "Google Startup School - Prompt to Prototype",

        // Location
        "Software Developer Pune",
        "Pune",
        "Ganesh Peth",
        "Camp, Pune",
        "Kondhwa",
        "Full Stack Developer India",
        "Pune Developer",
        "Maharashtra",

        // Projects
        "ResumeAgent",
        "PathLab LIMS",
        "Carventory",
        "AI Resume Optimizer",

        // Skills
        "Docker",
        "AWS Developer",
        "CI/CD",
        "Database Optimization",
        "HIPAA Compliance",
        "Security Engineer",

        // Academic
        "Computer Science Student",
        "Savitribai Phule Pune University",
        "Abeda Inamdar Senior College",
        "Poona College",

        // Portfolio
        "Developer Portfolio",
        "Software Engineer Portfolio",
        "Tech Portfolio 2026",
    ],
};
