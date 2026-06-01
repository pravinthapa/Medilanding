import nodemailer from 'nodemailer';

const clinicName = () => process.env.CLINIC_NAME || 'MediCare Clinic';

const createTransporter = () => {
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    return null;
  }
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: Number(process.env.SMTP_PORT) || 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
};

const sendMail = async ({ to, subject, html }) => {
  const transporter = createTransporter();
  if (!transporter) {
    console.warn('[Email] SMTP not configured — skipping:', subject);
    return { skipped: true };
  }

  await transporter.sendMail({
    from: `"${clinicName()}" <${process.env.SMTP_USER}>`,
    to,
    subject,
    html,
  });
  return { sent: true };
};

const baseTemplate = (title, body) => `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><style>
  body{font-family:Arial,sans-serif;line-height:1.6;color:#333;max-width:600px;margin:0 auto;padding:20px}
  .header{background:#2563eb;color:#fff;padding:20px;border-radius:8px 8px 0 0;text-align:center}
  .content{background:#f8fafc;padding:24px;border:1px solid #e2e8f0;border-top:none;border-radius:0 0 8px 8px}
  .footer{text-align:center;color:#64748b;font-size:12px;margin-top:20px}
</style></head>
<body>
  <div class="header"><h2>${clinicName()}</h2></div>
  <div class="content"><h3>${title}</h3>${body}</div>
  <div class="footer"><p>&copy; ${new Date().getFullYear()} ${clinicName()}. All rights reserved.</p></div>
</body>
</html>`;

export const sendAppointmentCreatedToAdmin = async (appointment, doctor) => {
  const adminEmail = process.env.ADMIN_NOTIFY_EMAIL || process.env.SMTP_USER;
  if (!adminEmail) return;

  const html = baseTemplate(
    'New Appointment Request',
    `<p>A new appointment has been submitted.</p>
    <p><strong>Patient:</strong> ${appointment.name}<br>
    <strong>Email:</strong> ${appointment.email}<br>
    <strong>Phone:</strong> ${appointment.phone}<br>
    <strong>Doctor:</strong> ${doctor?.name || 'N/A'}<br>
    <strong>Date:</strong> ${appointment.date}<br>
    <strong>Time:</strong> ${appointment.time}<br>
    <strong>Symptoms:</strong> ${appointment.symptoms || 'None'}</p>
    <p>Please review in the admin dashboard.</p>`
  );

  await sendMail({ to: adminEmail, subject: `[${clinicName()}] New Appointment Request`, html });
};

export const sendAppointmentConfirmedToPatient = async (appointment, doctor) => {
  const html = baseTemplate(
    'Appointment Confirmed',
    `<p>Dear ${appointment.name},</p>
    <p>Your appointment has been <strong>confirmed</strong>.</p>
    <p><strong>Doctor:</strong> ${doctor?.name || 'N/A'}<br>
    <strong>Date:</strong> ${appointment.date}<br>
    <strong>Time:</strong> ${appointment.time}</p>
    <p>Please arrive 10 minutes early. Contact us if you need to reschedule.</p>`
  );

  await sendMail({ to: appointment.email, subject: `[${clinicName()}] Appointment Confirmed`, html });
};

export const sendAppointmentCancelledToPatient = async (appointment, doctor) => {
  const html = baseTemplate(
    'Appointment Cancelled',
    `<p>Dear ${appointment.name},</p>
    <p>Your appointment has been <strong>cancelled</strong>.</p>
    <p><strong>Doctor:</strong> ${doctor?.name || 'N/A'}<br>
    <strong>Date:</strong> ${appointment.date}<br>
    <strong>Time:</strong> ${appointment.time}</p>
    <p>Please book a new appointment on our website or contact us for assistance.</p>`
  );

  await sendMail({ to: appointment.email, subject: `[${clinicName()}] Appointment Cancelled`, html });
};

export const sendAppointmentRescheduledToPatient = async (appointment, doctor) => {
  const html = baseTemplate(
    'Appointment Rescheduled',
    `<p>Dear ${appointment.name},</p>
    <p>Your appointment has been <strong>rescheduled</strong>.</p>
    <p><strong>Doctor:</strong> ${doctor?.name || 'N/A'}<br>
    <strong>New Date:</strong> ${appointment.rescheduledDate || appointment.date}<br>
    <strong>New Time:</strong> ${appointment.rescheduledTime || appointment.time}</p>
    <p>Please contact us if this time does not work for you.</p>`
  );

  await sendMail({ to: appointment.email, subject: `[${clinicName()}] Appointment Rescheduled`, html });
};
