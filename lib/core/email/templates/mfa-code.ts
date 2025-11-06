export interface MFACodeEmailParams {
  name?: string;
  code: string;
  locale?: string;
}

export function getMFACodeEmailTemplate({ name, code, locale = 'en' }: MFACodeEmailParams): string {
  const translations = {
    en: {
      subject: 'Your verification code',
      greeting: name ? `Hello ${name}` : 'Hello',
      message: 'Your verification code is:',
      instructions: 'Enter this code to complete your login. This code will expire in 10 minutes.',
      security:
        "If you didn't request this code, please ignore this email and ensure your account is secure.",
      footer: 'Best regards,<br>The Team',
    },
    es: {
      subject: 'Tu código de verificación',
      greeting: name ? `Hola ${name}` : 'Hola',
      message: 'Tu código de verificación es:',
      instructions:
        'Ingresa este código para completar tu inicio de sesión. Este código expirará en 10 minutos.',
      security: 'Si no solicitaste este código, por favor ignora este correo y asegura tu cuenta.',
      footer: 'Saludos cordiales,<br>El Equipo',
    },
    ar: {
      subject: 'رمز التحقق الخاص بك',
      greeting: name ? `مرحبا ${name}` : 'مرحبا',
      message: 'رمز التحقق الخاص بك هو:',
      instructions: 'أدخل هذا الرمز لإكمال تسجيل الدخول. ستنتهي صلاحية هذا الرمز خلال 10 دقائق.',
      security: 'إذا لم تطلب هذا الرمز، يرجى تجاهل هذا البريد الإلكتروني والتأكد من أمان حسابك.',
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
                    <div style="display: inline-block; padding: 20px 40px; background-color: #f0f0f0; border-radius: 8px; font-size: 32px; font-weight: 700; letter-spacing: 8px; color: #1a1a1a; font-family: 'Courier New', monospace;">
                      ${code}
                    </div>
                  </td>
                </tr>
              </table>
              <p style="margin: 30px 0 0 0; font-size: 14px; line-height: 1.5; color: #6a6a6a;">${t.instructions}</p>
              <p style="margin: 20px 0 0 0; font-size: 14px; color: #999;">${t.security}</p>
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

export function getMFACodeEmailSubject(locale: string = 'en'): string {
  const subjects = {
    en: 'Your verification code',
    es: 'Tu código de verificación',
    ar: 'رمز التحقق الخاص بك',
  };
  return subjects[locale as keyof typeof subjects] || subjects.en;
}
