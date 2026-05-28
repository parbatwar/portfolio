// pages/PersonalSide.jsx - Your beautiful cinematic version
import PersonalNav from '../components/personal/PersonalNav'
import React, { useEffect, useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useInView,
} from "framer-motion";

// ─── Shared ─────────────────────────────────────────────────────────────────
const EASE = [0.16, 1, 0.3, 1];

function Reveal({ children, delay = 0, y = 28, className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px -10% 0px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y, filter: "blur(10px)" }}
      animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
      transition={{ duration: 1.5, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── Ambient backdrop ────────────────────────────────────────────────────────
function Backdrop() {
  const { scrollYProgress } = useScroll();
  const hue = useTransform(scrollYProgress, [0, 0.35, 0.65, 1], [260, 230, 280, 210]);
  const [h, setH] = useState(260);
  useEffect(() => hue.on("change", setH), [hue]);

  return (
    <div className="fixed inset-0 -z-10 bg-[#080810] overflow-hidden">
      <motion.div
        aria-hidden
        className="absolute -inset-[30%] opacity-60"
        animate={{ x: [0, 30, -15, 0], y: [0, -20, 15, 0] }}
        transition={{ duration: 36, repeat: Infinity, ease: "easeInOut" }}
        style={{
          background: `
            radial-gradient(38% 38% at 25% 20%, hsla(${h},55%,72%,0.3), transparent 70%),
            radial-gradient(42% 42% at 78% 68%, hsla(${h - 35},50%,68%,0.22), transparent 70%),
            radial-gradient(30% 30% at 55% 88%, hsla(${h + 25},55%,75%,0.18), transparent 70%)
          `,
        }}
      />
      {/* film grain */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.045] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>")`,
        }}
      />
    </div>
  );
}

// ─── Back button to professional side ────────────────────────────────────────
function BackButton() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.5 }}
      className="fixed top-6 left-6 z-50"
    >
      <a
        href="/"
        className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-4 py-2 text-xs font-serif tracking-wide text-white/70 backdrop-blur-xl hover:bg-white/[0.08] transition-all"
      >
        ← Back to Professional
      </a>
    </motion.div>
  );
}

// ─── Side nav ────────────────────────────────────────────────────────────────
const ACTS = [
  { id: "arrival", label: "I" },
  { id: "voice", label: "II" },
  { id: "loves", label: "III" },
  { id: "football", label: "IV" },
  { id: "logs", label: "V" },
  { id: "signal", label: "VI" },
];

function SideNav() {
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState("arrival");

  useEffect(() => {
    const fn = () => {
      setVisible(window.scrollY > window.innerHeight * 0.5);
      let cur = "arrival";
      for (const a of ACTS) {
        const el = document.getElementById(a.id);
        if (el && el.getBoundingClientRect().top < window.innerHeight * 0.45) cur = a.id;
      }
      setActive(cur);
    };
    fn();
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.nav
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 10 }}
          transition={{ duration: 0.9, ease: EASE }}
          className="fixed right-6 top-1/2 z-50 hidden -translate-y-1/2 flex-col gap-5 md:flex"
        >
          {ACTS.map((a) => (
            <a key={a.id} href={`#${a.id}`} className="group flex items-center gap-3">
              <span
                className={`font-serif text-[9px] tracking-[0.3em] transition-all duration-700 ${
                  active === a.id ? "text-white opacity-100" : "text-white/30 opacity-0 group-hover:opacity-60"
                }`}
              >
                {a.label}
              </span>
              <span
                className={`block h-px transition-all duration-700 ${
                  active === a.id
                    ? "w-10 bg-white"
                    : "w-4 bg-white/25 group-hover:w-7 group-hover:bg-indigo-300"
                }`}
              />
            </a>
          ))}
        </motion.nav>
      )}
    </AnimatePresence>
  );
}

