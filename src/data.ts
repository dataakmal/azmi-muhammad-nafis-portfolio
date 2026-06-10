import { Experience, Project, SkillCategory, Achievement, Certificate } from './types';

export const PERSONAL_INFO = {
  name: 'Azmi Muhammad Nafis',
  title: 'Data Analyst | Business Intelligence | ML Enthusiast',
  tagline: 'Data-Driven Statistics Graduate',
  summary: 'Statistics graduate with cumulative experience in performance analytics across the FMCG and Banking sectors.',
  introduction: 'I specialize in performance analytics across FMCG and Banking industries. Through machine learning automation, dashboard engineering, and advanced analytics, I transform complex datasets into strategic business insights.',
  detailedAbout: 'I specialize in performance analytics across the FMCG and Banking sectors. With a proven track record, I accelerate operational workflows by approximately 99% through machine learning automation and engineering real-time KPI dashboards. From utilizing Python, SQL, and Power BI to applying advanced NLP sentiment analysis, my focus is always on translating complex datasets into high-impact, data-driven business strategies.',
  email: 'azminafis37@gmail.com',
  phone: '+6289515204969',
  linkedin: 'https://www.linkedin.com/in/azmi-muhammad-nafis',
  location: 'Bogor, West Java, Indonesia',
  avatarUrl: '/src/assets/images/azmi_avatar_1781060593505.png', // The generated premium avatar
};

export const COUNTERS = [
  { value: '99%', label: 'Workflow Acceleration', text: 'Through automation systems' },
  { value: '27', label: 'Branches Monitored', text: 'Regional bank performance' },
  { value: '200+', label: 'Accounts Evaluated', text: 'Inactive accounts terminated' },
  { value: '400+', label: 'Survey Respondents', text: 'Statistical analysis' },
];

export const EDUCATION = {
  university: 'Universitas Padjadjaran',
  degree: 'Bachelor of Statistics',
  period: 'August 2022 – February 2026',
  gpa: '3.52 / 4.00',
  coursework: [
    'Machine Learning',
    'Data Mining',
    'Database Programming',
    'Regression Analysis',
    'Time Series Analysis',
    'Statistical Sampling',
    'Multi-variable Analysis',
  ],
};

export const EXPERIENCES: Experience[] = [
  {
    id: 'exp1',
    company: 'PT Paragon Technology and Innovation',
    role: 'Commercial Intern',
    period: 'Jan 2026 – Jun 2026',
    responsibilities: [
      'Automated affiliate outreach using a machine learning system, accelerating execution time by approximately 99%.',
      'Reduced multi-day manual outreach into a 30-minute process for 200+ contacts.',
      'Developed Live Stream Performance Dashboard for real-time KPI monitoring.',
      'Monitored Daily GMV, MoM Growth, L3M Growth, Brand Performance, and Top SKU trends.',
      'Standardized affiliate datasets through data cleaning and database engineering.',
    ],
  },
  {
    id: 'exp2',
    company: 'PT Bank Rakyat Indonesia (Persero) Tbk',
    role: 'Micro Ecosystem Intern',
    period: 'Feb 2025 – Jul 2025',
    responsibilities: [
      'Engineered real-time dashboards for QRIS, BRILink, Savings, and Loans.',
      'Monitored performance across 27 branch offices.',
      'Conducted KPI-driven partnership evaluations.',
      'Identified and recommended termination of 200+ inactive SME accounts.',
      'Generated actionable insights for regional business optimization.',
    ],
  },
  {
    id: 'exp3',
    company: 'Badan Pusat Statistik Kuningan',
    role: 'Internship Staff',
    period: 'Jan 2025',
    responsibilities: [
      'Validated SUSENAS (National Socio-Economic Survey) and SAKERNAS (National Labor Force Survey) datasets.',
      'Performed quality assurance and consistency checks.',
      'Standardized statistical publications.',
      'Improved readability of "Kuningan Dalam Angka 2024".',
    ],
  },
];

