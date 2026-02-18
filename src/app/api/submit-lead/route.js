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
        const gender = formData.get("gender");
        const dob = formData.get("dob");
        const country = formData.get("country");
        const city = formData.get("city") || "Not specified";
        const whatsapp = formData.get("whatsapp");
        const email = formData.get("email");

        // Medical Details
        const concern = formData.get("concern");
        const diagnosis = formData.get("diagnosis") || "Not specified";
        const symptoms = formData.get("symptoms");
        const duration = formData.get("duration") || "Not specified";
        const previousTreatment = formData.get("previousTreatment");
        const treatmentDetails = formData.get("treatmentDetails") || "None";
        const existingConditions = formData.get("existingConditions") || "None";

        // Preferences
        const preferredHospital = formData.get("preferredHospital") || "Any Top Hospital";
        const budget = formData.get("budget") || "Not specified";
        const travelReadiness = formData.get("travelReadiness") || "Not specified";

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
            subject: `AI Pre-Screening: ${name} (${country}) - ${concern}`,
            html: `
        <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
          <div style="background-color: #0E7490; padding: 20px; color: white;">
            <h2 style="margin: 0;">New AI Pre-Screening Request</h2>
          </div>
          
          <div style="padding: 20px;">
            <h3 style="color: #0E7490; border-bottom: 2px solid #0E7490; padding-bottom: 5px;">Patient Details</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Gender:</strong> ${gender} | <strong>DOB:</strong> ${dob}</p>
            <p><strong>Location:</strong> ${city}, ${country}</p>
            <p><strong>WhatsApp:</strong> <a href="https://wa.me/${whatsapp.replace(/[^0-9]/g, "")}">${whatsapp}</a></p>
            <p><strong>Email:</strong> ${email}</p>

            <h3 style="color: #0E7490; border-bottom: 2px solid #0E7490; padding-bottom: 5px; margin-top: 20px;">Medical Condition</h3>
            <p><strong>Primary Concern:</strong> ${concern}</p>
            <p><strong>Specific Diagnosis:</strong> ${diagnosis}</p>
            <p><strong>Symptoms:</strong> ${symptoms}</p>
            <p><strong>Duration:</strong> ${duration}</p>
            <p><strong>Previous Treatment:</strong> ${previousTreatment}</p>
            <p><strong>Treatment Details:</strong> ${treatmentDetails}</p>
            <p><strong>Existing Conditions:</strong> ${existingConditions}</p>

            <h3 style="color: #0E7490; border-bottom: 2px solid #0E7490; padding-bottom: 5px; margin-top: 20px;">Preferences</h3>
            <p><strong>Preferred Hospital:</strong> ${preferredHospital}</p>
            <p><strong>Budget Range:</strong> ${budget}</p>
            <p><strong>Travel Readiness:</strong> ${travelReadiness}</p>

            <h3 style="color: #0E7490; border-bottom: 2px solid #0E7490; padding-bottom: 5px; margin-top: 20px;">Medical Report</h3>
            ${fileUrl ? `<p><a href="${fileUrl}" style="display: inline-block; background-color: #0E7490; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold;">View Uploaded Report</a></p><p style="font-size: 12px; color: #666; word-break: break-all;">Link: ${fileUrl}</p>` : "<p>No file uploaded.</p>"}
          </div>
          <div style="background-color: #f5f5f5; padding: 15px; text-align: center; font-size: 12px; color: #888;">
            Generated by Panacea Medcare AI Pre-Screening System
          </div>
        </div>
      `,
        };

        // Email to User
        const userMailOptions = {
            from: `Panacea Medcare <${process.env.FROM_EMAIL}>`,
            to: email,
            subject: "AI Pre-Screening in Progress - Panacea Medcare",
            html: `
        <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
          <div style="background-color: #0E7490; padding: 20px; color: white; text-align: center;">
            <h2 style="margin: 0;">AI Pre-Screening Started</h2>
          </div>
          <div style="padding: 30px;">
            <p>Dear <strong>${name}</strong>,</p>
            <p>Thank you for submitting your details for AI Pre-Screening.</p>
            
            <div style="background-color: #f0fdfa; border-left: 4px solid #0E7490; padding: 15px; margin: 20px 0;">
              <p style="margin: 0; color: #0E7490; font-weight: bold;">Your case is now being analyzed.</p>
            </div>

            <p><strong>What Happens Next?</strong></p>
            <ul>
              <li>Our AI system is structuring your medical data.</li>
              <li>A senior oncologist will review the AI insights for accuracy.</li>
              <li>You will receive your <strong>Preliminary Assessment Report</strong> within 2 hours (during business hours) or by the next morning.</li>
            </ul>

            <p>If you have urgent questions, you can reply to this email or chat with us on WhatsApp:</p>
            <p style="text-align: center; margin-top: 20px;">
              <a href="https://wa.me/919958800961" style="background-color: #25D366; color: white; padding: 12px 24px; text-decoration: none; border-radius: 25px; font-weight: bold;">Chat on WhatsApp</a>
            </p>
          </div>
          <div style="background-color: #f5f5f5; padding: 15px; text-align: center; font-size: 12px; color: #888;">
            Panacea Medcare | New Delhi, India<br/>
            <a href="https://panaceamedcare.com" style="color: #666;">www.panaceamedcare.com</a>
          </div>
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

