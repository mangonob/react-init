import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface GeneralSettingsState {
  mode: 'chat' | 'group';
  groupName?: string;
  unreadCount: number;
  update: (_: Partial<GeneralSettingsState>) => void;
}

export const useGeneralSettings = create(
  persist<GeneralSettingsState>(
    (set, get) => {
      return {
        mode: 'chat',
        unreadCount: 0,
        update(s) {
          set({ ...get(), ...s });
        },
      };
    },
    {
      name: 'WECHAT_CHAT_GENERAL_SETTINGS',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
