/** @type {import('next').NextConfig} */

// Pretty-URL → static HTML mappings for the legacy marketing site and the
// self-contained client mockups (all now served from /public). Keeping these
// here (instead of vercel.json) is the recommended approach for Next.js apps.
const legacyRewrites = [
  { source: "/", destination: "/index.html" },
  { source: "/about", destination: "/about.html" },
  { source: "/carter-distribution", destination: "/clients_mockups/carter_client_reporting.html" },
  { source: "/exe-logistics", destination: "/clients_mockups/exe_labor_planning.html" },
  { source: "/safeway-logistics", destination: "/clients_mockups/safeway_returns_intelligence.html" },
  { source: "/paris-brothers", destination: "/clients_mockups/paris_brothers_demand_forecasting.html" },
  { source: "/usmmg", destination: "/clients_mockups/usmmg_labor_planning.html" },
  { source: "/mrb", destination: "/clients_mockups/mrb_invoice_auditor.html" },
  { source: "/ready-2-xecute", destination: "/clients_mockups/r2x_carrier_intelligence.html" },
  { source: "/air-sea-forwarders", destination: "/clients_mockups/airsea_invoice_auditor.html" },
  { source: "/vss-carriers", destination: "/clients_mockups/vss_carrier_intelligence.html" },
  { source: "/hessen-logistics", destination: "/clients_mockups/hessen_invoice_auditor.html" },
];

const nextConfig = {
  async rewrites() {
    return {
      // Funnel every /api/* request to the existing Express serverless function
      // (api/index.js), preserving the original path for its internal router.
      beforeFiles: [{ source: "/api/:path*", destination: "/api" }],
      // The /mockups route is a Next.js page and doesn't need a rewrite.
      // Run after Next.js routes + /public lookups so legacy HTML files are served.
      afterFiles: legacyRewrites,
    };
  },
};

module.exports = nextConfig;
