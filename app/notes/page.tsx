'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sidebar } from '@/components/notes/sidebar';
import { Editor } from '@/components/notes/editor';
import { storage } from '@/lib/notes/storage';
import { searchNotes } from '@/lib/notes/search';
import type { Note, Folder } from '@/lib/notes/types';

export default function NotesPage() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [folders, setFolders] = useState<Folder[]>([]);
  const [selectedNoteId, setSelectedNoteId] = useState<string | null>(null);
  const [selectedFolderId, setSelectedFolderId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Load initial data
  useEffect(() => {
    const data = storage.getData();
    setNotes(data.notes);
    setFolders(data.folders);

    // Select first note if available
    if (data.notes.length > 0) {
      setSelectedNoteId(data.notes[0].id);
    }
  }, []);

  // Filtered notes based on search and folder
  const filteredNotes = searchNotes(notes, searchQuery);
  const displayedNotes = selectedFolderId
    ? filteredNotes.filter((note) => note.folderId === selectedFolderId)
    : filteredNotes;

  const selectedNote = notes.find((note) => note.id === selectedNoteId) || null;

  const handleAddNote = useCallback(() => {
    const newNote = storage.addNote({
      title: 'Untitled',
      content: '',
      folderId: selectedFolderId,
    });

    const data = storage.getData();
    setNotes(data.notes);
    setSelectedNoteId(newNote.id);
  }, [selectedFolderId]);

  const handleUpdateNote = useCallback((id: string, updates: Partial<Note>) => {
    storage.updateNote(id, updates);
    const data = storage.getData();
    setNotes(data.notes);
  }, []);

  const handleDeleteNote = useCallback((id: string) => {
    storage.deleteNote(id);
    const data = storage.getData();
    setNotes(data.notes);

    // Select another note if the deleted one was selected
    if (selectedNoteId === id) {
      setSelectedNoteId(data.notes.length > 0 ? data.notes[0].id : null);
    }
  }, [selectedNoteId]);

  const handleAddFolder = useCallback((name: string) => {
    storage.addFolder(name);
    const data = storage.getData();
    setFolders(data.folders);
  }, []);

  const handleDeleteFolder = useCallback((id: string) => {
    storage.deleteFolder(id);
    const data = storage.getData();
    setFolders(data.folders);
    setNotes(data.notes);

    // Deselect folder if it was selected
    if (selectedFolderId === id) {
      setSelectedFolderId(null);
    }
  }, [selectedFolderId]);

  return (
    <div className="h-screen flex overflow-hidden bg-background">
      <AnimatePresence mode="wait">
        <motion.div
          key="layout"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="flex w-full h-full"
        >
          {/* Sidebar */}
          <motion.aside
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="w-80 flex-shrink-0"
          >
            <Sidebar
              folders={folders}
              notes={displayedNotes}
              selectedFolderId={selectedFolderId}
              selectedNoteId={selectedNoteId}
              searchQuery={searchQuery}
              onSelectFolder={setSelectedFolderId}
              onSelectNote={setSelectedNoteId}
              onAddFolder={handleAddFolder}
              onAddNote={handleAddNote}
              onDeleteFolder={handleDeleteFolder}
              onDeleteNote={handleDeleteNote}
              onSearchChange={setSearchQuery}
            />
          </motion.aside>

          {/* Main Editor */}
          <motion.main
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="flex-1 overflow-hidden"
          >
            <Editor note={selectedNote} onUpdateNote={handleUpdateNote} />
          </motion.main>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
