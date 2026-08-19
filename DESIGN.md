# [TEACHER NAME] — The Learning Brief

## Visual Theme & Atmosphere

This is a premium, parent-facing tuition practice expressed as a **living learning brief**. It should feel assured, warm, high-energy, and carefully systemised rather than childlike or template-driven. The visual language combines orchard green, warm paper, citrus annotations, oversized display typography, and learning diagrams that make the teaching process feel tangible.

## Color Roles

| Token | Value | Role |
| --- | --- | --- |
| Orchard Green | `#143B20` | Primary reading text, dark grounds, and confident actions. |
| Warm Paper | `#FCFAF5` | Main page ground; never use clinical pure white as the default canvas. |
| Learning Lime | `#D8FF53` | Visible learning progress, energetic cards, and high-attention accents. |
| Tangerine | `#FF7047` | Signature annotation, progress, visual surprise, and key emphasis. |
| Lilac | `#DCC9FF` | Optimistic contrast surfaces and experience context. |
| Sky | `#B5DDF5` | Calm visual support for diagrams and learning imagery. |

## Typography Rules

Use **Bricolage Grotesque** for expressive headings, card titles, and memorable moments. Use **Anthropic Sans** for body text, navigation, labels, and form controls, with Manrope as the resilient fallback. Headline leading is compressed and energetic; reading copy remains calm and generously spaced. Small labels use the UI sans at 700–900, uppercase, with deliberate tracking. Numeric teaching figures use tabular numerals.

## Layout Principles

Build the page as a learning-system launch, not a generic tutor template. Sections alternate between broad open canvas, high-contrast bands, playful diagram-led cards, and strongly framed process boards. Rounded forms are intentional, used to make a key idea or card feel approachable; avoid piling many small cards into a dashboard. On mobile, retain the section rhythm in one confident, linear story.

## Component Styling

Buttons are squared, compact, and editorial. Primary buttons use Ink on Paper; secondary actions are underlined or border-led. Inputs use sharp corners, visible labels, and high-contrast focus rings. Accords expand cleanly with clear numbering. Decorative imagery belongs within framed editorial compositions, never as stock-photo filler.

## Motion & Interaction Thesis

Motion should make learning feel active and understandable. Hero content earns a one-time choreographed entrance. Scroll-linked effects stay linear and progress-based. The learning sequence uses a drawn route as a metaphor for connection; it supports the lesson rather than becoming ambient spectacle. Cards get a small spring lift; key actions get one specular sweep. Micro-interactions are short and tactile; section reveals are more generous but never theatrical.

Use the named timing system: `--duration-micro` (140 ms), `--duration-ui` (220 ms), and `--duration-reveal` (460 ms). Enter with `--ease-out` or a controlled spring; exit more quietly. Animate only `transform` and `opacity`. Respect `prefers-reduced-motion` by rendering every finished state without travel.

## Do / Do Not

Do preserve warm paper, dark ink, asymmetry, meaningful annotation, strong type contrast, and human-scale copy. Do keep Vermilion scarce and purposeful.

Do not add generic purple gradients, glassmorphism, glowing neon, endless rounded cards, bento-grid overload, WebGL without a teaching purpose, fabricated testimonials, or motion that delays reading and form completion.

## Responsive Behaviour

Target mobile first: 44 px touch targets, form fields at 16 px or greater, no hidden focus states, and no hover-only requirement. Preserve the reading order when columns collapse. Motion becomes simpler—not smaller or broken—when the viewport narrows or reduced motion is requested.
