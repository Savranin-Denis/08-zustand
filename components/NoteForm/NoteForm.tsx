'use client';

import css from './NoteForm.module.css';
import { useId, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { NewNote, NoteTag } from '@/types/note';
import { createNote } from '@/lib/api';
import { useRouter } from 'next/navigation';

interface FormErrors {
  title?: string;
  content?: string;
  tag?: string;
}

export default function NoteForm() {
  const noteId = useId();
  const queryClient = useQueryClient();
  const router = useRouter();

  const [errors, setErrors] = useState<FormErrors>({});

  const handleCancel = () => router.push('/notes/filter/all');

  const { mutate, isPending } = useMutation({
    mutationFn: (values: NewNote) => createNote(values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      handleCancel();
    },
  });

  const handleSubmit = (formData: FormData) => {
    const title = formData.get('title') as string;
    const content = formData.get('content') as string;
    const tag = formData.get('tag') as NoteTag;

    const newErrors: FormErrors = {};

    if (!title.trim()) {
      newErrors.title = 'Title is required';
    } else if (title.length < 3) {
      newErrors.title = 'Title too short (min 3 chars)';
    } else if (title.length > 50) {
      newErrors.title = 'Title too long (max 50 chars)';
    }

    if (content.length > 500) {
      newErrors.content = 'Content too long (max 500 chars)';
    }

    if (!tag) {
      newErrors.tag = 'Tag is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    const values: NewNote = { title, content, tag };
    mutate(values);
  };

  return (
    <form action={handleSubmit} className={css.form} noValidate>
      <div className={css.formGroup}>
        <label htmlFor={`${noteId}-title`}>Title</label>
        <input
          id={`${noteId}-title`}
          type="text"
          name="title"
          className={css.input}
        />
        {errors.title && <span className={css.error}>{errors.title}</span>}
      </div>

      <div className={css.formGroup}>
        <label htmlFor={`${noteId}-content`}>Content</label>
        <textarea
          id={`${noteId}-content`}
          name="content"
          rows={8}
          className={css.textarea}
        ></textarea>
        {errors.content && <span className={css.error}>{errors.content}</span>}
      </div>

      <div className={css.formGroup}>
        <label htmlFor={`${noteId}-tag`}>Tag</label>
        <select
          id={`${noteId}-tag`}
          name="tag"
          className={css.select}
          defaultValue=""
        >
          <option value="" disabled>
            -- Select type of Note --
          </option>
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
        </select>
        {errors.tag && <span className={css.error}>{errors.tag}</span>}
      </div>

      <div className={css.actions}>
        <button
          onClick={handleCancel}
          type="button"
          className={css.cancelButton}
        >
          Cancel
        </button>
        <button type="submit" className={css.submitButton} disabled={isPending}>
          {isPending ? 'Creating...' : 'Create note'}
        </button>
      </div>
    </form>
  );
}
