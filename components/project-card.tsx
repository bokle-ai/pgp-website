"use client";

import Image from "next/image";
import Link from "next/link";
import { MapPin } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { EASE } from "@/lib/animation";
import type { Project } from "@/lib/data/projects";

const statusConfig = {
  available: {
    label: "Available",
    bg: "rgba(46,125,91,0.92)",
    color: "#fff",
  },
  "few-left": {
    label: "Few Left",
    bg: "rgba(184,134,11,0.92)",
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
      className="group relative flex flex-col overflow-hidden h-full"
      style={{
        backgroundColor: "var(--bg-cream)",
        borderRadius: 22,
        border: "1px solid rgba(15,61,46,0.10)",
        boxShadow: "0 10px 32px rgba(15,61,46,0.08)",
      }}
      initial={prefersReduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.65, delay: animationDelay, ease: EASE }}
      whileHover={prefersReduced ? {} : { y: -4 }}
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={project.image}
          alt={`${project.name} — plotted layout in ${project.location}`}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-[1.06]"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        {/* status badge */}
        <div
          className="absolute top-3.5 left-3.5 inline-flex items-center gap-1.5 px-3 py-1.5 text-[11px]"
          style={{
            backgroundColor: status.bg,
            color: status.color,
            fontFamily: "var(--font-montserrat, sans-serif)",
            fontWeight: 600,
            letterSpacing: "0.08em",
            borderRadius: 999,
            backdropFilter: "blur(6px)",
            WebkitBackdropFilter: "blur(6px)",
            boxShadow: "0 4px 12px rgba(0,0,0,0.18)",
          }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full bg-current"
            aria-hidden="true"
          />
          {status.label}
        </div>
        {/* price tile */}
        <div
          className="absolute bottom-3.5 right-3.5 px-3 py-1.5 text-sm tabular-nums"
          style={{
            backgroundColor: "rgba(15,61,46,0.88)",
            color: "var(--accent-gold)",
            fontFamily: "var(--font-montserrat, sans-serif)",
            fontWeight: 700,
            borderRadius: 10,
            backdropFilter: "blur(6px)",
            WebkitBackdropFilter: "blur(6px)",
            border: "1px solid rgba(212,160,23,0.35)",
          }}
        >
          ₹{project.priceInLakhs} L
        </div>
      </div>

      {/* Content */}
      <div className="p-5 lg:p-6 flex flex-col gap-3 flex-1">
        <div
          className="inline-flex items-center gap-1.5 text-[11px] uppercase"
          style={{
            color: "var(--accent-gold)",
            fontFamily: "var(--font-montserrat, sans-serif)",
            fontWeight: 700,
            letterSpacing: "0.12em",
          }}
        >
          <MapPin size={11} aria-hidden="true" />
          {project.location}
        </div>

        <h3
          className="transition-colors group-hover:text-[var(--accent-gold)]"
          style={{
            fontFamily: "var(--font-playfair, Georgia, serif)",
            fontWeight: 600,
            fontSize: "1.4rem",
            color: "var(--ink)",
            lineHeight: 1.15,
            letterSpacing: "-0.01em",
          }}
        >
          {project.name}
        </h3>

        <p
          className="text-[13px]"
          style={{
            color: "var(--ink-muted)",
            fontFamily: "var(--font-montserrat, sans-serif)",
          }}
        >
          Plot size: <span style={{ color: "var(--ink)", fontWeight: 500 }}>{project.sizes}</span>
        </p>

        <div
          className="flex flex-wrap gap-x-3 gap-y-1 text-[11px]"
          style={{
            color: "var(--ink-faint)",
            fontFamily: "var(--font-montserrat, sans-serif)",
            fontWeight: 600,
            letterSpacing: "0.05em",
            textTransform: "uppercase",
          }}
        >
          <span>{project.approval} Approved</span>
          {project.amenities.slice(0, 1).map((a) => (
            <span key={a} className="flex items-center gap-2">
              <span aria-hidden="true" style={{ color: "var(--accent-gold)" }}>·</span>
              {a}
            </span>
          ))}
        </div>

        <Link
          href={`/projects/${project.slug}`}
          className="mt-auto inline-flex items-center justify-between text-[13px] transition-all hover:brightness-110 active:scale-[0.98]"
          style={{
            color: "var(--bg-deep)",
            fontFamily: "var(--font-montserrat, sans-serif)",
            fontWeight: 600,
            backgroundColor: "var(--accent-gold)",
            padding: "10px 16px",
            borderRadius: 999,
            boxShadow:
              "0 4px 14px rgba(212,160,23,0.28), inset 0 1px 0 rgba(255,255,255,0.28)",
          }}
        >
          View project
          <span
            className="transition-transform group-hover:translate-x-1"
            aria-hidden="true"
          >
            →
          </span>
        </Link>
      </div>
    </motion.article>
  );
}
