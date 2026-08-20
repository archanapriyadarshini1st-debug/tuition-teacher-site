/**
 * DESIGN REMINDER — The Learning Brief
 * An original tuition-site interpretation of a bold, editorial product launch: oversized Bricolage type,
 * orchard-green grounds, energetic learning diagrams, and one clear idea per visual moment.
 */
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useGSAP } from "@gsap/react";
import { AnimatePresence, cubicBezier, motion, useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDown, ArrowUpRight, BookOpen, Brain, Check, ChevronRight, Lightbulb, Menu, PenLine, Sparkles } from "lucide-react";
import { useEffect, useRef, useState } from "react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const focusAreas = [
  {
    id: "01",
    age: "Class 1–5",
    title: "Build the foundations.",
    copy: "Reading, number sense, curiosity, and the confidence to say, ‘I don’t understand yet.’",
    tone: "lime",
    icon: BookOpen,
  },
  {
    id: "02",
    age: "Class 6–8",
    title: "Make the connections.",
    copy: "Link ideas across subjects, identify the missing step, and turn practice into genuine progress.",
    tone: "orange",
    icon: Brain,
  },
  {
    id: "03",
    age: "Class 9–10",
    title: "Prepare with purpose.",
    copy: "A calm, structured revision rhythm that builds understanding before examination confidence.",
    tone: "paper",
    icon: PenLine,
  },
];

const questions = [
  {
    question: "Which classes are supported?",
    answer: "Tuition is available from Class 1 through Class 10, with the lesson plan shaped around the learner’s current stage and needs.",
  },
  {
    question: "Which subjects are taught?",
    answer: "All core school subjects can be supported. The first conversation identifies the subjects, topics, and study habits that need the most attention.",
  },
  {
    question: "Are lessons available online or offline?",
    answer: "Both formats are possible. The most suitable format can be selected around the family’s schedule, location, and the student’s learning preference.",
  },
  {
    question: "What should I share in an enquiry?",
    answer: "Please share the learner’s class, subjects or topics to focus on, preferred lesson format, and the best way to get in touch.",
  },
];

const loaderExitEase = cubicBezier(0.77, 0, 0.175, 1);
const loaderProgressEase = cubicBezier(0.16, 1, 0.3, 1);
const publicAsset = (fileName: string) => `${import.meta.env.BASE_URL}assets/${fileName}`;

function LearningRoute({ reduceMotion }: { reduceMotion: boolean | null }) {
  return (
    <motion.svg className="learning-route" viewBox="0 0 480 96" fill="none" aria-hidden="true" initial={reduceMotion ? false : "hidden"} whileInView="visible" viewport={{ once: true, amount: 0.6 }}>
      <motion.path d="M8 72C61 72 69 18 121 28C172 38 186 85 241 61C289 39 303 12 354 26C398 38 414 71 472 20" variants={{ hidden: { pathLength: 0, opacity: 0 }, visible: { pathLength: 1, opacity: 1, transition: { duration: 1.25, ease: "easeOut" } } }} />
      {[121, 241, 354].map((cx, index) => (
        <motion.circle key={cx} cx={cx} cy={index === 0 ? 28 : index === 1 ? 61 : 26} r="6" variants={{ hidden: { scale: 0, opacity: 0 }, visible: { scale: 1, opacity: 1, transition: { delay: 0.32 + index * 0.22, type: "spring", stiffness: 340, damping: 21 } } }} />
      ))}
    </motion.svg>
  );
}

