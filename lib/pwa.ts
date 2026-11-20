'use client';

/** Holds the browser's deferred install prompt so any component can offer "Install app". */

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

let deferred: BeforeInstallPromptEvent | null = null;
const listeners = new Set<() => void>();
const notify = () => listeners.forEach((l) => l());

export function captureInstallPrompt(e: Event) {
  e.preventDefault();
  deferred = e as BeforeInstallPromptEvent;
  notify();
}

export function clearInstallPrompt() {
  deferred = null;
  notify();
}

export function canInstall() {
  return deferred !== null;
}

export function subscribeInstall(fn: () => void) {
  listeners.add(fn);
  return () => {
    listeners.delete(fn);
  };
}

export async function promptInstall() {
  if (!deferred) return 'unavailable' as const;
  await deferred.prompt();
  const { outcome } = await deferred.userChoice;
  clearInstallPrompt();
  return outcome;
}
