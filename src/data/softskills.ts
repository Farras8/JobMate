// Soft Skills Data
export interface SoftSkill {
  id: string;
  name: string;
  category: string;
}

export const softSkillsData: SoftSkill[] = [
  // Communication
  { id: 'verbal-communication', name: 'Verbal Communication', category: 'Communication' },
  { id: 'written-communication', name: 'Written Communication', category: 'Communication' },
  { id: 'presentation-skills', name: 'Presentation Skills', category: 'Communication' },
  { id: 'active-listening', name: 'Active Listening', category: 'Communication' },
  { id: 'public-speaking', name: 'Public Speaking', category: 'Communication' },
  { id: 'negotiation', name: 'Negotiation', category: 'Communication' },
  { id: 'interpersonal-skills', name: 'Interpersonal Skills', category: 'Communication' },

  // Leadership
  { id: 'team-leadership', name: 'Team Leadership', category: 'Leadership' },
  { id: 'project-management', name: 'Project Management', category: 'Leadership' },
  { id: 'decision-making', name: 'Decision Making', category: 'Leadership' },
  { id: 'delegation', name: 'Delegation', category: 'Leadership' },
  { id: 'mentoring', name: 'Mentoring', category: 'Leadership' },
  { id: 'strategic-thinking', name: 'Strategic Thinking', category: 'Leadership' },
  { id: 'conflict-resolution', name: 'Conflict Resolution', category: 'Leadership' },

  // Problem Solving
  { id: 'analytical-thinking', name: 'Analytical Thinking', category: 'Problem Solving' },
  { id: 'critical-thinking', name: 'Critical Thinking', category: 'Problem Solving' },
  { id: 'creative-thinking', name: 'Creative Thinking', category: 'Problem Solving' },
  { id: 'troubleshooting', name: 'Troubleshooting', category: 'Problem Solving' },
  { id: 'innovation', name: 'Innovation', category: 'Problem Solving' },
  { id: 'research-skills', name: 'Research Skills', category: 'Problem Solving' },

  // Teamwork & Collaboration
  { id: 'teamwork', name: 'Teamwork', category: 'Teamwork & Collaboration' },
  { id: 'collaboration', name: 'Collaboration', category: 'Teamwork & Collaboration' },
  { id: 'cross-functional-teamwork', name: 'Cross-functional Teamwork', category: 'Teamwork & Collaboration' },
  { id: 'empathy', name: 'Empathy', category: 'Teamwork & Collaboration' },
  { id: 'cultural-awareness', name: 'Cultural Awareness', category: 'Teamwork & Collaboration' },
  { id: 'networking', name: 'Networking', category: 'Teamwork & Collaboration' },

  // Adaptability
  { id: 'flexibility', name: 'Flexibility', category: 'Adaptability' },
  { id: 'adaptability', name: 'Adaptability', category: 'Adaptability' },
  { id: 'resilience', name: 'Resilience', category: 'Adaptability' },
  { id: 'openness-to-change', name: 'Openness to Change', category: 'Adaptability' },
  { id: 'learning-agility', name: 'Learning Agility', category: 'Adaptability' },
  { id: 'stress-management', name: 'Stress Management', category: 'Adaptability' },

  // Time Management
  { id: 'time-management', name: 'Time Management', category: 'Time Management' },
  { id: 'prioritization', name: 'Prioritization', category: 'Time Management' },
  { id: 'organization', name: 'Organization', category: 'Time Management' },
  { id: 'multitasking', name: 'Multitasking', category: 'Time Management' },
  { id: 'planning', name: 'Planning', category: 'Time Management' },
  { id: 'goal-setting', name: 'Goal Setting', category: 'Time Management' },

  // Work Ethic
  { id: 'reliability', name: 'Reliability', category: 'Work Ethic' },
  { id: 'punctuality', name: 'Punctuality', category: 'Work Ethic' },
  { id: 'attention-to-detail', name: 'Attention to Detail', category: 'Work Ethic' },
  { id: 'initiative', name: 'Initiative', category: 'Work Ethic' },
  { id: 'self-motivation', name: 'Self-motivation', category: 'Work Ethic' },
  { id: 'professionalism', name: 'Professionalism', category: 'Work Ethic' },
  { id: 'integrity', name: 'Integrity', category: 'Work Ethic' },

  // Customer Service
  { id: 'customer-service', name: 'Customer Service', category: 'Customer Service' },
  { id: 'patience', name: 'Patience', category: 'Customer Service' },
  { id: 'problem-resolution', name: 'Problem Resolution', category: 'Customer Service' },
  { id: 'sales-skills', name: 'Sales Skills', category: 'Customer Service' },
  { id: 'relationship-building', name: 'Relationship Building', category: 'Customer Service' },

  // Emotional Intelligence
  { id: 'emotional-intelligence', name: 'Emotional Intelligence', category: 'Emotional Intelligence' },
  { id: 'self-awareness', name: 'Self-awareness', category: 'Emotional Intelligence' },
  { id: 'social-awareness', name: 'Social Awareness', category: 'Emotional Intelligence' },
  { id: 'self-regulation', name: 'Self-regulation', category: 'Emotional Intelligence' },
  { id: 'motivation', name: 'Motivation', category: 'Emotional Intelligence' },

  // Teaching & Training
  { id: 'teaching', name: 'Teaching', category: 'Teaching & Training' },
  { id: 'coaching', name: 'Coaching', category: 'Teaching & Training' },
  { id: 'facilitation', name: 'Facilitation', category: 'Teaching & Training' },
  { id: 'knowledge-transfer', name: 'Knowledge Transfer', category: 'Teaching & Training' },
  { id: 'adult-learning', name: 'Adult Learning Principles', category: 'Teaching & Training' },

  // Sales & Business Development
  { id: 'prospecting', name: 'Prospecting', category: 'Sales & Business Development' },
  { id: 'lead-generation', name: 'Lead Generation', category: 'Sales & Business Development' },
  { id: 'closing-deals', name: 'Closing Deals', category: 'Sales & Business Development' },
  { id: 'account-management', name: 'Account Management', category: 'Sales & Business Development' },
  { id: 'business-development', name: 'Business Development', category: 'Sales & Business Development' },
  { id: 'market-analysis', name: 'Market Analysis', category: 'Sales & Business Development' },

  // Healthcare & Caregiving
  { id: 'compassion', name: 'Compassion', category: 'Healthcare & Caregiving' },
  { id: 'bedside-manner', name: 'Bedside Manner', category: 'Healthcare & Caregiving' },
  { id: 'crisis-intervention', name: 'Crisis Intervention', category: 'Healthcare & Caregiving' },
  { id: 'health-education', name: 'Health Education', category: 'Healthcare & Caregiving' },
  { id: 'therapeutic-communication', name: 'Therapeutic Communication', category: 'Healthcare & Caregiving' },

  // Creative & Artistic
  { id: 'creativity', name: 'Creativity', category: 'Creative & Artistic' },
  { id: 'artistic-vision', name: 'Artistic Vision', category: 'Creative & Artistic' },
  { id: 'aesthetic-sense', name: 'Aesthetic Sense', category: 'Creative & Artistic' },
  { id: 'creative-writing', name: 'Creative Writing', category: 'Creative & Artistic' },
  { id: 'storytelling', name: 'Storytelling', category: 'Creative & Artistic' },
  { id: 'visual-communication', name: 'Visual Communication', category: 'Creative & Artistic' },

  // Research & Analysis
  { id: 'data-interpretation', name: 'Data Interpretation', category: 'Research & Analysis' },
  { id: 'statistical-analysis', name: 'Statistical Analysis', category: 'Research & Analysis' },
  { id: 'survey-design', name: 'Survey Design', category: 'Research & Analysis' },
  { id: 'report-writing', name: 'Report Writing', category: 'Research & Analysis' },
  { id: 'literature-review', name: 'Literature Review', category: 'Research & Analysis' },

  // Event Management
  { id: 'event-coordination', name: 'Event Coordination', category: 'Event Management' },
  { id: 'vendor-management', name: 'Vendor Management', category: 'Event Management' },
  { id: 'budget-management', name: 'Budget Management', category: 'Event Management' },
  { id: 'logistics-coordination', name: 'Logistics Coordination', category: 'Event Management' },
  { id: 'contingency-planning', name: 'Contingency Planning', category: 'Event Management' },

  // Entrepreneurship
  { id: 'risk-taking', name: 'Risk Taking', category: 'Entrepreneurship' },
  { id: 'opportunity-recognition', name: 'Opportunity Recognition', category: 'Entrepreneurship' },
  { id: 'resource-mobilization', name: 'Resource Mobilization', category: 'Entrepreneurship' },
  { id: 'business-planning', name: 'Business Planning', category: 'Entrepreneurship' },
  { id: 'startup-mindset', name: 'Startup Mindset', category: 'Entrepreneurship' },

  // Consulting & Advisory
  { id: 'strategic-advisory', name: 'Strategic Advisory', category: 'Consulting & Advisory' },
  { id: 'process-improvement', name: 'Process Improvement', category: 'Consulting & Advisory' },
  { id: 'change-management', name: 'Change Management', category: 'Consulting & Advisory' },
  { id: 'stakeholder-management', name: 'Stakeholder Management', category: 'Consulting & Advisory' },
  { id: 'recommendations', name: 'Making Recommendations', category: 'Consulting & Advisory' },
];

export const softSkillCategories = [
  'Communication',
  'Leadership',
  'Problem Solving',
  'Teamwork & Collaboration',
  'Adaptability',
  'Time Management',
  'Work Ethic',
  'Customer Service',
  'Emotional Intelligence',
  'Teaching & Training',
  'Sales & Business Development',
  'Healthcare & Caregiving',
  'Creative & Artistic',
  'Research & Analysis',
  'Event Management',
  'Entrepreneurship',
  'Consulting & Advisory'
];