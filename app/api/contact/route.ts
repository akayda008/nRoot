import { NextResponse } from "next/server";
import { db } from "@/db"; // adjust if your db file is in a different path
import { messages } from "@/db/schema"; // adjust if located elsewhere
import nodemailer from "nodemailer";
import { z } from "zod";

// ------------------------------------------------------------
// Zod Validation Schema
// ------------------------------------------------------------
const ContactSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(5),
  iam: z.string().min(1),
  purpose: z.string().min(1),
});
// ------------------------------------------------------------
// POST Handler
// ------------------------------------------------------------
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = ContactSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid form data", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const data = parsed.data;
    // ------------------------------------------------------------
    // 1. Insert into DB via Drizzle
    // ------------------------------------------------------------
    const result = await db
      .insert(messages)
      .values({
        name: data.name,
        email: data.email,
        phone: data.phone,
        iam: data.iam,
        purpose: data.purpose,
      })
      .returning();

    // ------------------------------------------------------------
    // 2. Send Email Notification
    // ------------------------------------------------------------
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST!,
      port: Number(process.env.SMTP_PORT!),
      secure: Number(process.env.SMTP_PORT) === 465, // SSL for port 465
      auth: {
        user: process.env.SMTP_USER!,
        pass: process.env.SMTP_PASS!,
      },
    });

    await transporter.sendMail({
      from: `"Website Contact" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_RECEIVER!,
      subject: "New Contact Form Submission",
      html: `
        <h2>New Contact Form Message</h2>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Phone:</strong> ${data.phone}</p>
        <p><strong>I am:</strong> ${data.iam}</p>
        <p><strong>Purpose:</strong> ${data.purpose}</p>
      `,
    });

    return NextResponse.json({
      success: true,
      message: "Message saved and email sent",
      data: result[0],
    });
  } catch (err: any) {
    console.error("API Error:", err);

    return NextResponse.json(
      { error: "Internal server error", details: err?.message },
      { status: 500 }
    );
  }
}

// ------------------------------------------------------------
// GET Handler (optional): list messages
// ------------------------------------------------------------
export async function GET() {
  try {
    const rows = await db.select().from(messages).orderBy(messages.createdAt);
    return NextResponse.json(rows);
  } catch (err: any) {
    return NextResponse.json(
      { error: "Internal error", details: err.message },
      { status: 500 }
    );
  }
}
