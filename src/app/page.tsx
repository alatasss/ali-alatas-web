"use client";

import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useInView, useMotionValue } from "framer-motion";

// Brand colors
const C = {
  bg: "#FFFBF3",
  lime: "#CEEF32",
  pink: "#FF78E5",
  red: "#FF2D01",
  blue: "#0395FF",
  ink: "#1a1a1a",
  paper: "#FFFFFF",
};

// Public SVG asset paths (decorative)
const ICONS = ["/1.svg", "/2.svg", "/3.svg", "/4.svg", "/5.svg", "/6.svg", "/7.svg", "/8.svg", "/9.svg", "/10.svg"];
const PROFILE = "/profile.svg";

/* =========================================================
   BOUNCING PROFILE (uses 11.svg)
   - bounces off edges
   - stops when hovered or caught (dragging)
   - click => scroll home
   - can be dropped into trash bin (far left) or closed (X)
   - respawns after 5s with "Halo, I'm Back!" popup
========================================================= */
function BouncingProfile() {
  const x = useMotionValue(140);
  const y = useMotionValue(160);
  const [hovered, setHovered] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [gone, setGone] = useState(false);
  const [showBack, setShowBack] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  const [overTrash, setOverTrash] = useState(false);
  const [SIZE, setSIZE] = useState(138);
  const velocity = useRef({ vx: 3.4, vy: 2.8 });

  // Responsive profile size — smaller on phones
  useEffect(() => {
    const calc = () => setSIZE(window.innerWidth < 640 ? 84 : window.innerWidth < 1024 ? 112 : 138);
    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, []);

  // Welcome popup on first paint — appears immediately, disappears after 5s
  useEffect(() => {
    setShowWelcome(true);
    const t = setTimeout(() => setShowWelcome(false), 5000);
    return () => clearTimeout(t);
  }, []);

  // Bounce loop — paused while hovered, dragging, or gone
  useEffect(() => {
    let raf: number;
    const tick = () => {
      const paused = dragging || hovered || gone;
      if (!paused) {
        const { vx, vy } = velocity.current;
        const nextX = x.get() + vx;
        const nextY = y.get() + vy;
        const w = window.innerWidth - SIZE;
        const h = window.innerHeight - SIZE;

        if (nextX <= 0 || nextX >= w) {
          velocity.current.vx = -vx;
          x.set(Math.max(0, Math.min(w, nextX)));
        } else x.set(nextX);

        if (nextY <= 0 || nextY >= h) {
          velocity.current.vy = -vy;
          y.set(Math.max(0, Math.min(h, nextY)));
        } else y.set(nextY);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [dragging, hovered, gone, x, y]);

  // Detect proximity to the trash bucket while dragging
  useEffect(() => {
    if (!dragging) {
      if (overTrash) setOverTrash(false);
      return;
    }
    let raf: number;
    const check = () => {
      const cx = x.get() + SIZE / 2;
      const cy = y.get() + SIZE / 2;
      // Trash zone: bottom-left corner area
      const inTrash = cx < 220 && cy > window.innerHeight - 280;
      setOverTrash(inTrash);
      raf = requestAnimationFrame(check);
    };
    raf = requestAnimationFrame(check);
    return () => cancelAnimationFrame(raf);
  }, [dragging, x, y, overTrash]);

  // Respawn after being trashed/closed
  const sendAway = () => {
    setGone(true);
    setHovered(false);
    setOverTrash(false);
    setTimeout(() => {
      // Drop back from the top with a fresh velocity
      x.set(window.innerWidth / 2 - SIZE / 2);
      y.set(120);
      velocity.current = { vx: 3.4, vy: 2.8 };
      setGone(false);
      setShowBack(true);
      setTimeout(() => setShowBack(false), 2600);
    }, 5000);
  };

  const handleClick = () => {
    if (dragging) return;
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* Welcome popup on load — anchored top-left of profile, follows it */}
      <AnimatePresence>
        {showWelcome && !gone && (
          <motion.div
            style={{ x, y, width: SIZE, height: SIZE }}
            className="fixed top-0 left-0 z-[80] pointer-events-none"
          >
            <motion.div
              initial={{ scale: 0, opacity: 0, rotate: -8 }}
              animate={{ scale: 1, opacity: 1, rotate: -3 }}
              exit={{ scale: 0, opacity: 0, y: -20 }}
              transition={{ type: "spring", stiffness: 280, damping: 16 }}
              className="absolute"
              style={{ right: SIZE - 18, top: -28, transformOrigin: "right bottom" }}
            >
              <div className="relative">
                <div
                  className="px-4 py-2.5 sm:px-6 sm:py-4 rounded-2xl sm:rounded-3xl border-[3px] sm:border-[4px] border-[#1a1a1a] shadow-[5px_5px_0_0_#1a1a1a] sm:shadow-[8px_8px_0_0_#1a1a1a] flex items-center gap-2 sm:gap-3 whitespace-nowrap"
                  style={{ backgroundColor: C.lime }}
                >
                  <motion.span
                    animate={{ rotate: [0, 18, -12, 18, 0] }}
                    transition={{ duration: 1.4, repeat: Infinity }}
                    className="text-lg sm:text-2xl"
                  >
                    ✨
                  </motion.span>
                  <div className="text-left">
                    <p className="text-[8px] sm:text-[10px] font-black uppercase tracking-[0.18em]" style={{ color: C.red }}>
                      welcome, fren
                    </p>
                    <p className="text-sm sm:text-xl font-black leading-tight" style={{ color: C.ink }}>
                      you found the <span style={{ color: C.red }}>vibe</span> ✦
                    </p>
                  </div>
                </div>
                <motion.span
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                  className="absolute -top-3 -left-3 sm:-top-4 sm:-left-4 px-2 py-1 rounded-full text-[9px] sm:text-[10px] font-black border-[2px] border-[#1a1a1a]"
                  style={{ backgroundColor: C.pink, color: C.ink }}
                >
                  NEW ✿
                </motion.span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Trash bucket — large, fixed at bottom-left while dragging */}
      <AnimatePresence>
        {dragging && !gone && (
          <motion.div
            initial={{ y: 200, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 200, opacity: 0 }}
            transition={{ type: "spring", stiffness: 220, damping: 22 }}
            className="fixed left-3 bottom-3 sm:left-6 sm:bottom-6 z-[60] flex flex-col items-center gap-2 sm:gap-3 pointer-events-none"
          >
            <motion.div
              animate={overTrash ? { scale: 1.12, rotate: [0, -4, 4, 0] } : { scale: 1, rotate: 0 }}
              transition={{ duration: overTrash ? 0.45 : 0.3, repeat: overTrash ? Infinity : 0 }}
              className="relative flex h-36 w-28 sm:h-52 sm:w-44 flex-col items-center justify-end rounded-2xl sm:rounded-[28px] border-[3px] sm:border-[4px] border-[#1a1a1a] shadow-[6px_6px_0_0_#1a1a1a] sm:shadow-[10px_10px_0_0_#1a1a1a] p-3 sm:p-4"
              style={{ backgroundColor: overTrash ? C.red : C.pink }}
            >
              {/* lid */}
              <div
                className="absolute -top-4 sm:-top-5 left-1/2 -translate-x-1/2 h-5 sm:h-6 w-[88%] rounded-t-2xl border-[3px] sm:border-[4px] border-[#1a1a1a]"
                style={{ backgroundColor: overTrash ? C.red : C.pink }}
              />
              {/* handle */}
              <div className="absolute -top-7 sm:-top-9 left-1/2 -translate-x-1/2 h-2.5 sm:h-3 w-10 sm:w-12 rounded-t-full border-[3px] border-[#1a1a1a] border-b-0" />
              {/* trash glyph */}
              <svg className="w-12 h-12 sm:w-20 sm:h-20" viewBox="0 0 24 24" fill="none" stroke={C.paper} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
                <path d="M10 11v6M14 11v6" />
              </svg>
              {/* slits */}
              <div className="mt-2 sm:mt-3 grid grid-cols-3 gap-1 sm:gap-1.5 opacity-70">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="h-1 w-4 sm:w-6 rounded-full bg-[#1a1a1a]" />
                ))}
              </div>
            </motion.div>
            <span
              className="px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-black border-[2px] sm:border-[3px] border-[#1a1a1a] shadow-[3px_3px_0_0_#1a1a1a]"
              style={{ backgroundColor: overTrash ? C.lime : C.paper, color: C.ink }}
            >
              {overTrash ? "drop now ✦" : "drag me here"}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* "Halo, I'm Back!" popup — anchored top-left of the profile */}
      <AnimatePresence>
        {showBack && (
          <motion.div
            initial={{ scale: 0, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 320, damping: 18 }}
            style={{ x, y, width: SIZE, height: SIZE }}
            className="fixed top-0 left-0 z-[70] pointer-events-none"
          >
            {/* offset to top-left corner of the profile */}
            <div className="absolute" style={{ right: SIZE - 18, top: -24, transformOrigin: "right bottom" }}>
              <div
                className="whitespace-nowrap px-4 py-2 rounded-2xl border-[3px] border-[#1a1a1a] shadow-[4px_4px_0_0_#1a1a1a] text-sm font-black flex items-center gap-2"
                style={{ backgroundColor: C.lime, color: C.ink }}
              >
                <motion.span animate={{ rotate: [0, 24, -10, 0] }} transition={{ duration: 0.8, repeat: 2 }}>👋</motion.span>
                Halo, I&apos;m Back!
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Profile bubble */}
      <AnimatePresence>
        {!gone && (
          <motion.div
            drag
            dragMomentum={false}
            dragElastic={0.4}
            onDragStart={() => setDragging(true)}
            onDragEnd={(_, info) => {
              setDragging(false);
              const cx = info.point.x;
              const cy = info.point.y;
              // If dropped over the trash bucket area
              if (cx < 220 && cy > window.innerHeight - 280) {
                sendAway();
                return;
              }
              // toss with momentum
              velocity.current.vx = Math.max(-10, Math.min(10, info.velocity.x / 80)) || 3;
              velocity.current.vy = Math.max(-10, Math.min(10, info.velocity.y / 80)) || 2.6;
            }}
            onClick={handleClick}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{ x, y, width: SIZE, height: SIZE }}
            initial={{ scale: 0 }}
            animate={
              overTrash
                ? { scale: 0.7, rotate: -20 }
                : hovered || dragging
                ? { scale: 1, rotate: 0 }
                : { scale: [1, 1.14, 0.96, 1.14, 1], rotate: [0, 360] }
            }
            exit={{ scale: 0, rotate: 720, opacity: 0, y: "+=200" }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.94 }}
            whileDrag={overTrash ? { scale: 0.7, cursor: "grabbing" } : { scale: 1.18, cursor: "grabbing" }}
            transition={
              hovered || dragging || overTrash
                ? { type: "spring", stiffness: 300, damping: 20 }
                : {
                    scale: { duration: 1.2, repeat: Infinity, ease: "easeInOut" },
                    rotate: { duration: 9, repeat: Infinity, ease: "linear" },
                  }
            }
            className="fixed top-0 left-0 z-[55] cursor-grab select-none"
          >
            <div className="relative w-full h-full">
              {/* pulsing ring only when free-floating */}
              {!hovered && !dragging && (
                <motion.div
                  animate={{ scale: [1, 1.45, 1], opacity: [0.55, 0, 0.55] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -inset-1 rounded-full"
                  style={{ backgroundColor: C.lime }}
                />
              )}

              {/* avatar uses 11.svg — colored border, not black */}
              <div
                className="relative w-full h-full rounded-full overflow-hidden border-[5px] shadow-[6px_6px_0_0_#05A552] bg-white"
                style={{ borderColor: "#05A552" }}
              >
                <img src={PROFILE} alt="Ali Alatas" className="w-full h-full object-contain p-1 pointer-events-none" draggable={false} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* =========================================================
   FLOATING PUBLIC-SVG DECORATIONS
========================================================= */
const Decor = ({
  src,
  x,
  y,
  size,
  dur,
  delay = 0,
  spin = true,
}: {
  src: string;
  x: string;
  y: string;
  size: number;
  dur: number;
  delay?: number;
  spin?: boolean;
}) => (
  <motion.img
    src={src}
    alt=""
    aria-hidden
    draggable={false}
    className="absolute pointer-events-none select-none"
    style={{ left: x, top: y, width: size, height: size }}
    animate={{
      y: [0, -22, 0],
      rotate: spin ? [0, 360] : [-8, 8, -8],
      scale: [1, 1.08, 1],
    }}
    transition={{ duration: dur, repeat: Infinity, ease: "easeInOut", delay }}
  />
);

// A scattered field of the public SVGs — varied sizes (XL / L / M / S), non-uniform
const ScatteredDecor = ({ offset = 0 }: { offset?: number }) => {
  const layout = [
    { x: "4%", y: "10%", size: 300, dur: 14, spin: false }, // XL
    { x: "84%", y: "6%", size: 128, dur: 9, spin: true },    // M
    { x: "74%", y: "28%", size: 220, dur: 16, spin: false },// L
    { x: "2%", y: "44%", size: 88, dur: 7, spin: true },    // S
    { x: "90%", y: "52%", size: 260, dur: 18, spin: false },// XL
    { x: "15%", y: "70%", size: 140, dur: 10, spin: true },  // M
    { x: "82%", y: "78%", size: 96, dur: 6, spin: true },   // S
    { x: "24%", y: "86%", size: 200, dur: 13, spin: false },// L
    { x: "50%", y: "16%", size: 80, dur: 8, spin: true },   // S
    { x: "60%", y: "62%", size: 116, dur: 11, spin: true },  // M
  ];
  return (
    <div className="absolute inset-0 overflow-hidden">
      {layout.map((it, i) => (
        <Decor
          key={i}
          src={ICONS[(i + offset) % ICONS.length]}
          x={it.x}
          y={it.y}
          size={it.size}
          dur={it.dur}
          delay={i * 0.3}
          spin={it.spin}
        />
      ))}
    </div>
  );
};

/* =========================================================
   REVEAL ON SCROLL
========================================================= */
const Reveal = ({
  children,
  delay = 0,
  y = 60,
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
}) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y, filter: "blur(10px)" }}
      animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
};

/* =========================================================
   MARQUEE
========================================================= */
const Marquee = ({ text, color, bg }: { text: string; color: string; bg: string }) => (
  <div className="overflow-hidden border-y-[3px] border-[#1a1a1a] py-3" style={{ backgroundColor: bg }}>
    <motion.div
      className="flex whitespace-nowrap"
      animate={{ x: ["0%", "-50%"] }}
      transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
    >
      {[...Array(8)].map((_, i) => (
        <span
          key={i}
          className="text-3xl md:text-5xl font-black tracking-tight px-10"
          style={{ color }}
        >
          {text}
        </span>
      ))}
    </motion.div>
  </div>
);

/* =========================================================
   RADAR HEATMAP — circular polar grid with radar guidelines
   labels live INSIDE each wedge as pretty pill chips
========================================================= */
function RadarMap() {
  // Gen-z, playful, English labels. No percentages shown.
  const items = [
    { label: "Faith Vibes", heat: 0.96 },
    { label: "Fiqh Hours", heat: 0.93 },
    { label: "Sufi Hearts", heat: 0.92 },
    { label: "Theo Talks", heat: 0.91 },
    { label: "Big Ideas", heat: 0.9 },
    { label: "History", heat: 0.89 },
    { label: "Academia", heat: 0.88 },
    { label: "Research", heat: 0.87 },
    { label: "Teaching", heat: 0.87 },
    { label: "Community", heat: 0.86 },
    { label: "Social", heat: 0.85 },
    { label: "Projects", heat: 0.84 },
    { label: "Art Brain", heat: 0.83 },
    { label: "Lit", heat: 0.82 },
    { label: "Culture", heat: 0.81 },
    { label: "Science", heat: 0.8 },
  ];

  const N = items.length;
  const cx = 250;
  const cy = 250;
  const rOuter = 235;
  const rInner = 56;
  const sliceAngle = 360 / N;

  const heatColor = (h: number) => {
    if (h > 0.93) return "#FF2D01";
    if (h > 0.9) return "#FF78E5";
    if (h > 0.86) return "#CEEF32";
    if (h > 0.83) return "#05A552";
    if (h > 0.81) return "#0395FF";
    return "#FFD400";
  };

  const wedgePath = (i: number) => {
    const startDeg = i * sliceAngle - 90 - sliceAngle / 2;
    const endDeg = startDeg + sliceAngle;
    const sa = (startDeg * Math.PI) / 180;
    const ea = (endDeg * Math.PI) / 180;
    const x1 = cx + Math.cos(sa) * rInner;
    const y1 = cy + Math.sin(sa) * rInner;
    const x2 = cx + Math.cos(sa) * rOuter;
    const y2 = cy + Math.sin(sa) * rOuter;
    const x3 = cx + Math.cos(ea) * rOuter;
    const y3 = cy + Math.sin(ea) * rOuter;
    const x4 = cx + Math.cos(ea) * rInner;
    const y4 = cy + Math.sin(ea) * rInner;
    return `M ${x1} ${y1} L ${x2} ${y2} A ${rOuter} ${rOuter} 0 0 1 ${x3} ${y3} L ${x4} ${y4} A ${rInner} ${rInner} 0 0 0 ${x1} ${y1} Z`;
  };

  // Position the chip at the wedge midpoint, 70% out toward the rim
  const chipTransform = (i: number) => {
    const midDeg = i * sliceAngle - 90;
    const a = (midDeg * Math.PI) / 180;
    const r = rInner + (rOuter - rInner) * 0.62;
    const lx = cx + Math.cos(a) * r;
    const ly = cy + Math.sin(a) * r;
    let rot = midDeg + 90;
    if (rot > 90 && rot < 270) rot += 180;
    return { lx, ly, rot };
  };

  return (
    <div className="relative w-full max-w-[600px] mx-auto">
      <svg viewBox="0 0 500 500" className="w-full h-full">
        <defs>
          <radialGradient id="radarGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#1a1a1a" stopOpacity="0" />
            <stop offset="100%" stopColor="#1a1a1a" stopOpacity="0.06" />
          </radialGradient>
        </defs>

        {/* base disk + gentle glow */}
        <circle cx={cx} cy={cy} r={rOuter + 4} fill="url(#radarGlow)" />

        {/* heatmap wedges */}
        {items.map((it, i) => (
          <motion.path
            key={`wedge-${it.label}`}
            d={wedgePath(i)}
            fill={heatColor(it.heat)}
            stroke={C.ink}
            strokeWidth="1.5"
            strokeLinejoin="round"
            initial={{ opacity: 0, scale: 0.4 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 + i * 0.05, ease: [0.16, 1, 0.3, 1] }}
            style={{ transformOrigin: `${cx}px ${cy}px` }}
          >
            <title>{it.label}</title>
          </motion.path>
        ))}

        {/* RADAR GRID LINES — concentric rings */}
        {[0.25, 0.5, 0.75, 1].map((k, i) => (
          <motion.circle
            key={`ring-${i}`}
            cx={cx}
            cy={cy}
            r={rInner + (rOuter - rInner) * k}
            fill="none"
            stroke={C.ink}
            strokeOpacity={i === 3 ? 1 : 0.55}
            strokeWidth={i === 3 ? 2.5 : 1}
            strokeDasharray={i === 3 ? "0" : "3 5"}
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.6 + i * 0.08 }}
          />
        ))}

        {/* RADAR GRID LINES — spokes between every wedge */}
        {items.map((_, i) => {
          const a = ((i * sliceAngle - 90 - sliceAngle / 2) * Math.PI) / 180;
          return (
            <motion.line
              key={`spoke-${i}`}
              x1={cx + Math.cos(a) * rInner}
              y1={cy + Math.sin(a) * rInner}
              x2={cx + Math.cos(a) * rOuter}
              y2={cy + Math.sin(a) * rOuter}
              stroke={C.ink}
              strokeOpacity="0.45"
              strokeWidth="1"
              strokeDasharray="2 4"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.7 + i * 0.03 }}
            />
          );
        })}

        {/* RADAR GRID LINES — north/south/east/west cross axes */}
        {[0, 90, 180, 270].map((deg) => {
          const a = (deg * Math.PI) / 180;
          return (
            <line
              key={`axis-${deg}`}
              x1={cx + Math.cos(a) * rInner}
              y1={cy + Math.sin(a) * rInner}
              x2={cx + Math.cos(a) * (rOuter + 6)}
              y2={cy + Math.sin(a) * (rOuter + 6)}
              stroke={C.ink}
              strokeWidth="1.5"
              strokeOpacity="0.6"
            />
          );
        })}

        {/* SWEEPING radar line */}
        <motion.g
          style={{ originX: `${cx}px`, originY: `${cy}px` }}
          animate={{ rotate: 360 }}
          transition={{ duration: 9, repeat: Infinity, ease: "linear" }}
        >
          <defs>
            <linearGradient id="radarSweep" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#1a1a1a" stopOpacity="0" />
              <stop offset="100%" stopColor="#1a1a1a" stopOpacity="0.5" />
            </linearGradient>
          </defs>
          <path
            d={`M ${cx} ${cy} L ${cx + rOuter} ${cy} A ${rOuter} ${rOuter} 0 0 0 ${cx + Math.cos(-Math.PI / 5) * rOuter} ${cy + Math.sin(-Math.PI / 5) * rOuter} Z`}
            fill="url(#radarSweep)"
            opacity="0.35"
          />
        </motion.g>

        {/* outer ring (re-stroked on top to stay sharp) */}
        <circle cx={cx} cy={cy} r={rOuter} fill="none" stroke={C.ink} strokeWidth="2.5" />

        {/* PILL CHIP labels INSIDE each wedge — keep small to avoid collisions */}
        {items.map((it, i) => {
          const { lx, ly, rot } = chipTransform(i);
          const dark = it.heat <= 0.83 || (it.heat > 0.86 && it.heat <= 0.9);
          const chipBg = dark ? "#FFFBF3" : "#1a1a1a";
          const chipFg = dark ? "#1a1a1a" : "#FFFBF3";
          const w = Math.max(58, it.label.length * 6.6 + 14);
          const h = 18;
          return (
            <motion.g
              key={`chip-${it.label}`}
              initial={{ opacity: 0, scale: 0.6 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 1.1 + i * 0.04 }}
              transform={`rotate(${rot} ${lx} ${ly})`}
            >
              <rect
                x={lx - w / 2}
                y={ly - h / 2}
                width={w}
                height={h}
                rx={h / 2}
                ry={h / 2}
                fill={chipBg}
                stroke="#1a1a1a"
                strokeWidth="1.5"
              />
              <text
                x={lx}
                y={ly + 0.5}
                textAnchor="middle"
                dominantBaseline="middle"
                fontFamily="system-ui, sans-serif"
                fontWeight="900"
                fontSize="10"
                fill={chipFg}
                letterSpacing="0.2"
              >
                {it.label}
              </text>
            </motion.g>
          );
        })}

        {/* inner hub */}
        <motion.circle
          cx={cx}
          cy={cy}
          r={rInner}
          fill={C.bg}
          stroke={C.ink}
          strokeWidth="2.5"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2.4, repeat: Infinity }}
          style={{ originX: `${cx}px`, originY: `${cy}px` }}
        />
        <text
          x={cx}
          y={cy - 6}
          textAnchor="middle"
          dominantBaseline="middle"
          fontFamily="system-ui, sans-serif"
          fontWeight="900"
          fontSize="13"
          fill={C.ink}
        >
          live
        </text>
        <text
          x={cx}
          y={cy + 10}
          textAnchor="middle"
          dominantBaseline="middle"
          fontFamily="system-ui, sans-serif"
          fontWeight="800"
          fontSize="9"
          fill={C.red}
          letterSpacing="1"
        >
          HEATMAP
        </text>
      </svg>
    </div>
  );
}