// ─── Act I · Arrival ────────────────────────────────────────────────────────
function ActArrival() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const opacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);

  return (
    <section id="arrival" ref={ref} className="relative flex min-h-screen items-center justify-center px-6">
      <motion.div style={{ opacity, y, scale }} className="max-w-5xl text-center">
        <motion.p
          initial={{ opacity: 0, letterSpacing: "0.7em" }}
          animate={{ opacity: 0.5, letterSpacing: "0.45em" }}
          transition={{ duration: 2.6, delay: 0.3, ease: EASE }}
          className="font-serif text-[10px] uppercase text-white/50"
        >
          Parbat Sunuwar · Personal
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, filter: "blur(22px)", y: 40 }}
          animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
          transition={{ duration: 2.8, delay: 1.0, ease: EASE }}
          className="mt-10 font-serif text-5xl leading-[0.93] tracking-[-0.03em] text-balance sm:text-7xl md:text-8xl lg:text-[6.5rem]"
        >
          <span className="bg-gradient-to-br from-indigo-200 via-white to-purple-200 bg-clip-text text-transparent">
            Human first,
          </span>
          <br />
          <span className="text-white/80">engineer second.</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 2, delay: 3.2, ease: EASE }}
          className="mx-auto mt-16 h-px w-24 origin-left bg-gradient-to-r from-transparent via-indigo-300 to-transparent"
        />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.45 }}
          transition={{ duration: 2, delay: 3.8 }}
          className="mt-10 font-serif text-[10px] uppercase tracking-[0.35em] text-white/45"
        >
          Scroll to explore
        </motion.p>
      </motion.div>

      {/* pulse dot */}
      <motion.div
        animate={{ opacity: [0.25, 0.7, 0.25], scale: [1, 1.3, 1] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-10 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-indigo-300"
      />
    </section>
  );
}

// ─── Act II · Voice ──────────────────────────────────────────────────────────
const LINES = [
  "I think in systems, live in moments.",
  "Every frame I shoot is a question, not an answer.",
  "Mountains taught me patience. Code taught me precision.",
  "Football is the only religion I practice without irony.",
  "Restraint is the loudest creative choice.",
];

