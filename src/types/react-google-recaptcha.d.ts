declare module 'react-google-recaptcha' {
  import { Component } from 'react';

  export interface ReCAPTCHAProps {
    sitekey: string;
    onChange?: (token: string | null) => void;
    onExpired?: () => void;
    onError?: () => void;
    size?: 'compact' | 'normal' | 'invisible';
    theme?: 'light' | 'dark';
    type?: 'image' | 'audio';
    tabindex?: number;
    hl?: string;
    stoken?: string;
    grecaptcha?: any;
    badge?: 'bottomright' | 'bottomleft' | 'inline';
    isolated?: boolean;
    className?: string;
    style?: React.CSSProperties;
  }

  export default class ReCAPTCHA extends Component<ReCAPTCHAProps> {
    reset(): void;
    execute(): void;
    getValue(): string | null;
  }
}
