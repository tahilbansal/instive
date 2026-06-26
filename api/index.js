/**
 * Instive AI — Vercel Entry Point
 */
const express = require("express");
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const MONGODB_URI = process.env.MONGODB_URI;
const PORT = process.env.PORT || 4000;

/* ---------- Database Connection (Serverless Friendly) ---------- */
const connectDB = async () => {
  if (!MONGODB_URI) {
    throw new Error("MONGODB_URI is not defined in environment variables");
  }
  if (mongoose.connection.readyState >= 1) return;
  return mongoose.connect(MONGODB_URI, {
    serverSelectionTimeoutMS: 5000,
  });
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

const isEmail = (v) => typeof v === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

/* ---------- Routes ---------- */
app.post("/api/leads", async (req, res) => {
  try {
    const { email, source } = req.body || {};
    if (!isEmail(email)) return res.status(400).json({ ok: false, error: "Invalid email" });
    const lead = await Lead.create({ email, source });

    if (process.env.SMTP_USER && process.env.SMTP_PASS) {
      await transporter.sendMail({
        from: `"Instive AI Alerts" <${process.env.SMTP_USER}>`,
        to: "contact@instiveai.com",
        subject: `New Lead: ${email}`,
        text: `A new lead has subscribed.\nEmail: ${email}\nSource: ${source}`
      }).catch(err => console.error("Mail Error:", err.message));
    }

    res.json({ ok: true, id: lead._id });
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message });
  }
});

app.post("/api/blueprint-sessions", async (req, res) => {
  try {
    const { name, email, company, domain, notes, source } = req.body || {};
    if (!name || !isEmail(email)) return res.status(400).json({ ok: false, error: "Name and valid email required" });
    const doc = await BlueprintSession.create({ name, email, company, domain, notes, source });

    if (process.env.SMTP_USER && process.env.SMTP_PASS) {
      await transporter.sendMail({
        from: `"Instive AI Alerts" <${process.env.SMTP_USER}>`,
        to: "contact@instiveai.com",
        subject: `New Blueprint Session: ${company}`,
        text: `Name: ${name}\nEmail: ${email}\nCompany: ${company}\nDomain: ${domain}\nNotes: ${notes}\nSource: ${source}`
      }).catch(err => console.error("Mail Error:", err.message));
    }

    res.json({ ok: true, id: doc._id });
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message });
  }
});

if (require.main === module) {
  connectDB().then(() => app.listen(PORT));
}
module.exports = app;