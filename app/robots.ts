import type { MetadataRoute } from "next";

const BASE_URL = "https://www.primegoldenproperties.com";

// Bots that train commercial LLMs and image models on scraped content.
// We explicitly opt out of training and indexing by these agents.
const TRAINING_BOTS = [
  "GPTBot",
  "ChatGPT-User",
  "OAI-SearchBot",
  "ClaudeBot",
  "Claude-Web",
  "anthropic-ai",
  "Google-Extended",
  "CCBot",
  "PerplexityBot",
  "cohere-ai",
  "Bytespider",
  "FacebookBot",
  "Meta-ExternalAgent",
  "Applebot-Extended",
  "Amazonbot",
  "Diffbot",
  "img2dataset",
  "ImagesiftBot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Regular crawlers, search engines are welcome.
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
      // Block every known AI-training crawler from the entire site.
      ...TRAINING_BOTS.map((userAgent) => ({
        userAgent,
        disallow: "/",
      })),
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  };
}
