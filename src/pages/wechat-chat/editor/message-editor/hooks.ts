import { nanoid } from 'nanoid';
import { create } from 'zustand';

import { ChatMessage } from '../../models';
import { SELF_USER_ID } from '../user-editor/models';

export interface MessageState {
  messages: ChatMessage[];
  update: (index: number, message: ChatMessage) => void;
  remove: (index: number) => void;
  add: (message: ChatMessage) => void;
}

export const useMessages = create<MessageState>((set, get) => {
  return {
    messages: [
      {
        id: nanoid(),
        type: 'text',
        sender: SELF_USER_ID,
      },
    ],
    update: (index, message) => {
      const messages = get().messages.slice();
      messages[index] = message;
      set({ messages });
    },
    remove: (i) =>
      set({ messages: get().messages.filter((_, index) => index !== i) }),
    add: (message) => set({ messages: [...get().messages, message] }),
  };
});
