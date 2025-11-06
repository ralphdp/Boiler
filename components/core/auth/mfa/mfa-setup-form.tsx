'use client';

import { useState } from 'react';
import { mfaSetupSchema } from '@/lib/core/validation/schemas';
import Image from 'next/image';

export function MFASetupForm() {
  const [step, setStep] = useState<'select' | 'verify'>('select');
  const [method, setMethod] = useState<'email' | 'authenticator' | 'sms'>('authenticator');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [code, setCode] = useState('');
  const [qrCode, setQrCode] = useState('');
  const [secret, setSecret] = useState('');
  const [backupCodes, setBackupCodes] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [success, setSuccess] = useState(false);

  const handleMethodSelect = async () => {
    setLoading(true);
    setErrors({});

    try {
      const validation = mfaSetupSchema.safeParse({ method, phoneNumber });
      if (!validation.success) {
        const fieldErrors = validation.error.flatten().fieldErrors;
        setErrors(
          Object.fromEntries(Object.entries(fieldErrors).map(([k, v]) => [k, v?.[0] || '']))
        );
        setLoading(false);
        return;
      }

      const response = await fetch('/core/api/auth/mfa/setup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(validation.data),
      });

      const data = await response.json();

      if (data.success) {
        if (method === 'authenticator') {
          setQrCode(data.data.qrCode);
          setSecret(data.data.secret);
        }
        setStep('verify');
      } else {
        setErrors({ general: data.error || 'Setup failed' });
      }
    } catch (error) {
      console.error('MFA setup error:', error);
      setErrors({ general: 'An unexpected error occurred' });
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async () => {
    setLoading(true);
    setErrors({});

    try {
      if (!code || code.length !== 6) {
        setErrors({ code: 'Please enter a 6-digit code' });
        setLoading(false);
        return;
      }

      const response = await fetch('/core/api/auth/mfa/verify-setup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code }),
      });

      const data = await response.json();

      if (data.success) {
        setBackupCodes(data.data.backupCodes);
        setSuccess(true);
      } else {
        setErrors({ code: data.error || 'Invalid code' });
      }
    } catch (error) {
      console.error('MFA verify error:', error);
      setErrors({ general: 'Verification failed' });
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="space-y-4">
        <div className="p-6 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg">
          <h3 className="font-semibold text-green-800 dark:text-green-200 mb-2">
            MFA Enabled Successfully!
          </h3>
          <p className="text-sm text-green-700 dark:text-green-300">
            Your account is now protected with multi-factor authentication.
          </p>
        </div>

        {backupCodes.length > 0 && (
          <div className="p-6 bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 rounded-lg">
            <h3 className="font-semibold text-amber-800 dark:text-amber-200 mb-2">
              ⚠️ Save Your Backup Codes
            </h3>
            <p className="text-sm text-amber-700 dark:text-amber-300 mb-4">
              Store these codes in a safe place. You can use them to access your account if you lose
              your authentication device.
            </p>
            <div className="grid grid-cols-2 gap-2 font-mono text-sm bg-white dark:bg-black p-4 rounded">
              {backupCodes.map((code, i) => (
                <div key={i} className="p-2 border rounded">
                  {code}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  if (step === 'select') {
    return (
      <div className="space-y-4">
        {errors.general && (
          <div className="p-3 bg-destructive/10 text-destructive text-sm rounded-md">
            {errors.general}
          </div>
        )}

        <div className="space-y-3">
          <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-accent">
            <input
              type="radio"
              name="mfaMethod"
              value="authenticator"
              checked={method === 'authenticator'}
              onChange={(e) => setMethod(e.target.value as 'email' | 'authenticator' | 'sms')}
              className="mr-3"
            />
            <div>
              <div className="font-medium">Authenticator App (Recommended)</div>
              <div className="text-sm text-muted-foreground">
                Use Google Authenticator, Authy, or similar apps
              </div>
            </div>
          </label>

          <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-accent">
            <input
              type="radio"
              name="mfaMethod"
              value="email"
              checked={method === 'email'}
              onChange={(e) => setMethod(e.target.value as 'email' | 'authenticator' | 'sms')}
              className="mr-3"
            />
            <div>
              <div className="font-medium">Email</div>
              <div className="text-sm text-muted-foreground">
                Receive verification codes via email
              </div>
            </div>
          </label>

          <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-accent">
            <input
              type="radio"
              name="mfaMethod"
              value="sms"
              checked={method === 'sms'}
              onChange={(e) => setMethod(e.target.value as 'email' | 'authenticator' | 'sms')}
              className="mr-3"
            />
            <div>
              <div className="font-medium">SMS</div>
              <div className="text-sm text-muted-foreground">Receive codes via text message</div>
            </div>
          </label>
        </div>

        {method === 'sms' && (
          <div className="space-y-2">
            <label htmlFor="phoneNumber" className="text-sm font-medium">
              Phone Number
            </label>
            <input
              id="phoneNumber"
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full px-3 py-2 border rounded-md bg-background"
              placeholder="+1234567890"
              required
            />
            {errors.phoneNumber && <p className="text-sm text-destructive">{errors.phoneNumber}</p>}
          </div>
        )}

        <button
          onClick={handleMethodSelect}
          disabled={loading}
          className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50"
        >
          {loading ? 'Setting up...' : 'Continue'}
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {errors.general && (
        <div className="p-3 bg-destructive/10 text-destructive text-sm rounded-md">
          {errors.general}
        </div>
      )}

      {method === 'authenticator' && qrCode && (
        <div className="space-y-4">
          <div className="text-center space-y-2">
            <h3 className="font-semibold">Scan QR Code</h3>
            <p className="text-sm text-muted-foreground">
              Use your authenticator app to scan this QR code
            </p>
          </div>

          <div className="flex justify-center p-4 bg-white dark:bg-black rounded-lg">
            <Image src={qrCode} alt="MFA QR Code" width={200} height={200} />
          </div>

          <div className="text-center">
            <p className="text-xs text-muted-foreground mb-2">Or enter this code manually:</p>
            <code className="px-3 py-1 bg-muted rounded text-sm font-mono">{secret}</code>
          </div>
        </div>
      )}

      {method === 'email' && (
        <div className="p-4 bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg">
          <p className="text-sm text-blue-700 dark:text-blue-300">
            A verification code has been sent to your email. Please enter it below.
          </p>
        </div>
      )}

      {method === 'sms' && (
        <div className="p-4 bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg">
          <p className="text-sm text-blue-700 dark:text-blue-300">
            A verification code has been sent to {phoneNumber}. Please enter it below.
          </p>
        </div>
      )}

      <div className="space-y-2">
        <label htmlFor="code" className="text-sm font-medium">
          Verification Code
        </label>
        <input
          id="code"
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
          className="w-full px-3 py-2 border rounded-md bg-background text-center text-2xl font-mono tracking-widest"
          placeholder="000000"
          maxLength={6}
          required
        />
        {errors.code && <p className="text-sm text-destructive">{errors.code}</p>}
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => setStep('select')}
          className="flex-1 px-4 py-2 border rounded-md hover:bg-accent transition-colors"
          disabled={loading}
        >
          Back
        </button>
        <button
          onClick={handleVerify}
          disabled={loading || code.length !== 6}
          className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50"
        >
          {loading ? 'Verifying...' : 'Verify & Enable'}
        </button>
      </div>
    </div>
  );
}
