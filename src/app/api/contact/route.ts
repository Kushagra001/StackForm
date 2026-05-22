import { NextResponse } from "next/server";
import { Resend } from "resend";


export async function POST(request: Request) {

  try {
    const { name, email, project } = await request.json();

    if (!name || !email || !project) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    if (!process.env.RESEND_API_KEY) {
      // Dev fallback — log and succeed
      console.log("Contact form submission:", { name, email, project });
      return NextResponse.json({ ok: true });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from: "StackForm <contact@stack-form.dev>",
      to: ["hello@stack-form.dev"],
      subject: `New project inquiry from ${name}`,
      html: `
        <div style="font-family: monospace; background: #080810; color: #f0f0ff; padding: 32px; border-radius: 12px;">
          <h2 style="color: #4f6ef7; margin: 0 0 24px;">New project inquiry</h2>
          <table style="border-collapse: collapse; width: 100%;">
            <tr>
              <td style="color: #8888aa; padding: 8px 0; width: 80px;">Name</td>
              <td style="color: #f0f0ff; padding: 8px 0;">${name}</td>
            </tr>
            <tr>
              <td style="color: #8888aa; padding: 8px 0;">Email</td>
              <td style="color: #f0f0ff; padding: 8px 0;"><a href="mailto:${email}" style="color: #4f6ef7;">${email}</a></td>
            </tr>
            <tr>
              <td style="color: #8888aa; padding: 8px 0; vertical-align: top;">Project</td>
              <td style="color: #f0f0ff; padding: 8px 0;">${project}</td>
            </tr>
          </table>
          <p style="color: #444466; font-size: 11px; margin-top: 32px;">Sent from stack-form.dev contact form</p>
        </div>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
