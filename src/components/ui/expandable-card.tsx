import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

export interface ExpandableCardProps {
  title: string;
  description: string;
  src: string;
  children: React.ReactNode;
  onExpand?: () => void;
  onCollapse?: () => void;
}

export const ExpandableCard = React.memo(function ExpandableCard({
  title,
  description,
  src,
  children,
  onExpand,
  onCollapse,
}: ExpandableCardProps) {
  const [expanded, setExpanded] = React.useState(false);
  const cardRef = React.useRef<HTMLDivElement>(null);

  // For 3D tilt effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);
  };

  const handleExpand = () => {
    setExpanded(true);
    onExpand && onExpand();
  };
  const handleCollapse = () => {
    setExpanded(false);
    onCollapse && onCollapse();
  };

  return (
    <div
      ref={cardRef}
      className={cn(
        "program-card bg-white dark:bg-zinc-900 shadow-xl rounded-xl overflow-hidden w-full max-w-md transition-all duration-300 cursor-pointer relative",
        expanded ? "expanded z-20" : "hover:scale-[1.03] z-10"
      )}
      tabIndex={0}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => {
        const card = cardRef.current;
        if (card) {
          card.style.removeProperty("--mouse-x");
          card.style.removeProperty("--mouse-y");
        }
      }}
      onClick={() => (expanded ? handleCollapse() : handleExpand())}
      aria-expanded={expanded}
    >
      <div className="card-content p-6 flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <img
            src={src}
            alt={title}
            className="w-16 h-16 object-cover rounded-lg shadow-md border border-zinc-200 dark:border-zinc-800"
          />
          <div>
            <h3 className="text-lg font-bold text-zinc-900 dark:text-white">
              {title}
            </h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-300">
              {description}
            </p>
          </div>
          <span className={cn(
            "ml-auto transition-transform",
            expanded ? "rotate-180" : ""
          )}>
            <ChevronDown className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          </span>
        </div>
        <AnimatePresence initial={false}>
          {expanded && (
            <motion.div
              key="expand"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.25 }}
              className="mt-4"
            >
              {children}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}); 