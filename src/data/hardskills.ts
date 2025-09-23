// Hard Skills Data
export interface HardSkill {
  id: string;
  name: string;
  category: string;
}

export const hardSkillsData: HardSkill[] = [
  // Programming Languages
  { id: 'js', name: 'JavaScript', category: 'Programming Languages' },
  { id: 'ts', name: 'TypeScript', category: 'Programming Languages' },
  { id: 'python', name: 'Python', category: 'Programming Languages' },
  { id: 'java', name: 'Java', category: 'Programming Languages' },
  { id: 'csharp', name: 'C#', category: 'Programming Languages' },
  { id: 'cpp', name: 'C++', category: 'Programming Languages' },
  { id: 'php', name: 'PHP', category: 'Programming Languages' },
  { id: 'go', name: 'Go', category: 'Programming Languages' },
  { id: 'rust', name: 'Rust', category: 'Programming Languages' },
  { id: 'swift', name: 'Swift', category: 'Programming Languages' },
  { id: 'kotlin', name: 'Kotlin', category: 'Programming Languages' },
  { id: 'ruby', name: 'Ruby', category: 'Programming Languages' },

  // Web Technologies
  { id: 'html', name: 'HTML', category: 'Web Technologies' },
  { id: 'css', name: 'CSS', category: 'Web Technologies' },
  { id: 'react', name: 'React', category: 'Web Technologies' },
  { id: 'vue', name: 'Vue.js', category: 'Web Technologies' },
  { id: 'angular', name: 'Angular', category: 'Web Technologies' },
  { id: 'nodejs', name: 'Node.js', category: 'Web Technologies' },
  { id: 'express', name: 'Express.js', category: 'Web Technologies' },
  { id: 'nextjs', name: 'Next.js', category: 'Web Technologies' },
  { id: 'nuxtjs', name: 'Nuxt.js', category: 'Web Technologies' },
  { id: 'svelte', name: 'Svelte', category: 'Web Technologies' },

  // Databases
  { id: 'mysql', name: 'MySQL', category: 'Databases' },
  { id: 'postgresql', name: 'PostgreSQL', category: 'Databases' },
  { id: 'mongodb', name: 'MongoDB', category: 'Databases' },
  { id: 'redis', name: 'Redis', category: 'Databases' },
  { id: 'sqlite', name: 'SQLite', category: 'Databases' },
  { id: 'oracle', name: 'Oracle DB', category: 'Databases' },
  { id: 'cassandra', name: 'Cassandra', category: 'Databases' },
  { id: 'elasticsearch', name: 'Elasticsearch', category: 'Databases' },

  // Cloud & DevOps
  { id: 'aws', name: 'Amazon Web Services (AWS)', category: 'Cloud & DevOps' },
  { id: 'azure', name: 'Microsoft Azure', category: 'Cloud & DevOps' },
  { id: 'gcp', name: 'Google Cloud Platform', category: 'Cloud & DevOps' },
  { id: 'docker', name: 'Docker', category: 'Cloud & DevOps' },
  { id: 'kubernetes', name: 'Kubernetes', category: 'Cloud & DevOps' },
  { id: 'jenkins', name: 'Jenkins', category: 'Cloud & DevOps' },
  { id: 'terraform', name: 'Terraform', category: 'Cloud & DevOps' },
  { id: 'ansible', name: 'Ansible', category: 'Cloud & DevOps' },

  // Data Science & AI
  { id: 'tensorflow', name: 'TensorFlow', category: 'Data Science & AI' },
  { id: 'pytorch', name: 'PyTorch', category: 'Data Science & AI' },
  { id: 'pandas', name: 'Pandas', category: 'Data Science & AI' },
  { id: 'numpy', name: 'NumPy', category: 'Data Science & AI' },
  { id: 'scikit', name: 'Scikit-learn', category: 'Data Science & AI' },
  { id: 'jupyter', name: 'Jupyter', category: 'Data Science & AI' },
  { id: 'r', name: 'R', category: 'Data Science & AI' },
  { id: 'matlab', name: 'MATLAB', category: 'Data Science & AI' },
  { id: 'data-analysis', name: 'Data Analysis', category: 'Data Science & AI' },

  // Design & Creative
  { id: 'photoshop', name: 'Adobe Photoshop', category: 'Design & Creative' },
  { id: 'illustrator', name: 'Adobe Illustrator', category: 'Design & Creative' },
  { id: 'figma', name: 'Figma', category: 'Design & Creative' },
  { id: 'sketch', name: 'Sketch', category: 'Design & Creative' },
  { id: 'xd', name: 'Adobe XD', category: 'Design & Creative' },
  { id: 'canva', name: 'Canva', category: 'Design & Creative' },
  { id: 'indesign', name: 'Adobe InDesign', category: 'Design & Creative' },

  // Mobile Development
  { id: 'react-native', name: 'React Native', category: 'Mobile Development' },
  { id: 'flutter', name: 'Flutter', category: 'Mobile Development' },
  { id: 'ionic', name: 'Ionic', category: 'Mobile Development' },
  { id: 'xamarin', name: 'Xamarin', category: 'Mobile Development' },
  { id: 'android', name: 'Android Development', category: 'Mobile Development' },
  { id: 'ios', name: 'iOS Development', category: 'Mobile Development' },

  // Tools & Software
  { id: 'git', name: 'Git', category: 'Tools & Software' },
  { id: 'jira', name: 'Jira', category: 'Tools & Software' },
  { id: 'confluence', name: 'Confluence', category: 'Tools & Software' },
  { id: 'slack', name: 'Slack', category: 'Tools & Software' },
  { id: 'trello', name: 'Trello', category: 'Tools & Software' },
  { id: 'notion', name: 'Notion', category: 'Tools & Software' },
  { id: 'excel', name: 'Microsoft Excel', category: 'Tools & Software' },
  { id: 'powerpoint', name: 'Microsoft PowerPoint', category: 'Tools & Software' },
  { id: 'word', name: 'Microsoft Word', category: 'Tools & Software' },

  // Finance & Accounting
  { id: 'sap', name: 'SAP', category: 'Finance & Accounting' },
  { id: 'quickbooks', name: 'QuickBooks', category: 'Finance & Accounting' },
  { id: 'financial-modeling', name: 'Financial Modeling', category: 'Finance & Accounting' },
  { id: 'budgeting', name: 'Budgeting & Forecasting', category: 'Finance & Accounting' },
  { id: 'taxation', name: 'Taxation', category: 'Finance & Accounting' },
  { id: 'auditing', name: 'Auditing', category: 'Finance & Accounting' },
  { id: 'investment-analysis', name: 'Investment Analysis', category: 'Finance & Accounting' },
  { id: 'risk-management', name: 'Risk Management', category: 'Finance & Accounting' },
  { id: 'banking', name: 'Banking Operations', category: 'Finance & Accounting' },
  { id: 'insurance', name: 'Insurance', category: 'Finance & Accounting' },

  // Marketing & Sales
  { id: 'digital-marketing', name: 'Digital Marketing', category: 'Marketing & Sales' },
  { id: 'seo', name: 'Search Engine Optimization (SEO)', category: 'Marketing & Sales' },
  { id: 'sem', name: 'Search Engine Marketing (SEM)', category: 'Marketing & Sales' },
  { id: 'social-media-marketing', name: 'Social Media Marketing', category: 'Marketing & Sales' },
  { id: 'content-marketing', name: 'Content Marketing', category: 'Marketing & Sales' },
  { id: 'email-marketing', name: 'Email Marketing', category: 'Marketing & Sales' },
  { id: 'copywriting', name: 'Copywriting', category: 'Marketing & Sales' },
  { id: 'market-research', name: 'Market Research', category: 'Marketing & Sales' },
  { id: 'brand-management', name: 'Brand Management', category: 'Marketing & Sales' },
  { id: 'sales-strategy', name: 'Sales Strategy', category: 'Marketing & Sales' },
  { id: 'crm', name: 'Customer Relationship Management (CRM)', category: 'Marketing & Sales' },
  { id: 'google-ads', name: 'Google Ads', category: 'Marketing & Sales' },
  { id: 'facebook-ads', name: 'Facebook Ads', category: 'Marketing & Sales' },
  { id: 'google-analytics', name: 'Google Analytics', category: 'Marketing & Sales' },

  // Human Resources
  { id: 'recruitment', name: 'Recruitment & Selection', category: 'Human Resources' },
  { id: 'training-development', name: 'Training & Development', category: 'Human Resources' },
  { id: 'performance-management', name: 'Performance Management', category: 'Human Resources' },
  { id: 'compensation', name: 'Compensation & Benefits', category: 'Human Resources' },
  { id: 'hr-policies', name: 'HR Policies & Procedures', category: 'Human Resources' },
  { id: 'employee-relations', name: 'Employee Relations', category: 'Human Resources' },
  { id: 'hris', name: 'Human Resource Information Systems (HRIS)', category: 'Human Resources' },
  { id: 'payroll', name: 'Payroll Management', category: 'Human Resources' },
  { id: 'talent-management', name: 'Talent Management', category: 'Human Resources' },

  // Operations & Supply Chain
  { id: 'supply-chain', name: 'Supply Chain Management', category: 'Operations & Supply Chain' },
  { id: 'logistics', name: 'Logistics', category: 'Operations & Supply Chain' },
  { id: 'inventory-management', name: 'Inventory Management', category: 'Operations & Supply Chain' },
  { id: 'procurement', name: 'Procurement', category: 'Operations & Supply Chain' },
  { id: 'quality-control', name: 'Quality Control', category: 'Operations & Supply Chain' },
  { id: 'lean-six-sigma', name: 'Lean Six Sigma', category: 'Operations & Supply Chain' },
  { id: 'warehouse-management', name: 'Warehouse Management', category: 'Operations & Supply Chain' },
  { id: 'production-planning', name: 'Production Planning', category: 'Operations & Supply Chain' },

  // Healthcare & Medical
  { id: 'medical-diagnosis', name: 'Medical Diagnosis', category: 'Healthcare & Medical' },
  { id: 'patient-care', name: 'Patient Care', category: 'Healthcare & Medical' },
  { id: 'medical-equipment', name: 'Medical Equipment Operation', category: 'Healthcare & Medical' },
  { id: 'pharmacy', name: 'Pharmacy', category: 'Healthcare & Medical' },
  { id: 'nursing', name: 'Nursing', category: 'Healthcare & Medical' },
  { id: 'medical-research', name: 'Medical Research', category: 'Healthcare & Medical' },
  { id: 'radiology', name: 'Radiology', category: 'Healthcare & Medical' },
  { id: 'surgery', name: 'Surgery', category: 'Healthcare & Medical' },
  { id: 'laboratory', name: 'Laboratory Techniques', category: 'Healthcare & Medical' },

  // Education & Training
  { id: 'curriculum-development', name: 'Curriculum Development', category: 'Education & Training' },
  { id: 'lesson-planning', name: 'Lesson Planning', category: 'Education & Training' },
  { id: 'classroom-management', name: 'Classroom Management', category: 'Education & Training' },
  { id: 'e-learning', name: 'E-Learning Platforms', category: 'Education & Training' },
  { id: 'instructional-design', name: 'Instructional Design', category: 'Education & Training' },
  { id: 'assessment', name: 'Student Assessment', category: 'Education & Training' },
  { id: 'educational-technology', name: 'Educational Technology', category: 'Education & Training' },

  // Engineering & Technical
  { id: 'autocad', name: 'AutoCAD', category: 'Engineering & Technical' },
  { id: 'solidworks', name: 'SolidWorks', category: 'Engineering & Technical' },
  { id: 'civil-engineering', name: 'Civil Engineering', category: 'Engineering & Technical' },
  { id: 'mechanical-engineering', name: 'Mechanical Engineering', category: 'Engineering & Technical' },
  { id: 'electrical-engineering', name: 'Electrical Engineering', category: 'Engineering & Technical' },
  { id: 'project-management', name: 'Project Management', category: 'Engineering & Technical' },
  { id: 'technical-drawing', name: 'Technical Drawing', category: 'Engineering & Technical' },
  { id: 'quality-assurance', name: 'Quality Assurance', category: 'Engineering & Technical' },

  // Legal & Compliance
  { id: 'contract-law', name: 'Contract Law', category: 'Legal & Compliance' },
  { id: 'compliance', name: 'Regulatory Compliance', category: 'Legal & Compliance' },
  { id: 'legal-research', name: 'Legal Research', category: 'Legal & Compliance' },
  { id: 'litigation', name: 'Litigation', category: 'Legal & Compliance' },
  { id: 'intellectual-property', name: 'Intellectual Property', category: 'Legal & Compliance' },
  { id: 'corporate-law', name: 'Corporate Law', category: 'Legal & Compliance' },

  // Hospitality & Tourism
  { id: 'hotel-management', name: 'Hotel Management', category: 'Hospitality & Tourism' },
  { id: 'food-service', name: 'Food Service', category: 'Hospitality & Tourism' },
  { id: 'event-planning', name: 'Event Planning', category: 'Hospitality & Tourism' },
  { id: 'travel-planning', name: 'Travel Planning', category: 'Hospitality & Tourism' },
  { id: 'customer-service', name: 'Customer Service', category: 'Hospitality & Tourism' },
  { id: 'reservation-systems', name: 'Reservation Systems', category: 'Hospitality & Tourism' },

  // Media & Communications
  { id: 'journalism', name: 'Journalism', category: 'Media & Communications' },
  { id: 'video-editing', name: 'Video Editing', category: 'Media & Communications' },
  { id: 'audio-editing', name: 'Audio Editing', category: 'Media & Communications' },
  { id: 'broadcasting', name: 'Broadcasting', category: 'Media & Communications' },
  { id: 'photography', name: 'Photography', category: 'Media & Communications' },
  { id: 'public-relations', name: 'Public Relations', category: 'Media & Communications' },
  { id: 'content-creation', name: 'Content Creation', category: 'Media & Communications' },

  // Languages
  { id: 'english', name: 'English', category: 'Languages' },
  { id: 'mandarin', name: 'Mandarin Chinese', category: 'Languages' },
  { id: 'japanese', name: 'Japanese', category: 'Languages' },
  { id: 'korean', name: 'Korean', category: 'Languages' },
  { id: 'arabic', name: 'Arabic', category: 'Languages' },
  { id: 'spanish', name: 'Spanish', category: 'Languages' },
  { id: 'french', name: 'French', category: 'Languages' },
  { id: 'german', name: 'German', category: 'Languages' },
  { id: 'translation', name: 'Translation', category: 'Languages' },
  { id: 'interpretation', name: 'Interpretation', category: 'Languages' },
];

export const hardSkillCategories = [
  'Programming Languages',
  'Web Technologies',
  'Databases',
  'Cloud & DevOps',
  'Data Science & AI',
  'Design & Creative',
  'Mobile Development',
  'Tools & Software',
  'Finance & Accounting',
  'Marketing & Sales',
  'Human Resources',
  'Operations & Supply Chain',
  'Healthcare & Medical',
  'Education & Training',
  'Engineering & Technical',
  'Legal & Compliance',
  'Hospitality & Tourism',
  'Media & Communications',
  'Languages'
];