import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import critters from "astro-critters";
import compress from "@playform/compress";
import tailwindcss from "@tailwindcss/vite";

function normalizeSitemapUrl(rawUrl) {
  const url = new URL(rawUrl);
  const keepTrailingSlash = url.pathname === "/" || url.pathname === "/en/";

  if (!keepTrailingSlash && url.pathname.endsWith("/")) {
    url.pathname = url.pathname.slice(0, -1);
  }

  return url.toString();
}

export default defineConfig({
  site: "https://apartments-dada.com",
  trailingSlash: "ignore",
  integrations: [
    react(),
    sitemap({
      serialize(item) {
        return {
          ...item,
          url: normalizeSitemapUrl(item.url),
          links: item.links?.map((link) => ({
            ...link,
            url: normalizeSitemapUrl(link.url)
          }))
        };
      }
    }),
    critters(),
    compress({
      CSS: true,
      HTML: true,
      JavaScript: true,
      Image: false,
      SVG: false
    })
  ],
  vite: {
    plugins: [tailwindcss()]
  }
});
