import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  ArrowDownRight,
  ArrowUpRight,
  Blocks,
  BookOpenCheck,
  Braces,
  Code2,
  Container,
  Database,
  Github,
  Linkedin,
  Mail,
  Menu,
  Network,
  ShieldCheck,
  X,
} from "lucide-react";
import { FaAws } from "react-icons/fa6";
import {
  SiDocker,
  SiFreecodecamp,
  SiGit,
  SiGithub,
  SiHuggingface,
  SiJavascript,
  SiJsonwebtokens,
  SiNestjs,
  SiNodedotjs,
  SiPostgresql,
  SiPostman,
  SiTypeorm,
  SiTypescript,
  SiUdacity,
} from "react-icons/si";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import data from "@/data/portfolio.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Naif Alqubalee | Backend Software Engineer" },
      { name: "description", content: "Backend Software Engineer specializing in secure, scalable NestJS, Node.js, TypeScript, and PostgreSQL systems." },
      { property: "og:title", content: "Naif Alqubalee | Backend Software Engineer" },
      { property: "og:description", content: "Explore backend projects, skills, and certifications focused on secure, scalable systems." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PortfolioPage,
});

const icons = {
  ArrowUpRight, Blocks, BookOpenCheck, Braces, Code2, Container,
  Database, Github, Linkedin, Mail, Network, ShieldCheck,
};

type IconName = keyof typeof icons;

function Reveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: reduced ? 0 : 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: reduced ? 0 : 0.26, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

function IconByName({ name, className = "size-5" }: { name: string; className?: string }) {
  const Icon = icons[name as IconName] ?? Code2;
  return <Icon className={className} aria-hidden="true" />;
}

