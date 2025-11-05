/**
 * Optimized icon imports for better tree-shaking
 * Commonly used icons are imported statically for immediate use
 * Less common icons can be dynamically imported when needed
 */

// Common icons - imported statically (used frequently)
export {
  Flame,
  Menu,
  X,
  Github,
  Database,
  Palette,
  Zap,
  Code,
  Layers,
  Globe,
  Type,
  Shield,
  Rocket,
  Info,
} from "lucide-react";

// Icon mapping for dynamic imports (lazy load less common icons)
export const lazyIcons = {
  Mail: () => import("lucide-react").then((mod) => ({ default: mod.Mail })),
  Settings: () =>
    import("lucide-react").then((mod) => ({ default: mod.Settings })),
  User: () => import("lucide-react").then((mod) => ({ default: mod.User })),
  LogOut: () => import("lucide-react").then((mod) => ({ default: mod.LogOut })),
  HelpCircle: () =>
    import("lucide-react").then((mod) => ({ default: mod.HelpCircle })),
  MoreVertical: () =>
    import("lucide-react").then((mod) => ({ default: mod.MoreVertical })),
  TrendingUp: () =>
    import("lucide-react").then((mod) => ({ default: mod.TrendingUp })),
  Users: () => import("lucide-react").then((mod) => ({ default: mod.Users })),
  DollarSign: () =>
    import("lucide-react").then((mod) => ({ default: mod.DollarSign })),
  Cookie: () => import("lucide-react").then((mod) => ({ default: mod.Cookie })),
} as const;

/**
 * Type helper for icon names
 */
export type LazyIconName = keyof typeof lazyIcons;
