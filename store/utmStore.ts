// store/utmStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { UTMEntry, UTMParameters } from '../types/utm';

interface UTMStore {
  history: UTMEntry[];
  addEntry: (parameters: UTMParameters) => void;
  removeEntry: (id: string) => void;
  clearHistory: () => void;
}

export const useUTMStore = create<UTMStore>()(
  persist(
    (set, get) => ({
      history: [],

      addEntry: (parameters) => {
        const newEntry: UTMEntry = {
          id: crypto.randomUUID(),
          timestamp: new Date().toISOString(),
          url: generateUTMUrl(parameters),
          parameters
        };
        set({ history: [newEntry, ...get().history] });
      },

      removeEntry: (id) => {
        set({ history: get().history.filter(entry => entry.id !== id) });
      },

      clearHistory: () => {
        set({ history: [] });
      }
    }),
    {
      name: 'utm-history'
    }
  )
);

function generateUTMUrl(parameters: UTMParameters): string {
  const baseUrl = 'https://www.fisherpaykel.com';
  const params = new URLSearchParams({
    utm_source: parameters.source,
    utm_medium: parameters.medium,
    utm_campaign: parameters.campaign,
    utm_term: parameters.term,
    utm_content: parameters.content
  });
  return `${baseUrl}?${params.toString()}`;
}
