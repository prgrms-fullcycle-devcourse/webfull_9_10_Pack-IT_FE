// src/features/letter/components/LetterEffect.tsx
import { motion } from "framer-motion";
import { HEART_PARTICLES, PEACE_PARTICLES } from "../../utils/LetterOpenEffect";

export function HeartMist({ show }: { show: boolean }) {
  if (!show) return null;
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 999,
      }}
    >
      {HEART_PARTICLES.map((p) => (
        <motion.div
          key={p.id}
          initial={{ y: "90vh", x: `${p.x}vw`, opacity: 0, scale: 0.5 }}
          animate={{
            y: "20vh",
            x: [`${p.x}vw`, `${p.x + p.drift * 2}vw`],
            opacity: [0, 0.8, 0.8, 0],
            scale: [0.5, 1, 1, 0.7],
          }}
          transition={{ duration: p.duration, delay: p.delay, ease: "easeOut" }}
          style={{ position: "absolute", fontSize: p.size }}
        >
          ❤️
        </motion.div>
      ))}
    </div>
  );
}

export function PeaceMist({ show }: { show: boolean }) {
  if (!show) return null;
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 999,
      }}
    >
      {PEACE_PARTICLES.map((p) => (
        <motion.div
          key={p.id}
          initial={{ y: `${p.startY}vh`, x: `${p.x}vw`, opacity: 0, scale: 0 }}
          animate={{
            y: `${p.endY}vh`,
            x: [
              `${p.x}vw`,
              `${p.x + p.wiggle}vw`,
              `${p.x - p.wiggle}vw`,
              `${p.x + p.wiggle * 0.5}vw`,
              `${p.x}vw`,
            ],
            opacity: [0, 0.8, 0.8, 0.8, 0],
            scale: [0, 1, 1, 1, 0.5],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            ease: "linear",
            x: {
              duration: p.duration,
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "mirror",
            },
          }}
          style={{
            position: "absolute",
            width: p.size,
            height: p.size,
            borderRadius: "50%",
            background: p.color,
            filter: "blur(0.5px)",
          }}
        />
      ))}
    </div>
  );
}