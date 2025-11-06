export interface PasswordResetEmailParams {
  name?: string;
  resetUrl: string;
  locale?: string;
}

export function getPasswordResetEmailTemplate({
  name,
  resetUrl,
  locale = 'en',
}: PasswordResetEmailParams): string {
  const translations = {
    en: {
      subject: 'Reset your password',
      greeting: name ? `Hello ${name}` : 'Hello',
      message: 'You recently requested to reset your password. Click the button below to reset it:',
      button: 'Reset Password',
      alternative: "If the button doesn't work, copy and paste this link into your browser:",
      expire: 'This link will expire in 1 hour.',
      ignore:
        "If you didn't request a password reset, you can safely ignore this email. Your password will not be changed.",
      footer: 'Best regards,<br>The Team',
    },
    es: {
      subject: 'Restablece tu contraseña',
      greeting: name ? `Hola ${name}` : 'Hola',
      message:
        'Solicitaste restablecer tu contraseña recientemente. Haz clic en el botón a continuación para restablecerla:',
      button: 'Restablecer contraseña',
      alternative: 'Si el botón no funciona, copia y pega este enlace en tu navegador:',
      expire: 'Este enlace expirará en 1 hora.',
      ignore:
        'Si no solicitaste restablecer tu contraseña, puedes ignorar este correo de forma segura. Tu contraseña no será cambiada.',
      footer: 'Saludos cordiales,<br>El Equipo',
    },
    ar: {
      subject: 'إعادة تعيين كلمة المرور',
      greeting: name ? `مرحبا ${name}` : 'مرحبا',
      message: 'طلبت مؤخرًا إعادة تعيين كلمة المرور الخاصة بك. انقر فوق الزر أدناه لإعادة تعيينها:',
      button: 'إعادة تعيين كلمة المرور',
      alternative: 'إذا لم يعمل الزر، انسخ هذا الرابط والصقه في متصفحك:',
      expire: 'ستنتهي صلاحية هذا الرابط خلال ساعة واحدة.',
      ignore:
        'إذا لم تطلب إعادة تعيين كلمة المرور، يمكنك تجاهل هذا البريد الإلكتروني بأمان. لن يتم تغيير كلمة المرور الخاصة بك.',
      footer: 'أطيب التحيات،<br>الفريق',
    },
  };

  const t = translations[locale as keyof typeof translations] || translations.en;

  return `
<!DOCTYPE html>
<html dir="${locale === 'ar' ? 'rtl' : 'ltr'}" lang="${locale}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${t.subject}</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <tr>
            <td style="padding: 40px;">
              <h1 style="margin: 0 0 20px 0; font-size: 24px; font-weight: 600; color: #1a1a1a;">${t.greeting}</h1>
              <p style="margin: 0 0 30px 0; font-size: 16px; line-height: 1.5; color: #4a4a4a;">${t.message}</p>
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center" style="padding: 20px 0;">
                    <a href="${resetUrl}" style="display: inline-block; padding: 14px 32px; background-color: #0070f3; color: #ffffff; text-decoration: none; border-radius: 6px; font-size: 16px; font-weight: 500;">${t.button}</a>
                  </td>
                </tr>
              </table>
              <p style="margin: 30px 0 0 0; font-size: 14px; line-height: 1.5; color: #6a6a6a;">${t.alternative}</p>
              <p style="margin: 10px 0; font-size: 14px; color: #0070f3; word-break: break-all;">
                <a href="${resetUrl}" style="color: #0070f3;">${resetUrl}</a>
              </p>
              <p style="margin: 30px 0 0 0; font-size: 14px; color: #999;">${t.expire}</p>
              <p style="margin: 10px 0 0 0; font-size: 14px; color: #999;">${t.ignore}</p>
            </td>
          </tr>
          <tr>
            <td style="padding: 20px 40px; border-top: 1px solid #e5e5e5; background-color: #fafafa; border-radius: 0 0 8px 8px;">
              <p style="margin: 0; font-size: 14px; color: #6a6a6a;">${t.footer}</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

export function getPasswordResetEmailSubject(locale: string = 'en'): string {
  const subjects = {
    en: 'Reset your password',
    es: 'Restablece tu contraseña',
    ar: 'إعادة تعيين كلمة المرور',
  };
  return subjects[locale as keyof typeof subjects] || subjects.en;
}
