import type { KommoCredentials } from "@/types/kommo";

const STORAGE_KEY = "psi_kommo_credentials";
const ACCOUNT_KEY = "psi_kommo_account";

// Credenciais Kommo são informadas pelo usuário na página /integracoes
// e armazenadas localmente no navegador. Nada de tokens hardcoded aqui.

export function saveCredentials(creds: KommoCredentials): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(creds));
}

export function getCredentials(): KommoCredentials | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as KommoCredentials;
  } catch {
    return null;
  }
}

export function clearCredentials(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
  localStorage.removeItem(ACCOUNT_KEY);
}

export function saveAccountInfo(info: { id: number; name: string }): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(ACCOUNT_KEY, JSON.stringify(info));
}

export function getAccountInfo(): { id: number; name: string } | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(ACCOUNT_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function isConnected(): boolean {
  return !!getCredentials();
}
