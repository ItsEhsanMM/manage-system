import { ClientWithId } from '@/shared/types';
import { create } from 'zustand';

type ClientDialogStore = {
  isClientDialogOpen: boolean;
  selectedClient: ClientWithId | null;
  toggleClientDialog: (open?:boolean,client?: ClientWithId) => void;
};

export const useClientDialogStore = create<ClientDialogStore>((set) => ({
  isClientDialogOpen: false,
  selectedClient: null,
  toggleClientDialog: (open, client) =>
    set(() => ({
      isClientDialogOpen: open,
      selectedClient: open ? client || null : null,
    })),
}));
