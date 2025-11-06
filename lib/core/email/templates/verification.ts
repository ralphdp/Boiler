export interface VerificationEmailParams {
  name?: string;
  verificationUrl: string;
  locale?: string;
}

export function getVerificationEmailTemplate({
  name,
  verificationUrl,
  locale = 'en',
}: VerificationEmailParams): string {
  const translations = {
    en: {
      subject: 'Verify your email address',
      greeting: name ? `Hello ${name}` : 'Hello',
      message:
        'Thank you for signing up! Please verify your email address by clicking the button below:',
      button: 'Verify Email',
      alternative: "If the button doesn't work, copy and paste this link into your browser:",
      expire: 'This link will expire in 24 hours.',
      ignore: "If you didn't create an account, you can safely ignore this email.",
      footer: 'Best regards,<br>The Team',
    },
    es: {
      subject: 'Verifica tu dirección de correo electrónico',
      greeting: name ? `Hola ${name}` : 'Hola',
      message:
        '¡Gracias por registrarte! Por favor verifica tu dirección de correo electrónico haciendo clic en el botón a continuación:',
      button: 'Verificar correo',
      alternative: 'Si el botón no funciona, copia y pega este enlace en tu navegador:',
      expire: 'Este enlace expirará en 24 horas.',
      ignore: 'Si no creaste una cuenta, puedes ignorar este correo de forma segura.',
      footer: 'Saludos cordiales,<br>El Equipo',
    },
    ar: {
      subject: 'تحقق من عنوان بريدك الإلكتروني',
      greeting: name ? `مرحبا ${name}` : 'مرحبا',
      message: 'شكرا لتسجيلك! يرجى التحقق من عنوان بريدك الإلكتروني بالنقر على الزر أدناه:',
      button: 'تحقق من البريد الإلكتروني',
      alternative: 'إذا لم يعمل الزر، انسخ هذا الرابط والصقه في متصفحك:',
      expire: 'ستنتهي صلاحية هذا الرابط خلال 24 ساعة.',
      ignore: 'إذا لم تقم بإنشاء حساب، يمكنك تجاهل هذا البريد الإلكتروني بأمان.',
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
                    <a href="${verificationUrl}" style="display: inline-block; padding: 14px 32px; background-color: #0070f3; color: #ffffff; text-decoration: none; border-radius: 6px; font-size: 16px; font-weight: 500;">${t.button}</a>
                  </td>
                </tr>
              </table>
              <p style="margin: 30px 0 0 0; font-size: 14px; line-height: 1.5; color: #6a6a6a;">${t.alternative}</p>
              <p style="margin: 10px 0; font-size: 14px; color: #0070f3; word-break: break-all;">
                <a href="${verificationUrl}" style="color: #0070f3;">${verificationUrl}</a>
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

export function getVerificationEmailSubject(locale: string = 'en'): string {
  const subjects = {
    en: 'Verify your email address',
    es: 'Verifica tu dirección de correo electrónico',
    ar: 'تحقق من عنوان بريدك الإلكتروني',
  };
  return subjects[locale as keyof typeof subjects] || subjects.en;
}
