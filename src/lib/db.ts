import fs from "fs/promises";
import path from "path";

// Define interfaces for Chat Database
export interface FAQ {
  id: string;
  question: string;
  answer: string;
}

export interface AdminSettings {
  enabled: boolean;
  welcomeMessage: string;
  aiInstructions: string;
  themeColor: string;
  faqs: FAQ[];
}

export interface Lead {
  id: string;
  name: string;
  phone: string;
  company: string;
  requirement: string;
  timestamp: string;
  sessionId: string;
}

export interface Message {
  sender: "user" | "assistant" | "system";
  text: string;
  timestamp: string;
}

export interface ChatSession {
  id: string;
  messages: Message[];
  timestamp: string;
  leadCaptured: boolean;
}

export interface DatabaseSchema {
  settings: AdminSettings;
  leads: Lead[];
  sessions: ChatSession[];
}

// Database JSON file path in src/data/chat-db.json
const DB_DIR = path.join(process.cwd(), "src", "data");
const DB_FILE = path.join(DB_DIR, "chat-db.json");

// Default initial database state
const DEFAULT_FAQS: FAQ[] = [
  {
    id: "faq-1",
    question: "How does your AI caller work?",
    answer: "Our AI voice callers converse with complete human likeness and sub-second latencies (<0.9s). They handle cold outreach, qualify inbound leads, and directly schedule appointments on your calendar 24/7 on autopilot."
  },
  {
    id: "faq-2",
    question: "Can it book site visits?",
    answer: "Yes, it can. The AI caller qualifies the lead's requirement, checks your booking calendar (e.g. Calendly, HubSpot, or Salesforce), and directly schedules a site visit, locking it into both the agent's and the prospect's calendar."
  },
  {
    id: "faq-3",
    question: "Can it speak Hindi or Telugu?",
    answer: "Absolutely! Our AI systems support multiple languages including English, Hindi, Telugu, and more, complete with regional accents and natural turn-taking capability."
  },
  {
    id: "faq-4",
    question: "Does it integrate with CRMs?",
    answer: "Yes, Reachmore AI builds flawless technical syncs that hook caller nodes directly into HubSpot, Salesforce, custom DB schemas, and marketing triggers."
  }
];

const DEFAULT_SETTINGS: AdminSettings = {
  enabled: true,
  welcomeMessage: "Hey 👋 I’m Reachmore AI Assistant. I can show you how our AI voice agents help real estate businesses qualify leads, reduce wasted calls, and book more site visits automatically.",
  aiInstructions: "You are the official AI assistant for Reachmore AI. Reachmore AI helps real estate businesses (agents, builders, developers, brokerages, consultants) automate lead qualification, follow-ups, and site visit bookings using AI voice agents and automation systems. Tone: Smart, Professional, Friendly, Confident, Helpful, Modern, Slightly sales-oriented, Conversational. Rules: Keep answers concise and clear, do not sound robotic, avoid overexplaining, focus on solving real estate pain points, encourage demo bookings naturally, never invent fake pricing. Pricing: If asked about pricing, respond exactly as: 'Pricing depends on your call volume, workflows, and automation requirements. The best option is to book a quick demo with the Reachmore AI team 👌'. Lead capture: When user shows strong interest, ask naturally for Name, Phone number, Company/business name, and Requirement. If you don't know something, reply: 'Let me connect you with the Reachmore AI team for accurate details 👌'.",
  themeColor: "#FE5D26",
  faqs: DEFAULT_FAQS
};

// Initialize database file
async function ensureDbExists(): Promise<DatabaseSchema> {
  try {
    await fs.mkdir(DB_DIR, { recursive: true });
    try {
      const data = await fs.readFile(DB_FILE, "utf-8");
      return JSON.parse(data) as DatabaseSchema;
    } catch {
      // If file doesn't exist, create it with defaults
      const initialData: DatabaseSchema = {
        settings: DEFAULT_SETTINGS,
        leads: [],
        sessions: []
      };
      await fs.writeFile(DB_FILE, JSON.stringify(initialData, null, 2), "utf-8");
      return initialData;
    }
  } catch (error) {
    console.error("Database initialization failed:", error);
    return {
      settings: DEFAULT_SETTINGS,
      leads: [],
      sessions: []
    };
  }
}

// Queue system / lock to prevent concurrent write corruption
let isWriting = false;
const writeQueue: (() => Promise<void>)[] = [];

async function safeWrite(data: DatabaseSchema): Promise<void> {
  const executeWrite = async () => {
    isWriting = true;
    try {
      await fs.mkdir(DB_DIR, { recursive: true });
      await fs.writeFile(DB_FILE, JSON.stringify(data, null, 2), "utf-8");
    } catch (err) {
      console.error("Failed to write to database JSON:", err);
    } finally {
      isWriting = false;
      if (writeQueue.length > 0) {
        const next = writeQueue.shift();
        if (next) next();
      }
    }
  };

  if (isWriting) {
    return new Promise((resolve) => {
      writeQueue.push(async () => {
        await executeWrite();
        resolve();
      });
    });
  } else {
    await executeWrite();
  }
}

// Database helper API methods
export async function getSettings(): Promise<AdminSettings> {
  const db = await ensureDbExists();
  return db.settings;
}

export async function updateSettings(settings: Partial<AdminSettings>): Promise<AdminSettings> {
  const db = await ensureDbExists();
  db.settings = {
    ...db.settings,
    ...settings,
    // Keep FAQs structured if not explicitly overwritten
    faqs: settings.faqs !== undefined ? settings.faqs : db.settings.faqs
  };
  await safeWrite(db);
  return db.settings;
}

export async function saveLead(leadData: {
  name: string;
  phone: string;
  company: string;
  requirement: string;
  sessionId: string;
}): Promise<Lead> {
  const db = await ensureDbExists();
  
  // Check if a lead with this session already exists to avoid duplicates
  const existingLead = db.leads.find(l => l.sessionId === leadData.sessionId);
  if (existingLead) {
    existingLead.name = leadData.name;
    existingLead.phone = leadData.phone;
    existingLead.company = leadData.company;
    existingLead.requirement = leadData.requirement;
    existingLead.timestamp = new Date().toISOString();
    await safeWrite(db);
    return existingLead;
  }

  const newLead: Lead = {
    id: `lead_${Math.random().toString(36).substring(2, 11)}`,
    ...leadData,
    timestamp: new Date().toISOString()
  };

  db.leads.push(newLead);
  
  // Mark session as leadCaptured
  const session = db.sessions.find(s => s.id === leadData.sessionId);
  if (session) {
    session.leadCaptured = true;
  }

  await safeWrite(db);
  return newLead;
}

export async function getLeads(): Promise<Lead[]> {
  const db = await ensureDbExists();
  // Return leads sorted by timestamp descending
  return [...db.leads].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
}

export async function saveSession(sessionId: string, messages: Message[]): Promise<ChatSession> {
  const db = await ensureDbExists();
  let session = db.sessions.find(s => s.id === sessionId);

  if (session) {
    session.messages = messages;
    session.timestamp = new Date().toISOString();
  } else {
    session = {
      id: sessionId,
      messages,
      timestamp: new Date().toISOString(),
      leadCaptured: db.leads.some(l => l.sessionId === sessionId)
    };
    db.sessions.push(session);
  }

  await safeWrite(db);
  return session;
}

export async function getSessions(): Promise<ChatSession[]> {
  const db = await ensureDbExists();
  return [...db.sessions].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
}
