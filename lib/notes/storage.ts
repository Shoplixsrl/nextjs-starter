import type { Note, Folder } from './types';

const STORAGE_KEY = 'notes-app-data';

export interface StorageData {
  notes: Note[];
  folders: Folder[];
}

// Initialize with sample data
const initialData: StorageData = {
  folders: [
    {
      id: 'folder-1',
      name: 'Personal',
      parentId: null,
      createdAt: new Date('2025-01-01'),
    },
    {
      id: 'folder-2',
      name: 'Work',
      parentId: null,
      createdAt: new Date('2025-01-01'),
    },
  ],
  notes: [
    {
      id: 'note-1',
      title: 'Welcome to Notes',
      content: `# Welcome to Notes App 🎉

This is a **beautiful** markdown editor with:

- ✅ Full markdown support
- ✅ Folder organization
- ✅ Instant search
- ✅ Minimal design

## Getting Started

Try creating a new note or editing this one!

### Features

\`\`\`typescript
// Code highlighting works too!
const greeting = "Hello, world!";
console.log(greeting);
\`\`\`

> "Simplicity is the ultimate sophistication." - Leonardo da Vinci
`,
      folderId: 'folder-1',
      createdAt: new Date('2025-01-01'),
      updatedAt: new Date('2025-01-01'),
    },
  ],
};

export const storage = {
  getData(): StorageData {
    if (typeof window === 'undefined') {
      return initialData;
    }

    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) {
        this.setData(initialData);
        return initialData;
      }

      const parsed = JSON.parse(stored);
      // Convert date strings back to Date objects
      parsed.notes = parsed.notes.map((note: Note) => ({
        ...note,
        createdAt: new Date(note.createdAt),
        updatedAt: new Date(note.updatedAt),
      }));
      parsed.folders = parsed.folders.map((folder: Folder) => ({
        ...folder,
        createdAt: new Date(folder.createdAt),
      }));

      return parsed;
    } catch (error) {
      console.error('Failed to load data from localStorage:', error);
      return initialData;
    }
  },

  setData(data: StorageData): void {
    if (typeof window === 'undefined') return;

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
      console.error('Failed to save data to localStorage:', error);
    }
  },

  addNote(note: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>): Note {
    const data = this.getData();
    const newNote: Note = {
      ...note,
      id: `note-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    data.notes.push(newNote);
    this.setData(data);
    return newNote;
  },

  updateNote(id: string, updates: Partial<Omit<Note, 'id' | 'createdAt'>>): void {
    const data = this.getData();
    const noteIndex = data.notes.findIndex((n) => n.id === id);
    if (noteIndex !== -1) {
      data.notes[noteIndex] = {
        ...data.notes[noteIndex],
        ...updates,
        updatedAt: new Date(),
      };
      this.setData(data);
    }
  },

  deleteNote(id: string): void {
    const data = this.getData();
    data.notes = data.notes.filter((n) => n.id !== id);
    this.setData(data);
  },

  addFolder(name: string, parentId: string | null = null): Folder {
    const data = this.getData();
    const newFolder: Folder = {
      id: `folder-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      name,
      parentId,
      createdAt: new Date(),
    };
    data.folders.push(newFolder);
    this.setData(data);
    return newFolder;
  },

  updateFolder(id: string, name: string): void {
    const data = this.getData();
    const folderIndex = data.folders.findIndex((f) => f.id === id);
    if (folderIndex !== -1) {
      data.folders[folderIndex].name = name;
      this.setData(data);
    }
  },

  deleteFolder(id: string): void {
    const data = this.getData();
    // Delete folder and all notes in it
    data.folders = data.folders.filter((f) => f.id !== id);
    data.notes = data.notes.filter((n) => n.folderId !== id);
    this.setData(data);
  },
};
