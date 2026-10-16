import { Metadata } from 'next';
import css from './CreateNote.module.css';
import NoteForm from '@/components/NoteForm/NoteForm';

export const metadata: Metadata = {
  title: 'Create new note',
  description:
    'A simple and efficient app for creating ang organizing your notes',
  openGraph: {
    title: 'Create new note',
    description:
      'A simple and efficient app for creating ang organizing your notes',
    url: 'https://notehub.com/',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
        height: 630,
        alt: 'Create new note',
      },
    ],
  },
  twitter: {
    title: 'Create new note',
    description:
      'A simple and efficient app for creating ang organizing your notes',
    images: ['https://ac.goit.global/fullstack/react/notehub-og-meta.jpg'],
  },
};

const CreateNote = async () => {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>
        <NoteForm />
      </div>
    </main>
  );
};

export default CreateNote;
