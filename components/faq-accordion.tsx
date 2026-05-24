"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqs } from "@/lib/data/faqs";

export function FAQAccordion() {
  return (
    <Accordion type="single" collapsible className="w-full space-y-3">
      {faqs.map((faq) => (
        <AccordionItem
          key={faq.id}
          value={faq.id}
          className="overflow-hidden"
          style={{
            border: "1px solid rgba(15,61,46,0.10)",
            borderRadius: 16,
            backgroundColor: "var(--bg-cream)",
            boxShadow: "0 4px 14px rgba(15,61,46,0.04)",
          }}
        >
          <AccordionTrigger
            className="text-left px-5 py-5 hover:no-underline transition-colors"
            style={{
              fontFamily: "var(--font-montserrat, sans-serif)",
              fontWeight: 600,
              fontSize: "0.975rem",
              color: "var(--ink)",
              letterSpacing: "-0.005em",
            }}
          >
            {faq.question}
          </AccordionTrigger>
          <AccordionContent
            className="px-5"
            style={{
              fontFamily: "var(--font-montserrat, sans-serif)",
              fontSize: "0.95rem",
              color: "var(--ink-muted)",
              lineHeight: 1.7,
              paddingBottom: "1.25rem",
            }}
          >
            {faq.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
