import Script from 'next/script'
import React from 'react'

import { defaultTheme, themeLocalStorageKey } from '../ThemeSelector/types'

/**
 * Force light theme by default. The Ortus marketing site is designed
 * for light mode; OS dark-mode preference is intentionally ignored.
 */
export const InitTheme: React.FC = () => {
  return (
    // eslint-disable-next-line @next/next/no-before-interactive-script-outside-document
    <Script
      dangerouslySetInnerHTML={{
        __html: `
  (function () {
    var themeToSet = '${defaultTheme}';
    try {
      var stored = window.localStorage.getItem('${themeLocalStorageKey}');
      if (stored === 'light' || stored === 'dark') themeToSet = stored;
    } catch (e) {}
    document.documentElement.setAttribute('data-theme', themeToSet);
  })();
  `,
      }}
      id="theme-script"
      strategy="beforeInteractive"
    />
  )
}
