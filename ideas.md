# Tuition Teacher Website — Design Direction

## Three Directional Explorations

### 1. The Marginalia Classroom

**Very Brief Intro:** A warm editorial learning journal where annotations, ruled paper, and carefully assembled diagrams make education feel considered rather than templated. It puts clarity at the center, with real space for a teacher portrait when supplied.

**Probability:** 0.07

### 2. The Quiet Studio

**Very Brief Intro:** A serene, gallery-like education brand built from generous whitespace, tactile paper tones, and precise typographic hierarchy. It signals parent confidence while leaving enough visual curiosity for students.

**Probability:** 0.04

### 3. The Concept Atlas

**Very Brief Intro:** A structured knowledge landscape in which subject fragments and learning stages form a navigable visual map. It is more exploratory and interactive, but risks competing with the teacher’s human presence.

**Probability:** 0.09

---

## Selected Direction — The Marginalia Classroom

### Design Movement

**Contemporary editorial design** meeting the warmth of a considered learning journal. The visual reference is not a traditional school worksheet; it is the pleasure of seeing a difficult idea become legible through hierarchy, annotation, and patient structure.

### Core Principles

1. **Clarity is visual:** Content is arranged with deliberate hierarchy, clean measure, and generous negative space so parents can make decisions quickly.
2. **Learning leaves a trace:** Editorial rules, circled reference points, and diagram fragments make the teaching philosophy tangible without becoming childish decoration.
3. **Human trust precedes conversion:** The site foregrounds the teacher’s combined school and tuition experience without inventing credentials, outcomes, or social proof.
4. **Every motion has a teaching purpose:** Build, reveal, and state-change animations show relationships or progress; no decorative scroll theatre.

### Color Philosophy

The ground is a **warm archival paper** rather than a clinical white page, giving the site an approachable, lived-in academic feeling. Ink-black anchors credibility and readability. A muted **burnt vermilion** is the ownable annotation color: it appears only where attention should be directed, like a thoughtful teacher’s mark in a margin. Faded cornflower and pale sage support subject differentiation without defaulting to an “education blue-and-green” brand.

### Layout Paradigm

The page is composed as an **editorial manuscript** rather than a repeated grid. A narrow left rail carries orientation, section index, and small notes on larger screens; primary content occupies changing columns and asymmetrical spreads. Full-width moments create breathing room between chapters. On tablets the rail becomes an inline chapter marker; on mobile it becomes a compact progress label above each section.

### Signature Elements

1. **Annotation marks:** Small numbered dots, underlines, and marginal labels guide attention to meaningful facts.
2. **Knowledge fragments:** Fine-line visual fragments—an equation, a sentence diagram, a timeline—not as literal curricular claims, but as abstract cues of multidisciplinary learning.
3. **The learning ribbon:** A horizontal, responsive sequence that joins “understand, practise, notice, revisit, improve” as connected editorial beats rather than generic cards.

### Interaction Philosophy

Interactions should reward curiosity and maintain parent confidence. Navigation uses an unobtrusive chapter system; on hover and focus, annotation details become clearer rather than louder. The enquiry area is direct and reassuring, with conventional fields and no forced account creation. All interactions remain usable by keyboard and offer visible focus states.

### Animation

At first view, only the hero composition and its annotations reveal in a short stagger using transforms and opacity. As sections enter the viewport, rules draw and content settles into place in under 300 ms; the learning ribbon can indicate progression with a single connected line. Hover states are restrained, with tiny positional shifts or underline growth. Animations are disabled or shortened for `prefers-reduced-motion`, and scrolling is never hijacked.

### Typography System

**DM Serif Display** provides the editorial voice for large headings and selected emphasis; it should be used with restraint at weights 400–500 and close tracking. **Manrope** provides the practical, highly legible interface and body voice at weights 400, 500, 600, and 700. Body text targets a relaxed 1.6–1.75 line-height. Data-like details such as class ranges and experience use Manrope’s tabular figures, tightly tracked, in small uppercase labels with adequate spacing. The hierarchy moves from compact labels to expressive serif headlines to measured reading text.

### Brand Essence

**A thoughtful Class 1–10 learning practice for families who value understanding before memorising.**

Personality: **assured, attentive, lucid.**

### Brand Voice

Headlines sound calm, direct, and concept-led. Calls to action feel like a practical next step, never like an aggressive conversion prompt. Microcopy anticipates parent questions without claiming missing facts.

Example headline: “Make room for understanding.”

Example CTA: “Tell me about your child’s learning needs.”

### Wordmark & Logo

The wordmark is a custom-style serif treatment of **[TEACHER NAME]** with a small vermilion annotation dot used as the point of the visual identity. The standalone logo mark is an open book/page corner transformed into a single abstract **clarity lens**: two folded planes enclosing a precise circular point. It must remain readable as a small favicon and contain no text.

### Signature Brand Color

**Margin Vermilion — #C7523A.** A deliberate, warm red-orange used as a mark of attention, not as a dominant background.

