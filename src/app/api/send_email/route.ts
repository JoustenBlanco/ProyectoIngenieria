// /api/send_email

import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  const body = await req.json();
  const { to, subject, message, html } = body;

  if (!to || !subject || (!message && !html)) {
    return NextResponse.json({ error: 'Campos incompletos' }, { status: 400 });
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: `"Liceo San Pedro" <${process.env.GMAIL_USER}>`,
      to,
      subject,
      text: message || '',
      html: html || '',
    });

    return NextResponse.json({ message: 'Correo enviado correctamente' });
  } catch (error) {
    console.error('Error al enviar el correo:', error);
    return NextResponse.json({ error: 'Error al enviar el correo' }, { status: 500 });
  }
}
