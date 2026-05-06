"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { siteConfig } from "@/lib/data/site";

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z
    .string()
    .regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit Indian mobile number"),
  email: z.string().email("Enter a valid email address").optional().or(z.literal("")),
  location: z.string().min(1, "Please select a location"),
  date: z.string().optional(),
  message: z.string().optional(),
  honeypot: z.string().max(0, "Bot detected"),
});

type FormData = z.infer<typeof schema>;

export function VisitForm() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setSubmitting(true);
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: process.env.NEXT_PUBLIC_WEB3FORMS_KEY || "YOUR_KEY_HERE",
          subject: `Site Visit Request — ${data.name} — ${data.location}`,
          from_name: "PGP Website",
          name: data.name,
          phone: data.phone,
          email: data.email || "Not provided",
          location: data.location,
          preferred_date: data.date || "Not specified",
          message: data.message || "None",
          botcheck: data.honeypot,
        }),
      });

      if (res.ok) {
        setSubmitted(true);
      } else {
        alert("Something went wrong. Please call us directly.");
      }
    } catch {
      alert("Something went wrong. Please call us directly.");
    } finally {
      setSubmitting(false);
    }
  };

  const inputStyle = {
    backgroundColor: "rgba(255,255,255,0.06)",
    border: "1px solid var(--line-dark)",
    color: "var(--bg-cream)",
    fontFamily: "var(--font-dm-sans, sans-serif)",
    borderRadius: "6px",
    padding: "0.75rem 1rem",
    width: "100%",
    fontSize: "0.9375rem",
    outline: "none",
  };

  const labelStyle = {
    display: "block",
    fontSize: "0.8125rem",
    fontWeight: 500,
    color: "rgba(246,241,231,0.7)",
    fontFamily: "var(--font-dm-sans, sans-serif)",
    marginBottom: "0.375rem",
  };

  const errorStyle = {
    fontSize: "0.75rem",
    color: "#F4A261",
    fontFamily: "var(--font-dm-sans, sans-serif)",
    marginTop: "0.25rem",
  };

  if (submitted) {
    return (
      <div
        className="rounded-lg p-8 text-center"
        style={{ backgroundColor: "rgba(46,125,91,0.2)", border: "1px solid rgba(46,125,91,0.4)" }}
      >
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4"
          style={{ backgroundColor: "var(--success)" }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M5 12l5 5L20 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h3
          className="mb-2"
          style={{
            fontFamily: "var(--font-fraunces, Georgia, serif)",
            fontWeight: 600,
            fontSize: "1.375rem",
            color: "var(--bg-cream)",
          }}
        >
          Request received.
        </h3>
        <p
          className="text-sm mb-4"
          style={{ color: "rgba(246,241,231,0.7)", fontFamily: "var(--font-dm-sans, sans-serif)", lineHeight: 1.6 }}
        >
          What happens next: we&apos;ll call you within 4 working hours to
          confirm a slot. If you need to reach us sooner, WhatsApp works fastest.
        </p>
        <a
          href={`https://wa.me/${siteConfig.whatsapp}?text=Hi%2C%20I%20just%20submitted%20a%20site%20visit%20request.%20Can%20you%20confirm%20my%20slot%3F`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium"
          style={{
            backgroundColor: "var(--accent-gold)",
            color: "var(--bg-deep)",
            borderRadius: "6px",
            fontFamily: "var(--font-dm-sans, sans-serif)",
            fontWeight: 500,
          }}
        >
          WhatsApp us now
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
      {/* Honeypot */}
      <input
        {...register("honeypot")}
        type="text"
        style={{ position: "absolute", opacity: 0, height: 0, width: 0 }}
        tabIndex={-1}
        aria-hidden="true"
        autoComplete="off"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" style={labelStyle}>
            Full name *
          </label>
          <input
            {...register("name")}
            id="name"
            type="text"
            autoComplete="name"
            placeholder="Karthik Subramaniam"
            style={inputStyle}
          />
          {errors.name && <p style={errorStyle}>{errors.name.message}</p>}
        </div>
        <div>
          <label htmlFor="phone" style={labelStyle}>
            Mobile number *
          </label>
          <input
            {...register("phone")}
            id="phone"
            type="tel"
            autoComplete="tel"
            placeholder="98765 43210"
            style={inputStyle}
          />
          {errors.phone && <p style={errorStyle}>{errors.phone.message}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="email" style={labelStyle}>
          Email address
        </label>
        <input
          {...register("email")}
          id="email"
          type="email"
          autoComplete="email"
          placeholder="karthik@example.com"
          style={inputStyle}
        />
        {errors.email && <p style={errorStyle}>{errors.email.message}</p>}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="location" style={labelStyle}>
            Preferred location *
          </label>
          <select
            {...register("location")}
            id="location"
            style={{ ...inputStyle, appearance: "none" }}
          >
            <option value="" style={{ backgroundColor: "var(--bg-deep)" }}>Select a location</option>
            <option value="Maraimalai Nagar" style={{ backgroundColor: "var(--bg-deep)" }}>Maraimalai Nagar</option>
            <option value="Kundrathur" style={{ backgroundColor: "var(--bg-deep)" }}>Kundrathur</option>
            <option value="Tambaram" style={{ backgroundColor: "var(--bg-deep)" }}>Tambaram</option>
            <option value="Any" style={{ backgroundColor: "var(--bg-deep)" }}>Any / Not decided</option>
          </select>
          {errors.location && <p style={errorStyle}>{errors.location.message}</p>}
        </div>
        <div>
          <label htmlFor="date" style={labelStyle}>
            Preferred date
          </label>
          <input
            {...register("date")}
            id="date"
            type="date"
            style={inputStyle}
          />
        </div>
      </div>

      <div>
        <label htmlFor="message" style={labelStyle}>
          Anything else?
        </label>
        <textarea
          {...register("message")}
          id="message"
          rows={3}
          placeholder="Budget, plot size preference, any specific questions..."
          style={{ ...inputStyle, resize: "none" }}
        />
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="w-full h-12 text-sm font-medium transition-opacity hover:opacity-90 disabled:opacity-60"
        style={{
          backgroundColor: "var(--accent-gold)",
          color: "var(--bg-deep)",
          fontFamily: "var(--font-dm-sans, sans-serif)",
          fontWeight: 500,
          borderRadius: "6px",
          border: "none",
          cursor: submitting ? "wait" : "pointer",
        }}
      >
        {submitting ? "Sending..." : "Request a Site Visit"}
      </button>
    </form>
  );
}
