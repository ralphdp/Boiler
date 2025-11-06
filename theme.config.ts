export const themeConfig = {
  defaultTheme: 'core',
  themesDirectory: 'themes',
  coreTheme: 'core',
} as const;

export type ThemeConfig = typeof themeConfig;

