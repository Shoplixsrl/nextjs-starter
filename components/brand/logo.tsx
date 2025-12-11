import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  variant?: "full" | "icon";
}

const sizeClasses = {
  sm: { icon: "w-8 h-8", text: "text-lg" },
  md: { icon: "w-10 h-10", text: "text-xl" },
  lg: { icon: "w-12 h-12", text: "text-2xl" },
};

export function Logo({ className, size = "md", variant = "full" }: LogoProps) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <svg
        className={sizeClasses[size].icon}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#7C3AED" />
            <stop offset="100%" stopColor="#EC4899" />
          </linearGradient>
          <linearGradient id="sparkleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F97316" />
            <stop offset="100%" stopColor="#FBBF24" />
          </linearGradient>
        </defs>
        {/* Ticket stub base */}
        <rect
          x="4"
          y="10"
          width="40"
          height="28"
          rx="4"
          fill="url(#logoGradient)"
        />
        {/* Ticket notches */}
        <circle cx="4" cy="20" r="4" fill="white" />
        <circle cx="4" cy="28" r="4" fill="white" />
        <circle cx="44" cy="20" r="4" fill="white" />
        <circle cx="44" cy="28" r="4" fill="white" />
        {/* Dashed perforation line */}
        <line
          x1="14"
          y1="10"
          x2="14"
          y2="38"
          stroke="white"
          strokeWidth="2"
          strokeDasharray="4 3"
          opacity="0.6"
        />
        {/* Star sparkle */}
        <path
          d="M32 18L33.5 22L37.5 22L34.5 25L35.5 29L32 26.5L28.5 29L29.5 25L26.5 22L30.5 22L32 18Z"
          fill="url(#sparkleGradient)"
        />
        {/* Small sparkles */}
        <circle cx="24" cy="30" r="1.5" fill="white" opacity="0.8" />
        <circle cx="38" cy="15" r="1" fill="url(#sparkleGradient)" />
      </svg>
      {variant === "full" && (
        <span
          className={cn(
            "font-bold tracking-tight",
            sizeClasses[size].text
          )}
        >
          <span className="bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
            Event
          </span>
          <span className="text-slate-900">Hub</span>
        </span>
      )}
    </div>
  );
}

export function LogoIcon({ className }: { className?: string }) {
  return (
    <svg
      className={cn("w-8 h-8", className)}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="iconGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#7C3AED" />
          <stop offset="100%" stopColor="#EC4899" />
        </linearGradient>
        <linearGradient id="iconSparkle" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F97316" />
          <stop offset="100%" stopColor="#FBBF24" />
        </linearGradient>
      </defs>
      <rect
        x="4"
        y="10"
        width="40"
        height="28"
        rx="4"
        fill="url(#iconGradient)"
      />
      <circle cx="4" cy="20" r="4" fill="white" />
      <circle cx="4" cy="28" r="4" fill="white" />
      <circle cx="44" cy="20" r="4" fill="white" />
      <circle cx="44" cy="28" r="4" fill="white" />
      <line
        x1="14"
        y1="10"
        x2="14"
        y2="38"
        stroke="white"
        strokeWidth="2"
        strokeDasharray="4 3"
        opacity="0.6"
      />
      <path
        d="M32 18L33.5 22L37.5 22L34.5 25L35.5 29L32 26.5L28.5 29L29.5 25L26.5 22L30.5 22L32 18Z"
        fill="url(#iconSparkle)"
      />
      <circle cx="24" cy="30" r="1.5" fill="white" opacity="0.8" />
      <circle cx="38" cy="15" r="1" fill="url(#iconSparkle)" />
    </svg>
  );
}
