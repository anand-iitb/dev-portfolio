export type SkillItem = {
  name: string;
  href?: string;
  icon?: string;
};

export const portfolio = {
  person: {
    firstName: "Anand",
    lastName: "Kumar",
    name: "Anand Kumar",
    shortName: "AK",
    role: "Software Engineer / Backend Systems",
    location: "Bengaluru, India",
    availability: "Open to conversations",
    email: "anandpes.ak@gmail.com",
    phone: "+91-7533073698",
    resume: "/resume.pdf",
    headline:
      "I build high-scale backend systems that make payments reliable, fast, and resilient.",
    statement:
      "I design digital infrastructure at the intersection of distributed systems, product reliability, and operational excellence.",
  },
  social: {
    github: {
      label: "GitHub",
      href: "https://github.com/anand-iitb",
    },
    linkedin: {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/anand-iitb/",
    },
    instagram: {
      label: "Instagram",
      href: "https://instagram.com/",
    },
  },
  nav: [
    { label: "About", href: "#about" },
    { label: "Experiences", href: "#experience" },
    { label: "Projects", href: "#work" },
    { label: "Achievements", href: "#recognition" },
    { label: "Resume", href: "/resume.pdf" },
    { label: "Contact", href: "#contact" },
  ],

  about: {
    editorial:
      "I BUILD DISTRIBUTED SYSTEMS AND RESILIENT PAYMENT INFRASTRUCTURE AT HIGH SCALE.",
    bio: "Software Development Engineer at Navi Technologies working on mission-critical UPI backend systems — multi-PSP routing, real-time transaction processing, and automated fault recovery. Graduated with a B.Tech in Computer Science and Engineering from IIT Bombay ('24), with prior engineering experience at Nutanix.",
    more: [
      "I specialize in architecting high-throughput, low-latency backends with clean service boundaries, fault isolation, and event-driven data consistency.",
      "At Navi, my core work spans payments infrastructure: integrating 30+ PSP APIs, eliminating inter-service bottlenecks with HTTP/2 and connection pool tuning, and building automated reconciliation with Kafka and PostgreSQL.",
      "Beyond payments, I have strong foundations in systems programming (xv6 OS internals), compiler design (C-to-x86), and competitive algorithms (Codeforces Specialist, Kickstart Rank 1249).",
    ],
  },
  skills: [
    {
      id: "languages",
      label: "Languages",
      items: [
        { name: "Java", href: "https://openjdk.org", icon: "openjdk" },
        { name: "Go", href: "https://go.dev", icon: "go" },
        { name: "Kotlin", href: "https://kotlinlang.org", icon: "kotlin" },
        { name: "Python", href: "https://www.python.org", icon: "python" },
        { name: "C++", href: "https://isocpp.org", icon: "cplusplus" },
        { name: "C", href: "https://en.cppreference.com/w/c", icon: "c" },
        { name: "JavaScript", href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript", icon: "javascript" },
        { name: "SQL", href: "https://www.postgresql.org/docs/current/sql.html", icon: "sql" },
        { name: "Bash", href: "https://www.gnu.org/software/bash/", icon: "gnubash" },
      ],
    },
    {
      id: "backend",
      label: "Backend & Systems",
      items: [
        { name: "Spring Boot", href: "https://spring.io/projects/spring-boot", icon: "springboot" },
        { name: "Kafka", href: "https://kafka.apache.org", icon: "apachekafka" },
        { name: "gRPC", href: "https://grpc.io", icon: "grpc" },
        { name: "Protobuf", href: "https://protobuf.dev", icon: "protobuf" },
        { name: "REST", href: "https://restfulapi.net", icon: "rest" },
        { name: "Node.js", href: "https://nodejs.org", icon: "nodedotjs" },
        { name: "Maven", href: "https://maven.apache.org", icon: "apachemaven" },
      ],
    },
    {
      id: "data",
      label: "Data & Storage",
      items: [
        { name: "PostgreSQL", href: "https://www.postgresql.org", icon: "postgresql" },
        { name: "Redis", href: "https://redis.io", icon: "redis" },
        { name: "DynamoDB", href: "https://aws.amazon.com/dynamodb/", icon: "dynamodb" },
        { name: "Elasticsearch", href: "https://www.elastic.co/elasticsearch", icon: "elasticsearch" },
        { name: "Snowflake", href: "https://www.snowflake.com", icon: "snowflake" },
        { name: "S3", href: "https://aws.amazon.com/s3/", icon: "s3" },
        { name: "Firestore", href: "https://firebase.google.com/docs/firestore", icon: "firebase" },
      ],
    },
    {
      id: "infra",
      label: "Infrastructure",
      items: [
        { name: "Kubernetes", href: "https://kubernetes.io", icon: "kubernetes" },
        { name: "Docker", href: "https://www.docker.com", icon: "docker" },
        { name: "AWS", href: "https://aws.amazon.com", icon: "aws" },
        { name: "Argo CD", href: "https://argo-cd.readthedocs.io", icon: "argo" },
        { name: "Prometheus", href: "https://prometheus.io", icon: "prometheus" },
        { name: "Grafana", href: "https://grafana.com", icon: "grafana" },
        { name: "Git", href: "https://git-scm.com", icon: "git" },
        { name: "PyTorch", href: "https://pytorch.org", icon: "pytorch" },
      ],
    },
  ] satisfies Array<{ id: string; label: string; items: SkillItem[] }>,
  experience: [
    {
      id: "navi",
      year: "July 2024 — Present",
      start: "Jul 2024",
      role: "Software Development Engineer",
      company: "Navi Technologies",
      location: "Bengaluru",
      description:
        "UPI backend. Multi-PSP integrations, transaction-path optimization, and automated recovery for pending payments — built to reduce cost, isolate failure, and keep money moving.",
    },
    {
      id: "nutanix",
      year: "July 2023 — August 2023",
      start: "Jul 2023",
      role: "Software Engineering Intern",
      company: "Nutanix",
      location: "Pune",
      description:
        "Configuration-driven Snowflake table lifecycle automation — identify, truncate, and ship with less manual ops. Built in Go, stored config in DynamoDB, deployed on Kubernetes with Argo CD.",
    },
  ],

  education: [
    {
      id: "iitb",
      year: "2020 — 2024",
      school: "Indian Institute of Technology, Bombay",
      href: "https://www.iitb.ac.in",
      degree: "Bachelor of Technology",
      field: "Computer Science and Engineering",
    },
    {
      id: "xii",
      year: "2018 — 2020",
      school: "Sant Gyaneshwar Model School",
      href: "https://santgyaneshwarmodelschool.in/default.aspx",
      degree: "Class XII, CBSE",
      field: "Senior secondary",
    },
    {
      id: "x",
      year: "2016 — 2018",
      school: "S.M. Arya Public School",
      href: "https://www.smaps.in/",
      degree: "Class X, CBSE",
      field: "Secondary",
    },
  ],
  achievements: [
    {
      year: "2024",
      title: "Navi Spearhead Award",
      detail: "High-impact contributions on UPI backend at Navi.",
    },
    {
      year: "2022",
      title: "Codeforces Specialist",
      detail: "Active competitive programmer across multiple platforms.",
    },
    {
      year: "2022",
      title: "Google Kickstart Round H",
      detail: "International Rank 1249 of 50,000+ participants.",
    },
    {
      year: "2022",
      title: "Meta Hacker Cup",
      detail: "International Rank 1763 of 25,000+ participants.",
    },
    {
      year: "2022",
      title: "HackerRank",
      detail: "Certified Intermediate Problem Solver in competitive programming.",
    },
    {
      year: "2022",
      title: "Stanford ML",
      detail: "Completed Introduction to Machine Learning, Stanford online.",
    },
    {
      year: "2020",
      title: "KVPY Fellowship",
      detail: "Awarded by IISc Bangalore.",
    },
    {
      year: "2020",
      title: "NSEC / INChO",
      detail: "Qualified the chemistry olympiad pathway conducted by HBCSE, TIFR.",
    },
    {
      year: "2018",
      title: "NTSE Scholarship",
      detail: "Awarded by NCERT, Government of India.",
    },
    {
      year: "2017",
      title: "NSEJS",
      detail: "State Rank 8, science olympiad conducted by IAPT.",
    },
    {
      year: "2016",
      title: "International Mathematics Olympiad",
      detail: "World Rank 17, conducted by SOF.",
    },
    {
      year: "2016",
      title: "NAVPRAYAS Puzzle Contest",
      detail: "First at the district level.",
    },
    {
      year: "2020",
      title: "National Service Scheme",
      detail: "80+ hours on Green Campus at IIT Bombay.",
    },
  ],
  projects: [
    {
      slug: "upi-multibank",
      index: "01",
      title: "UPI Multibank",
      category: "Payments",
      description:
        "Integrated multiple PSPs into UPI — 30+ APIs, centralized auth and retries, configurable routing, and circuit breakers so one downstream failure does not take the rail down.",
      technologies: ["Java", "Spring Boot", "PostgreSQL", "Kafka"],
    },
    {
      slug: "nadaga",
      index: "02",
      title: "Project Nadaga",
      category: "Scale",
      description:
        "Transaction-path work for UPI market-share load: fewer inter-service hops, HTTP/2, and connection-pool jitter so pods stop expiring in lockstep.",
      technologies: ["Java", "HTTP/2", "Redis", "Prometheus"],
    },
    {
      slug: "gratification",
      index: "03",
      title: "Gratification Service",
      category: "Reliability",
      description:
        "Event-driven recovery for pending UPI transactions, with quota-aware NPCI polling so reconciliation does not have to be a person.",
      technologies: ["Kafka", "Java", "PostgreSQL"],
    },
    {
      slug: "snowflake-lifecycle",
      index: "04",
      title: "Snowflake Lifecycle",
      year: "2023",
      category: "Data Ops",
      description:
        "Config-driven identification and truncation of 100+ Snowflake tables. DynamoDB as the source of truth, written in Go, shipped on Kubernetes with Argo CD.",
      technologies: ["Go", "DynamoDB", "Snowflake", "Kubernetes"],
    },
    {
      slug: "code-to-assembly",
      index: "05",
      title: "Code to Assembly",
      year: "2023",
      category: "Compilers",
      description:
        "A C-like compiler: Flex for lexing, Bison for a CFG parse into an AST, then x86 assembly from the tree.",
      technologies: ["C", "Flex", "Bison", "x86"],
    },
    {
      slug: "xv6",
      index: "06",
      title: "Advancing xv6",
      year: "2022",
      category: "Operating Systems",
      description:
        "New syscalls for process stats, mmap with page-fault handling, and clone/join so xv6 can actually multithread.",
      technologies: ["C", "xv6", "Syscalls"],
    },
    {
      slug: "sat-solver",
      index: "07",
      title: "SAT Solver",
      year: "2022",
      category: "Logic / Systems",
      description:
        "Boolean satisfiability solver with Z3 — encoding k-coloring, Sudoku, and Rush Hour into constraints that actually finish.",
      technologies: ["Python", "Z3", "NetworkX"],
    },
    {
      slug: "p2p-network",
      index: "08",
      title: "Peer-to-Peer File Sharing",
      year: "2022",
      category: "Networks",
      description:
        "C++ socket network for concurrent peers, Dijkstra routing, multithreading, and MD5-verified TCP transfer.",
      technologies: ["C++", "TCP", "Sockets"],
    },
    {
      slug: "cartoonize",
      index: "09",
      title: "Learning to Cartoonize",
      year: "2022",
      category: "Machine Learning",
      description:
        "Seasons of Code, WnCC IIT Bombay. CNNs in PyTorch, then DCGAN, Pix2Pix and CartoonGAN to move images into a cartoon domain.",
      technologies: ["Python", "PyTorch", "GANs"],
    },
    {
      slug: "digits-spam",
      index: "10",
      title: "Digits and Spam",
      year: "2022",
      category: "Machine Learning",
      description:
        "PCA in NumPy, regularized logistic regression on MNIST, and an SVM spam filter evaluated on large sets.",
      technologies: ["Python", "NumPy", "SVM"],
    },
    {
      slug: "drawing-game",
      index: "11",
      title: "Multiplayer Drawing Game",
      year: "2021",
      category: "Software Systems",
      description:
        "Skribbl-style board on Canvas, live chat, Socket.IO between peers, Express to keep game state honest.",
      technologies: ["Node.js", "Socket.IO", "Express"],
    },
    {
      slug: "github-stats",
      index: "12",
      title: "GitHub Stats App",
      year: "2021",
      category: "Software Systems",
      description:
        "Fetch public GitHub profiles and repos, store them in PostgreSQL via Django, refresh with signal receivers.",
      technologies: ["Django", "PostgreSQL", "HTTP"],
    },
    {
      slug: "cpp-evaluator",
      index: "13",
      title: "Automated CPP Evaluator",
      year: "2021",
      category: "Software Systems",
      description:
        "Generated an efficient Bash script to download, organize, and automate the comprehensive assessment of different CPP files against multiple test cases.",
      technologies: ["Bash", "Linux", "Automation"],
    },
    {
      slug: "sliding-puzzle",
      index: "14",
      title: "4x4 Sliding Puzzle",
      year: "2021",
      category: "Software Systems",
      description:
        "A 4x4 sliding puzzle game using FLTK graphics, custom mouse click event handlers, and a dynamic shuffling algorithm.",
      technologies: ["C++", "FLTK", "Algorithms"],
    },
  ],
} as const;

export type Project = (typeof portfolio.projects)[number];
export type Experience = (typeof portfolio.experience)[number];