/* =========================================================
   LOGBOOK — realtime "latest entries" feed
========================================================= */
const LOGBOOK_URL = "https://logbook-alataasss.vercel.app";

function relTime(from: number, now: number) {
  const s = Math.max(1, Math.floor((now - from) / 1000));
  if (s < 60) return `${s}s ago`;
  const m = Math.floor(s / 60);
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  return `${d}d ago`;
}

function LogbookFeed() {
  // Latest entries mirrored from the live logbook. Times tick in real-time.
  const baseEntries = [
    { title: "Orang-Orang yang Takut pada Masa Depan", tag: "Fiction", agoMs: 1000 * 60 * 6 },
    { title: "Band Hits Perunggu: Lagu Gemilang & Komentar YouTube", tag: "Civilization", agoMs: 1000 * 60 * 48 },
    { title: "Filosofis-Literer tentang Epistemologi Asa & Rasa", tag: "Fiction", agoMs: 1000 * 60 * 60 * 5 },
    { title: "Main Character Energy, Tapi Bentuknya Stiker", tag: "Civilization", agoMs: 1000 * 60 * 60 * 20 },
    { title: "Haru Biru: Mualaf, Kota dan Tuhan", tag: "Fiction", agoMs: 1000 * 60 * 60 * 32 },
  ];
  const [now, setNow] = useState(() => Date.now());
  const mounted = useRef(Date.now());

  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);

  const tagColor = (tag: string) => (tag === "Fiction" ? C.pink : C.blue);

  return (
    <motion.div
      whileHover={{ rotate: -2, y: -8 }}
      className="relative p-7 rounded-3xl border-[3px] border-[#1a1a1a] shadow-[10px_10px_0_0_#1a1a1a]"
      style={{ backgroundColor: C.lime, transform: "rotate(2deg)" }}
    >
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <motion.div
            animate={{ scale: [1, 1.4, 1], opacity: [1, 0.5, 1] }}
            transition={{ duration: 1.4, repeat: Infinity }}
            className="w-3 h-3 rounded-full border-2 border-[#1a1a1a]"
            style={{ backgroundColor: C.red }}
          />
          <span className="font-black text-sm uppercase tracking-wide">Latest · live</span>
        </div>
        <span className="font-mono text-[10px] opacity-60">{new Date(now).toLocaleTimeString()}</span>
      </div>

      <ul className="space-y-3">
        {baseEntries.map((e, i) => (
          <motion.li
            key={e.title}
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 + i * 0.08 }}
          >
            <a
              href={LOGBOOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group block border-b border-[#1a1a1a]/25 pb-3"
            >
              <div className="flex items-center gap-2 mb-1">
                <span
                  className="px-2 py-0.5 rounded-full text-[10px] font-black border-2 border-[#1a1a1a]"
                  style={{ backgroundColor: tagColor(e.tag), color: e.tag === "Fiction" ? C.ink : C.paper }}
                >
                  {e.tag}
                </span>
                <span className="font-mono text-[10px] opacity-60">{relTime(mounted.current - e.agoMs, now)}</span>
              </div>
              <span className="font-bold text-sm leading-snug group-hover:underline">{e.title}</span>
            </a>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
}

/* =========================================================
   TILLNITE — mini library widget (login → borrow → return)
========================================================= */
const STUDIO_URL = "https://tillnite-studio.web.app";

function LibraryCard() {
  const steps = [
    { n: "01", label: "Login", note: "tap in, get your card", color: C.lime },
    { n: "02", label: "Browse", note: "scroll the shelves", color: C.blue },
    { n: "03", label: "Borrow", note: "claim it for 14 days", color: C.pink },
    { n: "04", label: "Return", note: "send it back, ez", color: C.red },
  ];
  const shelf = [
    { title: "Fiqh & the City", status: "available" },
    { title: "Notes on Sufism", status: "borrowed" },
    { title: "A History of Slowness", status: "available" },
    { title: "Late-Nite Essays", status: "available" },
  ];
  return (
    <motion.div
      whileHover={{ rotate: 2, y: -8 }}
      className="relative p-7 rounded-3xl border-[3px] border-[#1a1a1a] shadow-[10px_10px_0_0_#1a1a1a]"
      style={{ backgroundColor: C.pink, transform: "rotate(-2deg)" }}
    >
      <div className="font-mono text-xs mb-4 opacity-70">// the library, but make it fun</div>

      {/* flow */}
      <div className="grid grid-cols-2 gap-2 mb-5">
        {steps.map((s, i) => (
          <motion.div
            key={s.n}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 + i * 0.08 }}
            className="rounded-2xl border-[2px] border-[#1a1a1a] p-3"
            style={{ backgroundColor: s.color, color: s.color === C.blue || s.color === C.red ? C.paper : C.ink }}
          >
            <div className="font-mono text-[10px] opacity-70">{s.n}</div>
            <div className="font-black text-base leading-tight">{s.label}</div>
            <div className="text-[11px] font-semibold opacity-80">{s.note}</div>
          </motion.div>
        ))}
      </div>

      {/* shelf */}
      <ul className="space-y-2.5">
        {shelf.map((b, i) => (
          <motion.li
            key={b.title}
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 + i * 0.06 }}
            className="flex items-center justify-between rounded-xl border-2 border-[#1a1a1a] bg-white/60 px-3 py-2"
          >
            <span className="font-bold text-sm">{b.title}</span>
            <span
              className="px-2 py-0.5 rounded-full text-[10px] font-black border-2 border-[#1a1a1a]"
              style={{ backgroundColor: b.status === "available" ? C.lime : "#FFF5B5" }}
            >
              {b.status === "available" ? "available" : "borrowed"}
            </span>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
}

/* =========================================================
   MAIN PAGE
========================================================= */
export default function Home() {
  const { scrollYProgress } = useScroll();
  const heroScale = useTransform(scrollYProgress, [0, 0.15], [1, 0.96]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0.5]);

  return (
    <div className="relative" style={{ backgroundColor: C.bg }}>
      <BouncingProfile />

      {/* ============ HERO / PREFACE ============ */}
      <section className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">
        <ScatteredDecor offset={0} />
        <motion.div style={{ scale: heroScale, opacity: heroOpacity }} className="relative z-10 max-w-4xl mx-auto text-center">
          <Reveal>
            <span className="inline-flex items-center gap-2 px-5 py-2 mb-8 rounded-full font-bold text-sm border-[3px] border-[#1a1a1a] shadow-[4px_4px_0_0_#1a1a1a] tracking-wide uppercase" style={{ backgroundColor: C.lime }}>
              Preface
            </span>
          </Reveal>

          <Reveal delay={0.1}>
            <h1 className="text-[clamp(2.6rem,9vw,6.5rem)] font-black leading-[0.95] tracking-tighter mb-3">
              <span className="block" style={{ color: C.ink }}>In Pursuit</span>
              <span className="block">
                <span style={{ color: "#FFD400" }}>of</span> <span style={{ color: "#05A552" }}>Polymathy</span>
              </span>
            </h1>
          </Reveal>

          <Reveal delay={0.18}>
            <p className="font-black text-base md:text-lg tracking-tight mb-8" style={{ color: C.ink }}>
              by Ali Alatas, M.Sc.
            </p>
          </Reveal>

          <Reveal delay={0.25}>
            <p className="text-lg md:text-xl max-w-2xl mx-auto leading-relaxed text-[#1a1a1a]/80 mb-5">
              This is an open notebook kept by{" "}
              <span className="font-bold" style={{ color: C.blue }}>me</span>.
              By profession I work in faith; by curiosity I wander into science, art, culture, and technology, and whatever rabbit hole seems worth exploring.
            </p>
          </Reveal>

          <Reveal delay={0.35}>
            <p className="text-base md:text-lg max-w-2xl mx-auto leading-relaxed text-[#1a1a1a]/70">
              It isn&apos;t a portfolio. It&apos;s a place for ideas, books, conversations, and the questions that keep following me around.{" "}
              <span className="font-bold" style={{ color: C.red }}>The good stuff usually happens in the spaces between things.</span>
            </p>
          </Reveal>

          <motion.div animate={{ y: [0, 14, 0] }} transition={{ duration: 1.8, repeat: Infinity }} className="mt-14 inline-flex flex-col items-center gap-2">
            <span className="text-xs font-bold tracking-widest uppercase">Scroll</span>
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke={C.ink} strokeWidth="2.5">
              <path d="M12 5v14M19 12l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.div>
        </motion.div>
      </section>

      <Marquee text="THE POLYMATH'S NOTE" color={C.ink} bg={C.lime} />

      {/* ============ THE POLYMATH'S NOTE ============ */}
      <section className="relative py-32 px-6 overflow-hidden">
        <ScatteredDecor offset={2} />
        <div className="relative z-10 max-w-6xl mx-auto">
          <Reveal>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-full font-bold text-xs border-[2px] border-[#1a1a1a] uppercase tracking-wider" style={{ backgroundColor: C.pink, color: C.ink }}>
              Essays
            </span>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="text-[clamp(2.5rem,8vw,6rem)] font-black leading-[0.9] tracking-tighter mb-4 max-w-4xl">
              <span style={{ color: C.ink }}>The </span>
              <span className="font-black" style={{ color: C.red }}>Polymath&apos;s</span>{" "}
              <span style={{ color: C.blue }}>Note.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-2xl md:text-3xl font-bold mb-8 max-w-3xl" style={{ color: C.ink }}>
              I&apos;ve literally never been the &ldquo;pick one thing and stick to it&rdquo; type.
            </p>
          </Reveal>
          <div className="grid md:grid-cols-2 gap-10 max-w-5xl">
            <Reveal delay={0.3}>
              <p className="text-lg leading-relaxed text-[#1a1a1a]/80">
                My brain runs like 47 tabs open at once: faith in one, some random physics rabbit hole in another, a design idea, a half-finished thought about a book I read at 2am, and a question I genuinely cannot stop thinking about.{" "}
                <span className="px-1.5 font-semibold" style={{ backgroundColor: C.lime }}>That chaos is the whole vibe.</span>{" "}
                The writing here doesn&apos;t start because I have the answer. It starts because something quietly refuses to leave me alone, and honestly that&apos;s usually the good stuff.
              </p>
            </Reveal>
            <Reveal delay={0.4}>
              <p className="text-lg leading-relaxed text-[#1a1a1a]/80">
                So this is basically my brain in public: notes, books, late-night thoughts, conversations I didn&apos;t want to lose, and ideas that are still a little undercooked.{" "}
                <span className="font-bold" style={{ color: C.red }}>Some stay tiny. Some level up into full essays.</span>{" "}
                Some never become anything clean at all, and i&apos;ve made peace with that. No pressure to be polished here, just curiosity doing its thing out loud, in real time, for whoever&apos;s reading.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <Marquee text="THE MAP" color={C.paper} bg={C.red} />

      {/* ============ THE MAP ============ */}
      <section className="relative py-32 px-6 overflow-hidden" style={{ backgroundColor: C.paper }}>
        <ScatteredDecor offset={4} />
        <div className="relative z-10 max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-start">
          <div>
            <Reveal>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-full font-bold text-xs border-[2px] border-[#1a1a1a] uppercase tracking-wider" style={{ backgroundColor: C.blue, color: C.paper }}>
                Cartography of Curiosity
              </span>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="text-[clamp(2.5rem,7vw,5rem)] font-black leading-[0.95] tracking-tighter mb-6">
                <span style={{ color: C.ink }}>The </span>
                <span className="font-black" style={{ color: C.pink }}>Map.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-xl md:text-2xl font-bold mb-6 leading-snug">basically a live heatmap of whatever my brain is obsessed with rn.</p>
            </Reveal>
            <Reveal delay={0.3}>
              <p className="text-base md:text-lg leading-relaxed text-[#1a1a1a]/80 mb-4">
                ok so picture my head as one of those{" "}
                <span className="px-1.5 font-semibold" style={{ backgroundColor: C.lime }}>weather radar things</span>, except instead of storms it&apos;s tracking{" "}
                <span className="font-bold" style={{ color: "#05A552" }}>faith, fiqh, sufism, theology</span> glowing in the center, then big ideas, history, academia and research lighting up right next to them.
              </p>
            </Reveal>
            <Reveal delay={0.4}>
              <p className="text-base md:text-lg leading-relaxed text-[#1a1a1a]/80 mb-4">
                the hotter the patch, the more it&apos;s living in my head this week. teaching, community, social stuff, project drops, art, lit, culture, science, they&apos;re all{" "}
                <span className="font-bold" style={{ color: C.blue }}>on the map at the same time</span>. no main character, no side quests. everything&apos;s kinda the main thing.
              </p>
            </Reveal>
            <Reveal delay={0.5}>
              <p className="text-base md:text-lg leading-relaxed text-[#1a1a1a]/80">
                and yeah it&apos;s always shifting. some patches cool down, new ones spike out of nowhere bc i read one unhinged sentence at 2am. that&apos;s the whole vibe:{" "}
                <span className="font-bold" style={{ color: C.red }}>curiosity that genuinely refuses to pick a lane.</span>
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.2}>
            <div className="relative">
              <RadarMap />
              <div className="mt-4 text-center">
                <span className="text-xs font-bold tracking-widest uppercase opacity-60">⟢ interest heatmap · live</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <Marquee text="LOGBOOK" color={C.ink} bg={C.pink} />

      {/* ============ LOGBOOK ============ */}
      <section className="relative py-32 px-6 overflow-hidden">
        <ScatteredDecor offset={6} />
        <div className="relative z-10 max-w-6xl mx-auto grid lg:grid-cols-[1.2fr_1fr] gap-12 items-start">
          <div>
            <Reveal>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-full font-bold text-xs border-[2px] border-[#1a1a1a] uppercase tracking-wider" style={{ backgroundColor: C.lime }}>
                External archive
              </span>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="text-[clamp(2.5rem,8vw,6rem)] font-black leading-[0.9] tracking-tighter mb-6">
                <span style={{ color: C.ink }}>The </span><span style={{ color: C.blue }}>Logbook.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-xl md:text-2xl font-bold mb-6 leading-snug">A realtime timeline of reads, drops, and 2am thoughts that actually stuck.</p>
            </Reveal>
            <Reveal delay={0.3}>
              <p className="text-lg leading-relaxed text-[#1a1a1a]/80 mb-4">
                This is the{" "}
                <span className="px-1.5 font-semibold" style={{ backgroundColor: C.pink }}>raw feed</span>{" "}
                behind everything: fiction, civilization takes, essays in progress, and notes I post the second they happen. The latest entries on the right update in real time.
              </p>
            </Reveal>
            <Reveal delay={0.4}>
              <p className="text-lg leading-relaxed text-[#1a1a1a]/80 mb-8">
                It lives on its own subdomain so it feels like a real field journal, dated and{" "}
                <span className="font-bold" style={{ color: C.red }}>a little messy on purpose.</span>
              </p>
            </Reveal>
            <Reveal delay={0.5}>
              <motion.a whileHover={{ x: 6, y: -3 }} whileTap={{ scale: 0.96 }} href="https://logbook-alataasss.vercel.app" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-bold text-base border-[3px] border-[#1a1a1a] shadow-[5px_5px_0_0_#1a1a1a] transition-shadow hover:shadow-[8px_8px_0_0_#1a1a1a]" style={{ backgroundColor: C.blue, color: C.paper }}>
                Open latest entries
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M7 17L17 7M17 7H7M17 7V17" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </motion.a>
            </Reveal>
          </div>
          <Reveal delay={0.2}>
            <LogbookFeed />
          </Reveal>
        </div>
      </section>

      <Marquee text="TILLNITE STUDIO" color={C.paper} bg={C.blue} />

      {/* ============ TILLNITE STUDIO ============ */}
      <section className="relative py-32 px-6 overflow-hidden" style={{ backgroundColor: C.paper }}>
        <ScatteredDecor offset={8} />
        <div className="relative z-10 max-w-6xl mx-auto grid lg:grid-cols-[1fr_1.2fr] gap-12 items-start">
          <Reveal delay={0.2}>
            <LibraryCard />
          </Reveal>
          <div>
            <Reveal>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-full font-bold text-xs border-[2px] border-[#1a1a1a] uppercase tracking-wider" style={{ backgroundColor: C.red, color: C.paper }}>
                Library
              </span>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="text-[clamp(2.5rem,8vw,6rem)] font-black leading-[0.9] tracking-tighter mb-6">
                <span style={{ color: C.ink }}>Tillnite</span>{" "}
                <span className="font-black" style={{ color: C.pink }}>Studio.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-xl md:text-2xl font-bold mb-6 leading-snug">My little digital library, and yes, you can actually borrow stuff.</p>
            </Reveal>
            <Reveal delay={0.3}>
              <p className="text-lg leading-relaxed text-[#1a1a1a]/80 mb-4">
                Tillnite turned into a{" "}
                <span className="px-1.5 font-semibold" style={{ backgroundColor: C.lime }}>full library app</span>: you{" "}
                <span className="font-bold" style={{ color: C.blue }}>login</span>, browse the shelves, hit{" "}
                <span className="font-bold" style={{ color: C.pink }}>borrow</span>, read it, then{" "}
                <span className="font-bold" style={{ color: C.red }}>return</span> it when you&apos;re done. Like a real library, minus the late-fee guilt trip.
              </p>
            </Reveal>
            <Reveal delay={0.4}>
              <p className="text-lg leading-relaxed text-[#1a1a1a]/80 mb-8">
                Books, essays, zines, and weird little reads I actually rate, all in one place. The name? Most of it gets built{" "}
                <span className="font-bold" style={{ color: C.red }}>till nite</span>, way past closing time.
              </p>
            </Reveal>
            <Reveal delay={0.5}>
              <motion.a whileHover={{ x: 6, y: -3 }} whileTap={{ scale: 0.96 }} href="https://tillnite-studio.web.app" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-bold text-base border-[3px] border-[#1a1a1a] shadow-[5px_5px_0_0_#1a1a1a] transition-shadow hover:shadow-[8px_8px_0_0_#1a1a1a]" style={{ backgroundColor: C.pink, color: C.ink }}>
                Enter the library
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M7 17L17 7M17 7H7M17 7V17" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </motion.a>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============ FOOTER ============ */}
      <footer className="relative pt-20 pb-10 px-6 border-t-[3px] border-[#1a1a1a] overflow-hidden" style={{ backgroundColor: C.lime }}>
        <ScatteredDecor offset={1} />
        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <Reveal>
            <h3 className="text-[clamp(2rem,6vw,4rem)] font-black mb-3 tracking-tighter">
              <span style={{ color: C.ink }}>Built slowly.</span>{" "}
              <span className="font-black" style={{ color: C.red }}>Written honestly.</span>
            </h3>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-lg mb-10 max-w-xl mx-auto">Still figuring things out.</p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {[
                { label: "Instagram", href: "https://instagram.com/alataasss", bg: C.pink },
                { label: "Twitter", href: "https://twitter.com/alataasss", bg: C.blue },
                { label: "X", href: "https://x.com/alataasss", bg: C.ink },
                { label: "Threads", href: "https://www.threads.net/@alataasss", bg: C.paper },
                { label: "Gmail", href: "mailto:alataasss@gmail.com", bg: C.red },
                { label: "GitHub", href: "https://github.com/alataasss", bg: "#FFD400" },
                { label: "Vercel", href: "https://vercel.com/alataasss", bg: "#05A552" },
              ].map((s) => (
                <motion.a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" whileHover={{ y: -4, rotate: -2 }} whileTap={{ scale: 0.95 }} className="px-6 py-3 rounded-full font-bold text-sm border-[3px] border-[#1a1a1a] shadow-[4px_4px_0_0_#1a1a1a] transition-shadow hover:shadow-[6px_6px_0_0_#1a1a1a]" style={{ backgroundColor: s.bg, color: [C.blue, C.red, C.ink, "#05A552"].includes(s.bg) ? C.paper : C.ink }}>
                  {s.label}
                </motion.a>
              ))}
            </div>
          </Reveal>
          <p className="text-xs font-bold opacity-70">© {new Date().getFullYear()} ALI ALATAS · ALL RIGHTS RESERVED</p>
        </div>
      </footer>
    </div>
  );
}
