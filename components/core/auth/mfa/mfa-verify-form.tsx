'use client';

import { useState } from 'react';

interface MFAVerifyFormProps {
  userId: string;
  method: 'email' | 'authenticator' | 'sms';
  onSuccess: () => void;
}

export function MFAVerifyForm({ userId, method, onSuccess }: MFAVerifyFormProps) {
  const [code, setCode] = useState('');
  const [useBackupCode, setUseBackupCode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const sendCode = async () => {
    if (method === 'email' || method === 'sms') {
      setLoading(true);
      try {
        await fetch('/core/api/auth/mfa/send-code', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId, method }),
        });
      } catch (_error) {
        setError('Failed to send code');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleVerify = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/core/api/auth/mfa/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, code, useBackupCode }),
      });

      const data = await response.json();

      if (data.success) {
        onSuccess();
      } else {
        setError(data.error || 'Verification failed');
      }
    } catch (_error) {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      {error && (
        <div className="p-3 bg-destructive/10 text-destructive text-sm rounded-md">{error}</div>
      )}

      <div className="text-center space-y-2">
        <h3 className="font-semibold">Enter Verification Code</h3>
        <p className="text-sm text-muted-foreground">
          {method === 'authenticator' && 'Enter the code from your authenticator app'}
          {method === 'email' && 'Enter the code sent to your email'}
          {method === 'sms' && 'Enter the code sent to your phone'}
        </p>
      </div>

      <div className="space-y-2">
        <input
          type="text"
          value={code}
          onChange={(e) =>
            setCode(e.target.value.replace(/\D/g, '').slice(0, useBackupCode ? 8 : 6))
          }
          className="w-full px-3 py-2 border rounded-md bg-background text-center text-2xl font-mono tracking-widest"
          placeholder={useBackupCode ? '00000000' : '000000'}
          maxLength={useBackupCode ? 8 : 6}
          autoFocus
        />
      </div>

      {!useBackupCode && (method === 'email' || method === 'sms') && (
        <button
          onClick={sendCode}
          disabled={loading}
          className="w-full text-sm text-primary hover:underline disabled:opacity-50"
        >
          Resend Code
        </button>
      )}

      <button
        onClick={handleVerify}
        disabled={loading || code.length < (useBackupCode ? 8 : 6)}
        className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50"
      >
        {loading ? 'Verifying...' : 'Verify'}
      </button>

      <button
        onClick={() => {
          setUseBackupCode(!useBackupCode);
          setCode('');
        }}
        className="w-full text-sm text-muted-foreground hover:text-foreground"
      >
        {useBackupCode ? 'Use verification code instead' : 'Use backup code'}
      </button>
    </div>
  );
}
