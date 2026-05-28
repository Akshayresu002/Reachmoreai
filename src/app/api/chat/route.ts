import { NextRequest, NextResponse } from "next/server";
import { getSettings, saveSession, saveLead, Message } from "@/lib/db";
import { getWebsiteKnowledgeContext } from "@/lib/knowledge";

function getLocalFallbackAnswer(userMessage: string, faqs: any[]): string {
  const msg = userMessage.toLowerCase();

  // 1. Check for specific dynamic FAQs from dashboard overrides
  for (const faq of faqs) {
    if (
      msg.includes(faq.question.toLowerCase()) || 
      faq.question.toLowerCase().split(" ").every((word: string) => word.length < 3 || msg.includes(word))
    ) {
      return faq.answer;
    }
  }

  // 2. Keyword matching rules
  if (msg.includes("qualify") || msg.includes("lead") || msg.includes("filter")) {
    return "Absolutely! Reachmore AI specializes in automating real estate lead qualification. Our AI voice callers answer calls instantly 24/7, ask serious buyers questions about budgets, locations, and timeframes, and filter out non-serious queries so your sales team only focuses on hot prospects. 🚀";
  }

  if (msg.includes("hindi") || msg.includes("telugu") || msg.includes("language") || msg.includes("speak")) {
    return "Yes! Our AI voice agents support regional turn-taking and natural accent modulations in English, Hindi, Telugu, and multiple other Indian languages. They speak naturally just like human agents! 🗣️";
  }

  if (msg.includes("cost") || msg.includes("price") || msg.includes("pricing") || msg.includes("fee")) {
    return "Pricing depends on your call volume, workflows, and CRM database integrations. The best option is to book a quick demo with the Reachmore AI team to get a tailored quote 👌. Click the **'Book Demo'** action button above to choose a slot directly on our Calendly!";
  }

  if (msg.includes("crm") || msg.includes("integrate") || msg.includes("hubspot") || msg.includes("salesforce") || msg.includes("sync")) {
    return "Yes, indeed! We build complete CRM pipelines to sync leads captured by our callers and chatbots directly into your existing CRM (HubSpot, Salesforce, custom APIs, WhatsApp alerts) in real-time. ⚡";
  }

  if (msg.includes("site visit") || msg.includes("appointment") || msg.includes("book") || msg.includes("demo")) {
    return "Yes! Booking site visits is one of our primary automations. Our voice agent qualifies the prospect's interest and directly drops a booking slot into your Calendly, HubSpot, or Salesforce calendar, notifying your agent instantly. 📅";
  }

  if (msg.includes("how") || msg.includes("what does") || msg.includes("help") || msg.includes("service")) {
    return "Reachmore AI helps builders, brokers, and developers automate their outbound cold calling, inbound qualification, follow-ups, and site visit bookings using sub-0.9s delay AI voice agents. We take the heavy lifting off your sales team! 🚀\n\nClick **'Book Demo'** above to schedule a quick system architecture consultation and get a custom caller blueprint!";
  }

  // 3. Elegant, polite general fallback that encourages lead booking
  return "I can certainly help you with that! Reachmore AI builds highly premium AI voice callers and workflow automation networks specifically for real estate agents and developers. 🚀\n\nTo ensure you get absolute priority, please click the **'Book Demo'** action button above to share your details and secure a priority technical slot on our Calendly! We will draft a custom system blueprint for you.";
}

