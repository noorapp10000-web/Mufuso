import { motion } from "framer-motion";

export type MascotPose =
  | "welcome"
  | "pointing_right"
  | "pointing_left"
  | "reading"
  | "thumbs_up"
  | "thinking"
  | "presenting"
  | "warning";

interface MascotProps {
  pose: MascotPose;
  height?: number;
  className?: string;
  delay?: number;
  floatAnimation?: boolean;
}

export default function Mascot({
  pose,
  height = 100,
  className = "",
  delay = 0,
  floatAnimation = true,
}: MascotProps) {
  return (
    <motion.img
      src={`/mascot/mascot_${pose}.webp`}
      alt=""
      aria-hidden="true"
      style={{ height, width: "auto" }}
      className={`object-contain select-none pointer-events-none drop-shadow-2xl ${className}`}
      initial={{ opacity: 0, y: 12 }}
      animate={
        floatAnimation
          ? [
              { opacity: 1, y: 0 },
              { opacity: 1, y: -6 },
              { opacity: 1, y: 0 },
            ]
          : { opacity: 1, y: 0 }
      }
      transition={
        floatAnimation
          ? {
              opacity: { duration: 0.5, delay },
              y: {
                delay: delay + 0.5,
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              },
            }
          : { duration: 0.5, delay }
      }
    />
  );
}
