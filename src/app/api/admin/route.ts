import { NextRequest, NextResponse } from "next/server";
import { 
  getSettings, 
  updateSettings, 
  getLeads, 
  saveLead, 
  getSessions 
} from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const action = searchParams.get("action");

    if (action === "getSettings") {
      const settings = await getSettings();
      return NextResponse.json(settings);
    }

    if (action === "getLeads") {
      const leads = await getLeads();
      return NextResponse.json(leads);
    }

    if (action === "getSessions") {
      const sessions = await getSessions();
      return NextResponse.json(sessions);
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error: any) {
    console.error("Admin GET error:", error);
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const action = searchParams.get("action");
    const body = await req.json();

    if (action === "updateSettings") {
      const updated = await updateSettings(body);
      return NextResponse.json({ success: true, settings: updated });
    }

    if (action === "createLead") {
      const { name, phone, company, requirement, sessionId } = body as {
        name: string;
        phone: string;
        company: string;
        requirement: string;
        sessionId: string;
      };

      if (!name || !phone || !company || !requirement || !sessionId) {
        return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
      }

      const lead = await saveLead({ name, phone, company, requirement, sessionId });
      return NextResponse.json({ success: true, lead });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error: any) {
    console.error("Admin POST error:", error);
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 });
  }
}
