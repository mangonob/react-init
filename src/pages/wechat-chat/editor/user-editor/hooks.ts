import { create } from 'zustand';
import { ChatUserModel, SELF_USER_ID } from './models';
import { createJSONStorage, persist } from 'zustand/middleware';

export interface UserState {
  users: ChatUserModel[];
  removeUser: (_: string) => void;
  addUser: (_: ChatUserModel) => void;
  updateUser: (_: ChatUserModel) => void;
  setUsers: (_: ChatUserModel[]) => void;
}

export const useChatUsers = create(
  persist<UserState>(
    (set, get) => {
      return {
        users: [{ userId: SELF_USER_ID, name: '自己' }],
        removeUser(id: string) {
          const users = get().users.filter((user) => id && user.userId !== id);
          set({ users });
        },
        addUser(user: ChatUserModel) {
          set({ users: [...get().users, user] });
        },
        updateUser(user: ChatUserModel) {
          const dump = get().users.slice();
          const index = dump.findIndex((u) => u.userId === user.userId);
          if (index >= 0) {
            set({
              users: [...dump.slice(0, index), user, ...dump.slice(index + 1)],
            });
          }
        },
        setUsers(users: ChatUserModel[]) {
          set({ users });
        },
      };
    },
    {
      name: 'WECHAT_CHAT_USERS',
      storage: createJSONStorage(() => localStorage, {
        replacer(key, value) {
          return key === 'avatar' ? void 0 : value;
        },
      }),
    }
  )
);
