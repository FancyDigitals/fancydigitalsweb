"use client";

import { useEffect, useState, useCallback } from "react";

/**
 * Persists form state to localStorage.
 * Auto-loads on mount, auto-saves on every change.
 */
export function useFormPersist(storageKey, initialValue) {
  const [value, setValue] = useState(initialValue);
  const [loaded, setLoaded] = useState(false);

  // Load once on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        setValue(JSON.parse(saved));
      }
    } catch (e) {
      console.warn(`[useFormPersist] load failed for ${storageKey}`, e);
    }
    setLoaded(true);
  }, [storageKey]);

  // Save on change (after initial load)
  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(storageKey, JSON.stringify(value));
    } catch (e) {
      console.warn(`[useFormPersist] save failed for ${storageKey}`, e);
    }
  }, [storageKey, value, loaded]);

  const clear = useCallback(() => {
    try {
      localStorage.removeItem(storageKey);
    } catch {}
    setValue(initialValue);
  }, [storageKey, initialValue]);

  return [value, setValue, clear, loaded];
}