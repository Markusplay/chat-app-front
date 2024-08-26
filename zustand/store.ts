import { create } from 'zustand';

type Store = {
  currentChat: string;
  setChat: (chatId: string) => void;
};

export const store = create<Store>()(set => ({
  currentChat: '',
  setChat: (chatId: string) => set({ currentChat: chatId }),
}));
