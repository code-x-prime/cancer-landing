import { S3Client } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";
import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

// Initialize R2 Client
const r2 = new S3Client({
    region: "auto",
    endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: {
        accessKeyId: process.env.R2_ACCESS_KEY_ID,
        secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
    },
});

// Initialize Nodemailer Transporter
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
    },
});

export async function POST(req) {
    try {
        const formData = await req.formData();

        // Extract fields
        const name = formData.get("name");
        const country = formData.get("country");
        const whatsapp = formData.get("whatsapp");
        const email = formData.get("email");
        const cancerType = formData.get("cancerType");
        const stage = formData.get("stage") || "Not specified";
        const timeline = formData.get("timeline") || "Not specified";
        const message = formData.get("message") || "No additional message";
        const file = formData.get("file");

        let fileUrl = "";

        // Upload to R2 if file exists
        if (file && file.size > 0) {
            const buffer = Buffer.from(await file.arrayBuffer());
            const fileName = `${Date.now()}-${file.name.replace(/\s+/g, "-")}`;
            const uploadFolder = process.env.UPLOAD_FOLDER || "medical-reports";
            const key = `${uploadFolder}/${fileName}`;

            const upload = new Upload({
                client: r2,
                params: {
                    Bucket: process.env.R2_BUCKET_NAME,
                    Key: key,
                    Body: buffer,
                    ContentType: file.type,
                },
            });

            await upload.done();
            fileUrl = `${process.env.R2_PUBLIC_URL}/${key}`;
        }

        // Email to Admin
        const adminMailOptions = {
            from: `Panacea Medcare <${process.env.FROM_EMAIL}>`,
            to: "care@panaceamedcare.com", // Admin email
            subject: `New Lead: ${name} - ${cancerType} (${country})`,
            html: `
        <div style="font-family: Arial, sans-serif; color: #333;">
          <h2 style="color: #0E7490;">New Cancer Case Review Request</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Country:</strong> ${country}</p>
          <p><strong>WhatsApp:</strong> <a href="https://wa.me/${whatsapp.replace(/[^0-9]/g, "")}">${whatsapp}</a></p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Cancer Type:</strong> ${cancerType}</p>
          <p><strong>Stage:</strong> ${stage}</p>
          <p><strong>Timeline:</strong> ${timeline}</p>
          <p><strong>Message:</strong> ${message}</p>
          <hr />
          <h3>Medical Report:</h3>
          ${fileUrl ? `<p><a href="${fileUrl}" style="background-color: #0E7490; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">View Uploaded Report</a></p><p style="font-size: 12px; color: #666;">If the button doesn't work, copy this link: ${fileUrl}</p>` : "<p>No file uploaded.</p>"}
        </div>
      `,
        };

        // Email to User
        const userMailOptions = {
            from: `Panacea Medcare <${process.env.FROM_EMAIL}>`,
            to: email,
            subject: "We have received your medical reports - Panacea Medcare",
            html: `
        <div style="font-family: Arial, sans-serif; color: #333;">
          <h2 style="color: #0E7490;">Thank you for contacting Panacea Medcare</h2>
          <p>Dear ${name},</p>
          <p>We have successfully received your medical reports for review.</p>
          <p>Our team of senior oncologists will review your case, and we will get back to you with a preliminary treatment plan and cost estimate within <strong>24–48 hours</strong>.</p>
          <p>If you have any urgent queries, you can reach us directly on WhatsApp on <a href="https://wa.me/919958800961" style="color: #0E7490;">+91 995 880 0961</a>.</p>
          <br />
          <p>Best Regards,</p>
          <p><strong>Patient Care Team</strong><br/>Panacea Medcare</p>
        </div>
      `,
        };

        // Send Emails
        await Promise.all([
            transporter.sendMail(adminMailOptions),
            transporter.sendMail(userMailOptions),
        ]);

        return NextResponse.json({ success: true, message: "Lead submitted successfully" });

    } catch (error) {
        console.error("Error submitting lead:", error);
        return NextResponse.json({ success: false, error: "Failed to submit lead" }, { status: 500 });
    }
}
