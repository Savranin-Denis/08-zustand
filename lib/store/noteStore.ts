import { NewNote } from '@/types/note';
import { create } from 'zustand';

const initialDraft: NewNote = {
  title: '',
  content: '',
  tag: '',
};
type NoteDraftStore = {
  draft: NewNote;
  setDraft: (note: NewNote) => void;
  clearDraft: () => void;
};

export const useNoteDraftStore = create<NoteDraftStore>()(set => ({
  draft: initialDraft,
  setDraft: note => set(() => ({ draft: note })),
  clearDraft: () => set(() => ({ draft: initialDraft })),
}));