function PortfolioPage() {
  const [activeSection, setActiveSection] = useState("about");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const sections = data.navigation
      .map((item) => document.querySelector(item.href))
      .filter((section): section is Element => Boolean(section));
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActiveSection(visible.target.id);
      },
      { rootMargin: "-18% 0px -65%", threshold: [0.05, 0.25, 0.5] },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <>
      <a href="#main-content" className="skip-link">Skip to content</a>
      <header className="site-header">
        <div className="shell header-inner">
          <a href="#top" className="brand focus-ring" aria-label={`${data.person.name}, home`} onClick={(event) => { event.preventDefault(); scrollTo("#top"); }}>
            <span className="brand-mark" aria-hidden="true">{data.person.initials}</span>
            <span className="brand-copy"><strong>{data.person.name}</strong><small><span />{data.person.role}</small></span>
          </a>
          <nav className="desktop-nav" aria-label="Primary navigation">
            {data.navigation.map((item) => (
              <a key={item.href} href={item.href} onClick={(event) => { event.preventDefault(); scrollTo(item.href); }} className={`nav-link focus-ring ${activeSection === item.href.slice(1) ? "is-active" : ""}`} aria-current={activeSection === item.href.slice(1) ? "location" : undefined}>{item.label}</a>
            ))}
          </nav>
          <Button variant="outline" size="icon" className="menu-button" aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)}>
            {menuOpen ? <X /> : <Menu />}
          </Button>
        </div>
        <AnimatePresence>
          {menuOpen && (
            <motion.nav className="mobile-nav" aria-label="Mobile navigation" initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.18 }}>
              {data.navigation.map((item) => (
                <a key={item.href} href={item.href} onClick={(event) => { event.preventDefault(); scrollTo(item.href); }} className={`mobile-nav-link focus-ring ${activeSection === item.href.slice(1) ? "is-active" : ""}`}>{item.label}</a>
              ))}
            </motion.nav>
          )}
        </AnimatePresence>
      </header>

      <main id="main-content">
        <section id="top" className="hero-section">
          <div className="shell hero-grid">
            <div className="hero-copy">
              <div className="availability"><span className="availability-dot"><i /></span>{data.person.availability}</div>
              <h1><span>Backend Software Engineer</span><em>building secure, scalable, and maintainable systems.</em></h1>
              <p className="hero-subtitle">Specializing in <strong>NestJS</strong>, <strong>Node.js</strong>,{" "}
                <strong>TypeScript</strong>, and <strong>PostgreSQL</strong>.</p>
              <div className="hero-actions">
                <Button size="lg" asChild><a href="#projects" onClick={(event) => { event.preventDefault(); scrollTo("#projects"); }}>View Projects <ArrowDownRight /></a></Button>
                <Button size="lg" variant="outline" asChild><a href="#contact" onClick={(event) => { event.preventDefault(); scrollTo("#contact"); }}>Contact Me</a></Button>
              </div>
              <div className="hero-facts"><div><span>Focus</span><strong>Type-safe systems</strong></div><div><span>Approach</span><strong>Security first</strong></div><div><span>Location</span><strong>{data.person.location}</strong></div></div>
            </div>
            <CodePanel />
          </div>
        </section>

        <section id="about" className="section section-tinted" aria-labelledby="about-title">
          <div className="shell">
            <SectionHeading eyebrow="01 / About" title="Engineering with intention." id="about-title" description="I care about the decisions behind the code—not just whether it runs." />
            <Reveal className="philosophy-card">
              <div className="philosophy-copy"><p>{data.person.bio}</p></div>
              <div className="principles" aria-label="Engineering principles">
                {data.principles.map((principle) => <div className="principle" key={principle.label}><span className="principle-icon"><IconByName name={principle.icon} /></span><span>{principle.label}</span></div>)}
              </div>
            </Reveal>
          </div>
        </section>

        <section id="skills" className="section" aria-labelledby="skills-title">
          <div className="shell">
            <SectionHeading eyebrow="02 / Expertise" title="Tools I trust to build well." id="skills-title" description="A focused stack for dependable services, from request validation to deployment." />
            <div className="skills-grid">
              {data.skills.map((group, index) => (
                <Reveal key={group.category} className={`skill-card skill-card-${index + 1}`}>
                  <div className="skill-card-head"><span className="skill-icon"><IconByName name={group.icon} /></span><span className="skill-index">0{index + 1}</span></div>
                  <h3>{group.category}</h3>
                  <ul>{group.items.map((skill) => <li key={skill}><TechMark name={skill} />{skill}</li>)}</ul>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="projects" className="section section-tinted" aria-labelledby="projects-title">
          <div className="shell">
            <SectionHeading eyebrow="03 / Selected Work" title="Systems built for the real world." id="projects-title" description="Backend projects shaped around security, maintainability, and clear domain logic." />
            <div className="projects-grid">
              {data.projects.map((project) => (
                <Reveal className={`project-card project-card-${(data.projects.indexOf(project) % 4) + 1}`} key={project.title}>
                  <div className="project-top"><span className="project-date">{project.date}</span><a href={project.repository} target="_blank" rel="noopener noreferrer" className="icon-link focus-ring" aria-label={`View ${project.title} repository on GitHub`}><ArrowUpRight /></a></div>
                  <div><h3>{project.title}</h3><p className="project-subtitle">{project.subtitle}</p></div>
                  <p className="project-description">{project.description}</p>
                  <ul className="tag-list" aria-label={`${project.title} technologies`}>{project.technologies.map((technology) => <li key={technology}>{technology}</li>)}</ul>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="certifications" className="section" aria-labelledby="certifications-title">
          <div className="shell">
            <SectionHeading eyebrow="04 / Credentials" title="Always learning, always sharpening." id="certifications-title" description="Practical learning across backend engineering, cloud, AI, and product thinking." />
            <div className="cert-grid">
              {data.certifications.map((certification) => (
                <Reveal className="cert-card" key={certification.title}>
                  <CredentialMark name={certification.icon} />
                  <div><span className="cert-issuer">{certification.issuer}</span><h3>{certification.title}</h3><p>{certification.credential}</p></div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <ContactSection />
      </main>
      <footer><div className="shell footer-inner"><p>© 2026 {data.person.copyright}</p><a href="#top" className="back-to-top focus-ring" onClick={(event) => { event.preventDefault(); scrollTo("#top"); }}>Back to top <ArrowUpRight /></a></div></footer>
    </>
  );
}

function SectionHeading({ eyebrow, title, description, id }: { eyebrow: string; title: string; description: string; id: string }) {
  return <Reveal className="section-heading"><span className="eyebrow">{eyebrow}</span><h2 id={id}>{title}</h2><p>{description}</p></Reveal>;
}

function TechMark({ name }: { name: string }) {
  const marks: Record<string, React.ComponentType<{ className?: string }>> = {
    TypeScript: SiTypescript,
    JavaScript: SiJavascript,
    "Node.js": SiNodedotjs,
    NestJS: SiNestjs,
    TypeORM: SiTypeorm,
    PostgreSQL: SiPostgresql,
    Docker: SiDocker,
    Git: SiGit,
    GitHub: SiGithub,
    Postman: SiPostman,
    JWT: SiJsonwebtokens,
    "Relational Database Design": Database,
    "Role-Based Access Control (RBAC)": ShieldCheck,
  };
  const key = name.toLowerCase().replace(/[^a-z]/g, "");
  const Mark = marks[name] ?? Code2;
  return <span className={`tech-mark tech-${key}`} aria-hidden="true"><Mark className="tech-logo" /></span>;
}

function CredentialMark({ name }: { name: string }) {
  const marks: Record<string, React.ComponentType<{ className?: string }>> = {
    HuggingFace: SiHuggingface,
    AWS: FaAws,
    Udacity: SiUdacity,
    FreeCodeCamp: SiFreecodecamp,
  };
  const Mark = marks[name];

  if (Mark) {
    return <span className={`cert-icon cert-${name.toLowerCase()}`} aria-hidden="true"><Mark className="cert-logo" /></span>;
  }

  const initials = name === "Datacom" ? "DC" : "F";
  return <span className={`cert-icon cert-${name.toLowerCase()} cert-lettermark`} aria-hidden="true">{initials}</span>;
}

function CodePanel() {
  const reduced = useReducedMotion();
  const lines = [
    <><span className="code-decorator">@Controller</span><span>('projects')</span></>,
    <><span className="code-keyword">export class</span><span className="code-type"> ProjectsController </span><span>{"{"}</span></>,
    <><span>  constructor(</span></>,
    <><span className="code-keyword">    private readonly</span><span> service: </span><span className="code-type">ProjectsService</span><span>,</span></>,
    <><span>  ) {"{}"}</span></>,
    <><span> </span></>,
    <><span className="code-decorator">  @Get</span><span>()</span></>,
    <><span className="code-keyword">  async</span><span className="code-function"> findAll</span><span>() {"{"}</span></>,
    <><span className="code-keyword">    return</span><span> this.service.</span><span className="code-function">findAll</span><span>();</span></>,
    <><span>  {"}"}</span></>,
    <><span>{"}"}</span></>,
  ];
  return (
    <motion.div className="code-window" initial={{ opacity: 0, y: reduced ? 0 : 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduced ? 0 : 0.35 }} aria-label="NestJS controller code example">
      <div className="code-toolbar"><div className="window-dots" aria-hidden="true"><span /><span /><span /></div><span>projects.controller.ts</span><span className="code-status"><span /> NestJS</span></div>
      <pre><code>{lines.map((line, index) => <motion.span className="code-line" key={index} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: reduced ? 0 : 0.15 + index * 0.055, duration: reduced ? 0 : 0.2 }}><span className="line-number" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span><span>{line}</span></motion.span>)}</code></pre>
      <div className="code-footer"><span className="code-ready"><span /> API ready</span><span>TypeScript</span></div>
    </motion.div>
  );
}

function ContactSection() {
  return (
    <section id="contact" className="section contact-section" aria-labelledby="contact-title">
      <div className="shell">
        <Reveal className="contact-intro">
          <span className="eyebrow">05 / Contact</span><h2 id="contact-title">Let’s build something dependable.</h2><p>Have a backend challenge, a role, or an idea worth exploring? I’m always open to a thoughtful conversation.</p>
          <div className="social-links">{data.socials.map((social) => <a key={social.label} href={social.url} target={social.url.startsWith("http") ? "_blank" : undefined} rel={social.url.startsWith("http") ? "noopener noreferrer" : undefined} className="social-link focus-ring" aria-label={social.url.startsWith("http") ? `Visit ${social.label} profile` : `Email ${data.person.name}`}><span className="social-icon"><IconByName name={social.icon} /></span><span><small>Connect via</small>{social.label}</span><ArrowUpRight /></a>)}</div>
        </Reveal>
      </div>
    </section>
  );
}
