'use client';
import React from 'react';
import Cookie from 'js-cookie';
import { Sun, Moon } from 'react-feather';

import { LIGHT_COLORS, DARK_COLORS } from '@/constants';
import VisuallyHidden from '@/components/VisuallyHidden';

function DarkLightToggle({ theme: initialTheme, ...delegated }) {
  const [theme, setTheme] = React.useState(initialTheme);
  return (
    <button
      onClick={() => {
        const nextTheme = theme === 'light' ? 'dark' : 'light';

        setTheme(nextTheme);

        Cookie.set('color-theme', nextTheme, { expires: 1000 });

        const COLORS = nextTheme === 'light' ? LIGHT_COLORS : DARK_COLORS;

        const root = document.documentElement;
        root.setAttribute('data-color-theme', nextTheme);
        Object.entries(COLORS).forEach(([key, value]) => {
          root.style.setProperty(key, value);
        });
      }}
      {...delegated}>
      {theme === 'light' ? <Sun size='1.5rem' /> : <Moon size='1.5rem' />}
      <VisuallyHidden>Toggle dark / light mode</VisuallyHidden>
    </button>
  );
}

export default DarkLightToggle;
