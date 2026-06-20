// 50 high-volume job roles with curated SEO data
// Each role generates 2 pages: /resume-for-[slug] + /cover-letter-for-[slug]

export const JOB_ROLES = [
  // ============ TECH (15 roles) ============
  {
    slug: "software-engineer",
    title: "Software Engineer",
    category: "Technology",
    salary: { us: "$95k-$165k", ng: "₦4M-₦15M", global: "$70k-$140k" },
    overview: "Software engineers design, develop, and maintain software systems that power modern businesses. They write code, debug applications, and collaborate with cross-functional teams to ship high-quality products.",
    skills: ["JavaScript", "Python", "Java", "React", "Node.js", "Git", "REST APIs", "SQL", "Data Structures", "Algorithms", "Problem Solving", "System Design", "Code Review", "Agile/Scrum", "CI/CD"],
    exampleBullets: [
      "Architected and shipped a microservices platform serving 2M+ daily active users with 99.9% uptime",
      "Reduced API response time by 60% by implementing Redis caching and database query optimization",
      "Led migration from monolithic architecture to microservices, improving deployment frequency by 4x",
      "Mentored 5 junior engineers through pair programming and code review sessions",
      "Built CI/CD pipelines with GitHub Actions, reducing deployment time from 45 minutes to 8 minutes"
    ],
    commonMistakes: [
      "Listing every programming language you've ever touched instead of focusing on expert-level skills",
      "Using vague terms like 'worked on' instead of quantified achievements like 'shipped' or 'led'",
      "Forgetting to mention scale (users, requests, data volume) which signals impact",
      "Including outdated technologies that suggest you haven't kept up with modern stacks"
    ],
    keywords: ["software engineer resume", "developer resume", "programmer resume", "software developer cv", "engineer resume template"],
  },
  {
    slug: "frontend-developer",
    title: "Frontend Developer",
    category: "Technology",
    salary: { us: "$85k-$150k", ng: "₦3.5M-₦12M", global: "$60k-$120k" },
    overview: "Frontend developers craft the user-facing experience of web applications. They translate designs into responsive, accessible interfaces using HTML, CSS, JavaScript, and modern frameworks.",
    skills: ["React", "Next.js", "TypeScript", "JavaScript", "HTML5", "CSS3", "Tailwind CSS", "Vue.js", "Webpack", "Vite", "Responsive Design", "Web Accessibility (WCAG)", "Performance Optimization", "Cross-browser Testing", "Figma"],
    exampleBullets: [
      "Built responsive React components used across 12 production apps, reducing development time by 40%",
      "Improved Lighthouse performance score from 62 to 98 by implementing code splitting and lazy loading",
      "Migrated legacy jQuery codebase to React/TypeScript, reducing bug reports by 65%",
      "Designed and implemented a design system with Storybook used by 30+ developers",
      "Achieved WCAG 2.1 AA accessibility compliance across all customer-facing pages"
    ],
    commonMistakes: [
      "Not showcasing visual portfolio with live links or GitHub projects",
      "Omitting modern performance metrics (Core Web Vitals, Lighthouse scores)",
      "Forgetting to mention accessibility experience which top companies prioritize",
      "Listing CSS as a skill without mentioning modern approaches (Tailwind, CSS-in-JS)"
    ],
    keywords: ["frontend developer resume", "react developer resume", "javascript developer resume", "ui developer cv"],
  },
  {
    slug: "backend-developer",
    title: "Backend Developer",
    category: "Technology",
    salary: { us: "$95k-$170k", ng: "₦4M-₦14M", global: "$70k-$135k" },
    overview: "Backend developers build the server-side logic, APIs, and databases that power web and mobile applications. They focus on scalability, security, and performance.",
    skills: ["Node.js", "Python", "Java", "Go", "REST APIs", "GraphQL", "PostgreSQL", "MongoDB", "Redis", "Docker", "Kubernetes", "AWS", "Microservices", "System Design", "Database Optimization"],
    exampleBullets: [
      "Designed and built REST API handling 50K requests per minute with sub-100ms latency",
      "Implemented JWT authentication system serving 500K+ users across web and mobile platforms",
      "Reduced database query times by 80% through indexing and query optimization",
      "Built event-driven architecture using RabbitMQ to decouple services and improve reliability",
      "Established monitoring with Datadog, reducing MTTR (mean time to recovery) from 2 hours to 15 minutes"
    ],
    commonMistakes: [
      "Not mentioning specific load/scale you've handled (requests/sec, data volume)",
      "Forgetting to highlight database design and optimization experience",
      "Omitting cloud platform experience (AWS, GCP, Azure) which is now standard",
      "Listing 'backend development' as a skill without specific frameworks"
    ],
    keywords: ["backend developer resume", "api developer resume", "node.js developer resume", "server-side developer cv"],
  },
  {
    slug: "full-stack-developer",
    title: "Full Stack Developer",
    category: "Technology",
    salary: { us: "$90k-$160k", ng: "₦3.5M-₦13M", global: "$65k-$130k" },
    overview: "Full stack developers work across the entire technology stack, building both client-side interfaces and server-side logic. They're versatile engineers who can own features end-to-end.",
    skills: ["React", "Node.js", "TypeScript", "Next.js", "PostgreSQL", "MongoDB", "REST APIs", "GraphQL", "Docker", "AWS", "Git", "Tailwind CSS", "Authentication", "Testing", "System Design"],
    exampleBullets: [
      "Built end-to-end SaaS platform with React frontend and Node.js backend serving 10K MRR",
      "Owned product features from database schema to UI, shipping 8 major features per quarter",
      "Reduced infrastructure costs by 40% by migrating from Heroku to AWS with optimized resource allocation",
      "Implemented Stripe payment integration processing $200K+ monthly transactions",
      "Built real-time chat system with Socket.io supporting 5K concurrent connections"
    ],
    commonMistakes: [
      "Being too generalist without showcasing depth in any single area",
      "Not demonstrating ability to make architectural decisions independently",
      "Listing too many technologies without proven expertise in core stack",
      "Forgetting to highlight end-to-end project ownership"
    ],
    keywords: ["full stack developer resume", "fullstack engineer resume", "MERN stack developer cv"],
  },
  {
    slug: "data-scientist",
    title: "Data Scientist",
    category: "Technology",
    salary: { us: "$110k-$180k", ng: "₦4.5M-₦16M", global: "$80k-$150k" },
    overview: "Data scientists analyze complex data to extract insights that drive business decisions. They combine statistics, programming, and domain expertise to build predictive models and uncover patterns.",
    skills: ["Python", "R", "SQL", "Machine Learning", "Deep Learning", "TensorFlow", "PyTorch", "Pandas", "NumPy", "Scikit-learn", "Tableau", "Power BI", "A/B Testing", "Statistical Analysis", "Data Visualization"],
    exampleBullets: [
      "Built ML model predicting customer churn with 92% accuracy, saving $2M annually in retention costs",
      "Designed and analyzed 50+ A/B tests, identifying optimizations that increased conversion by 28%",
      "Created executive dashboards in Tableau used by C-suite for weekly business reviews",
      "Developed recommendation engine using collaborative filtering, increasing average order value by 18%",
      "Reduced data processing time by 75% by optimizing SQL queries and migrating to Spark"
    ],
    commonMistakes: [
      "Listing models without business impact (accuracy alone doesn't matter to hiring managers)",
      "Not quantifying the business value of your analysis (revenue, cost savings, decisions made)",
      "Including only academic projects without real-world applications",
      "Forgetting to mention experience with cloud ML platforms (SageMaker, Vertex AI)"
    ],
    keywords: ["data scientist resume", "ML engineer resume", "data science cv", "machine learning resume"],
  },
  {
    slug: "data-analyst",
    title: "Data Analyst",
    category: "Technology",
    salary: { us: "$65k-$110k", ng: "₦2.5M-₦8M", global: "$45k-$85k" },
    overview: "Data analysts collect, process, and analyze data to help organizations make better decisions. They build reports, dashboards, and present findings to stakeholders.",
    skills: ["SQL", "Excel", "Python", "R", "Tableau", "Power BI", "Google Analytics", "Data Visualization", "A/B Testing", "ETL", "Statistical Analysis", "Looker", "BigQuery", "DAX", "Pivot Tables"],
    exampleBullets: [
      "Built 20+ executive dashboards in Tableau used daily by leadership team for decision making",
      "Identified $500K cost savings opportunity through deep-dive analysis of operational data",
      "Automated weekly reporting process, saving 15 hours/week of manual work",
      "Conducted cohort analysis revealing 40% drop-off point in user onboarding flow",
      "Wrote complex SQL queries processing 100M+ rows to support marketing attribution analysis"
    ],
    commonMistakes: [
      "Listing Excel as a primary skill without mentioning advanced features (VLOOKUP, Pivot Tables, VBA)",
      "Not showcasing actual dashboard examples or visualizations",
      "Forgetting to mention business outcomes from your analysis",
      "Omitting SQL skill which is essential for most data analyst roles"
    ],
    keywords: ["data analyst resume", "business analyst cv", "analytics resume", "sql analyst resume"],
  },
  {
    slug: "devops-engineer",
    title: "DevOps Engineer",
    category: "Technology",
    salary: { us: "$110k-$175k", ng: "₦5M-₦15M", global: "$80k-$140k" },
    overview: "DevOps engineers bridge development and operations, automating infrastructure, deployments, and monitoring to enable fast, reliable software delivery.",
    skills: ["AWS", "Docker", "Kubernetes", "Terraform", "Jenkins", "GitHub Actions", "Linux", "Bash", "Python", "Ansible", "Prometheus", "Grafana", "CI/CD", "Monitoring", "Security"],
    exampleBullets: [
      "Reduced deployment time from 2 hours to 8 minutes by implementing automated CI/CD pipelines",
      "Migrated 50+ microservices to Kubernetes, improving scalability and reducing infrastructure costs by 35%",
      "Built infrastructure-as-code with Terraform managing 200+ AWS resources across 3 environments",
      "Achieved 99.99% uptime by implementing comprehensive monitoring and auto-recovery systems",
      "Established security best practices including secrets management, RBAC, and vulnerability scanning"
    ],
    commonMistakes: [
      "Not quantifying improvements in deployment frequency, MTTR, or uptime",
      "Listing tools without showing how you architected solutions with them",
      "Forgetting to highlight cost optimization wins",
      "Omitting security and compliance experience"
    ],
    keywords: ["devops engineer resume", "site reliability engineer resume", "cloud engineer cv", "sre resume"],
  },
  {
    slug: "cloud-engineer",
    title: "Cloud Engineer",
    category: "Technology",
    salary: { us: "$105k-$170k", ng: "₦4.5M-₦14M", global: "$75k-$135k" },
    overview: "Cloud engineers design, build, and maintain cloud infrastructure on AWS, Azure, or GCP. They ensure systems are scalable, secure, and cost-effective.",
    skills: ["AWS", "Azure", "GCP", "Terraform", "CloudFormation", "Kubernetes", "Docker", "Python", "Linux", "Networking", "Security", "Cost Optimization", "Serverless", "Lambda", "IAM"],
    exampleBullets: [
      "Architected multi-region AWS infrastructure supporting 5M users with 99.99% availability",
      "Reduced cloud costs by 45% through reserved instances, right-sizing, and serverless migration",
      "Implemented zero-trust security model across AWS organization with 50+ accounts",
      "Built disaster recovery system with RTO of 30 minutes and RPO of 5 minutes",
      "Led cloud migration of legacy on-prem systems to AWS, saving $400K annually"
    ],
    commonMistakes: [
      "Not mentioning specific cloud certifications (AWS SAA, Azure AZ-104, GCP ACE)",
      "Listing cloud platforms without architecting experience",
      "Forgetting cost optimization and FinOps experience",
      "Omitting hybrid or multi-cloud experience"
    ],
    keywords: ["cloud engineer resume", "aws engineer resume", "cloud architect cv", "azure engineer resume"],
  },
  {
    slug: "mobile-developer",
    title: "Mobile Developer",
    category: "Technology",
    salary: { us: "$95k-$160k", ng: "₦4M-₦13M", global: "$70k-$125k" },
    overview: "Mobile developers build native and cross-platform applications for iOS and Android. They focus on performance, user experience, and platform-specific best practices.",
    skills: ["Swift", "Kotlin", "React Native", "Flutter", "iOS", "Android", "Xcode", "Android Studio", "REST APIs", "Firebase", "Push Notifications", "App Store Optimization", "UI/UX", "Git", "Agile"],
    exampleBullets: [
      "Built React Native app with 4.8 star rating and 500K+ downloads on App Store and Play Store",
      "Reduced app size by 40% through code splitting and asset optimization",
      "Implemented offline-first architecture supporting 100K+ active users in low-connectivity regions",
      "Launched feature using ARKit increasing engagement by 35% in pilot test",
      "Achieved 0 crashes per 10K sessions through comprehensive testing and crash analytics"
    ],
    commonMistakes: [
      "Not including App Store/Play Store links to published apps",
      "Forgetting to mention specific platform versions and devices tested",
      "Omitting performance metrics (load time, FPS, memory usage)",
      "Not highlighting user ratings and download numbers when available"
    ],
    keywords: ["mobile developer resume", "ios developer resume", "android developer cv", "react native developer resume"],
  },
  {
    slug: "product-manager",
    title: "Product Manager",
    category: "Technology",
    salary: { us: "$110k-$180k", ng: "₦4.5M-₦16M", global: "$85k-$150k" },
    overview: "Product managers define product strategy, prioritize features, and work cross-functionally with engineering, design, and business teams to ship products that delight users.",
    skills: ["Product Strategy", "Roadmap Planning", "User Research", "Data Analysis", "A/B Testing", "Agile/Scrum", "Stakeholder Management", "Jira", "Figma", "SQL", "Wireframing", "Market Research", "OKRs", "Go-to-Market", "Customer Discovery"],
    exampleBullets: [
      "Led product strategy that increased MRR from $500K to $2M in 18 months",
      "Launched mobile feature used by 70% of DAU within 3 months of release",
      "Reduced customer churn by 35% by identifying and prioritizing key UX improvements through user research",
      "Managed product roadmap across 4 engineering teams with 25+ engineers",
      "Conducted 100+ customer interviews informing product direction and feature prioritization"
    ],
    commonMistakes: [
      "Focusing on activities (managed roadmap) instead of outcomes (grew revenue by X%)",
      "Not quantifying impact in business terms (revenue, users, retention)",
      "Listing every Agile ceremony you've attended without strategic impact",
      "Forgetting to highlight cross-functional leadership"
    ],
    keywords: ["product manager resume", "product owner resume", "pm resume template", "product management cv"],
  },
  {
    slug: "ui-ux-designer",
    title: "UI/UX Designer",
    category: "Technology",
    salary: { us: "$80k-$140k", ng: "₦3M-₦11M", global: "$55k-$110k" },
    overview: "UI/UX designers create intuitive, beautiful digital experiences. They research user needs, design wireframes and prototypes, and collaborate with developers to ship pixel-perfect interfaces.",
    skills: ["Figma", "Adobe XD", "Sketch", "Prototyping", "User Research", "Wireframing", "Design Systems", "Usability Testing", "Information Architecture", "Interaction Design", "Visual Design", "HTML/CSS", "Adobe Creative Suite", "Accessibility", "Mobile Design"],
    exampleBullets: [
      "Redesigned checkout flow increasing conversion rate by 32% (validated through A/B test)",
      "Built and maintained design system with 200+ components used across 5 product teams",
      "Conducted 50+ usability tests informing design decisions that reduced support tickets by 40%",
      "Designed mobile app from scratch reaching 100K downloads in first 6 months",
      "Achieved WCAG 2.1 AA accessibility compliance across all customer-facing products"
    ],
    commonMistakes: [
      "Not linking to live portfolio with detailed case studies",
      "Listing tools without showing design process and outcomes",
      "Forgetting to mention collaboration with developers and PMs",
      "Omitting research methodology and data-driven decisions"
    ],
    keywords: ["ui ux designer resume", "ux designer cv", "product designer resume", "interaction designer resume"],
  },
  {
    slug: "qa-engineer",
    title: "QA Engineer",
    category: "Technology",
    salary: { us: "$70k-$120k", ng: "₦2.5M-₦9M", global: "$50k-$95k" },
    overview: "QA engineers ensure software quality through manual and automated testing. They design test plans, identify bugs, and work with developers to deliver reliable products.",
    skills: ["Manual Testing", "Selenium", "Cypress", "Playwright", "API Testing", "Postman", "JIRA", "TestRail", "Performance Testing", "Mobile Testing", "SQL", "JavaScript", "Python", "CI/CD", "Agile"],
    exampleBullets: [
      "Built automated regression test suite reducing manual testing time by 70%",
      "Identified critical security vulnerability before production release, preventing potential data breach",
      "Reduced production bugs by 60% by implementing comprehensive test coverage and CI/CD integration",
      "Created performance testing framework identifying bottlenecks supporting 10x traffic scale",
      "Mentored team of 8 QA engineers on test automation best practices"
    ],
    commonMistakes: [
      "Listing 'manual testing' only without showing automation experience",
      "Not quantifying bug reduction or coverage improvements",
      "Forgetting to mention specific testing frameworks and tools",
      "Omitting CI/CD pipeline experience"
    ],
    keywords: ["qa engineer resume", "test engineer resume", "qa automation resume", "software tester cv"],
  },
  {
    slug: "cybersecurity-analyst",
    title: "Cybersecurity Analyst",
    category: "Technology",
    salary: { us: "$85k-$145k", ng: "₦3.5M-₦12M", global: "$60k-$115k" },
    overview: "Cybersecurity analysts protect organizations from cyber threats. They monitor systems, investigate incidents, and implement security controls to prevent breaches.",
    skills: ["SIEM", "Splunk", "Wireshark", "Penetration Testing", "Incident Response", "Threat Intelligence", "ISO 27001", "SOC 2", "Network Security", "Cloud Security", "Python", "OWASP", "Vulnerability Assessment", "Risk Management", "Security Auditing"],
    exampleBullets: [
      "Detected and contained APT attack within 4 hours, preventing $2M+ in potential damages",
      "Implemented SIEM system reducing security incident response time from days to minutes",
      "Led SOC 2 Type II audit achieving full compliance for $50M revenue SaaS company",
      "Conducted penetration tests on 30+ applications identifying 200+ vulnerabilities",
      "Built security awareness training program reducing phishing click-rate by 75%"
    ],
    commonMistakes: [
      "Not mentioning relevant certifications (CISSP, CEH, Security+, CISM)",
      "Listing security tools without specific use cases and outcomes",
      "Forgetting to highlight compliance experience (SOC 2, ISO, HIPAA, GDPR)",
      "Omitting incident response experience with quantified metrics"
    ],
    keywords: ["cybersecurity analyst resume", "security engineer resume", "infosec resume", "security analyst cv"],
  },
  {
    slug: "machine-learning-engineer",
    title: "Machine Learning Engineer",
    category: "Technology",
    salary: { us: "$120k-$200k", ng: "₦5M-₦18M", global: "$90k-$165k" },
    overview: "Machine learning engineers design, build, and deploy ML models in production. They bridge data science and engineering to ship intelligent systems at scale.",
    skills: ["Python", "TensorFlow", "PyTorch", "Scikit-learn", "MLOps", "Kubernetes", "Docker", "AWS SageMaker", "MLflow", "Airflow", "SQL", "Deep Learning", "NLP", "Computer Vision", "Distributed Training"],
    exampleBullets: [
      "Deployed recommendation model serving 50M requests/day with p99 latency under 100ms",
      "Built ML pipeline reducing model training time from 12 hours to 90 minutes",
      "Improved model accuracy from 78% to 91% through feature engineering and architecture changes",
      "Migrated ML infrastructure to Kubernetes, enabling 10x faster experimentation",
      "Implemented A/B testing framework for ML models proving $5M annual revenue impact"
    ],
    commonMistakes: [
      "Listing models without production deployment experience",
      "Not mentioning MLOps and infrastructure expertise",
      "Forgetting to quantify business impact of models",
      "Omitting experience with model monitoring and drift detection"
    ],
    keywords: ["machine learning engineer resume", "ml engineer cv", "ai engineer resume", "mlops engineer resume"],
  },
  {
    slug: "engineering-manager",
    title: "Engineering Manager",
    category: "Technology",
    salary: { us: "$150k-$230k", ng: "₦6M-₦20M", global: "$110k-$180k" },
    overview: "Engineering managers lead teams of engineers, balancing people management, technical strategy, and execution to deliver high-quality software at scale.",
    skills: ["Team Leadership", "Hiring", "Performance Management", "Technical Strategy", "Agile/Scrum", "OKRs", "Coaching", "1:1 Meetings", "Cross-functional Collaboration", "Roadmap Planning", "Budget Management", "Conflict Resolution", "Architecture Reviews", "Code Reviews", "Mentorship"],
    exampleBullets: [
      "Grew engineering team from 5 to 25 engineers across 3 squads while maintaining 90%+ retention",
      "Led platform team shipping infrastructure used by 50+ engineers, reducing dev velocity bottlenecks by 60%",
      "Achieved 95% on-time delivery rate by implementing structured planning and execution processes",
      "Mentored 4 engineers to senior level and 2 to staff level in 18 months",
      "Improved team eNPS from 35 to 75 through structured 1:1s, career growth plans, and culture initiatives"
    ],
    commonMistakes: [
      "Focusing on individual coding contributions instead of team outcomes",
      "Not quantifying team growth, retention, or delivery metrics",
      "Forgetting to highlight people development (promotions, hires, growth)",
      "Listing technical skills without showing strategic decision-making"
    ],
    keywords: ["engineering manager resume", "tech lead resume", "software development manager cv", "engineering director resume"],
  },

  // ============ BUSINESS / MARKETING (10 roles) ============
  {
    slug: "marketing-manager",
    title: "Marketing Manager",
    category: "Marketing",
    salary: { us: "$75k-$140k", ng: "₦3M-₦10M", global: "$50k-$100k" },
    overview: "Marketing managers develop and execute marketing strategies to grow brand awareness, generate leads, and drive revenue. They oversee campaigns across multiple channels.",
    skills: ["Digital Marketing", "Content Marketing", "SEO", "Google Analytics", "Email Marketing", "Social Media Marketing", "Marketing Automation", "HubSpot", "Salesforce", "A/B Testing", "Brand Strategy", "Campaign Management", "Budget Management", "Marketing Analytics", "Lead Generation"],
    exampleBullets: [
      "Grew organic traffic by 240% in 12 months through SEO-optimized content strategy",
      "Launched email campaign generating $850K in attributed revenue (12x ROI)",
      "Managed $500K annual marketing budget across paid social, search, and content",
      "Built lead generation funnel increasing MQLs by 180% and SQLs by 95%",
      "Led rebrand initiative resulting in 45% increase in brand awareness (measured via surveys)"
    ],
    commonMistakes: [
      "Not quantifying campaign results (ROI, revenue, lead volume)",
      "Listing tools without specific outcomes from using them",
      "Forgetting to mention budget management experience",
      "Omitting analytics and data-driven decision making"
    ],
    keywords: ["marketing manager resume", "digital marketing manager cv", "marketing director resume", "marketing lead resume"],
  },
  {
    slug: "digital-marketer",
    title: "Digital Marketer",
    category: "Marketing",
    salary: { us: "$60k-$110k", ng: "₦2M-₦7M", global: "$40k-$80k" },
    overview: "Digital marketers execute online marketing campaigns across SEO, paid ads, email, and social media to drive traffic, leads, and conversions.",
    skills: ["Google Ads", "Facebook Ads", "SEO", "Google Analytics", "Email Marketing", "Social Media", "Content Marketing", "PPC", "Conversion Optimization", "Marketing Automation", "Mailchimp", "Canva", "WordPress", "Copywriting", "A/B Testing"],
    exampleBullets: [
      "Managed $200K monthly ad spend across Google and Meta generating 5x ROAS",
      "Increased website conversion rate from 1.8% to 4.2% through CRO experiments",
      "Built email list from 0 to 50K subscribers with 28% open rate",
      "Launched TikTok campaign reaching 2M views and 15K product page visits",
      "Reduced customer acquisition cost by 45% through audience optimization"
    ],
    commonMistakes: [
      "Not showing platform certifications (Google Ads, Meta Blueprint, HubSpot)",
      "Listing campaign types without specific results",
      "Forgetting to mention budget size you've managed",
      "Omitting CRO and analytics experience"
    ],
    keywords: ["digital marketer resume", "digital marketing specialist cv", "ppc specialist resume", "social media marketer resume"],
  },
  {
    slug: "sales-representative",
    title: "Sales Representative",
    category: "Sales",
    salary: { us: "$50k-$120k+ commission", ng: "₦1.8M-₦8M", global: "$35k-$80k" },
    overview: "Sales representatives identify prospects, build relationships, and close deals to drive revenue. They're the front line of any growing business.",
    skills: ["Prospecting", "Cold Calling", "Email Outreach", "CRM (Salesforce, HubSpot)", "Negotiation", "Discovery Calls", "Product Demos", "Pipeline Management", "Account Management", "Solution Selling", "Closing", "LinkedIn Sales Navigator", "Communication", "Time Management", "Quota Achievement"],
    exampleBullets: [
      "Exceeded annual quota by 145%, closing $2.3M in new business",
      "Built pipeline of $5M+ through outbound prospecting and referrals",
      "Achieved 35% close rate on qualified opportunities (vs 22% team average)",
      "Ranked #1 sales rep out of 35 for 3 consecutive quarters",
      "Reduced sales cycle from 90 days to 55 days through improved discovery process"
    ],
    commonMistakes: [
      "Not quantifying quota attainment, deal sizes, or close rates",
      "Listing 'sales' as a skill without specific methodologies (MEDDIC, SPIN, Challenger)",
      "Forgetting to mention CRM and sales tool proficiency",
      "Omitting industries and customer types you've sold to"
    ],
    keywords: ["sales representative resume", "sales rep cv", "account executive resume", "sales associate resume"],
  },
  {
    slug: "account-manager",
    title: "Account Manager",
    category: "Sales",
    salary: { us: "$60k-$120k", ng: "₦2.5M-₦8M", global: "$45k-$85k" },
    overview: "Account managers maintain and grow relationships with existing clients. They ensure customer success, identify upsell opportunities, and act as the primary point of contact.",
    skills: ["Account Management", "Customer Success", "Relationship Building", "Upselling", "Cross-selling", "CRM", "Salesforce", "Negotiation", "Contract Renewal", "Customer Retention", "Strategic Planning", "Quarterly Business Reviews", "Stakeholder Management", "Problem Solving", "Communication"],
    exampleBullets: [
      "Managed portfolio of 25 enterprise accounts generating $8M in annual recurring revenue",
      "Achieved 95% client retention rate (vs 78% company average)",
      "Grew existing accounts by 45% through strategic upselling and cross-selling",
      "Led quarterly business reviews with C-suite stakeholders at Fortune 500 clients",
      "Identified and prevented churn risks saving $1.2M in potential lost revenue"
    ],
    commonMistakes: [
      "Not mentioning account size, count, and revenue managed",
      "Listing 'relationship building' without specific outcomes",
      "Forgetting to quantify retention rates and expansion revenue",
      "Omitting strategic planning and QBR experience"
    ],
    keywords: ["account manager resume", "client manager cv", "account executive resume", "customer success manager resume"],
  },
  {
    slug: "business-analyst",
    title: "Business Analyst",
    category: "Business",
    salary: { us: "$70k-$120k", ng: "₦2.5M-₦8M", global: "$50k-$95k" },
    overview: "Business analysts bridge business needs and technical solutions. They gather requirements, analyze processes, and recommend improvements to drive efficiency and growth.",
    skills: ["Requirements Gathering", "Process Mapping", "SQL", "Excel", "Tableau", "Power BI", "Stakeholder Management", "Agile/Scrum", "JIRA", "Confluence", "Data Analysis", "Documentation", "BPMN", "Visio", "User Stories"],
    exampleBullets: [
      "Led process improvement reducing order-to-cash cycle from 30 days to 18 days",
      "Gathered requirements for $5M ERP implementation across 12 departments",
      "Built data dashboards in Tableau saving 20 hours/week in manual reporting",
      "Identified $2M in cost savings through process analysis and automation recommendations",
      "Documented 200+ user stories enabling on-time delivery of digital transformation project"
    ],
    commonMistakes: [
      "Not quantifying process improvements (time saved, cost reduced)",
      "Listing methodologies without showing application",
      "Forgetting to highlight stakeholder management",
      "Omitting specific BA tools and frameworks"
    ],
    keywords: ["business analyst resume", "ba resume", "systems analyst cv", "business systems analyst resume"],
  },
  {
    slug: "project-manager",
    title: "Project Manager",
    category: "Business",
    salary: { us: "$80k-$140k", ng: "₦3M-₦10M", global: "$55k-$105k" },
    overview: "Project managers plan, execute, and deliver projects on time, within budget, and to scope. They coordinate teams, manage stakeholders, and mitigate risks.",
    skills: ["Project Management", "Agile/Scrum", "Waterfall", "PMP", "PRINCE2", "Risk Management", "Budget Management", "Stakeholder Management", "JIRA", "Asana", "Microsoft Project", "Gantt Charts", "Resource Planning", "Communication", "Leadership"],
    exampleBullets: [
      "Delivered $3M enterprise software project on time and 8% under budget",
      "Managed cross-functional team of 25 across engineering, design, and QA",
      "Achieved 98% on-time delivery rate across 12 projects in 2 years",
      "Implemented Agile framework reducing project delivery time by 40%",
      "Mitigated critical risks preventing $500K in potential delays and rework"
    ],
    commonMistakes: [
      "Not mentioning PMP, PRINCE2, or other certifications",
      "Listing 'managed project' without scope, budget, or team size",
      "Forgetting to highlight risk management and mitigation",
      "Omitting methodology (Agile, Waterfall, hybrid)"
    ],
    keywords: ["project manager resume", "pm resume", "program manager cv", "project coordinator resume"],
  },
  {
    slug: "financial-analyst",
    title: "Financial Analyst",
    category: "Finance",
    salary: { us: "$70k-$120k", ng: "₦2.5M-₦8M", global: "$50k-$90k" },
    overview: "Financial analysts evaluate financial data to inform business decisions. They build models, conduct valuations, and provide insights on investments and operations.",
    skills: ["Financial Modeling", "Excel (Advanced)", "Valuation", "DCF Analysis", "Forecasting", "Budgeting", "Variance Analysis", "Power BI", "Tableau", "SQL", "VBA", "Bloomberg Terminal", "GAAP", "IFRS", "M&A Analysis"],
    exampleBullets: [
      "Built financial models supporting $50M acquisition that achieved 22% IRR",
      "Reduced budget variance from 15% to 3% through improved forecasting methodology",
      "Created automated reporting saving 30 hours/month of manual work",
      "Conducted DCF valuations on 25+ companies for investment committee",
      "Identified $2M in cost savings through detailed expense analysis"
    ],
    commonMistakes: [
      "Not showing advanced Excel skills (modeling, VBA, complex formulas)",
      "Listing 'financial analysis' without specific deliverables",
      "Forgetting to mention valuation methodologies",
      "Omitting CFA progress or accounting certifications"
    ],
    keywords: ["financial analyst resume", "finance analyst cv", "investment analyst resume", "fp&a analyst resume"],
  },
  {
    slug: "accountant",
    title: "Accountant",
    category: "Finance",
    salary: { us: "$55k-$95k", ng: "₦1.8M-₦6M", global: "$35k-$70k" },
    overview: "Accountants prepare and examine financial records, ensuring accuracy and compliance with regulations. They handle bookkeeping, tax preparation, and financial reporting.",
    skills: ["GAAP", "IFRS", "QuickBooks", "SAP", "Oracle", "Xero", "Excel", "Tax Preparation", "Audit", "Financial Reporting", "Reconciliation", "Accounts Payable", "Accounts Receivable", "Budgeting", "Payroll"],
    exampleBullets: [
      "Managed full-cycle accounting for $20M revenue company with 50+ employees",
      "Reduced month-end close from 12 days to 5 days through process improvements",
      "Successfully managed external audits with zero material findings for 3 consecutive years",
      "Identified and recovered $150K in vendor overpayments through detailed AP audit",
      "Implemented automated reconciliation reducing errors by 90%"
    ],
    commonMistakes: [
      "Not mentioning CPA, CMA, or other certifications",
      "Listing accounting software without depth of use",
      "Forgetting to mention audit and tax experience",
      "Omitting specific deliverables and process improvements"
    ],
    keywords: ["accountant resume", "staff accountant cv", "senior accountant resume", "cpa resume"],
  },
  {
    slug: "hr-manager",
    title: "HR Manager",
    category: "Business",
    salary: { us: "$75k-$130k", ng: "₦2.5M-₦9M", global: "$50k-$95k" },
    overview: "HR managers oversee human resources functions including recruitment, employee relations, benefits, and compliance. They build culture and develop talent strategies.",
    skills: ["Recruitment", "Employee Relations", "Performance Management", "Benefits Administration", "HRIS", "Workday", "BambooHR", "Compensation", "Compliance", "Employment Law", "Onboarding", "Training & Development", "Diversity & Inclusion", "Conflict Resolution", "Strategic HR"],
    exampleBullets: [
      "Reduced time-to-hire from 45 days to 22 days through revamped recruitment process",
      "Improved employee retention from 72% to 89% through engagement initiatives",
      "Led DEI program increasing diverse hires by 60% across 18 months",
      "Managed benefits negotiation saving company $400K annually",
      "Built performance management system used by 500+ employees"
    ],
    commonMistakes: [
      "Not quantifying HR metrics (retention, time-to-hire, engagement scores)",
      "Listing HR functions without specific outcomes",
      "Forgetting to mention HRIS proficiency",
      "Omitting SHRM, PHR, or other certifications"
    ],
    keywords: ["hr manager resume", "human resources manager cv", "hr business partner resume", "hr director resume"],
  },
  {
    slug: "recruiter",
    title: "Recruiter",
    category: "Business",
    salary: { us: "$55k-$110k", ng: "₦2M-₦7M", global: "$40k-$85k" },
    overview: "Recruiters source, screen, and hire talent for organizations. They build talent pipelines, conduct interviews, and partner with hiring managers.",
    skills: ["Sourcing", "LinkedIn Recruiter", "Boolean Search", "ATS (Greenhouse, Lever)", "Technical Recruiting", "Behavioral Interviewing", "Offer Negotiation", "Candidate Experience", "Talent Pipeline", "Diversity Recruiting", "Recruitment Marketing", "Employer Branding", "Stakeholder Management", "Reporting", "Compliance"],
    exampleBullets: [
      "Hired 120+ engineers and product roles in 18 months for fast-growing startup",
      "Improved offer acceptance rate from 65% to 88% through better candidate experience",
      "Built diverse pipelines resulting in 45% diverse hires (vs 25% industry average)",
      "Reduced cost-per-hire by 35% through direct sourcing vs agency dependence",
      "Sourced senior leadership including VP of Engineering and Head of Product"
    ],
    commonMistakes: [
      "Not mentioning specific number of hires or roles filled",
      "Listing ATS without showing complex search capabilities",
      "Forgetting to highlight DEI recruiting experience",
      "Omitting technical recruiting if relevant"
    ],
    keywords: ["recruiter resume", "technical recruiter cv", "talent acquisition resume", "hr recruiter resume"],
  },

  // ============ HEALTHCARE (8 roles) ============
  {
    slug: "registered-nurse",
    title: "Registered Nurse",
    category: "Healthcare",
    salary: { us: "$70k-$110k", ng: "₦1.8M-₦5M", global: "$30k-$75k" },
    overview: "Registered nurses provide patient care, administer medications, and collaborate with healthcare teams. They work in hospitals, clinics, and various healthcare settings.",
    skills: ["Patient Care", "Medication Administration", "IV Therapy", "Wound Care", "Patient Assessment", "Electronic Health Records (EHR)", "Epic", "Cerner", "Critical Thinking", "ACLS", "BLS", "CPR", "Patient Education", "HIPAA Compliance", "Team Collaboration"],
    exampleBullets: [
      "Provided direct patient care to 25+ patients daily in 40-bed medical-surgical unit",
      "Reduced patient falls by 35% through implementation of evidence-based safety protocols",
      "Achieved 98% patient satisfaction scores through compassionate, patient-centered care",
      "Trained and mentored 8 newly hired nurses on hospital protocols and best practices",
      "Recognized as Nurse of the Year for excellence in critical care nursing"
    ],
    commonMistakes: [
      "Not listing specific certifications (RN license, BLS, ACLS, specialty certs)",
      "Forgetting to mention specific EHR systems used",
      "Listing tasks without showing patient outcomes",
      "Omitting specific patient populations and settings"
    ],
    keywords: ["registered nurse resume", "rn resume", "nurse cv", "nursing resume template"],
  },
  {
    slug: "medical-assistant",
    title: "Medical Assistant",
    category: "Healthcare",
    salary: { us: "$35k-$55k", ng: "₦1.2M-₦3M", global: "$20k-$40k" },
    overview: "Medical assistants perform clinical and administrative tasks in healthcare settings. They assist with patient care, vital signs, and office operations.",
    skills: ["Vital Signs", "Phlebotomy", "EKG", "Injections", "Patient Intake", "Medical Records", "EHR", "Epic", "Cerner", "HIPAA", "Insurance Verification", "Scheduling", "Sterilization", "Medical Terminology", "CPR/BLS"],
    exampleBullets: [
      "Supported physician with 30+ patient visits daily in busy family practice",
      "Increased patient satisfaction scores by 25% through improved intake process",
      "Trained 5 new medical assistants on clinic protocols and EHR system",
      "Reduced patient wait times by 20% through workflow optimization",
      "Maintained 100% accuracy in medication administration and documentation"
    ],
    commonMistakes: [
      "Not mentioning CMA, RMA, or NCMA certification",
      "Listing duties without patient volume or efficiency metrics",
      "Forgetting to highlight specific procedures performed",
      "Omitting EHR system experience"
    ],
    keywords: ["medical assistant resume", "ma resume healthcare", "certified medical assistant cv", "clinical assistant resume"],
  },
  {
    slug: "pharmacist",
    title: "Pharmacist",
    category: "Healthcare",
    salary: { us: "$120k-$155k", ng: "₦3M-₦8M", global: "$50k-$110k" },
    overview: "Pharmacists dispense medications, counsel patients, and ensure safe medication use. They work in retail, hospital, and clinical settings.",
    skills: ["Medication Dispensing", "Patient Counseling", "Drug Interactions", "Immunizations", "Compounding", "Pharmacy Software", "PharmD", "Clinical Pharmacy", "Medication Therapy Management", "Insurance Processing", "Inventory Management", "Sterile Compounding", "HIPAA", "Quality Assurance", "Team Leadership"],
    exampleBullets: [
      "Dispensed 300+ prescriptions daily with 99.9% accuracy in high-volume retail setting",
      "Provided medication therapy management for 50+ chronic disease patients monthly",
      "Administered 1,500+ immunizations during flu season including COVID-19 vaccines",
      "Identified and prevented 15+ serious drug interactions through clinical screening",
      "Led pharmacy team of 6 technicians and interns, achieving operational excellence awards"
    ],
    commonMistakes: [
      "Not mentioning specific state pharmacist license",
      "Forgetting immunization certification and credentials",
      "Listing tasks without patient impact metrics",
      "Omitting specialty certifications (BCPS, BCACP, etc.)"
    ],
    keywords: ["pharmacist resume", "pharmacy manager cv", "clinical pharmacist resume", "retail pharmacist resume"],
  },
  {
    slug: "physical-therapist",
    title: "Physical Therapist",
    category: "Healthcare",
    salary: { us: "$80k-$110k", ng: "₦1.8M-₦5M", global: "$35k-$75k" },
    overview: "Physical therapists help patients recover mobility, manage pain, and prevent injuries through targeted exercises and treatments.",
    skills: ["Manual Therapy", "Therapeutic Exercise", "Patient Assessment", "Treatment Planning", "Orthopedic Rehabilitation", "Neurological Rehabilitation", "Sports Medicine", "Geriatric Care", "EHR", "Patient Education", "DPT", "Modalities", "Documentation", "Insurance Authorization", "Outcome Measures"],
    exampleBullets: [
      "Treated 12-15 patients daily across orthopedic, sports, and post-surgical specialties",
      "Achieved 92% patient satisfaction with 85% of patients meeting functional goals",
      "Developed specialized return-to-sport program for high school and collegiate athletes",
      "Mentored 8 DPT students through clinical rotations as Clinical Instructor",
      "Reduced average treatment duration by 20% through evidence-based protocols"
    ],
    commonMistakes: [
      "Not mentioning specific DPT and state license",
      "Forgetting board certifications (OCS, SCS, NCS, etc.)",
      "Listing treatments without patient outcomes",
      "Omitting specific patient populations treated"
    ],
    keywords: ["physical therapist resume", "pt resume", "dpt resume", "physical therapy cv"],
  },
  {
    slug: "doctor",
    title: "Doctor / Physician",
    category: "Healthcare",
    salary: { us: "$200k-$400k+", ng: "₦5M-₦20M+", global: "$80k-$300k" },
    overview: "Physicians diagnose and treat illnesses, prescribe medications, and provide medical care across specialties.",
    skills: ["Clinical Diagnosis", "Patient Care", "Medical Procedures", "EHR", "Epic", "Treatment Planning", "Patient Communication", "Medical Research", "Evidence-Based Medicine", "Multidisciplinary Collaboration", "Medical Education", "Quality Improvement", "Risk Management", "HIPAA", "Medical Documentation"],
    exampleBullets: [
      "Provided primary care to panel of 2,000+ patients with 96% retention rate",
      "Reduced ER readmissions by 30% through improved care coordination and follow-up",
      "Published 12 peer-reviewed articles in leading medical journals",
      "Led quality improvement initiative reducing hospital-acquired infections by 40%",
      "Mentored 25+ medical students and residents as teaching faculty"
    ],
    commonMistakes: [
      "Not clearly stating board certifications and specialties",
      "Listing too many cases without patient outcome metrics",
      "Forgetting to mention research, publications, or speaking",
      "Omitting hospital affiliations and credentialing"
    ],
    keywords: ["doctor resume", "physician resume", "md cv", "medical doctor resume"],
  },
  {
    slug: "dental-hygienist",
    title: "Dental Hygienist",
    category: "Healthcare",
    salary: { us: "$70k-$95k", ng: "₦1.5M-₦4M", global: "$30k-$60k" },
    overview: "Dental hygienists perform teeth cleanings, take X-rays, and educate patients on oral health. They work alongside dentists in dental practices.",
    skills: ["Teeth Cleaning", "Periodontal Therapy", "X-rays", "Patient Education", "Fluoride Treatment", "Dental Sealants", "Local Anesthesia", "Dental Software (Dentrix, Eaglesoft)", "OSHA Compliance", "HIPAA", "Sterilization", "Oral Cancer Screening", "Charting", "Patient Care", "Team Collaboration"],
    exampleBullets: [
      "Performed 14+ teeth cleanings daily in high-volume family dental practice",
      "Increased treatment plan acceptance by 35% through patient education and rapport building",
      "Maintained 100% compliance with OSHA and infection control standards",
      "Identified 30+ cases of early-stage oral cancer through thorough screenings",
      "Reduced patient anxiety scores by 50% through compassionate, gentle technique"
    ],
    commonMistakes: [
      "Not mentioning specific RDH license and state",
      "Forgetting local anesthesia certification",
      "Listing daily tasks without patient impact",
      "Omitting specific dental software experience"
    ],
    keywords: ["dental hygienist resume", "rdh resume", "dental hygiene cv"],
  },
  {
    slug: "medical-receptionist",
    title: "Medical Receptionist",
    category: "Healthcare",
    salary: { us: "$32k-$48k", ng: "₦1M-₦2.5M", global: "$18k-$35k" },
    overview: "Medical receptionists are the first point of contact in healthcare settings. They manage appointments, patient intake, and administrative tasks.",
    skills: ["Patient Scheduling", "Insurance Verification", "EHR", "Epic", "Cerner", "Athenahealth", "Medical Billing", "HIPAA", "Customer Service", "Multi-line Phone Systems", "Patient Registration", "Medical Terminology", "Co-pay Collection", "Appointment Management", "Records Management"],
    exampleBullets: [
      "Managed scheduling for 5-physician practice serving 8,000+ active patients",
      "Reduced no-show rate from 18% to 6% through automated reminders and confirmation system",
      "Verified insurance for 100+ patients weekly with 99% accuracy",
      "Maintained 4.9/5 patient satisfaction score for front desk experience",
      "Trained 4 new receptionists on practice protocols and EHR system"
    ],
    commonMistakes: [
      "Not mentioning specific EHR systems used",
      "Listing receptionist duties without patient volume",
      "Forgetting medical terminology and insurance knowledge",
      "Omitting customer service achievements"
    ],
    keywords: ["medical receptionist resume", "medical office receptionist cv", "front desk medical resume"],
  },
  {
    slug: "lab-technician",
    title: "Laboratory Technician",
    category: "Healthcare",
    salary: { us: "$45k-$70k", ng: "₦1.2M-₦3.5M", global: "$25k-$50k" },
    overview: "Laboratory technicians perform diagnostic tests, analyze samples, and support clinical decision-making. They work in hospitals, clinics, and research labs.",
    skills: ["Phlebotomy", "Hematology", "Chemistry", "Microbiology", "Urinalysis", "Lab Equipment Operation", "Quality Control", "LIS Systems", "Specimen Processing", "OSHA Compliance", "Sterilization", "CLIA Regulations", "Documentation", "Critical Thinking", "Attention to Detail"],
    exampleBullets: [
      "Processed 200+ specimens daily across hematology, chemistry, and microbiology departments",
      "Maintained 99.8% accuracy in test results with zero critical errors over 24 months",
      "Reduced TAT (turnaround time) by 35% through workflow optimization",
      "Trained 6 new technicians on lab procedures and equipment operation",
      "Led implementation of new LIS system improving efficiency by 40%"
    ],
    commonMistakes: [
      "Not mentioning ASCP, AMT, or state certifications",
      "Forgetting specific instruments and analyzers used",
      "Listing tasks without QC metrics or accuracy rates",
      "Omitting CLIA and CAP compliance experience"
    ],
    keywords: ["lab technician resume", "medical lab technologist cv", "clinical laboratory scientist resume"],
  },

  // ============ EDUCATION (5 roles) ============
  {
    slug: "teacher",
    title: "Teacher",
    category: "Education",
    salary: { us: "$45k-$85k", ng: "₦1.2M-₦4M", global: "$20k-$55k" },
    overview: "Teachers educate and inspire students across various subjects and grade levels. They develop curriculum, assess learning, and foster student growth.",
    skills: ["Curriculum Development", "Lesson Planning", "Classroom Management", "Differentiated Instruction", "Educational Technology", "Google Classroom", "SMART Board", "Student Assessment", "Parent Communication", "IEP", "Common Core Standards", "Cooperative Learning", "Project-Based Learning", "Behavior Management", "Data-Driven Instruction"],
    exampleBullets: [
      "Improved student test scores by 32% over 2 years through differentiated instruction strategies",
      "Designed and implemented STEM curriculum adopted district-wide for 5,000+ students",
      "Achieved 95% parent engagement rate through regular communication and conferences",
      "Mentored 4 student teachers and 2 new educators in classroom best practices",
      "Awarded Teacher of the Year for excellence in instruction and student outcomes"
    ],
    commonMistakes: [
      "Not mentioning specific state teaching license and subject endorsements",
      "Listing teaching duties without student outcome data",
      "Forgetting to highlight technology integration",
      "Omitting professional development and continuing education"
    ],
    keywords: ["teacher resume", "elementary teacher cv", "high school teacher resume", "educator resume"],
  },
  {
    slug: "professor",
    title: "Professor",
    category: "Education",
    salary: { us: "$80k-$160k", ng: "₦3M-₦10M", global: "$35k-$100k" },
    overview: "Professors teach at colleges and universities, conduct research, and publish academic work. They mentor students and contribute to their field.",
    skills: ["Teaching", "Research", "Academic Writing", "Curriculum Development", "Grant Writing", "Peer Review", "Mentorship", "Public Speaking", "LMS (Canvas, Blackboard)", "Statistical Analysis", "Conference Presentations", "Departmental Service", "Dissertation Supervision", "Publication", "Academic Service"],
    exampleBullets: [
      "Published 25 peer-reviewed articles in top-tier journals with 1,200+ citations",
      "Secured $1.5M in research grants from NSF, NIH, and private foundations",
      "Taught 8 undergraduate and graduate courses to 1,500+ students over 6 years",
      "Mentored 12 PhD students to successful dissertation defense and academic placement",
      "Served as Department Chair leading strategic planning and faculty development"
    ],
    commonMistakes: [
      "Not listing publications in proper academic format",
      "Forgetting to mention citation count and impact",
      "Listing courses without enrollment numbers or student outcomes",
      "Omitting grant funding and amounts"
    ],
    keywords: ["professor resume", "academic cv", "university professor resume", "assistant professor cv"],
  },
  {
    slug: "tutor",
    title: "Tutor",
    category: "Education",
    salary: { us: "$30k-$80k", ng: "₦600K-₦3M", global: "$15k-$50k" },
    overview: "Tutors provide one-on-one or small group instruction to help students master specific subjects, prepare for tests, or overcome learning challenges.",
    skills: ["Subject Expertise", "One-on-One Instruction", "Test Preparation (SAT, ACT, GRE)", "Lesson Planning", "Student Assessment", "Online Teaching (Zoom)", "Educational Technology", "Patience", "Communication", "Adaptability", "Math Tutoring", "Reading/Writing Tutoring", "Study Skills", "Time Management", "Goal Setting"],
    exampleBullets: [
      "Tutored 50+ students achieving average SAT score improvement of 180 points",
      "Helped 95% of students improve grades by at least one full letter grade",
      "Specialized in AP Chemistry tutoring with 90% of students earning 4 or 5 on exam",
      "Built tutoring practice from 5 to 30 active students through referrals and reputation",
      "Developed customized learning plans addressing individual student needs and learning styles"
    ],
    commonMistakes: [
      "Not mentioning specific subjects and grade levels",
      "Forgetting to quantify student improvements",
      "Listing only academic credentials without teaching experience",
      "Omitting online tutoring tools and platforms"
    ],
    keywords: ["tutor resume", "math tutor cv", "private tutor resume", "academic tutor resume"],
  },
  {
    slug: "school-counselor",
    title: "School Counselor",
    category: "Education",
    salary: { us: "$55k-$80k", ng: "₦1.5M-₦4M", global: "$30k-$60k" },
    overview: "School counselors support student academic, social, and emotional development. They provide counseling, college guidance, and crisis intervention.",
    skills: ["Individual Counseling", "Group Counseling", "Crisis Intervention", "College Counseling", "Academic Planning", "Mental Health Support", "Career Development", "Conflict Resolution", "IEP/504 Plans", "Student Assessment", "Parent Consultation", "Multicultural Counseling", "Documentation", "Confidentiality", "Collaborative Teaming"],
    exampleBullets: [
      "Provided counseling services to 350+ students in diverse Title I high school",
      "Achieved 92% college acceptance rate for graduating seniors through comprehensive counseling",
      "Reduced student disciplinary incidents by 40% through preventive counseling programs",
      "Coordinated mental health services for 75+ at-risk students with community partners",
      "Developed bullying prevention program adopted by entire 15-school district"
    ],
    commonMistakes: [
      "Not mentioning state counseling license (LPC, LCSW, etc.)",
      "Forgetting professional credentials and certifications",
      "Listing duties without student outcomes",
      "Omitting crisis intervention and ethical practice"
    ],
    keywords: ["school counselor resume", "guidance counselor cv", "high school counselor resume"],
  },
  {
    slug: "instructional-designer",
    title: "Instructional Designer",
    category: "Education",
    salary: { us: "$70k-$110k", ng: "₦2.5M-₦7M", global: "$45k-$85k" },
    overview: "Instructional designers create learning experiences and materials for online and in-person training. They work in corporate, education, and government settings.",
    skills: ["Curriculum Design", "Articulate Storyline", "Adobe Captivate", "Camtasia", "LMS (Moodle, Canvas, D2L)", "ADDIE Model", "SAM Model", "Adult Learning Theory", "Needs Assessment", "Storyboarding", "Video Production", "Assessment Design", "UX for Learning", "Accessibility (WCAG)", "Project Management"],
    exampleBullets: [
      "Designed 40+ e-learning courses for 10,000+ employees across global organization",
      "Reduced training time by 50% while improving knowledge retention by 35%",
      "Built virtual onboarding program reducing new hire ramp time from 90 to 45 days",
      "Led migration of 200+ training programs from in-person to online format",
      "Created accessible learning materials achieving WCAG 2.1 AA compliance"
    ],
    commonMistakes: [
      "Not showing portfolio of actual designed courses",
      "Listing tools without specific deliverables created",
      "Forgetting to mention learning outcomes data",
      "Omitting adult learning theory and instructional models"
    ],
    keywords: ["instructional designer resume", "learning designer cv", "elearning developer resume", "training designer resume"],
  },

  // ============ CREATIVE (6 roles) ============
  {
    slug: "graphic-designer",
    title: "Graphic Designer",
    category: "Creative",
    salary: { us: "$50k-$90k", ng: "₦1.5M-₦5M", global: "$25k-$65k" },
    overview: "Graphic designers create visual content for brands, marketing materials, and digital products. They combine creativity with technical skills to communicate ideas visually.",
    skills: ["Adobe Photoshop", "Adobe Illustrator", "Adobe InDesign", "Figma", "Sketch", "Branding", "Typography", "Color Theory", "Layout Design", "Print Design", "Digital Design", "Logo Design", "Packaging Design", "Marketing Materials", "Brand Guidelines"],
    exampleBullets: [
      "Designed brand identity for 25+ clients including logo, typography, and brand guidelines",
      "Created marketing materials that contributed to 40% increase in campaign engagement",
      "Led rebrand of $50M company including new logo, website, and packaging",
      "Designed packaging that won Gold at Industry Design Awards",
      "Built design system used by team of 10 designers ensuring brand consistency"
    ],
    commonMistakes: [
      "Not linking to portfolio (this is critical for designers)",
      "Listing Adobe Creative Suite without showcasing specific deliverables",
      "Forgetting to mention design awards or recognition",
      "Omitting brand identity and design system experience"
    ],
    keywords: ["graphic designer resume", "graphic design cv", "visual designer resume", "brand designer resume"],
  },
  {
    slug: "content-writer",
    title: "Content Writer",
    category: "Creative",
    salary: { us: "$50k-$90k", ng: "₦1.5M-₦5M", global: "$25k-$60k" },
    overview: "Content writers create engaging written content for websites, blogs, marketing campaigns, and social media to attract and engage audiences.",
    skills: ["SEO Writing", "Blog Writing", "Copywriting", "Content Strategy", "Editing", "WordPress", "Google Analytics", "SEMrush", "Ahrefs", "Keyword Research", "Content Marketing", "Email Marketing", "Social Media Writing", "Long-form Content", "Storytelling"],
    exampleBullets: [
      "Wrote 200+ SEO-optimized blog posts driving 500K monthly organic traffic",
      "Increased website conversion by 45% through compelling landing page copy",
      "Built content strategy that grew email list from 5K to 50K subscribers",
      "Ranked 35+ articles on page 1 of Google for high-competition keywords",
      "Ghostwrote thought leadership pieces published in Forbes, Inc., and Entrepreneur"
    ],
    commonMistakes: [
      "Not linking to writing samples or portfolio",
      "Listing 'writing' without specifying content types and audiences",
      "Forgetting to mention SEO results and traffic growth",
      "Omitting CMS and analytics tool experience"
    ],
    keywords: ["content writer resume", "copywriter resume", "blog writer cv", "content creator resume"],
  },
  {
    slug: "copywriter",
    title: "Copywriter",
    category: "Creative",
    salary: { us: "$55k-$100k", ng: "₦1.5M-₦5M", global: "$30k-$70k" },
    overview: "Copywriters craft persuasive marketing copy for ads, websites, emails, and campaigns to drive action and sales.",
    skills: ["Copywriting", "Direct Response", "Ad Copy", "Email Copy", "Landing Page Copy", "Headlines", "Conversion Copywriting", "Brand Voice", "Storytelling", "Research", "A/B Testing", "Customer Psychology", "Sales Funnels", "Social Media Copy", "Editing"],
    exampleBullets: [
      "Wrote Facebook ad copy generating $2M in attributed revenue at 5x ROAS",
      "Created email sequence that increased trial-to-paid conversion by 40%",
      "Wrote landing page copy boosting conversion rate from 2.1% to 6.8%",
      "Developed brand voice guidelines adopted across all customer touchpoints",
      "A/B tested 100+ headlines identifying patterns that lifted CTR by 30%"
    ],
    commonMistakes: [
      "Not showing actual copy samples with results",
      "Listing 'copywriting' without conversion/revenue metrics",
      "Forgetting to mention specific industries written for",
      "Omitting A/B testing and data-driven approach"
    ],
    keywords: ["copywriter resume", "marketing copywriter cv", "conversion copywriter resume", "ad copywriter resume"],
  },
  {
    slug: "video-editor",
    title: "Video Editor",
    category: "Creative",
    salary: { us: "$50k-$90k", ng: "₦1.5M-₦5M", global: "$25k-$60k" },
    overview: "Video editors transform raw footage into polished, engaging videos for marketing, social media, films, and corporate communications.",
    skills: ["Adobe Premiere Pro", "DaVinci Resolve", "Final Cut Pro", "After Effects", "Color Grading", "Sound Design", "Motion Graphics", "Storytelling", "Video Compression", "YouTube Optimization", "Social Media Video", "Subtitling", "Audio Mixing", "Visual Effects", "Storyboarding"],
    exampleBullets: [
      "Edited 200+ videos that collectively generated 50M+ views on YouTube and social media",
      "Reduced video production turnaround from 7 days to 48 hours through optimized workflow",
      "Produced viral TikTok content reaching 5M+ views and 200K new followers",
      "Edited brand documentary that won Best Short Documentary at regional film festival",
      "Built motion graphics library used across 30+ ongoing client projects"
    ],
    commonMistakes: [
      "Not including reel/portfolio link (essential for video editors)",
      "Listing software without showcasing actual projects",
      "Forgetting to mention view counts and engagement",
      "Omitting specific platforms and formats expertise"
    ],
    keywords: ["video editor resume", "video editing cv", "post production editor resume", "youtube editor resume"],
  },
  {
    slug: "photographer",
    title: "Photographer",
    category: "Creative",
    salary: { us: "$40k-$90k", ng: "₦1M-₦5M", global: "$20k-$60k" },
    overview: "Photographers capture images for events, products, portraits, journalism, or commercial purposes. They work as freelancers or for agencies.",
    skills: ["Photography", "Adobe Lightroom", "Adobe Photoshop", "Studio Lighting", "Natural Light Photography", "Portrait Photography", "Event Photography", "Product Photography", "Wedding Photography", "Photojournalism", "Composition", "Color Correction", "Digital Asset Management", "Client Communication", "Posing"],
    exampleBullets: [
      "Photographed 80+ weddings annually with 100% client satisfaction rate",
      "Built portrait photography business from $0 to $150K annual revenue in 3 years",
      "Photographed commercial campaigns for brands including Nike, Apple, and Patagonia",
      "Won Best Wedding Photographer Award from regional photography association",
      "Featured in National Geographic for documentary photography project"
    ],
    commonMistakes: [
      "Not linking to portfolio website (must-have for photographers)",
      "Listing equipment without showcasing actual work",
      "Forgetting to mention client volume and specialties",
      "Omitting awards, publications, or notable clients"
    ],
    keywords: ["photographer resume", "wedding photographer cv", "commercial photographer resume"],
  },
  {
    slug: "web-designer",
    title: "Web Designer",
    category: "Creative",
    salary: { us: "$55k-$95k", ng: "₦1.8M-₦5M", global: "$30k-$70k" },
    overview: "Web designers create visually appealing, user-friendly websites. They combine graphic design skills with UX principles to build engaging online experiences.",
    skills: ["Figma", "Adobe XD", "Sketch", "Webflow", "WordPress", "HTML", "CSS", "Responsive Design", "UI Design", "UX Principles", "Wireframing", "Prototyping", "Typography", "Color Theory", "Brand Design"],
    exampleBullets: [
      "Designed and launched 40+ websites for clients ranging from startups to Fortune 500",
      "Increased client conversion rates by average of 35% through UX-focused redesigns",
      "Built design system in Figma used by team of 12 designers ensuring consistency",
      "Reduced website bounce rates by 50% through improved layouts and visual hierarchy",
      "Won Awwwards Site of the Day for innovative e-commerce website design"
    ],
    commonMistakes: [
      "Not linking to portfolio or live websites",
      "Listing design tools without showing actual work",
      "Forgetting to mention UX principles and user research",
      "Omitting development handoff and collaboration skills"
    ],
    keywords: ["web designer resume", "website designer cv", "ui designer resume"],
  },

  // ============ SERVICE & TRADES (6 roles) ============
  {
    slug: "customer-service-representative",
    title: "Customer Service Representative",
    category: "Service",
    salary: { us: "$35k-$55k", ng: "₦900K-₦2.5M", global: "$18k-$40k" },
    overview: "Customer service representatives assist customers with inquiries, complaints, and product information across phone, email, chat, and social channels.",
    skills: ["Customer Service", "Communication", "Problem Solving", "Zendesk", "Salesforce Service Cloud", "Intercom", "Live Chat", "Phone Support", "Email Support", "Conflict Resolution", "Active Listening", "Multitasking", "CRM", "Product Knowledge", "Empathy"],
    exampleBullets: [
      "Handled 80+ customer inquiries daily across phone, email, and chat with 98% satisfaction",
      "Resolved escalated issues that reduced churn by 25% for at-risk customers",
      "Maintained first-call resolution rate of 87% (vs 65% team average)",
      "Trained 12 new representatives on systems and customer service best practices",
      "Awarded Top CSR of the Year for performance, attendance, and customer feedback"
    ],
    commonMistakes: [
      "Listing duties without satisfaction or resolution metrics",
      "Forgetting to mention specific CRM and support tools",
      "Omitting language skills if multilingual",
      "Not highlighting conflict resolution examples"
    ],
    keywords: ["customer service resume", "csr resume", "customer support representative cv", "call center agent resume"],
  },
  {
    slug: "retail-associate",
    title: "Retail Associate",
    category: "Service",
    salary: { us: "$25k-$40k", ng: "₦600K-₦2M", global: "$15k-$30k" },
    overview: "Retail associates assist customers, process transactions, manage inventory, and maintain store appearance in retail environments.",
    skills: ["Customer Service", "POS Systems", "Cash Handling", "Inventory Management", "Visual Merchandising", "Product Knowledge", "Sales", "Upselling", "Loss Prevention", "Stockroom Organization", "Returns Processing", "Team Collaboration", "Communication", "Time Management", "Conflict Resolution"],
    exampleBullets: [
      "Achieved 125% of monthly sales targets through proactive customer engagement",
      "Maintained 99.8% cash drawer accuracy over 18 months",
      "Increased average transaction value by 30% through effective upselling",
      "Trained 8 new associates on POS system and store procedures",
      "Recognized as Employee of the Month 4 times for outstanding service"
    ],
    commonMistakes: [
      "Not quantifying sales achievements or customer impact",
      "Listing 'cashier' without mentioning transaction volume",
      "Forgetting to highlight upselling and customer service",
      "Omitting specific brands or retail environments"
    ],
    keywords: ["retail associate resume", "sales associate cv", "store associate resume", "retail sales resume"],
  },
  {
    slug: "restaurant-server",
    title: "Restaurant Server",
    category: "Service",
    salary: { us: "$25k-$45k+ tips", ng: "₦500K-₦1.5M", global: "$15k-$30k" },
    overview: "Restaurant servers provide excellent dining experiences, take orders, serve food and drinks, and manage tables in restaurants of all types.",
    skills: ["Customer Service", "POS Systems (Toast, Square)", "Multi-tasking", "Food and Wine Knowledge", "Menu Memorization", "Order Taking", "Cash Handling", "Suggestive Selling", "Table Management", "Sanitation", "Time Management", "Communication", "Stress Management", "Team Collaboration", "Conflict Resolution"],
    exampleBullets: [
      "Served 100+ guests per shift in high-volume fine dining restaurant",
      "Maintained 4.9/5 average guest rating with consistent 25% tip average",
      "Increased average check by 18% through wine pairing and dessert recommendations",
      "Trained 6 new servers on menu, wine list, and service standards",
      "Recognized as Server of the Quarter for outstanding guest experience"
    ],
    commonMistakes: [
      "Not quantifying covers per shift or sales generated",
      "Forgetting to mention restaurant type (fine dining, casual, etc.)",
      "Omitting wine and beverage knowledge",
      "Not highlighting upselling and add-on sales"
    ],
    keywords: ["server resume", "waiter resume", "restaurant server cv", "waitstaff resume"],
  },
  {
    slug: "electrician",
    title: "Electrician",
    category: "Skilled Trade",
    salary: { us: "$55k-$95k", ng: "₦1.5M-₦5M", global: "$25k-$60k" },
    overview: "Electricians install, repair, and maintain electrical systems in residential, commercial, and industrial settings.",
    skills: ["Electrical Installation", "Wiring", "Conduit Bending", "Circuit Troubleshooting", "NEC (National Electrical Code)", "Blueprint Reading", "Panel Upgrades", "Lighting Installation", "Motor Controls", "PLC Programming", "Safety Compliance", "Hand Tools", "Power Tools", "Multimeter", "OSHA"],
    exampleBullets: [
      "Completed 200+ residential and commercial electrical projects with zero rework",
      "Wired entire new construction commercial building (15,000 sq ft) on time and budget",
      "Diagnosed and repaired complex electrical issues for clients including hospitals and schools",
      "Mentored 5 apprentices through journeyman certification",
      "Maintained perfect safety record with 0 incidents in 8 years of work"
    ],
    commonMistakes: [
      "Not listing journeyman or master electrician license",
      "Forgetting to mention specific NEC code knowledge",
      "Listing tools without project complexity",
      "Omitting safety certifications (OSHA 10/30)"
    ],
    keywords: ["electrician resume", "journeyman electrician cv", "master electrician resume", "electrical technician resume"],
  },
  {
    slug: "plumber",
    title: "Plumber",
    category: "Skilled Trade",
    salary: { us: "$55k-$90k", ng: "₦1.2M-₦4M", global: "$25k-$55k" },
    overview: "Plumbers install and repair water systems, pipes, and fixtures in homes, businesses, and industrial facilities.",
    skills: ["Plumbing Installation", "Pipe Fitting", "Drain Cleaning", "Water Heater Installation", "Leak Detection", "Blueprint Reading", "Plumbing Code", "Soldering", "PEX Installation", "Backflow Prevention", "Hand Tools", "Power Tools", "Customer Service", "Safety Compliance", "Trouble-shooting"],
    exampleBullets: [
      "Completed 300+ residential plumbing jobs with 98% customer satisfaction",
      "Diagnosed and repaired complex commercial systems for hotels, restaurants, and offices",
      "Generated $400K in annual service revenue through quality work and referrals",
      "Trained 4 apprentices to journeyman level over 5 years",
      "Maintained perfect safety record with zero workplace incidents"
    ],
    commonMistakes: [
      "Not mentioning state plumbing license and level (journeyman, master)",
      "Forgetting backflow prevention certification",
      "Listing services without revenue or customer metrics",
      "Omitting specific code knowledge (UPC, IPC)"
    ],
    keywords: ["plumber resume", "plumbing technician cv", "master plumber resume", "plumbing contractor resume"],
  },
  {
    slug: "auto-mechanic",
    title: "Auto Mechanic",
    category: "Skilled Trade",
    salary: { us: "$45k-$75k", ng: "₦1M-₦3.5M", global: "$20k-$45k" },
    overview: "Auto mechanics diagnose, repair, and maintain vehicles. They work on engines, brakes, transmissions, and electrical systems in cars, trucks, and other vehicles.",
    skills: ["Engine Diagnostics", "Brake Repair", "Transmission Repair", "Electrical Systems", "OBD-II Scanners", "ASE Certifications", "Hybrid/EV Repair", "Diesel Engines", "Fuel Systems", "Suspension", "Alignment", "Computer Diagnostics", "Welding", "Customer Service", "Hand Tools"],
    exampleBullets: [
      "Diagnosed and repaired 150+ vehicles monthly with 99% accuracy on first attempt",
      "Specialized in hybrid and electric vehicle repair (Toyota Prius, Tesla)",
      "Reduced average repair time by 25% through systematic diagnostic approach",
      "Achieved 4.9/5 customer satisfaction rating with 80% repeat customer rate",
      "Trained 3 junior technicians earning ASE certifications under my mentorship"
    ],
    commonMistakes: [
      "Not listing specific ASE certifications held",
      "Forgetting to mention vehicle types and brands serviced",
      "Listing repairs without diagnostic accuracy or customer satisfaction",
      "Omitting EV/hybrid experience (high demand)"
    ],
    keywords: ["auto mechanic resume", "automotive technician cv", "car mechanic resume", "ase certified mechanic resume"],
  },
];