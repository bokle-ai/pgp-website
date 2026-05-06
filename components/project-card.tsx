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
    bg: "rgba(46,125,91,0.9)",
    color: "#fff",
  },
  "few-left": {
    label: "Few Left",
    bg: "rgba(184,134,11,0.9)",
    color: "#fff",
  },
  "sold-out": {
    label: "Sold Out",
    bg: "rgba(139,58,58,0.88)",
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
      className="group flex flex-col"
      style={{ border: "1px solid var(--line)" }}
      initial={prefersReduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.65, delay: animationDelay, ease: EASE }}
    >
      <div className="relative aspect-[4/3] rounded-2xl overflow-hidden img-warm">
        <Image
          src={project.image}
          alt={`${project.name} — plotted layout in ${project.location}`}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div
          className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium"
          style={{
            backgroundColor: status.bg,
            color: status.color,
            fontFamily: "var(--font-dm-sans, sans-serif)",
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-current" aria-hidden="true" />
          {status.label}
        </div>
      </div>

      <div className="p-5 flex flex-col gap-3 flex-1">
        <div
          className="flex items-center gap-1.5 text-xs"
          style={{ color: "var(--accent-gold)", fontFamily: "var(--font-dm-sans, sans-serif)" }}
        >
          <MapPin size={11} aria-hidden="true" />
          {project.location}
        </div>

        <h3
          className="transition-colors group-hover:text-[var(--accent-gold)]"
          style={{
            fontFamily: "var(--font-fraunces, Georgia, serif)",
            fontWeight: 600,
            fontSize: "1.25rem",
            color: "var(--ink)",
            lineHeight: 1.2,
          }}
        >
          {project.name}
        </h3>

        <div className="space-y-1">
          <p
            className="text-sm"
            style={{ color: "var(--ink-muted)", fontFamily: "var(--font-dm-sans, sans-serif)" }}
          >
            Plot sizes: {project.sizes}
          </p>
          <p
            className="text-sm tabular-nums"
            style={{ color: "var(--ink-muted)", fontFamily: "var(--font-dm-sans, sans-serif)" }}
          >
            Rate: ₹{project.rate.toLocaleString("en-IN")} / sq ft onwards
          </p>
        </div>

        <div
          className="flex flex-wrap gap-x-3 gap-y-1 text-xs"
          style={{ color: "var(--ink-faint)", fontFamily: "var(--font-dm-sans, sans-serif)" }}
        >
          <span>{project.approval} Approved</span>
          <span aria-hidden="true">·</span>
          <span>{project.plotCount} plots</span>
          {project.amenities.slice(0, 1).map((a) => (
            <span key={a}>
              <span aria-hidden="true">·</span> {a}
            </span>
          ))}
        </div>

        <Link
          href={`/projects/${project.slug}`}
          className="mt-auto text-sm font-medium flex items-center gap-1 transition-opacity hover:opacity-70 group/link"
          style={{
            color: "var(--accent-gold)",
            fontFamily: "var(--font-dm-sans, sans-serif)",
            fontWeight: 500,
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
