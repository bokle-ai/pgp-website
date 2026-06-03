"use client";

import Image from "next/image";
import Link from "next/link";
import { MapPin, ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { EASE } from "@/lib/animation";
import type { Project } from "@/lib/data/projects";

const statusConfig = {
  available: { label: "Available", dot: "#2E7D5B" },
  "few-left": { label: "Few Left", dot: "#D4A017" },
  "sold-out": { label: "Sold Out", dot: "#8B3A3A" },
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
        backgroundColor: "white",
        borderRadius: 20,
        border: "1px solid rgba(15,61,46,0.08)",
        boxShadow: "0 4px 24px rgba(15,61,46,0.07)",
      }}
      initial={prefersReduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.65, delay: animationDelay, ease: EASE }}
      whileHover={prefersReduced ? {} : {
        y: -8,
        boxShadow: "0 20px 48px rgba(15,61,46,0.14)",
      }}
    >
      {/* Image — wider aspect */}
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={project.image}
          alt={`${project.name} plotted layout in ${project.location}`}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-[1.07]"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />

        {/* Dark gradient for bottom badges */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "linear-gradient(180deg, rgba(0,0,0,0) 40%, rgba(0,0,0,0.45) 100%)",
          }}
        />

        {/* Status — top left */}
        <div
          className="absolute top-3.5 left-3.5 inline-flex items-center gap-1.5 px-3 py-1.5 text-[11px]"
          style={{
            backgroundColor: "rgba(255,255,255,0.92)",
            color: "var(--ink)",
            fontFamily: "var(--font-body)",
            fontWeight: 600,
            letterSpacing: "0.06em",
            borderRadius: 999,
            backdropFilter: "blur(8px)",
          }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full shrink-0"
            style={{ backgroundColor: status.dot }}
            aria-hidden="true"
          />
          {status.label}
        </div>

        {/* Price — bottom right over image */}
        <div
          className="absolute bottom-3.5 right-3.5 px-3.5 py-1.5 tabular-nums text-sm"
          style={{
            backgroundColor: "var(--accent-gold)",
            color: "var(--bg-deep)",
            fontFamily: "var(--font-body)",
            fontWeight: 700,
            borderRadius: 10,
          }}
        >
          ₹{project.priceInLakhs} L
        </div>
      </div>

      {/* Content */}
      <div className="p-5 lg:p-6 flex flex-col gap-3 flex-1">
        {/* Location */}
        <div
          className="inline-flex items-center gap-1.5 text-[11px] uppercase"
          style={{
            color: "var(--accent-gold)",
            fontFamily: "var(--font-body)",
            fontWeight: 700,
            letterSpacing: "0.14em",
          }}
        >
          <MapPin size={11} aria-hidden="true" />
          {project.location}
        </div>

        {/* Name */}
        <h3
          style={{
            fontFamily: "var(--font-heading)",
            fontWeight: 700,
            fontSize: "1.35rem",
            color: "var(--ink)",
            lineHeight: 1.2,
            letterSpacing: "-0.02em",
          }}
        >
          {project.name}
        </h3>

        {/* Size + approval */}
        <div className="flex items-center gap-3 flex-wrap">
          <span
            className="text-[12px] px-2.5 py-1 rounded-full"
            style={{
              backgroundColor: "rgba(15,61,46,0.06)",
              color: "var(--ink-muted)",
              fontFamily: "var(--font-body)",
              fontWeight: 500,
            }}
          >
            {project.sizes}
          </span>
          <span
            className="text-[12px] px-2.5 py-1 rounded-full"
            style={{
              backgroundColor: "rgba(212,160,23,0.1)",
              color: "var(--bg-deep)",
              fontFamily: "var(--font-body)",
              fontWeight: 600,
            }}
          >
            {project.approval} Approved
          </span>
        </div>

        {/* CTA */}
        <Link
          href={`/projects/${project.slug}`}
          className="mt-auto inline-flex items-center justify-between text-[13.5px] transition-all group/cta"
          style={{
            color: "var(--bg-deep)",
            fontFamily: "var(--font-body)",
            fontWeight: 600,
            backgroundColor: "var(--bg-cream)",
            padding: "11px 18px",
            borderRadius: 999,
            border: "1.5px solid rgba(15,61,46,0.12)",
          }}
        >
          View project
          <motion.span
            className="inline-flex"
            animate={prefersReduced ? {} : undefined}
            whileHover={prefersReduced ? {} : { x: 3 }}
            aria-hidden="true"
          >
            <ArrowRight size={15} />
          </motion.span>
        </Link>
      </div>
    </motion.article>
  );
}