export const PROJECTS: Project[] = [
  {
    id: 'proj1',
    title: 'Live Stream Performance Dashboard',
    company: 'PT Paragon Technology and Innovation',
    category: 'dashboard',
    tools: ['Google Sheets', 'Data Visualization', 'Business Intelligence', 'KPI Design'],
    description: 'Developed an interactive dashboard for real-time monitoring of business metrics including Daily GMV, MoM/L3M growth, brand performance, and competitor insights.',
    impact: 'Enabled highly data-driven strategic planning and performance evaluation.',
    metric: '99%',
    metricLabel: 'Data Sync Rate',
  },
  {
    id: 'proj2',
    title: 'BRILink Mobile Sentiment Analysis (IndoBERT)',
    category: 'nlp-ml',
    tools: ['NLP', 'IndoBERT', 'Machine Learning', 'Python', 'Scikit-Learn'],
    description: 'Built a sentiment classification model using historical customer review data from the mobile microfinance ecosystem.',
    impact: 'Identified major customer pain points and supported customer-centric mobile improvements.',
    metric: '91%',
    metricLabel: 'Model Accuracy',
  },
  {
    id: 'proj3',
    title: 'Summarecon Mall Bandung Data Collection',
    category: 'survey',
    tools: ['Statistical Sampling', 'Data Cleaning', 'Survey Design', 'Excel'],
    description: 'Conducted structured survey data collection and preprocessing targeting customer demographic distribution and purchasing preferences.',
    impact: 'Generated actionable customer satisfaction insights, segmenting consumer behavior patterns.',
    metric: '95%',
    metricLabel: 'Confidence Level',
  },
  {
    id: 'proj4',
    title: 'Rumah Sakit Hasan Sadikin Data Visualization',
    category: 'analytics',
    tools: ['Data Visualization', 'KPI Reporting', 'Statistical Reporting', 'Power BI'],
    description: 'Created analytical infographic reports and key performance visualizations from satisfaction survey datasets comprising over 400 respondents.',
    impact: 'Highlighted critical patient service gaps and mapped service improvement opportunities.',
    metric: '400+',
    metricLabel: 'Patients Surveyed',
  },
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: 'Programming & Databases',
    skills: [
      { name: 'Python', level: 92 },
      { name: 'Pandas', level: 90 },
      { name: 'NumPy', level: 88 },
      { name: 'Scikit-Learn', level: 85 },
      { name: 'SQL / MySQL', level: 88 },
      { name: 'R / RStudio', level: 80 },
    ],
  },
  {
    title: 'Data Visualization & BI',
    skills: [
      { name: 'Power BI', level: 90 },
      { name: 'Advanced Excel', level: 95 },
      { name: 'Pivot Tables & Dashboarding', level: 95 },
      { name: 'XLOOKUP / INDEX MATCH', level: 98 },
      { name: 'VBA (Macros)', level: 82 },
    ],
  },
  {
    title: 'Analytics & Modeling',
    skills: [
      { name: 'Machine Learning Pipelines', level: 86 },
      { name: 'NLP & IndoBERT Model Tuning', level: 84 },
      { name: 'Statistical Analysis & Hypothesis Testing', level: 95 },
      { name: 'A/B Testing Methodologies', level: 88 },
      { name: 'SPSS', level: 90 },
    ],
  },
];

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'ach1',
    title: 'Winner of Putra HIMASTA (Statistics Ambassador 2023)',
    issuedBy: 'HIMASTA FMIPA Universitas Padjadjaran',
    description: 'Awarded for excellence in public speaking, critical statistical interpretation, and interpersonal communication, representing the Statistics Department.',
    label: 'Ambassador',
  },
  {
    id: 'ach2',
    title: 'Winner of Putra Favourite FMIPA UNPAD',
    issuedBy: 'FMIPA Universitas Padjadjaran',
    description: 'Recognized for representing excellence in science communication, leadership, and public representation among all Faculty of Mathematics and Natural Sciences students.',
    label: 'Faculty Favourite',
  },
];

export const CERTIFICATE_INFO: Certificate = {
  title: '3 Days to Be Data Engineer',
  owner: 'Azmi Muhammad Nafis',
};
