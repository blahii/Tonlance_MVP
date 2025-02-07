import { useEffect } from 'react';

interface WebApp {
  ready: () => void;
  expand: () => void;
  close: () => void;
  MainButton: {
    text: string;
    show: () => void;
    hide: () => void;
    onClick: (callback: () => void) => void;
  };
  initData: string;
}

declare global {
  interface Window {
    Telegram?: {
      WebApp: WebApp;
    };
  }
}

export function initTelegram() {
  if (!window.Telegram?.WebApp) {
    console.warn('Telegram WebApp is not available. Running in browser mode.');
    return;
  }
  const tg = window.Telegram.WebApp;
  tg.ready();
  tg.expand();
}

export function showMainButton(text: string, callback: () => void) {
  if (!window.Telegram?.WebApp) return;
  const tg = window.Telegram.WebApp;
  tg.MainButton.text = text;
  tg.MainButton.onClick(callback);
  tg.MainButton.show();
}

export function hideMainButton() {
  if (!window.Telegram?.WebApp) return;
  const tg = window.Telegram.WebApp;
  tg.MainButton.hide();
}

export function getInitData(): string {
  return window.Telegram?.WebApp?.initData || '';
}

export function useTelegramAuth() {
  useEffect(() => {
    initTelegram();
  }, []);
}