// app/api/contact/route.ts (App Router) или pages/api/contact.ts (Pages Router)
import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: NextRequest) {
  const { email, message } = await req.json();

  // Здесь можно добавить простую валидацию
  if (!email || !message) {
    return NextResponse.json({ error: 'Empty fields' }, { status: 400 });
  }

  // Создаём транспорт. SMTP‑параметры вынесены в .env:
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: Boolean(process.env.SMTP_SECURE), // true для 465, false для других портов
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: `"TON Staker Support" <${process.env.SMTP_USER}>`,
      to: '', //SUPPORT_TO support@tonstake.app
      subject: `New message from ${email}`,
      text: message,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
  }
}
