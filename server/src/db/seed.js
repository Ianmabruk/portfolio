const bcrypt = require('bcryptjs');
const { db } = require('../config/database');

const hash = bcrypt.hashSync('admin123', 10);

const seedServices = [
  ['Web Development', 'web-development', 'Modern responsive websites and web applications built with cutting-edge technologies.', '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m18 16 4-4-4-4"/><path d="m6 8-4 4 4 4"/><path d="m14.5 4-5 16"/></svg>', null, 1, 1, 1],
  ['Software Development', 'software-development', 'Custom software designed around your business requirements and goals.', '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="8" x="5" y="2" rx="2"/><rect width="20" height="8" x="2" y="14" rx="2"/><path d="M6 18h2"/><path d="M12 18h6"/></svg>', null, 1, 2, 1],
  ['UI/UX Design', 'ui-ux-design', 'Clean, intuitive digital experiences that delight users and drive engagement.', '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>', null, 0, 3, 1],
  ['E-commerce', 'e-commerce', 'Modern online stores and digital commerce systems that convert visitors into customers.', '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>', null, 1, 4, 1],
  ['Mobile Applications', 'mobile-applications', 'Mobile-first digital products and applications for iOS and Android.', '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="20" x="5" y="2" rx="2" ry="2"/><path d="M12 18h.01"/></svg>', null, 0, 5, 1],
  ['Digital Strategy', 'digital-strategy', 'Technology and digital transformation strategy to accelerate your business growth.', '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3v18h18"/><path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3"/></svg>', null, 0, 6, 1],
];

const seedProjects = [
  ['Luxury Fashion Store', 'luxury-fashion-store', 'Elegance Fashion', 'E-commerce', 'A premium e-commerce platform for a luxury fashion brand with seamless shopping experience.', 'The client needed a sophisticated online presence that matched their brand identity.', 'We built a high-performance Shopify Plus store with custom theme development.', 'Discovery, Design, Development, Launch', 'Shopify, Liquid, JavaScript, CSS', '40% increase in online sales within 3 months', null, 2024, 'https://example.com', null, 1, 1, 1],
  ['SaaS Dashboard', 'saas-dashboard', 'TechFlow', 'Software', 'A comprehensive analytics dashboard for a B2B SaaS platform.', 'The client needed real-time analytics and reporting capabilities.', 'We developed a React-based dashboard with advanced data visualization.', 'Discovery, Design, Development', 'React, Node.js, PostgreSQL, D3.js', '60% reduction in report generation time', null, 2024, 'https://example.com', null, 1, 2, 1],
  ['Corporate Website', 'corporate-website', 'Apex Corp', 'Websites', 'A modern corporate website for a global consulting firm.', 'The client needed a professional web presence to attract enterprise clients.', 'We designed and developed a clean, fast, and accessible corporate site.', 'Discovery, Design, Development, SEO', 'Next.js, Tailwind CSS, Vercel', '25% increase in qualified leads', null, 2024, 'https://example.com', null, 1, 3, 1],
];

const seedTestimonials = [
  ['Sarah Johnson', 'Elegance Fashion', 'CEO', null, 'Mabrix transformed our online store. The attention to detail and technical excellence exceeded our expectations.', 5, 'Luxury Fashion Store', 1, 1, 1],
  ['Michael Chen', 'TechFlow', 'CTO', null, 'Working with Mabrix was a game-changer. They delivered a robust dashboard that our team loves using daily.', 5, 'SaaS Dashboard', 1, 2, 1],
  ['David Miller', 'Apex Corp', 'Marketing Director', null, 'Professional, responsive, and incredibly skilled. Mabrix is our go-to digital partner.', 5, 'Corporate Website', 1, 3, 1],
];

const seedPlans = [
  ['Starter', 'starter', 2500, 'monthly', 'Perfect for small businesses looking to establish their online presence.', 'Website Design\nResponsive Layout\nBasic SEO\n30-Day Support', 0, 1, 1],
  ['Professional', 'professional', 5000, 'monthly', 'Ideal for growing businesses that need a comprehensive digital solution.', 'Full Website Development\nE-commerce Integration\nAdvanced SEO\n90-Day Support', 1, 1, 2],
  ['Enterprise', 'enterprise', 15000, 'monthly', 'Custom solutions for large organizations with complex requirements.', 'Custom Software Development\nDedicated Team\nPriority Support\n12-Month Partnership', 0, 1, 3],
];

const seedSocialLinks = [
  ['Instagram', 'https://instagram.com/mabrix', 1, 1],
  ['LinkedIn', 'https://linkedin.com/company/mabrix', 1, 2],
  ['X', 'https://x.com/mabrix', 1, 3],
  ['YouTube', 'https://youtube.com/@mabrix', 1, 4],
];

const insert = db.prepare('INSERT OR IGNORE INTO services (title, slug, description, icon, image, featured, active, ordering) VALUES (?, ?, ?, ?, ?, ?, ?, ?)');
seedServices.forEach(s => insert.run(...s));

const insertProject = db.prepare('INSERT OR IGNORE INTO portfolio_projects (title, slug, client, category, description, challenge, solution, process, technologies, results, testimonial, year, project_url, cover_image, featured, active, ordering) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)');
seedProjects.forEach(p => insertProject.run(...p));

const insertTestimonial = db.prepare('INSERT OR IGNORE INTO testimonials (name, company, role, image_url, testimonial, rating, project_reference, featured, active, ordering) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)');
seedTestimonials.forEach(t => insertTestimonial.run(...t));

const insertPlan = db.prepare('INSERT OR IGNORE INTO plans (name, slug, price, billing_period, description, features, featured, active, ordering) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)');
seedPlans.forEach(p => insertPlan.run(...p));

const insertSocial = db.prepare('INSERT OR IGNORE INTO social_links (platform, url, active, ordering) VALUES (?, ?, ?, ?)');
seedSocialLinks.forEach(s => insertSocial.run(...s));

console.log('Seed data inserted successfully');
