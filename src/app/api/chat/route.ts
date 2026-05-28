import { NextRequest, NextResponse } from "next/server";
import { getSettings, saveSession, saveLead, Message } from "@/lib/db";
import { getWebsiteKnowledgeContext } from "@/lib/knowledge";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { messages, sessionId } = body as { messages: Message[]; sessionId: string };

    if (!messages || !sessionId) {
      return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
    }

    // 1. Load active admin settings and FAQs
    const settings = await getSettings();

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

    if (!response.ok) {
      const errorText = await response.text();
      console.error("LongCat AI API error:", errorText);
      return NextResponse.json({ 
        text: "Let me connect you with the Reachmore AI team for accurate details 👌 (Error contacting chatbot node)",
        error: true
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
    return NextResponse.json({
      text: "Let me connect you with the Reachmore AI team for accurate details 👌",
      error: true
    }, { status: 500 });
  }
}
