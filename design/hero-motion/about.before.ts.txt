/**
 * About page content — edit this file without changing the section components.
 * Bracketed strings are intentional placeholders, not verified personal claims.
 * Keep URLs undefined until confirmed. Internal URLs start with / (no /tech-blog).
 * Portrait and preview paths are relative to static/, e.g. /img/my-photo.webp.
 */
export type AboutIconName = 'arrow' | 'book' | 'code' | 'layers' | 'web';
export type SectionCopy = {eyebrow: string; title: string[]; description?: string[]};
export type InterestArea = {number: string; icon: AboutIconName; title: string; description: string; label: string};
export type Project = {
  id: string;
  title: string;
  category: string;
  description: string;
  contribution?: string;
  technologies: string[];
  status: string;
  layout: 'featured' | 'secondary' | 'compact';
  visual?: 'website' | 'python' | 'slides';
  preview?: {src: string; alt: string};
  url?: string;
  sourceUrl?: string;
  pendingNote?: string;
};
export type Milestone = {title: string; description: string; emphasized?: boolean};
export type TechCategory = {label: string; items: {name: string; note?: string}[]};
export type ContactLink = {label: string; value: string; url?: string};

export const pageMetadata = {
  title: 'About Me',
  description: 'A personal tech profile: educational interests, projects, a learning journey, and a philosophy of learning, creating, and contributing.',
};

export const profile = {
  eyebrow: 'A PERSONAL TECH PROFILE',
  greeting: "Hello, I'm",
  // Each entry is a display line. The last line receives the blue accent.
  nameLines: ['[Dương', 'Nam.]'],
  initials: 'Aa',
  role: '[Your role, in your own words.]',
  introduction: '[A short introduction to your curiosity about technology, learning, and making knowledge more accessible.]',
  projectsLabel: 'Explore my projects',
  contactLabel: 'Get in touch',
  caption: 'A space for ideas, experiments & things worth sharing.',
  // Optional: set to {src: '/img/portrait.webp', alt: 'Your approved portrait description'}.
  portrait: undefined as {src: string; alt: string} | undefined,
  visual: {
    label: 'Abstract geometric identity composition; initials placeholder',
    heading: 'IDENTITY / IN PROGRESS',
    coordinates: ['x: curiosity', 'y: possibility'],
    footer: 'LEARN / CREATE / CONTRIBUTE',
    caption: '01 / A work in progress.',
    captionDetail: 'Initials placeholder',
  },
};

export const chapters = [
  {id: 'about', label: '01 About'},
  {id: 'interests', label: '02 Interests'},
  {id: 'projects', label: '03 Projects'},
  {id: 'journey', label: '04 Journey'},
  {id: 'tools', label: '05 Tools'},
  {id: 'philosophy', label: '06 Philosophy'},
  {id: 'contact', label: '07 Contact'},
];

export const sectionCopy = {
  about: {eyebrow: '01 / THE PERSON BEHIND THE SCREEN', title: ['A little', 'about me']},
  interests: {eyebrow: '02 / CURIOSITY, IN FOUR DIRECTIONS', title: ["What I'm exploring"], description: ['Different disciplines.', 'A shared interest in making learning better.']},
  projects: {eyebrow: '03 / IDEAS INTO SOMETHING REAL', title: ["Things I've been building"], description: ['A closer look at the work.', 'The process matters, too.']},
  journey: {eyebrow: '04 / ALWAYS A LEARNER', title: ['My learning', 'journey'], description: ['A story told through small steps,', 'questions, and things made along the way.']},
  tools: {eyebrow: '05 / THE EVERYDAY TOOLKIT', title: ['Tools I work with'], description: ['Tools support the idea.', 'Learning keeps the toolkit evolving.']},
  philosophy: {eyebrow: '06 / A SIMPLE COMPASS', title: ['How I learn and create.']},
  contact: {eyebrow: '07 / KEEP THE CONVERSATION GOING', title: ["Let's", 'connect'], description: ['A question, an idea, or a shared curiosity.', 'Good conversations can start small.']},
} satisfies Record<string, SectionCopy>;

export const introduction = {
  lead: '[Your story starts here. Introduce yourself and what connects you to technology and education.]',
  paragraphs: [
    {heading: 'Where I started', body: '[A few lines about your background and the experiences that shaped your interests.]'},
    {heading: 'What keeps me curious', body: '[Your approach to learning, experimenting, and sharing useful things with others.]'},
  ],
  focus: "[One honest sentence about what you're focused on right now.]",
};

