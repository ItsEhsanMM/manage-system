import { Client, ClientWithId } from '@/shared/types';
import { create } from 'zustand';

type ClientDialogStore = {
  isClientDialogOpen: boolean;
  selectedClient: ClientWithId | null;
  toggleClientDialog: (client?: ClientWithId) => void;
};

export const useClientDialogStore = create<ClientDialogStore>((set) => ({
  isClientDialogOpen: false,
  selectedClient: null,
  toggleClientDialog: (client) => set((state) => ({
    isClientDialogOpen: !state.isClientDialogOpen,
    selectedClient: client || null,
  })),
}));