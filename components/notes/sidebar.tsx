'use client';

import { motion } from 'framer-motion';
import {
  FolderIcon,
  FolderOpenIcon,
  PlusIcon,
  FileTextIcon,
  SearchIcon,
  Trash2Icon,
} from 'lucide-react';
import { useState } from 'react';
import type { Folder, Note } from '@/lib/notes/types';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

interface SidebarProps {
  folders: Folder[];
  notes: Note[];
  selectedFolderId: string | null;
  selectedNoteId: string | null;
  searchQuery: string;
  onSelectFolder: (folderId: string | null) => void;
  onSelectNote: (noteId: string) => void;
  onAddFolder: (name: string) => void;
  onAddNote: () => void;
  onDeleteFolder: (folderId: string) => void;
  onDeleteNote: (noteId: string) => void;
  onSearchChange: (query: string) => void;
}

export function Sidebar({
  folders,
  notes,
  selectedFolderId,
  selectedNoteId,
  searchQuery,
  onSelectFolder,
  onSelectNote,
  onAddFolder,
  onAddNote,
  onDeleteFolder,
  onDeleteNote,
  onSearchChange,
}: SidebarProps) {
  const [isAddingFolder, setIsAddingFolder] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');
  const [deleteTarget, setDeleteTarget] = useState<{ type: 'folder' | 'note'; id: string } | null>(null);

  const handleAddFolder = () => {
    if (newFolderName.trim()) {
      onAddFolder(newFolderName.trim());
      setNewFolderName('');
      setIsAddingFolder(false);
    }
  };

  const filteredNotes = notes.filter((note) =>
    selectedFolderId === null || note.folderId === selectedFolderId
  );

  return (
    <div className="flex h-full flex-col border-r bg-muted/10">
      {/* Header */}
      <div className="border-b p-4">
        <h1 className="text-xl font-semibold mb-3">Notes</h1>

        {/* Search */}
        <div className="relative">
          <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search notes..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      {/* Folders */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-2">
          <div className="mb-2 flex items-center justify-between px-2">
            <span className="text-xs font-medium text-muted-foreground">FOLDERS</span>
            <Button
              variant="ghost"
              size="icon"
              className="h-5 w-5"
              onClick={() => setIsAddingFolder(true)}
            >
              <PlusIcon className="h-3 w-3" />
            </Button>
          </div>

          {/* All Notes */}
          <button
            onClick={() => onSelectFolder(null)}
            className={cn(
              "w-full flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors",
              selectedFolderId === null
                ? "bg-accent text-accent-foreground"
                : "hover:bg-accent/50"
            )}
          >
            <FolderOpenIcon className="h-4 w-4" />
            <span>All Notes</span>
            <span className="ml-auto text-xs text-muted-foreground">{notes.length}</span>
          </button>

          {/* Folder List */}
          {folders.map((folder) => {
            const folderNotes = notes.filter((n) => n.folderId === folder.id);
            return (
              <motion.div
                key={folder.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="group relative"
              >
                <button
                  onClick={() => onSelectFolder(folder.id)}
                  className={cn(
                    "w-full flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors",
                    selectedFolderId === folder.id
                      ? "bg-accent text-accent-foreground"
                      : "hover:bg-accent/50"
                  )}
                >
                  <FolderIcon className="h-4 w-4" />
                  <span className="flex-1 text-left truncate">{folder.name}</span>
                  <span className="text-xs text-muted-foreground">{folderNotes.length}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-5 w-5 opacity-0 group-hover:opacity-100"
                    onClick={(e) => {
                      e.stopPropagation();
                      setDeleteTarget({ type: 'folder', id: folder.id });
                    }}
                  >
                    <Trash2Icon className="h-3 w-3" />
                  </Button>
                </button>
              </motion.div>
            );
          })}

          {/* Add Folder Input */}
          {isAddingFolder && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="px-3 py-2"
            >
              <Input
                autoFocus
                placeholder="Folder name..."
                value={newFolderName}
                onChange={(e) => setNewFolderName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleAddFolder();
                  if (e.key === 'Escape') {
                    setIsAddingFolder(false);
                    setNewFolderName('');
                  }
                }}
                onBlur={() => {
                  if (newFolderName.trim()) {
                    handleAddFolder();
                  } else {
                    setIsAddingFolder(false);
                  }
                }}
              />
            </motion.div>
          )}
        </div>

        {/* Notes List */}
        <div className="p-2 pt-4">
          <div className="mb-2 flex items-center justify-between px-2">
            <span className="text-xs font-medium text-muted-foreground">
              {selectedFolderId ? 'NOTES IN FOLDER' : 'ALL NOTES'}
            </span>
            <Button
              variant="ghost"
              size="icon"
              className="h-5 w-5"
              onClick={onAddNote}
            >
              <PlusIcon className="h-3 w-3" />
            </Button>
          </div>

          {filteredNotes.length === 0 ? (
            <div className="px-3 py-8 text-center text-sm text-muted-foreground">
              No notes yet
            </div>
          ) : (
            filteredNotes.map((note) => (
              <motion.div
                key={note.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="group relative"
              >
                <button
                  onClick={() => onSelectNote(note.id)}
                  className={cn(
                    "w-full flex items-start gap-2 rounded-lg px-3 py-2 text-sm transition-colors",
                    selectedNoteId === note.id
                      ? "bg-accent text-accent-foreground"
                      : "hover:bg-accent/50"
                  )}
                >
                  <FileTextIcon className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <div className="flex-1 text-left min-w-0">
                    <div className="font-medium truncate">{note.title || 'Untitled'}</div>
                    <div className="text-xs text-muted-foreground truncate">
                      {note.content.substring(0, 60)}
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-5 w-5 opacity-0 group-hover:opacity-100 flex-shrink-0"
                    onClick={(e) => {
                      e.stopPropagation();
                      setDeleteTarget({ type: 'note', id: note.id });
                    }}
                  >
                    <Trash2Icon className="h-3 w-3" />
                  </Button>
                </button>
              </motion.div>
            ))
          )}
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deleteTarget} onOpenChange={() => setDeleteTarget(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              {deleteTarget?.type === 'folder'
                ? 'This will delete the folder and all notes inside it. This action cannot be undone.'
                : 'This will permanently delete this note. This action cannot be undone.'}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (deleteTarget) {
                  if (deleteTarget.type === 'folder') {
                    onDeleteFolder(deleteTarget.id);
                  } else {
                    onDeleteNote(deleteTarget.id);
                  }
                  setDeleteTarget(null);
                }
              }}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
