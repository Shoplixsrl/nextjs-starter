import type { Note } from './types';

export function searchNotes(notes: Note[], query: string): Note[] {
  if (!query.trim()) {
    return notes;
  }

  const lowerQuery = query.toLowerCase();

  return notes.filter((note) => {
    const titleMatch = note.title.toLowerCase().includes(lowerQuery);
    const contentMatch = note.content.toLowerCase().includes(lowerQuery);
    return titleMatch || contentMatch;
  });
}

export function highlightText(text: string, query: string): string {
  if (!query.trim()) {
    return text;
  }

  const regex = new RegExp(`(${query})`, 'gi');
  return text.replace(regex, '<mark>$1</mark>');
}
