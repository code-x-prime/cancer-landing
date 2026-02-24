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
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

export async function POST(req) {
  try {
    const formData = await req.formData();

    // Patient Details
    const name = formData.get("name") || "";
    const gender = formData.get("gender") || "";
    const dob = formData.get("dob") || "";
    const country = formData.get("country") || "";
    const city = formData.get("city") || "Not specified";
    const whatsapp = formData.get("whatsapp") || "";
    const email = formData.get("email") || "";

    // Medical Details
    const symptoms = formData.get("symptoms") || "Not specified";
    const duration = formData.get("duration") || "Not specified";
    const previousTreatment = formData.get("previousTreatment") || "Not specified";
    const treatmentDetails = formData.get("treatmentDetails") || "None";

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

    // ── Admin Email ──
    const adminMailOptions = {
      from: `Panacea Medcare <${process.env.FROM_EMAIL}>`,
      to: "care@panaceamedcare.com",
      subject: `New Case Request: ${name} from ${country}`,
      html: `
        <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
          <div style="background-color: #0E7490; padding: 20px; color: white;">
            <h2 style="margin: 0;">New Case Submission</h2>
          </div>
          <div style="padding: 20px;">
            <h3 style="color: #0E7490; border-bottom: 2px solid #0E7490; padding-bottom: 5px;">Patient Details</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Gender:</strong> ${gender} | <strong>DOB:</strong> ${dob}</p>
            <p><strong>Location:</strong> ${city}, ${country}</p>
            ${whatsapp ? `<p><strong>WhatsApp:</strong> <a href="https://wa.me/${whatsapp.replace(/[^0-9]/g, "")}">${whatsapp}</a></p>` : ""}
            ${email ? `<p><strong>Email:</strong> ${email}</p>` : ""}

            <h3 style="color: #0E7490; border-bottom: 2px solid #0E7490; padding-bottom: 5px; margin-top: 20px;">Medical Details</h3>
            <p><strong>Symptoms:</strong> ${symptoms}</p>
            <p><strong>Duration:</strong> ${duration}</p>
            <p><strong>Previous Treatment:</strong> ${previousTreatment}</p>
            ${previousTreatment === "Yes" ? `<p><strong>Treatment Details:</strong> ${treatmentDetails}</p>` : ""}

            <h3 style="color: #0E7490; border-bottom: 2px solid #0E7490; padding-bottom: 5px; margin-top: 20px;">Medical Report</h3>
            ${fileUrl
          ? `<p><a href="${fileUrl}" style="display: inline-block; background-color: #0E7490; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold;">View Uploaded Report</a></p><p style="font-size: 12px; color: #666; word-break: break-all;">Link: ${fileUrl}</p>`
          : "<p>No file uploaded.</p>"}
          </div>
          <div style="background-color: #f5f5f5; padding: 15px; text-align: center; font-size: 12px; color: #888;">
            Panacea Medcare Case Management System
          </div>
        </div>
      `,
    };

    // ── User Confirmation Email (only if email provided) ──
    const mailPromises = [transporter.sendMail(adminMailOptions)];

    if (email) {
      const userMailOptions = {
        from: `Panacea Medcare <${process.env.FROM_EMAIL}>`,
        to: email,
        subject: "Case Received – Panacea Medcare",
        html: `
          <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
            <div style="background-color: #0E7490; padding: 20px; color: white; text-align: center;">
              <h2 style="margin: 0;">Your Case Has Been Received</h2>
            </div>
            <div style="padding: 30px;">
              <p>Dear <strong>${name}</strong>,</p>
              <p>Thank you for reaching out to Panacea Medcare. We have received your details and our specialist team is reviewing your case.</p>

              <div style="background-color: #f0fdfa; border-left: 4px solid #0E7490; padding: 15px; margin: 20px 0;">
                <p style="margin: 0; color: #0E7490; font-weight: bold;">What happens next?</p>
              </div>

              <ul>
                <li>Our medical team will review your submitted information.</li>
                <li>A specialist will reach out within 2 hours (during business hours) or by next morning.</li>
                <li>You will receive a personalised treatment plan overview.</li>
              </ul>

              <p>For urgent queries, chat with us on WhatsApp:</p>
              <p style="text-align: center; margin-top: 20px;">
                <a href="https://wa.me/919958800961" style="background-color: #25D366; color: white; padding: 12px 24px; text-decoration: none; border-radius: 25px; font-weight: bold;">Chat on WhatsApp</a>
              </p>
            </div>
            <div style="background-color: #f5f5f5; padding: 15px; text-align: center; font-size: 12px; color: #888;">
              Panacea Medcare | Suite No. 402, Sector 38, Gurgaon – 122001, Delhi NCR, India<br/>
              <a href="https://panaceamedcare.com" style="color: #666;">www.panaceamedcare.com</a>
            </div>
          </div>
        `,
      };
      mailPromises.push(transporter.sendMail(userMailOptions));
    }

    await Promise.all(mailPromises);

    return NextResponse.json({ success: true, message: "Lead submitted successfully" });

  } catch (error) {
    console.error("Error submitting lead:", error);
    return NextResponse.json({ success: false, error: "Failed to submit lead" }, { status: 500 });
  }
}