export async function POST(req: NextRequest) {
  let settings: any = null;
  let sessionId = "session_unknown";
  let messages: Message[] = [];

  try {
    const body = await req.json();
    const parsed = body as { messages: Message[]; sessionId: string };
    messages = parsed.messages || [];
    sessionId = parsed.sessionId || "session_unknown";

    if (!messages || !sessionId) {
      return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
    }

    // 1. Load active admin settings and FAQs
    settings = await getSettings();

    // 2. Check if Chatbot is globally enabled
    if (!settings.enabled) {
      return NextResponse.json({
        text: "The chatbot is currently taking a short nap. Please feel free to email our team directly at reachmoreaiagency@gmail.com! ☕",
        disabled: true
      });
    }

    // 3. Compile website context derived from knowledge engine
    const knowledgeBase = getWebsiteKnowledgeContext(settings.faqs);

    // 4. Inject lead capture parsing instructions
    const systemPrompt = `
${settings.aiInstructions}

${knowledgeBase}

=== CONVERSATIONAL LEAD CAPTURE SPECIFICATION ===
You are in active sales mode. If a visitor shows interest in Reachmore AI's voice agents, booking a demo, call integrations, pricing, or getting started:
1. Politely ask for their: Name, Phone Number, Company, and specific Requirement.
2. If they give some but not all details, ask for the missing parts naturally (e.g. "I'd love to help arrange this! Could you also share your phone number and company name?").
3. Once they have provided all 4 fields (Name, Phone, Company, and Requirement), thank them and let them know that an engineer will reach out immediately.
4. When (and ONLY when) you have successfully collected Name, Phone, Company, and Requirement from the chat history:
   Append a single line at the very end of your response inside square brackets. DO NOT mention or explain this tag to the user. Strictly use this format:
   [LEAD_CAPTURE: name=COLLECTED_NAME; phone=COLLECTED_PHONE; company=COLLECTED_COMPANY; requirement=COLLECTED_REQUIREMENT]
   (Replace COLLECTED_NAME, COLLECTED_PHONE, COLLECTED_COMPANY, and COLLECTED_REQUIREMENT with the exact extracted details).
   Example: [LEAD_CAPTURE: name=John Doe; phone=+123456789; company=Apex Builders; requirement=Interested in setting up an automated AI Caller for property follow-ups]
`;

    // 5. Convert local messages into OpenAI compatible formats
    const formattedMessages = [
      { role: "system", content: systemPrompt },
      ...messages.map((m) => ({
        role: m.sender === "user" ? "user" : "assistant",
        content: m.text
      }))
    ];

    // 6. Make secure server request to LongCat AI API
    const apiKey = process.env.LONGCAT_API_KEY || "ak_2DW9Wv72p0gv5y90wl6pT7qm0Ma1C";
    const response = await fetch("https://api.longcat.chat/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "longcat-flash-chat",
        messages: formattedMessages,
        temperature: 0.5,
        max_tokens: 600
      })
    });

    const lastUserMessage = messages.filter(m => m.sender === "user").pop()?.text || "";

    if (!response.ok) {
      const errorText = await response.text();
      console.error("LongCat AI API error:", errorText);
      
      const fallbackText = getLocalFallbackAnswer(lastUserMessage, settings.faqs || []);
      
      // Save session fallback history log
      const finalMessages: Message[] = [
        ...messages,
        { sender: "assistant", text: fallbackText, timestamp: new Date().toISOString() }
      ];
      await saveSession(sessionId, finalMessages);

      return NextResponse.json({ 
        text: fallbackText,
        leadCaptured: false
      });
    }

    const responseData = await response.json();
    let aiText = responseData.choices?.[0]?.message?.content || "";

    // 7. Check if AI generated a Lead Capture Tag
    const leadTagRegex = /\[LEAD_CAPTURE:\s*name=(.*?);\s*phone=(.*?);\s*company=(.*?);\s*requirement=(.*?)\]/i;
    const match = aiText.match(leadTagRegex);
    let leadCaptured = false;

    if (match) {
      const [, name, phone, company, requirement] = match;
      
      // Save lead directly to JSON database
      await saveLead({
        name: name.trim(),
        phone: phone.trim(),
        company: company.trim(),
        requirement: requirement.trim(),
        sessionId
      });

      leadCaptured = true;

      // Clean the lead capture tag out of the message so the user never sees it
      aiText = aiText.replace(leadTagRegex, "").trim();
    }

    // 8. Append messages to session history logs in database
    const finalMessages: Message[] = [
      ...messages,
      { sender: "assistant", text: aiText, timestamp: new Date().toISOString() }
    ];
    await saveSession(sessionId, finalMessages);

    return NextResponse.json({
      text: aiText,
      leadCaptured
    });

  } catch (error: any) {
    console.error("Chat Server API Error:", error);
    const lastUserMessage = messages.filter(m => m.sender === "user").pop()?.text || "";
    const fallbackText = getLocalFallbackAnswer(lastUserMessage, settings?.faqs || []);
    
    try {
      const finalMessages: Message[] = [
        ...messages,
        { sender: "assistant", text: fallbackText, timestamp: new Date().toISOString() }
      ];
      await saveSession(sessionId, finalMessages);
    } catch {}

    return NextResponse.json({
      text: fallbackText,
      leadCaptured: false
    });
  }
}
