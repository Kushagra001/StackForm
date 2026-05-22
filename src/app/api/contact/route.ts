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
    
    await Promise.all([
      // 1. Notification to Admin
      resend.emails.send({
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
      }),
      // 2. Automated Confirmation Receipt to the Lead
      resend.emails.send({
        from: "Kushagra from StackForm <hello@stack-form.dev>",
        to: [email],
        subject: "Thanks for reaching out! — StackForm",
        html: `
          <div style="font-family: monospace; background: #080810; color: #f0f0ff; padding: 32px; border-radius: 12px; max-width: 600px; margin: 0 auto; border: 1px solid #1a1a2e;">
            <h2 style="color: #4f6ef7; margin: 0 0 16px;">Hello ${name},</h2>
            <p style="font-size: 14px; line-height: 1.6; color: #d0d0ee; margin: 0 0 16px;">
              Thanks for reaching out! I've successfully received your project inquiry and am excited to learn more about what you're building.
            </p>
            <p style="font-size: 14px; line-height: 1.6; color: #d0d0ee; margin: 0 0 16px;">
              I personally review every inquiry and will get back to you with my thoughts within 24 hours.
            </p>
            
            <div style="background: #0d0d18; padding: 20px; border-radius: 8px; margin: 24px 0; border: 1px solid #1f1f3a;">
              <h4 style="color: #8888aa; margin: 0 0 12px; text-transform: uppercase; font-size: 11px; letter-spacing: 1px;">Inquiry Details</h4>
              <p style="margin: 0; font-size: 13px; color: #a0a0cc; line-height: 1.5; font-style: italic;">
                "${project}"
              </p>
            </div>

            <p style="font-size: 13px; line-height: 1.6; color: #8888aa; margin: 0 0 16px;">
              If you'd like to share any additional context or schedule a quick call, you can also reach out to me directly on 
              <a href="https://wa.me/918949370535" style="color: #4f6ef7; text-decoration: none; font-weight: bold;">WhatsApp</a> or 
              <a href="https://www.linkedin.com/in/kushagra-singh-negi" style="color: #4f6ef7; text-decoration: none; font-weight: bold;">LinkedIn</a>.
            </p>
            
            <hr style="border: 0; border-top: 1px solid #1a1a2e; margin: 32px 0;" />
            
            <p style="margin: 0; font-size: 14px; color: #f0f0ff; font-weight: bold;">Kushagra Singh Negi</p>
            <p style="margin: 4px 0 0 0; font-size: 12px; color: #8888aa;">Founder & Developer, StackForm</p>
            <p style="margin: 4px 0 0 0; font-size: 11px; color: #4f6ef7;"><a href="https://stack-form.dev" style="color: #4f6ef7; text-decoration: none;">stack-form.dev</a></p>
          </div>
        `,
      })
    ]);

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
