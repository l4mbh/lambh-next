export const portfolioData = {
    personal: {
        name: "Bui Hoang Lam",
        role: "Fullstack Engineer",
        email: "lambh.1998@gmail.com",
        location: "Ho Chi Minh City, Vietnam",
        about: "A software engineer focused on crafting clean, minimalist, and highly functional web experiences. Strong foundation in computer science principles with a passion for building scalable and maintainable software. Experience in both frontend and backend development for DMS, management systems, and other web applications.",
    },
    experience: [
        {
            id: 1,
            company: "AI Dynamix",
            role: "Fullstack Developer",
            period: "12/2024 - 02/2025",
            description: " An app to manage customer information, sim information, ... for Viettel sim selling kiosks.",
            technologies: ["React", "React Admin", "TypeScript", "Tailwind CSS", "Ant Design", "Node.js", "Express", "PostgreSQL", "RESTful APIs", "JWT"],
        },
        {
            id: 2,
            company: "AI Dynamix",
            role: "Fullstack Developer",
            period: "03/2025 - 09/2025",
            // Xây dựng hệ thống quản lý nhiêfu cấp từ tổng công ty đến nhầ phân phối, đến đại lý, các saleman và đến cửa hàng. Quản lý kho, quản lý sản phẩm, quản lý các chương trình khuyến mãi, ...
            description: "Built a multi-level management system from the parent company to distributors, agents, salesmen, and stores. Manage inventory, products, promotions, ...",
            technologies: ["Node.js", "Express", "PostgreSQL", "React", "NestJS", "TypeScript", "Tailwind CSS", "Ant Design", "RESTful APIs", "JWT", "Bcrypt"],
        },
    ],
    education: [
        {
            id: 1,
            institution: "FPT University",
            degree: "Bachelor of Information Assurance",
            period: "2018 - 2024",
        },
        {
            id: 2,
            institution: "FUNix University",
            degree: "Chứng chỉ doanh nghiệp",
            period: "2024 - 2025",
        }
    ],
    activities: [
        {
            id: 1,
            title: "Internship Mentor",
            period: "06/2026 - 08/2026",
            description: "Mentor for interns at edtronaut.ai . Guiding interns through the software development lifecycle, code reviews, and best practices to build a real product.",
            data: "https://edtronaut.ai/"
        }
    ],
    skills: {
        frontend: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Redux/Zustand"],
        backend: ["Node.js", "Express", "PostgreSQL", "Prisma", "RESTful APIs"],
        tools: ["Git", "Docker", "Figma", "Vercel"],
    }
};
