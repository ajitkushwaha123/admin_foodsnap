import { NextResponse } from "next/server";
import crypto from "crypto";
import dbConnect from "@/lib/dbConnect";
import Event from "@/models/Event";
import EventType from "@/models/EventType";

export const runtime = "nodejs";

function safeISO(d) {
  const dt = d ? new Date(d) : new Date();
  if (isNaN(dt.getTime())) return new Date();
  return dt;
}

export async function POST(req) {
  try {
    await dbConnect();

    const body = await req.json();

    const {
      typeKey,
      kind,               
      userId = null,
      sessionId = null,
      anonymousId = null,
      tenantId = null,
      source = "backend", // "frontend" | "backend" | "worker" | "webhook"
      status = "info",    // "success" | "failure" | "info" | "warn" | "error"
      severity = "low",   // "low" | "medium" | "high"
      metadata = {},
      context = {},
      occurredAt = new Date().toISOString(),
      idempotencyKey,     // optional from caller
    } = body || {};

    if (!typeKey) {
      return NextResponse.json({ error: "typeKey required" }, { status: 400 });
    }
    if (!kind || !["system", "custom"].includes(kind)) {
      return NextResponse.json({ error: "kind must be 'system' or 'custom'" }, { status: 400 });
    }

    // Ensure event type exists (for safety)
    const et = await EventType.findOne({ key: typeKey, isActive: true }).lean();
    if (!et) {
      return NextResponse.json({ error: `Unknown or inactive event type: ${typeKey}` }, { status: 400 });
    }

    // Build idempotencyKey if not provided (hash of type+user+timestamp+metadata signature)
    const idem = idempotencyKey || crypto
      .createHash("sha256")
      .update(
        JSON.stringify({
          typeKey, userId, sessionId, anonymousId, occurredAt,
          sig: metadata?.__sig || metadata?.id || JSON.stringify(metadata).slice(0, 200),
        })
      )
      .digest("hex");

    const doc = await Event.findOneAndUpdate(
      { idempotencyKey: idem },
      {
        $setOnInsert: {
          idempotencyKey: idem,
          typeKey,
          kind,
          userId,
          sessionId,
          anonymousId,
          tenantId,
          source,
          status,
          severity,
          metadata,
          context,
          occurredAt: safeISO(occurredAt),
        },
      },
      { new: true, upsert: true }
    );

    return NextResponse.json({ id: doc._id, idempotencyKey: idem }, { status: 202 });
  } catch (e) {
    console.error("ingest error", e);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