export const interests: InterestArea[] = [
  {number: '01', icon: 'book', title: 'Educational technology', description: 'Exploring how digital tools can make knowledge easier to access, understand, and put into practice.', label: 'LEARNING × TECHNOLOGY'},
  {number: '02', icon: 'code', title: 'Programming & algorithms', description: 'Breaking problems into smaller pieces. Finding clarity through logic, patterns, and experimentation.', label: 'LOGIC × POSSIBILITY'},
  {number: '03', icon: 'layers', title: 'Digital content creation', description: 'Turning ideas into thoughtful learning materials, visual explanations, and interactive experiences.', label: 'IDEAS × EXPRESSION'},
  {number: '04', icon: 'web', title: 'Web development', description: 'Connecting content, design, and code to build useful spaces on the web.', label: 'DESIGN × CODE'},
];
export const interestsNote = 'Interest descriptions are proposed copy for review.';

export const projects: Project[] = [
  {id: 'blog', title: 'Blog Tin Học', category: '01 / WEB & EDUCATION', description: 'An educational website with documentation, blog posts, and a Python learning page.', contribution: '[Add your contribution, the problem you set out to solve, and what you learned.]', technologies: ['Docusaurus', 'React', 'TypeScript', 'MDX'], status: 'Existing website', layout: 'featured', visual: 'website', url: '/', sourceUrl: 'https://github.com/Duongnam2810/tech-blog'},
  {id: 'python', title: 'Python Learning Projects', category: '02 / PROGRAMMING', description: '[Describe a real exercise or project, your contribution, and what you learned.]', technologies: ['Python · proposed'], status: 'To confirm', layout: 'secondary', visual: 'python', pendingNote: 'Project details & destination pending'},
  {id: 'powerpoint', title: 'PowerPoint Learning Resources', category: '03 / LEARNING RESOURCES', description: '[Introduce a confirmed learning resource, its audience, and your role in creating it.]', technologies: ['PowerPoint · proposed'], status: 'To confirm', layout: 'secondary', visual: 'slides', pendingNote: 'Project details & destination pending'},
  {id: 'experiments', title: 'Digital Learning Experiments', category: 'EXPERIMENTS / CONCEPT SLOT', description: "[A place for a real experiment when you're ready to share it.]", technologies: ['Technology to confirm'], status: 'To confirm', layout: 'compact'},
];

export const projectVisuals = {
  website: {label: 'Abstract interface study for Blog Tin Học, not a screenshot', heading: 'FEATURED / EDUCATIONAL WEBSITE', brand: 'Blog Tin Học', navigation: 'LEARN · EXPLORE · CREATE', eyebrow: 'KHÔNG GIAN HỌC TẬP SỐ', headline: ['Khám phá tri thức.', 'Sáng tạo mỗi ngày.'], caption: 'ABSTRACT INTERFACE STUDY'},
  python: '[ py ]',
  slides: ['Learn', 'through play.'],
  visitLabel: 'Visit website',
  sourceLabel: 'Source code',
};

export const journeyNote = ['Suggested chapter titles.', 'Personal history to be supplied; no dates implied.'];
export const milestones: Milestone[] = [
  {title: 'The beginning', description: '[Share the experience that first sparked your curiosity.]'},
  {title: 'Exploring technology', description: '[Describe the subjects and tools you started discovering.]'},
  {title: 'Learning and experimenting', description: '[Add a real learning experience or early experiment.]'},
  {title: 'Building Blog Tin Học', description: '[Tell the story behind this website and confirm your role.]', emphasized: true},
  {title: "What's next", description: '[Share an intention or question you want to explore next.]'},
];

export const techStack = {
  usingLabel: 'Currently using',
  usingNote: 'Repository-backed tools; personal use to confirm',
  using: [
    {label: 'Web development', items: [{name: 'React'}, {name: 'TypeScript'}, {name: 'HTML'}, {name: 'CSS'}]},
    {label: 'Programming', items: [{name: 'Python', note: 'lesson present'}]},
    {label: 'Content & design', items: [{name: 'Docusaurus'}, {name: 'MDX'}, {name: '[Design tool]'}]},
    {label: 'Development workflow', items: [{name: 'GitHub'}, {name: 'npm'}, {name: '[Editor]'}]},
  ] as TechCategory[],
  exploringLabel: 'Currently exploring',
  exploring: "[Add tools or topics you're actively learning.]",
};

export const philosophy = {
  words: ['Learn.', 'Create.', 'Contribute.'],
  lines: ['Học hỏi để hiểu biết.', 'Sáng tạo để khám phá.', 'Chia sẻ để cùng phát triển.'],
  footer: 'THE CYCLE CONTINUES ↗',
};

// Add a confirmed url to turn a placeholder into a link; mailto: works for email.
export const contactLinks: ContactLink[] = [
  {label: 'Email', value: '[Your public email]'},
  {label: 'GitHub', value: '[Your GitHub profile]'},
  {label: 'Facebook', value: '[Your public profile]'},
  {label: 'Elsewhere', value: '[Another place to connect]'},
];
export const contactNote = 'Contact destinations will become links after confirmation.';