function ActVoice() {
  return (
    <section id="voice" className="relative flex min-h-[150vh] flex-col items-center px-6 py-48">
      <Reveal>
        <p className="font-serif text-[10px] uppercase tracking-[0.45em] text-white/40">
          Act II — Voice
        </p>
      </Reveal>
      <div className="mt-36 flex w-full max-w-3xl flex-col gap-36">
        {LINES.map((line, i) => (
          <Reveal key={i} delay={i * 0.04} y={50}>
            <p
              className={`font-serif text-3xl leading-[1.18] tracking-[-0.02em] text-balance text-white/80 sm:text-4xl md:text-5xl ${
                i % 2 === 0 ? "text-left" : "ml-auto text-right"
              }`}
              style={{ maxWidth: "28ch" }}
            >
              {line}
            </p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

// ─── Act III · Loves ─────────────────────────────────────────────────────────
const LOVES = [
  {
    glyph: "◐",
    tag: "Food",
    title: "The table is where I slow down.",
    detail: "Pizza, ramen, avocado toast, matcha lattes. Preferably in that order, preferably in silence.",
  },
  {
    glyph: "◇",
    tag: "Music",
    title: "Sound shapes the session.",
    detail: "Alternative rock for building. Lo-fi for thinking. Electronic synths for the late ones. Indie folk for everything else.",
  },
  {
    glyph: "◉",
    tag: "Cinema",
    title: "Inception changed the grammar.",
    detail: "Films that ask questions they don't answer. Her, Interstellar, Everything Everywhere. All are about time.",
  },
  {
    glyph: "◈",
    tag: "Games",
    title: "Zelda is a design thesis.",
    detail: "Completed Breath of the Wild three times. Not for the ending — for the walking. Valorant for when I need to lose gracefully.",
  },
];

function ActLoves() {
  const [hovered, setHovered] = useState(null);

  return (
    <section id="loves" className="relative min-h-screen px-6 py-48">
      <Reveal>
        <div className="text-center">
          <p className="font-serif text-[10px] uppercase tracking-[0.45em] text-white/40">
            Act III — Things I Love
          </p>
          <h2 className="mx-auto mt-8 max-w-2xl font-serif text-4xl tracking-[-0.03em] text-balance text-white sm:text-5xl md:text-6xl">
            The stuff outside the repo.
          </h2>
        </div>
      </Reveal>

      <div className="mx-auto mt-24 grid max-w-5xl gap-5 md:grid-cols-2">
        {LOVES.map((l, i) => (
          <Reveal key={l.tag} delay={i * 0.08} y={30}>
            <motion.div
              onHoverStart={() => setHovered(l.tag)}
              onHoverEnd={() => setHovered(null)}
              animate={{ y: hovered === l.tag ? -5 : 0 }}
              transition={{ duration: 0.9, ease: EASE }}
              className="relative h-full overflow-hidden rounded-3xl border border-white/[0.07] bg-white/[0.03] p-10 backdrop-blur-xl"
            >
              <motion.div
                aria-hidden
                animate={{ opacity: hovered === l.tag ? 0.5 : 0 }}
                transition={{ duration: 1.2 }}
                className="absolute -right-20 -top-24 h-56 w-56 rounded-full bg-indigo-400 blur-3xl"
              />
              <div className="relative">
                <span className="text-2xl text-indigo-300/80 font-light">{l.glyph}</span>
                <p className="mt-6 font-serif text-[9px] uppercase tracking-[0.35em] text-white/40">{l.tag}</p>
                <h3 className="mt-3 font-serif text-xl tracking-[-0.02em] text-white/90 sm:text-2xl">{l.title}</h3>
                <motion.p
                  animate={{ opacity: hovered === l.tag ? 1 : 0.5, y: hovered === l.tag ? 0 : 4 }}
                  transition={{ duration: 0.9, ease: EASE }}
                  className="mt-5 text-sm leading-relaxed text-white/60"
                >
                  {l.detail}
                </motion.p>
                <motion.div
                  animate={{ scaleX: hovered === l.tag ? 1 : 0.15 }}
                  transition={{ duration: 1, ease: EASE }}
                  className="mt-8 h-px origin-left bg-gradient-to-r from-indigo-300/60 via-white/20 to-transparent"
                />
              </div>
            </motion.div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

// ─── Act IV · Football ───────────────────────────────────────────────────────
function ActFootball() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const titleY = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const titleOpacity = useTransform(scrollYProgress, [0.05, 0.2, 0.8, 0.95], [0, 1, 1, 0]);

  const STATS = [
    { label: "Club", value: "FC Barcelona" },
    { label: "Benchmark", value: "Lionel Messi" },
    { label: "Timezone", value: "GMT +5:45" },
  ];

  return (
    <section id="football" ref={ref} className="relative min-h-[180vh] py-48">
      {/* sticky title */}
      <div className="pointer-events-none sticky top-0 z-10 flex h-screen items-center justify-center px-6">
        <motion.div style={{ y: titleY, opacity: titleOpacity }} className="text-center">
          <p className="font-serif text-[10px] uppercase tracking-[0.45em] text-white/40">
            Act IV — The Beautiful Game
          </p>
          <h2 className="mt-8 bg-gradient-to-br from-indigo-200 via-white to-purple-200 bg-clip-text font-serif text-6xl tracking-[-0.03em] text-transparent sm:text-8xl md:text-9xl">
            Football<br />is absolute.
          </h2>
        </motion.div>
      </div>

      {/* scrolling body */}
      <div className="relative mx-auto -mt-[75vh] max-w-2xl px-6 pb-48 flex flex-col gap-40">
        {STATS.map((s, i) => (
          <Reveal key={s.label} y={50} delay={i * 0.05}>
            <div className={i % 2 === 0 ? "text-left" : "ml-auto text-right"} style={{ maxWidth: "30ch" }}>
              <p className="font-serif text-[9px] uppercase tracking-[0.4em] text-indigo-300/80">{s.label}</p>
              <p className="mt-4 font-serif text-3xl tracking-[-0.02em] text-white/85 sm:text-4xl">{s.value}</p>
            </div>
          </Reveal>
        ))}

        <Reveal y={40}>
          <div className="rounded-2xl border border-white/[0.07] bg-white/[0.03] px-7 py-5 backdrop-blur-xl">
            <p className="font-serif text-[9px] uppercase tracking-[0.35em] text-white/35 mb-3">Core Memory</p>
            <p className="font-serif text-lg text-white/70 leading-snug">
              Watching El Clásico at 2 AM in absolute silence. Not a word. Just the game.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ─── Act V · System Logs ────────────────────────────────────────────────────
const LOGS = [
  { k: "Caffeine", v: "Espresso before anything compiles, mentally or literally." },
  { k: "Habitat", v: "Kathmandu. Mountains visible from the window. Always." },
  { k: "Lens", v: "Street photography. The city as a sequence of quiet decisions." },
  { k: "Body", v: "Calisthenics in the morning. Trail runs when the air is right." },
  { k: "Night", v: "Reading before sleep. Physical pages, not screens." },
  { k: "Loyalty", v: "Dogs over everything. No further questions." },
];

function ActLogs() {
  const [hovered, setHovered] = useState(null);

  return (
    <section id="logs" className="relative min-h-screen px-6 py-48">
      <Reveal>
        <div className="text-center">
          <p className="font-serif text-[10px] uppercase tracking-[0.45em] text-white/40">
            Act V — System Logs
          </p>
          <h2 className="mx-auto mt-8 max-w-2xl font-serif text-4xl tracking-[-0.03em] text-balance text-white sm:text-5xl md:text-6xl">
            Assorted background processes.
          </h2>
        </div>
      </Reveal>

      <div className="mx-auto mt-24 max-w-3xl divide-y divide-white/[0.06] border-y border-white/[0.06]">
        {LOGS.map((r, i) => (
          <Reveal key={r.k} delay={i * 0.04}>
            <motion.div
              onHoverStart={() => setHovered(r.k)}
              onHoverEnd={() => setHovered(null)}
              className="grid grid-cols-[100px_1fr] gap-8 py-8 sm:grid-cols-[140px_1fr]"
            >
              <p className="font-serif text-[10px] uppercase tracking-[0.3em] text-indigo-300/70 self-center">
                {r.k}
              </p>
              <motion.p
                animate={{ x: hovered === r.k ? 8 : 0, opacity: hovered === r.k ? 1 : 0.65 }}
                transition={{ duration: 0.8, ease: EASE }}
                className="font-serif text-lg leading-snug text-white/80 sm:text-xl"
              >
                {r.v}
              </motion.p>
            </motion.div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

// ─── Act VI · Signal ────────────────────────────────────────────────────────
const SOCIALS = [
  { label: "Twitter / X", value: "@parbatsunuwar", href: "#" },
  { label: "Instagram", value: "@parbat.frames", href: "#" },
  { label: "GitHub", value: "github.com/parbat", href: "#" },
  { label: "Discord", value: "parbat#0000", href: "#" },
];

function ActSignal() {
  const [open, setOpen] = useState(false);

  return (
    <section id="signal" className="relative flex min-h-screen items-center justify-center px-6 py-48">
      <div className="max-w-3xl w-full text-center">
        <Reveal>
          <p className="font-serif text-[10px] uppercase tracking-[0.45em] text-white/40">
            Final Act
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-10 font-serif text-5xl leading-[0.95] tracking-[-0.03em] text-balance text-white sm:text-7xl md:text-[5.5rem]">
            Let's talk about{" "}
            <span className="bg-gradient-to-br from-indigo-200 via-white to-purple-200 bg-clip-text font-light italic text-transparent">
              anything.
            </span>
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mx-auto mt-8 max-w-md font-serif text-base text-white/45 leading-relaxed">
            Source pipelines. Football tactics. Street photography theory. The right ramen spot. All valid entry points.
          </p>
        </Reveal>

        <Reveal delay={0.3}>
          <motion.button
            onClick={() => setOpen((o) => !o)}
            whileHover={{ y: -2 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="mt-14 inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/[0.04] px-8 py-3.5 font-serif text-sm tracking-wide text-white backdrop-blur-xl"
          >
            <motion.span
              animate={{ scale: open ? [1, 1.5, 1] : 1 }}
              className="h-1.5 w-1.5 rounded-full bg-indigo-300"
              style={{ animationDuration: "1.5s", animationIterationCount: open ? 1 : "infinite" }}
            />
            <motion.span
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2.5, repeat: Infinity }}
            >
              {open ? "Choose a channel" : "Open the line"}
            </motion.span>
          </motion.button>
        </Reveal>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: 16, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: 8, filter: "blur(10px)" }}
              transition={{ duration: 1, ease: EASE }}
              className="mt-10 flex flex-col gap-3 sm:flex-row sm:justify-center"
            >
              {SOCIALS.map((s, i) => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.9, delay: i * 0.07, ease: EASE }}
                  whileHover={{ y: -3 }}
                  className="group min-w-[160px] rounded-2xl border border-white/[0.08] bg-white/[0.03] px-6 py-5 text-left backdrop-blur-xl"
                >
                  <p className="font-serif text-[9px] uppercase tracking-[0.35em] text-white/40">{s.label}</p>
                  <p className="mt-2 font-serif text-sm text-white/75 transition-colors duration-700 group-hover:text-indigo-300">
                    {s.value}
                  </p>
                </motion.a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <Reveal delay={0.5}>
          <p className="mt-36 font-serif text-[9px] uppercase tracking-[0.45em] text-white/25">
            Parbat Sunuwar · Kathmandu, Nepal · MMXXVI
          </p>
        </Reveal>
      </div>
    </section>
  );
}

// ─── Root ────────────────────────────────────────────────────────────────────
export default function PersonalSide() {
  return (
    <main className="relative min-h-screen bg-[#080810] font-sans text-white antialiased selection:bg-indigo-400/25">
      <BackButton />
      <Backdrop />
      <SideNav />
      <ActArrival />
      <ActVoice />
      <ActLoves />
      <ActFootball />
      <ActLogs />
      <ActSignal />
    </main>
  );
}