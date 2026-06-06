export type ProjectLink = { label: string; url: string };
export type ProjectScreenshot = { src: string; label: string };

export type Project = {
    id: string;
    order: number;
    slug: string;
    title: string;
    category: string;
    description: string;
    image: string;
    tech: string[];
    links: ProjectLink[];
    features: string[];
    screenshots: ProjectScreenshot[];
    screenshotLayout?: "mobile" | "desktop";
};

export const projects: Project[] = [
    {
        id: "shopease",
        order: 1,
        slug: "shopease",
        title: "ShopEase",
        category: "Flutter E-Commerce App",
        description:
            "Flutter mini e-commerce app with a clean flow (splash → login → browse → details → cart) and real products from the FakeStore API.",
        image: "/images/projects/shopease/Splash Screen.jpg",
        tech: [
            "Flutter",
            "Dart",
            "provider",
            "http",
            "cached_network_image",
            "shared_preferences",
        ],
        links: [
            { label: "GitHub", url: "https://github.com/GauravDawange/E-Commerce-App" },
            { label: "Drive Link", url: "https://drive.google.com/file/d/1LgDZIQr4o6xy3kh3SJk7NhNPp_Pmk04E/view?usp=drive_link" },
        ],
        features: [
            "Splash + login UI",
            "Browse products & categories",
            "Search + category filter (client-side)",
            "Product detail + cart (qty + totals)",
            "Network images with caching",
        ],
        screenshotLayout: "mobile",
        screenshots: [
            { src: "/images/projects/shopease/Splash Screen.jpg", label: "Splash" },
            { src: "/images/projects/shopease/Login Screen.jpg", label: "Login" },
            { src: "/images/projects/shopease/Home Screen1.jpg", label: "Home" },
            { src: "/images/projects/shopease/Home Screen2.jpg", label: "Browse" },
            { src: "/images/projects/shopease/Card Screen.jpg", label: "Cart" },
        ],
    },
    {
        id: "employee-tracking",
        order: 2,
        slug: "employee-tracking-system",
        title: "Employee Tracking System",
        category: "Flutter + ASP.NET Core (.NET 8) + MSSQL",
        description:
            "Attendance tracking with JWT login, GPS capture, history, and a clean backend architecture backed by SQL Server.",
        image: "/images/projects/employee-tracking/Splash Screen.jpg",
        tech: ["Flutter", "ASP.NET Core", ".NET 8", "SQL Server", "EF Core", "JWT"],
        links: [
            {
                label: "GitHub",
                url: "https://github.com/GauravDawange/Employee-Tracking-System",
            },
            {
                label: "Drive Link",
                url: "https://drive.google.com/file/d/1gw7mmFBP6LkkMMjZ1XQbLGvUHXH700f1/view?usp=drive_link",
            },
        ],
        features: [
            "JWT authentication",
            "Attendance capture with GPS",
            "SQL Server storage via EF Core",
            "Repository pattern + clean architecture",
            "Attendance history",
        ],
        screenshotLayout: "mobile",
        screenshots: [
            { src: "/images/projects/employee-tracking/Splash Screen.jpg", label: "Splash" },
            { src: "/images/projects/employee-tracking/Login Screen.jpg", label: "Login" },
            { src: "/images/projects/employee-tracking/Home Screen.jpg", label: "Dashboard" },
        ],
    },
    {
        id: "drone-survey",
        order: 3,
        slug: "drone-survey-management-system",
        title: "Drone Survey Management System",
        category: "React + Firebase Platform",
        description:
            "Web platform for planning and monitoring drone survey missions with fleet visibility, maps, and reporting.",
        image: "/images/projects/drone-survey/home screen.png",
        tech: ["React", "Vite", "Tailwind CSS", "Zustand", "Firebase", "Google Maps"],
        links: [
            {
                label: "Live",
                url: "https://drone-survey-management-system-zeta.vercel.app",
            },
            {
                label: "GitHub",
                url: "https://github.com/GauravDawange/drone-survey-management-system",
            },
        ],
        features: [
            "Mission planning",
            "Fleet status overview",
            "Map-based monitoring",
            "Reports & analytics",
        ],
        screenshotLayout: "desktop",
        screenshots: [
            { src: "/images/projects/drone-survey/home screen.png", label: "Dashboard" },
            { src: "/images/projects/drone-survey/mission planning.png", label: "Mission Planning" },
            { src: "/images/projects/drone-survey/fleet screen.png", label: "Fleet Status" },
            { src: "/images/projects/drone-survey/analytics screen.png", label: "Analytics Overview" },
            { src: "/images/projects/drone-survey/analytics screen2.png", label: "Analytics Details" },
            { src: "/images/projects/drone-survey/sing in screen.png", label: "Sign In" },
        ],
    },
    {
        id: "market-research-agent",
        order: 4,
        slug: "intelligent-market-research-agent",
        title: "Intelligent Market Research Agent",
        category: "Next.js + FastAPI + CrewAI",
        description:
            "Full-stack AI research app that generates market reports using CrewAI agents with Gemini + Tavily search.",
        image: "/images/projects/market-research-agent/home screen1.png",
        tech: ["Next.js", "FastAPI", "Python", "CrewAI", "Gemini", "Tavily"],
        links: [
            {
                label: "GitHub",
                url: "https://github.com/GauravDawange/Intelligent-Market-Research-Agent",
            },
        ],
        features: ["Multi-agent research workflow", "Report generation", "FastAPI backend + modern UI"],
        screenshotLayout: "desktop",
        screenshots: [
            { src: "/images/projects/market-research-agent/home screen1.png", label: "Research Dashboard" },
            { src: "/images/projects/market-research-agent/home screen2.png", label: "Report Generation" },
            { src: "/images/projects/market-research-agent/Sing in screen.png", label: "Sign In" },
        ],
    },
    {
        id: "bloodlink",
        order: 5,
        slug: "bloodlink",
        title: "BloodLink",
        category: "PHP + MySQL Web App",
        description:
            "Donor registration and search portal with authentication and a responsive UI.",
        image: "/images/projects/bloodlink/Home Screen1.png",
        tech: ["PHP", "MySQL", "Bootstrap", "HTML", "CSS", "JavaScript"],
        links: [{ label: "GitHub", url: "https://github.com/GauravDawange/Blood-Link" }],
        features: ["Signup + login", "Donor registration", "Search by blood group + city"],
        screenshotLayout: "desktop",
        screenshots: [
            { src: "/images/projects/bloodlink/Home Screen1.png", label: "Home Screen 1" },
            { src: "/images/projects/bloodlink/Home Screen2.png", label: "Home Screen 2" },
            { src: "/images/projects/bloodlink/Home Screen3.png", label: "Home Screen 3" },
            { src: "/images/projects/bloodlink/Doner Registration Screen.png", label: "Donor Registration" },
            { src: "/images/projects/bloodlink/Find Doner Screen.png", label: "Find Donor" },
            { src: "/images/projects/bloodlink/Login Screen.png", label: "Login" },
            { src: "/images/projects/bloodlink/Sing Up Screen.png", label: "Sign Up" },
        ],
    },
];

projects.sort((a, b) => a.order - b.order);

export const projectsBySlug: Record<string, Project> = Object.fromEntries(
    projects.map((p) => [p.slug, p]),
);
