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
    <Accordion type="single" collapsible className="w-full">
      {faqs.map((faq) => (
        <AccordionItem
          key={faq.id}
          value={faq.id}
          style={{ borderColor: "var(--line)" }}
        >
          <AccordionTrigger
            className="text-left py-5 hover:no-underline"
            style={{
              fontFamily: "var(--font-montserrat, sans-serif)",
              fontWeight: 500,
              fontSize: "0.9375rem",
              color: "var(--ink)",
            }}
          >
            {faq.question}
          </AccordionTrigger>
          <AccordionContent
            style={{
              fontFamily: "var(--font-montserrat, sans-serif)",
              fontSize: "0.9375rem",
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
