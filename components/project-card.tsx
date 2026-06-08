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
      /* Outer shell (double-bezel tray) */
      className="group relative h-full p-1.5"
      style={{
        backgroundColor: "rgba(15,61,46,0.025)",
        borderRadius: 22,
        boxShadow:
          "inset 0 0 0 1px rgba(15,61,46,0.08), 0 1px 2px rgba(15,61,46,0.04), 0 16px 40px -16px rgba(15,61,46,0.18)",
        willChange: "transform",
      }}
      initial={prefersReduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.65, delay: animationDelay, ease: EASE }}
      whileHover={prefersReduced ? {} : { y: -6, transition: { duration: 0.5, ease: EASE } }}
    >
      <div
        className="relative flex flex-col overflow-hidden h-full"
        style={{
          backgroundColor: "white",
          borderRadius: 16,
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.7)",
        }}
      >
      {/* Image, wider aspect */}
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={project.image}
          alt={`${project.name} plotted layout in ${project.location}`}
          fill
          className="object-cover ease-[cubic-bezier(0.32,0.72,0,1)] transition-transform duration-[900ms] group-hover:scale-[1.07]"
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

        {/* Status, top left */}
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

        {/* Price, bottom right over image */}
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
            color: "var(--gold-ink)",
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

        {/* CTA — button-in-button */}
        <Link
          href={`/projects/${project.slug}`}
          className="group/cta mt-auto inline-flex items-center justify-between text-[13.5px] pl-5 pr-2 py-2 active:scale-[0.98] ease-[cubic-bezier(0.32,0.72,0,1)] transition-transform duration-300"
          style={{
            color: "var(--bg-cream)",
            fontFamily: "var(--font-body)",
            fontWeight: 600,
            backgroundColor: "var(--bg-deep)",
            borderRadius: 999,
          }}
        >
          View project
          <span
            aria-hidden="true"
            className="inline-flex items-center justify-center w-8 h-8 rounded-full ease-[cubic-bezier(0.32,0.72,0,1)] transition-transform duration-300 group-hover/cta:translate-x-0.5"
            style={{ backgroundColor: "rgba(248,245,239,0.14)", color: "var(--accent-gold)" }}
          >
            <ArrowRight size={15} />
          </span>
        </Link>
      </div>
      </div>
    </motion.article>
  );
}