function LearningLoader({ reduceMotion }: { reduceMotion: boolean | null }) {
  const [wordIndex, setWordIndex] = useState(0);
  const words = ["Notice", "Connect", "Understand"];

  useEffect(() => {
    if (reduceMotion) return;
    const interval = window.setInterval(() => setWordIndex((value) => (value + 1) % words.length), 640);
    return () => window.clearInterval(interval);
  }, [reduceMotion]);

  return (
    <motion.div className="learning-loader" initial={{ opacity: 1 }} exit={{ y: "-100%", transition: { duration: reduceMotion ? 0.01 : 0.94, ease: loaderExitEase } }} aria-live="polite" aria-label="Preparing the learning brief">
      <div className="loader-grain" aria-hidden="true" />
      <div className="loader-topline"><span>[TEACHER NAME]</span><span>Preparing your learning brief</span></div>
      <div className="loader-stage">
        <motion.div className="loader-orbit loader-orbit-one" aria-hidden="true" animate={reduceMotion ? undefined : { rotate: 360 }} transition={{ duration: 9, ease: "linear", repeat: Infinity }} />
        <motion.div className="loader-orbit loader-orbit-two" aria-hidden="true" animate={reduceMotion ? undefined : { rotate: -360 }} transition={{ duration: 13, ease: "linear", repeat: Infinity }} />
        <motion.div className="loader-note loader-note-one" initial={reduceMotion ? false : { opacity: 0, x: -28, y: 20, rotate: -12, scale: 0.88 }} animate={{ opacity: 1, x: 0, y: 0, rotate: -8, scale: 1 }} transition={{ delay: 0.15, type: "spring", stiffness: 185, damping: 21 }}><span>Ask</span><i /></motion.div>
        <motion.div className="loader-note loader-note-two" initial={reduceMotion ? false : { opacity: 0, x: 32, y: -18, rotate: 14, scale: 0.88 }} animate={{ opacity: 1, x: 0, y: 0, rotate: 8, scale: 1 }} transition={{ delay: 0.34, type: "spring", stiffness: 185, damping: 21 }}><span>Try</span><i /></motion.div>
        <motion.div className="loader-note loader-note-three" initial={reduceMotion ? false : { opacity: 0, y: 30, rotate: 2, scale: 0.88 }} animate={{ opacity: 1, y: 0, rotate: 0, scale: 1 }} transition={{ delay: 0.53, type: "spring", stiffness: 185, damping: 21 }}><span>Return</span><i /></motion.div>
        <motion.div className="loader-core" initial={reduceMotion ? false : { opacity: 0, scale: 0.86, rotate: -4 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} transition={{ delay: 0.28, type: "spring", stiffness: 160, damping: 18 }}><span className="loader-core-mark">✦</span><AnimatePresence mode="wait"><motion.strong key={wordIndex} initial={{ opacity: 0, y: 13, filter: "blur(4px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} exit={{ opacity: 0, y: -13, filter: "blur(4px)" }} transition={{ duration: reduceMotion ? 0.01 : 0.3, ease: "easeOut" }}>{words[wordIndex]}</motion.strong></AnimatePresence><small>is where it starts</small></motion.div>
      </div>
      <div className="loader-footer"><span>01 / 01</span><div className="loader-progress"><motion.i initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: reduceMotion ? 0.01 : 2.44, ease: loaderProgressEase }} /></div><span>Class 1–10</span></div>
    </motion.div>
  );
}

export default function Home() {
  const pageRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    if (!showLoader) return;
    const duration = reduceMotion ? 120 : 2600;
    const timeout = window.setTimeout(() => setShowLoader(false), duration);
    return () => window.clearTimeout(timeout);
  }, [reduceMotion, showLoader]);

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    if (showLoader) document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [showLoader]);

  useGSAP(() => {
    if (reduceMotion) return;

    const intro = gsap.timeline({ defaults: { ease: "power3.out" } });
    intro
      .from("[data-header]", { autoAlpha: 0, y: -14, duration: 0.5 })
      .from("[data-hero-eyebrow]", { autoAlpha: 0, y: 12, duration: 0.34 }, "-=0.16")
      .from("[data-hero-title]", { autoAlpha: 0, y: 52, duration: 0.78 }, "-=0.12")
      .from("[data-hero-copy]", { autoAlpha: 0, y: 20, duration: 0.52 }, "-=0.42")
      .from("[data-hero-action]", { autoAlpha: 0, y: 14, stagger: 0.08, duration: 0.38 }, "-=0.28")
      .from("[data-hero-board]", { autoAlpha: 0, x: 34, rotate: 2.5, duration: 0.82 }, "-=0.44")
      .from("[data-orbit-badge]", { autoAlpha: 0, scale: 0.78, rotate: -16, duration: 0.54 }, "-=0.48");

    gsap.to("[data-page-progress]", {
      scaleX: 1,
      transformOrigin: "left center",
      ease: "none",
      scrollTrigger: { trigger: ".learning-brief", start: "top top", end: "bottom bottom", scrub: 0.3 },
    });

    gsap.to("[data-hero-orbit]", {
      rotate: 48,
      ease: "none",
      scrollTrigger: { trigger: ".brief-hero", start: "top top", end: "bottom top", scrub: 1.1 },
    });

    gsap.to("[data-hero-board]", {
      y: -34,
      ease: "none",
      scrollTrigger: { trigger: ".brief-hero", start: "top top", end: "bottom top", scrub: 0.85 },
    });

    gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((section) => {
      const children = section.querySelectorAll<HTMLElement>("[data-reveal-item]");
      gsap.from(children, {
        autoAlpha: 0,
        y: 30,
        stagger: 0.1,
        duration: 0.68,
        ease: "power3.out",
        immediateRender: false,
        scrollTrigger: { trigger: section, start: "top 78%", once: true },
      });
    });

    gsap.from("[data-focus-card]", {
      autoAlpha: 0,
      y: 34,
      rotate: (index) => (index === 1 ? -2 : index === 2 ? 2 : 0),
      stagger: 0.13,
      duration: 0.72,
      ease: "power3.out",
      immediateRender: false,
      scrollTrigger: { trigger: ".focus-grid", start: "top 77%", once: true },
    });

    gsap.from("[data-question]", {
      autoAlpha: 0,
      x: 18,
      stagger: 0.1,
      duration: 0.46,
      ease: "power3.out",
      immediateRender: false,
      scrollTrigger: { trigger: ".questions-list", start: "top 79%", once: true },
    });
  }, { scope: pageRef, dependencies: [reduceMotion], revertOnUpdate: true });

  return (
    <div className="learning-brief" ref={pageRef}>
      <a href="#main" className="skip-link">Skip to content</a>

      <AnimatePresence>{showLoader && <LearningLoader reduceMotion={reduceMotion} />}</AnimatePresence>

      <header className="brief-header" data-header>
        <div className="brief-shell header-row">
          <a href="#top" className="brief-brand" aria-label="[TEACHER NAME] home">
            <span className="brand-sigil" aria-hidden="true"><Sparkles size={18} /></span>
            <span>[TEACHER NAME]</span>
          </a>
          <nav className="brief-nav" aria-label="Primary navigation">
            <a href="#method">Method</a>
            <a href="#focus">Focus areas</a>
            <a href="#questions">Questions</a>
            <a className="nav-action" href="#contact">Enquire <ArrowUpRight size={15} aria-hidden="true" /></a>
          </nav>
          <details className="brief-mobile-nav">
            <summary><Menu size={20} aria-hidden="true" /><span>Menu</span></summary>
            <nav aria-label="Mobile navigation">
              <a href="#method">Method</a>
              <a href="#focus">Focus areas</a>
              <a href="#questions">Questions</a>
              <a href="#contact">Enquire</a>
            </nav>
          </details>
        </div>
        <span className="brief-progress" data-page-progress aria-hidden="true" />
      </header>

      <main id="main">
        <section className="brief-hero" id="top" aria-labelledby="brief-title">
          <div className="hero-sun hero-sun-one" data-hero-orbit aria-hidden="true" />
          <div className="hero-sun hero-sun-two" aria-hidden="true" />
          <div className="brief-shell hero-layout">
            <div className="hero-message">
              <p className="hero-eyebrow" data-hero-eyebrow><span /> Private tuition for Class 1–10</p>
              <h1 id="brief-title" data-hero-title>Understand the work.<br /><em>Own the answer.</em></h1>
              <p className="hero-summary" data-hero-copy>Thoughtful all-subject tuition that turns a student’s “I’m stuck” into a calm, practical next step — online or offline.</p>
              <div className="hero-cta-row">
                <motion.a className="brief-button brief-button-dark" href="#contact" data-hero-action whileHover={{ y: -3, scale: 1.015 }} whileTap={{ scale: 0.97 }} transition={{ type: "spring", stiffness: 480, damping: 28 }}><span>Start a learning brief</span><ArrowDown size={17} aria-hidden="true" /></motion.a>
                <motion.a className="brief-link" href="#method" data-hero-action whileHover={{ x: 5 }} whileTap={{ scale: 0.98 }} transition={{ type: "spring", stiffness: 500, damping: 30 }}>See how it works <ChevronRight size={18} aria-hidden="true" /></motion.a>
              </div>
              <ul className="hero-proof" aria-label="Teaching overview">
                <li>All core subjects</li><li>Online &amp; offline</li><li>Clear weekly rhythm</li>
              </ul>
            </div>

            <div className="hero-board" data-hero-board>
              <div className="board-topline"><span>Today’s learning brief</span><span>01 / 03</span></div>
              <div className="study-preview">
                <img src={publicAsset("tuition-hero-study.webp")} alt="A notebook, diagrams, and learning tools arranged on a desk" />
                <span className="study-sticker">Let’s trace<br />the why</span>
              </div>
              <div className="board-checklist">
                <div><span className="check-bullet"><Check size={13} /></span><strong>Find the missing step</strong></div>
                <div><span className="check-bullet"><Check size={13} /></span><strong>Practise it together</strong></div>
                <div><span className="check-bullet"><Check size={13} /></span><strong>Leave with a clear next move</strong></div>
              </div>
              <div className="orbit-badge" data-orbit-badge><Lightbulb size={19} /><span>click<br />moment</span></div>
            </div>
          </div>
        </section>

        <section className="no-more-band" aria-label="Tuition promise" data-reveal>
          <div className="brief-shell no-more-layout">
            <p data-reveal-item>No more <i>blank stares.</i><br />No more <i>last-minute cramming.</i></p>
            <div data-reveal-item>
              <span className="caps-label">Instead</span>
              <p>Every lesson starts with the part that feels unclear — and ends with a student who knows what to try next.</p>
            </div>
          </div>
        </section>

        <section className="method-section" id="method" data-reveal>
          <div className="brief-shell method-header">
            <div data-reveal-item><span className="caps-label">The learning loop / 01</span><h2>One clear idea<br />at a time.</h2></div>
            <p data-reveal-item>There is no mystery system. Just a thoughtful rhythm, repeated until learning begins to feel like something a student can steer.</p>
          </div>
          <div className="brief-shell method-board" data-reveal-item>
            <div className="method-image"><img src={publicAsset("tuition-learning-ribbon.webp")} alt="Abstract learning pathway with connected notes and marks" /></div>
            <div className="method-steps">
              <article><span>01</span><h3>Listen closely.</h3><p>Find the exact point where confidence drops away.</p></article>
              <article><span>02</span><h3>Make it visible.</h3><p>Draw it, map it, say it a different way.</p></article>
              <article><span>03</span><h3>Return to it.</h3><p>Practise until the learner can lead the explanation.</p></article>
            </div>
            <LearningRoute reduceMotion={reduceMotion} />
          </div>
        </section>

        <section className="focus-section" id="focus" data-reveal>
          <div className="brief-shell focus-heading">
            <div data-reveal-item><span className="caps-label">Learning by stage / 02</span><h2>The right kind of<br /><em>challenge.</em></h2></div>
            <p data-reveal-item>Support changes as a learner grows. The teaching stays personal, while the level of independence rises.</p>
          </div>
          <div className="brief-shell focus-grid">
            {focusAreas.map((area) => {
              const Icon = area.icon;
              return (
                <motion.article className={`focus-card ${area.tone}`} key={area.id} data-focus-card whileHover={{ y: -9, rotate: area.id === "02" ? 0 : area.id === "03" ? -1 : 1 }} whileTap={{ scale: 0.985 }} transition={{ type: "spring", stiffness: 300, damping: 24 }}>
                  <div className="focus-card-top"><span>{area.id}</span><Icon size={24} aria-hidden="true" /></div>
                  <span className="focus-age">{area.age}</span>
                  <h3>{area.title}</h3>
                  <p>{area.copy}</p>
                  <span className="focus-arrow">↗</span>
                </motion.article>
              );
            })}
          </div>
        </section>

        <section className="subject-section" data-reveal>
          <div className="brief-shell subject-layout">
            <div className="subject-copy" data-reveal-item>
              <span className="caps-label">Across the timetable / 03</span>
              <h2>Maths, language, science — and the habits beneath them.</h2>
              <p>All core subjects are supported. More importantly, each lesson also builds planning, recall, asking better questions, and returning to an idea without panic.</p>
              <div className="subject-tags"><span>Understand</span><span>Practise</span><span>Recall</span><span>Explain</span></div>
              <a className="brief-link" href="#contact">Discuss your child’s subjects <ArrowUpRight size={17} aria-hidden="true" /></a>
            </div>
            <div className="subject-poster" data-reveal-item>
              <img src={publicAsset("tuition-subject-atlas.webp")} alt="Abstract educational diagrams and subject fragments" />
              <div className="poster-star" aria-hidden="true">✦</div>
              <div className="poster-note">More than<br />a worksheet.</div>
            </div>
          </div>
        </section>

        <section className="experience-band" data-reveal>
          <div className="brief-shell experience-layout">
            <div data-reveal-item><span className="caps-label">A grounded guide / 04</span><h2>Classroom perspective.<br /><em>Tuition attention.</em></h2></div>
            <div className="experience-numbers" data-reveal-item>
              <div><strong>~4.9</strong><span>years of tuition teaching</span></div>
              <div><strong>~1–2</strong><span>years of school teaching</span></div>
            </div>
            <p className="experience-footnote" data-reveal-item>Enough experience to recognise a common stuck point. Enough attention to treat every student as an individual.</p>
          </div>
        </section>

        <section className="questions-section" id="questions" data-reveal>
          <div className="brief-shell questions-layout">
            <div data-reveal-item><span className="caps-label">Useful details / 05</span><h2>Good questions<br />are a great start.</h2></div>
            <Accordion type="single" collapsible className="questions-list" data-reveal-item>
              {questions.map((item, index) => (
                <AccordionItem value={`question-${index}`} key={item.question} data-question>
                  <AccordionTrigger><span className="question-number">0{index + 1}</span>{item.question}</AccordionTrigger>
                  <AccordionContent>{item.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        <section className="contact-section" id="contact" data-reveal>
          <div className="contact-spark" aria-hidden="true">✦</div>
          <div className="brief-shell contact-layout">
            <div data-reveal-item>
              <span className="caps-label">Start here / 06</span>
              <h2>Tell me about<br />your learner.</h2>
              <p>A few details are enough to begin: their class, what feels difficult, and how you would prefer to connect.</p>
            </div>
            <form className="brief-form" data-reveal-item onSubmit={(event) => event.preventDefault()}>
              <label>Parent / guardian name<input name="name" placeholder="Your name" autoComplete="name" /></label>
              <label>Email or phone<input name="contact" placeholder="How I can reply" autoComplete="email" /></label>
              <label>Student’s class<select name="class" defaultValue=""><option value="" disabled>Select a class</option><option>Class 1–5</option><option>Class 6–8</option><option>Class 9–10</option></select></label>
              <label>Preferred format<select name="format" defaultValue=""><option value="" disabled>Choose a format</option><option>Online</option><option>Offline</option><option>Open to either</option></select></label>
              <label className="form-wide">What would you like support with?<textarea name="message" placeholder="Subjects, topics, goals, or learning habits..." /></label>
              <div className="form-footer form-wide"><p>No pressure, no automated lesson plan. This simply begins a useful conversation.</p><motion.button type="submit" className="brief-button brief-button-light" whileHover={{ y: -3, scale: 1.015 }} whileTap={{ scale: 0.97 }} transition={{ type: "spring", stiffness: 480, damping: 28 }}>Send the brief <ArrowUpRight size={17} aria-hidden="true" /></motion.button></div>
            </form>
          </div>
        </section>
      </main>

      <footer className="brief-footer"><div className="brief-shell footer-row"><a href="#top" className="brief-brand"><span className="brand-sigil"><Sparkles size={16} /></span><span>[TEACHER NAME]</span></a><p>Learning gets lighter when it makes sense.</p><a href="#top">Back to top <ArrowUpRight size={15} aria-hidden="true" /></a></div></footer>
    </div>
  );
}
