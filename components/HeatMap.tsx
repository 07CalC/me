import React, { useEffect, useRef, useState } from "react";
import { motion, useAnimation, useInView } from "framer-motion";

type Contribution = {
  date: string;
  count: number;
  level: number;
};

export default function Heatmap() {
  const [contributions, setContributions] = useState<Contribution[]>([]);

  useEffect(() => {
    fetch("https://github-contributions-api.jogruber.de/v4/07calc?y=last")
      .then((res) => res.json())
      .then((data) => setContributions(data.contributions));
  }, []);

  const levelColors = [
    "bg-[#89b4fa0A]",
    "bg-[#89b4fa33]",
    "bg-[#89b4fa66]",
    "bg-[#89b4fa99]",
    "bg-[#89b4fa]",
  ];

  const weeks: Contribution[][] = [];
  for (let i = 0; i < contributions.length; i += 7) {
    weeks.push(contributions.slice(i, i + 7));
  }

  const monthLabels = weeks.map((week, i) => {
    const day = week[0];
    if (!day?.date) return "";

    const date = new Date(day.date);
    const month = date.toLocaleString("default", { month: "short" });

    const prev = weeks[i - 1]?.[0];
    const prevMonth = prev ? new Date(prev.date).getMonth() : null;

    if (prevMonth !== null && date.getMonth() === prevMonth) {
      return "";
    }

    return month;
  });

  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const controls = useAnimation();
  const ref = useRef(null)
  const inView = useInView(ref, { amount: 0.3 });

  useEffect(() => {
    if (inView) {
      controls.start({ opacity: 1, scale: 1 });
    } else {
      controls.start({ opacity: 0, scale: 0.95 });
    }
  }, [inView, controls]);

  return (
    <motion.div
      ref={ref}
      className="flex items-center justify-center p-4 bg-background mb-20"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={controls}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="overflow-x-auto">
        <div className="flex gap-1 md:ml-[36px] text-sm text-muted-foreground mb-2">
          {monthLabels.map((label, i) => (
            <div key={i} className="md:w-[clamp(12px,3vw,20px)] text-center">
              {label}
            </div>
          ))}
        </div>

        <div className="flex gap-1">
          <div className="hidden sm:flex flex-col gap-1 mr-2 text-xs text-muted-foreground mt-[5px]">
            {weekdays.map((day) => (
              <div
                key={day}
                className="h-[clamp(12px,3vw,20px)] w-8 text-right pr-1"
              >
                {day}
              </div>
            ))}
          </div>

          {weeks.map((week, i) => (
            <div key={i} className="flex flex-col gap-1">
              {[...Array(7)].map((_, j) => {
                const day = week[j];
                return (
                  <motion.div
                    key={j}
                    title={
                      day?.date
                        ? `${day.count} contributions on ${new Date(day.date).toLocaleDateString("en-IN")}`
                        : ""
                    }
                    className={`rounded-sm w-[clamp(12px,3vw,20px)] h-[clamp(12px,3vw,20px)] ${day ? levelColors[day.level] : "bg-transparent"
                      }`}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={controls}
                    transition={{
                      delay: 0.015 * i + 0.005 * j,
                      duration: 0.3,
                      ease: "easeOut",
                    }}

                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
