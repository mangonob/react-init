import { create } from 'zustand';
import { ChatMessage } from '../../models';

export interface MessageState {
  messages: ChatMessage[];
  update: (index: number, message: ChatMessage) => void;
  remove: (index: number) => void;
  add: (message: ChatMessage) => void;
}

export const useMessages = create<MessageState>((set, get) => {
  return {
    messages: [],
    update: (index, message) => {
      const messages = get().messages;
      messages[index] = message;
      set({ messages });
    },
    remove: (i) =>
      set({ messages: get().messages.filter((_, index) => index !== i) }),
    add: (message) => set({ messages: [...get().messages, message] }),
  };
});
