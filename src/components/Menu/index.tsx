import {
  HistoryIcon,
  HouseIcon,
  MoonIcon,
  SettingsIcon,
  SunIcon,
} from 'lucide-react';
import styles from './styles.module.css';
import React, { useEffect, useState } from 'react';
import { RouterLink } from '../RouterLink';

type AvailableThemes = 'light' | 'dark';

export function Menu() {
  const [theme, setTheme] = useState<AvailableThemes>(() => {
    const savedTheme =
      (localStorage.getItem('theme') as AvailableThemes) || 'dark';
    return savedTheme;
  });

  const nextThemeIcon = {
    dark: <SunIcon />,
    light: <MoonIcon />,
  };

  function handleThemeChange(
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) {
    event.preventDefault();
    setTheme(prevTheme => {
      const newTheme = prevTheme === 'dark' ? 'light' : 'dark';
      return newTheme;
    });
  }

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <div className={styles.menu}>
      <RouterLink href='/' className={styles.menuLink}>
        <HouseIcon />
      </RouterLink>
      <RouterLink href='/historico/' className={styles.menuLink}>
        <HistoryIcon />
      </RouterLink>
      <RouterLink href='/configuracoes/' className={styles.menuLink}>
        <SettingsIcon />
      </RouterLink>
      <a href='#' className={styles.menuLink} onClick={handleThemeChange}>
        {nextThemeIcon[theme]}
      </a>
    </div>
  );
}
