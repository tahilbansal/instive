/**
 * Instive AI — minimal backend
 * Persists footer email captures and Blueprint Session requests to MongoDB.
 *
 * Run:
 *   npm install
 *   MONGODB_URI="mongodb://localhost:27017/instive" node server.js
 *
 * Then in index.html set:  const API_BASE = "http://localhost:4000";
 */
const express = require("express");
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors()); // tighten origin in production: cors({ origin: "https://instive.ai" })

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/instive";
const PORT = process.env.PORT || 4000;

/* ---------- Database Connection (Serverless Friendly) ---------- */
const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) return;
  return mongoose.connect(MONGODB_URI);
};

// Middleware to ensure DB connection for every request
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    console.error("DB Connection Error:", err);
    res.status(500).json({ ok: false, error: "Database connection failed" });
  }
});

/* ---------- Schemas ---------- */
const Lead = mongoose.model("Lead", new mongoose.Schema({
  email:  { type: String, required: true, trim: true, lowercase: true },
  source: { type: String, default: "footer_capture" },
  createdAt: { type: Date, default: Date.now }
}));

const BlueprintSession = mongoose.model("BlueprintSession", new mongoose.Schema({
  name:    { type: String, required: true, trim: true },
  email:   { type: String, required: true, trim: true, lowercase: true },
  company: { type: String, trim: true },
  domain:  { type: String, trim: true },
  notes:   { type: String, trim: true },
  source:  { type: String, default: "blueprint_modal" },
  createdAt: { type: Date, default: Date.now }
}));

/* ---------- Email Transporter ---------- */
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: parseInt(process.env.SMTP_PORT || "465"),
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

/* ---------- Helpers ---------- */
const isEmail = (v) => typeof v === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

/* ---------- Routes ---------- */
app.get("/health", (_req, res) => res.json({ ok: true }));

app.post("/api/leads", async (req, res) => {
  try {
    const { email, source } = req.body || {};
    if (!isEmail(email)) return res.status(400).json({ ok: false, error: "Invalid email" });
    const lead = await Lead.create({ email, source });

    // Send notification email
    if (process.env.SMTP_USER && process.env.SMTP_PASS) {
      try {
        await transporter.sendMail({
          from: `"Instive AI Alerts" <${process.env.SMTP_USER}>`,
          to: "tahilbansal@instiveai.com",
          subject: `New Lead: ${email}`,
          text: `A new lead has subscribed.\nEmail: ${email}\nSource: ${source}`
        });
      } catch (mailErr) {
        console.error("Email notification failed:", mailErr.message);
      }
    }

    res.json({ ok: true, id: lead._id });
  } catch (e) {
    console.error("Lead Error:", e);
    res.status(500).json({ ok: false, error: e.message });
  }
});

app.post("/api/blueprint-sessions", async (req, res) => {
  try {
    const { name, email, company, domain, notes, source } = req.body || {};
    if (!name || !isEmail(email)) return res.status(400).json({ ok: false, error: "Name and valid email required" });
    const doc = await BlueprintSession.create({ name, email, company, domain, notes, source });

    // Send notification email
    if (process.env.SMTP_USER && process.env.SMTP_PASS) {
      try {
        await transporter.sendMail({
          from: `"Instive AI Alerts" <${process.env.SMTP_USER}>`,
          to: "tahilbansal@instiveai.com",
          subject: `New Blueprint Session: ${company}`,
          text: `Name: ${name}\nEmail: ${email}\nCompany: ${company}\nDomain: ${domain}\nNotes: ${notes}\nSource: ${source}`
        });
      } catch (mailErr) {
        console.error("Email notification failed:", mailErr.message);
      }
    }

    res.json({ ok: true, id: doc._id });
  } catch (e) {
    console.error("Blueprint Error:", e);
    res.status(500).json({ ok: false, error: e.message });
  }
});

/* ---------- Boot ---------- */
if (require.main === module) {
  connectDB()
    .then(() => app.listen(PORT, () => console.log(`Instive API on :${PORT}`)))
    .catch((err) => { console.error("Mongo connection failed:", err.message); process.exit(1); });
}

module.exports = app;
