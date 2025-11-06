import prisma from '../prisma';
import { themeConfig } from '@/theme.config';

export async function getActiveTheme(): Promise<string> {
  try {
    const activeTheme = await prisma.theme.findFirst({
      where: { isActive: true },
    });

    return activeTheme?.name || themeConfig.defaultTheme;
  } catch (error) {
    console.error('Error getting active theme:', error);
    return themeConfig.defaultTheme;
  }
}

export async function setActiveTheme(themeName: string): Promise<boolean> {
  try {
    // Deactivate all themes
    await prisma.theme.updateMany({
      data: { isActive: false },
    });

    // Activate the selected theme
    await prisma.theme.update({
      where: { name: themeName },
      data: { isActive: true },
    });

    return true;
  } catch (error) {
    console.error('Error setting active theme:', error);
    return false;
  }
}

export async function registerTheme(theme: {
  name: string;
  version: string;
  author?: string;
  description?: string;
  isCore?: boolean;
  config?: object;
}): Promise<boolean> {
  try {
    await prisma.theme.upsert({
      where: { name: theme.name },
      update: {
        version: theme.version,
        author: theme.author,
        description: theme.description,
        config: theme.config ? JSON.stringify(theme.config) : null,
      },
      create: {
        name: theme.name,
        version: theme.version,
        author: theme.author,
        description: theme.description,
        isCore: theme.isCore || false,
        isActive: theme.name === themeConfig.defaultTheme,
        config: theme.config ? JSON.stringify(theme.config) : null,
      },
    });

    return true;
  } catch (error) {
    console.error('Error registering theme:', error);
    return false;
  }
}