---

## Hero Composition Exploration

### A. Editorial Education — Selected

A two-column manuscript spread: the left column carries the promise and practical facts; the right is reserved for a teacher portrait or a clearly marked portrait placeholder framed by paper folds, a handwritten-style annotation dot, and small academic fragments. It balances trust, specificity, and a premium visual opening.

### B. Learning Canvas

An interactive collage of abstract mathematics, language, science, and timeline fragments that converge toward a central “understanding” idea. This feels vivid but places the visual concept ahead of the teacher, so it is not selected as the primary hero.

### C. Human Teacher

A generous, photograph-first portrait with minimal type, welcoming copy, and a narrow experience ledger. This is highly trustworthy once professional imagery is supplied, but it has less distinctive visual storytelling while a real portrait is unavailable.

---

## Deliberate Exclusions

The project will not use WebGL, shader effects, Spline scenes, stock classroom photography, automatic sliders, fake testimonials, invented qualification claims, gratuitous bento grids, excessive rounded cards, or scroll-jacking. Component-library primitives may support accessible inputs and accordions, but the site’s visible character must remain editorial and bespoke.

## Style Decisions

- The visible identity may retain **[TEACHER NAME]** until the real name is supplied, but the page will avoid impersonal “portrait to be added” staging copy. Above-the-fold trust is reinforced through a named practice and an editorial practice note, without inventing credentials or a fabricated teacher quote.
- Knowledge imagery is treated as connected evidence of method: annotation dots, learning sequences, explanation/practice/revision traces, and fine rules repeat across the manuscript instead of reading as isolated decorative collages.
- Vermilion remains a disciplined annotation colour. It signals attention, sequence, and emphasis; it will not become a generic surface accent.
- The enquiry UI is visually complete but intentionally states that final contact delivery needs to be connected, because no contact details or collection service have been supplied. No contact information, WhatsApp number, testimonial, result, or qualification will be fabricated.
- Every major chapter must keep a visible human tuition anchor. The visual system serves a named teacher-led practice, not an impersonal education product; credibility is expressed through the teacher-led hero note, classroom-and-tuition perspective, and a direct personal enquiry coda.
- Annotation dots, underlines, fine rules, and diagram fragments repeat as a continuous learning-journal language. Their role is to show that learning leaves a trace rather than to act as arbitrary decoration.
- Bright teaching colors are semantic signals: lime supports discovery and foundations, tangerine marks attention and action, lilac carries reflection, and sky suggests making an idea visible. Orchard green and warm paper remain the credible base.
- The clarity-lens identity mark uses a page-corner-like outer form, an open circular lens, and a vermilion annotation point. The temporary `[TEACHER NAME]` wordmark is custom treated with an editorial underline until final branding is supplied.
- Bricolage Grotesque is reserved for hero statements, chapter headlines, and teaching-card titles. Anthropic Sans carries explanatory copy, enquiry details, FAQs, labels, and practical parent information so the page maintains editorial pacing.
- The SayBriefly-like energy is continuously counterbalanced by a visible teacher-led practice cue; personal tuition, calm parent-facing language, and an attentive educator’s point of view are always clearer than product or workflow metaphors.
- Orchard green and warm paper are the main brand atmosphere. Lime represents discovery, tangerine signals action, lilac indicates reflection, and sky relates to making an idea visible; saturated color surfaces do not replace the calm base.

---

## Reference Adaptation — SayBriefly

The user has directed the site toward [SayBriefly](https://saybriefly.com/) as the current visual reference. This reference **supersedes** the earlier Marginalia Classroom direction where the two conflict, while preserving the tuition content and avoiding any reuse of SayBriefly’s name, copy, proprietary graphics, or product-specific claims.

### Reference-led Decisions

- The layout follows a confident marketing-story rhythm: a large typographic hero, an illustrated practice board, high-contrast statement bands, named process stages, colorful teaching cards, and a focused contact coda.
- **Bricolage Grotesque** is the display voice, while **Anthropic Sans** remains the practical UI and reading voice.
- Orchard green, warm paper, learning lime, tangerine, lilac, and sky form a playful but bounded teaching palette.
- Motion is used to stage the story: hero entrance, progress line, orbit movement, process-route draw, card lifts, and scroll reveals. It must retain full keyboard and reduced-motion support.
- The design remains original: teacher-centred learning content, custom CSS diagrams, and generated education imagery replace the reference’s SaaS product cards and assets.

### Loading Prelude

On each initial visit, a short, full-screen **Learning Prelude** establishes the teaching philosophy before the site opens. It centres three paper-like notes — **Ask**, **Try**, and **Return** — around a changing learning concept, with a genuine timed progress line and a vertical handoff into the page. The character is inspired by the organic, high-energy composition of Aardvark Book Club and the deliberate opening pause of SayBriefly, but uses entirely original labels, shapes, timing, and colours. It must be under two seconds, must not block reduced-motion users, and must never present fake asset-loading claims.
