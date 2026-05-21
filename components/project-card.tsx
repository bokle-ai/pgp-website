"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { EASE } from "@/lib/animation";
import type { Project } from "@/lib/data/projects";

const statusConfig = {
  available: {
    label: "Available",
    bg: "rgba(46,125,91,0.95)",
    color: "#fff",
  },
  "few-left": {
    label: "Selling Fast",
    bg: "rgba(184,134,11,0.95)",
    color: "#fff",
  },
  "sold-out": {
    label: "Sold Out",
    bg: "rgba(139,58,58,0.9)",
    color: "#fff",
  },
};

export function ProjectCard({
  project,
  animationDelay = 0,
}: {
  project: Project;
  animationDelay?: number;
}) {
  const status = statusConfig[project.status];
  const prefersReduced = useReducedMotion();

  return (
    <motion.article
      className="group relative flex flex-col bg-white"
      style={{ border: "1px solid var(--line)" }}
      initial={prefersReduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.65, delay: animationDelay, ease: EASE }}
    >
      {/* Gold left border on hover */}
      <span
        className="absolute left-0 top-0 bottom-0 w-[3px] scale-y-0 group-hover:scale-y-100 origin-top transition-transform duration-500"
        style={{ backgroundColor: "var(--accent-gold)" }}
        aria-hidden="true"
      />

      <div
        className="relative overflow-hidden img-warm"
        style={{ aspectRatio: "3 / 2" }}
      >
        <Image
          src={project.image}
          alt={`${project.name} — plotted layout in ${project.location}`}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div
          className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1 text-[10px] uppercase"
          style={{
            backgroundColor: status.bg,
            color: status.color,
            fontFamily: "var(--font-montserrat, sans-serif)",
            letterSpacing: "0.14em",
            fontWeight: 600,
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-current" aria-hidden="true" />
          {status.label}
        </div>
      </div>

      <div className="p-6 flex flex-col gap-3 flex-1">
        <h3
          style={{
            fontFamily: "var(--font-playfair, Georgia, serif)",
            fontWeight: 500,
            fontSize: "1.35rem",
            color: "var(--ink)",
            letterSpacing: "-0.01em",
            lineHeight: 1.2,
          }}
        >
          {project.name}
        </h3>

        <p
          className="text-xs uppercase"
          style={{
            color: "var(--ink-faint)",
            fontFamily: "var(--font-montserrat, sans-serif)",
            letterSpacing: "0.16em",
          }}
        >
          {project.location}
        </p>

        <div className="flex items-baseline gap-3 mt-1 flex-wrap">
          <p
            className="text-sm tabular-nums font-medium"
            style={{
              color: "var(--ink)",
              fontFamily: "var(--font-playfair, Georgia, serif)",
              fontSize: "1.1rem",
            }}
          >
            ₹{project.priceInLakhs % 1 === 0
              ? project.priceInLakhs
              : project.priceInLakhs}{" "}
            Lakhs
          </p>
          <p
            className="text-xs tabular-nums"
            style={{
              color: "var(--ink-faint)",
              fontFamily: "var(--font-montserrat, sans-serif)",
            }}
          >
            {project.sizes}
          </p>
        </div>

        <Link
          href={`/projects/${project.slug}`}
          className="mt-auto pt-4 text-sm font-medium flex items-center gap-1.5 transition-opacity hover:opacity-70 group/link"
          style={{
            color: "var(--accent-gold)",
            fontFamily: "var(--font-montserrat, sans-serif)",
            fontWeight: 500,
            borderTop: "1px solid var(--line)",
            marginTop: "0.5rem",
          }}
        >
          View project
          <span
            className="transition-transform group-hover/link:translate-x-1"
            aria-hidden="true"
          >
            →
          </span>
        </Link>
      </div>
    </motion.article>
  );
}
