import NoteModal from "@/components/notes/modal/NoteModal";
import Button from "@/components/ui/button";
import { NoteCard } from "@/components/ui/note-card";
import SearchInput from "@/components/ui/search-input";
import Pagination from "@/components/ui/pagination";
import { useModal } from "@/hooks/useModal";
import { useState, useEffect } from "react";
import { fetchNotes, createNote as createNoteApi, updateNote as updateNoteApi, deleteNote as deleteNoteApi } from "@/utils/apis/noteApis";
import type { Note } from "@/types/note";

export default function Notes() {
  const mainModal = useModal();

  const [notesData, setNotesData] = useState<{
    total: number;
    notes: Note[];
  }>({
    total: 0,
    notes: []
  });

  const [params, setParams] = useState({
    page: 1,
    limit: 15,
    search: ""
  });

  const [loading, setLoading] = useState(false);
  const [modelType, setModelType] = useState<"create" | "edit" | "delete" | "view">("create");
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);

  // Fetch notes when params change
  useEffect(() => {
    loadNotes();
  }, [params.page, params.search]);

  const loadNotes = async () => {
    try {
      setLoading(true);
      const data = await fetchNotes(params);
      setNotesData(data);
    } catch (error) {
      console.error("Error fetching notes:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleNoteClick = (id: string) => {
    const note = notesData?.notes?.find((n) => n._id === id);
    if (note) {
      setSelectedNote(note);
      setModelType("view");
      mainModal.openModal();
    }
  };

  const handleCreateNote = async (noteData: { title: string; description: string }) => {
    try {
      setLoading(true);
      await createNoteApi({
        title: noteData.title,
        content: noteData.description,
      });
      await loadNotes();
    } catch (error) {
      console.error("Error creating note:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateNote = async (noteData: { title: string; description: string }) => {
    if (selectedNote) {
      try {
        setLoading(true);
        await updateNoteApi(selectedNote._id, {
          title: noteData.title,
          content: noteData.description,
        });
        await loadNotes();
      } catch (error) {
        console.error("Error updating note:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleDeleteNote = async (id: string) => {
    try {
      setLoading(true);
      await deleteNoteApi(id);
      await loadNotes();
    } catch (error) {
      console.error("Error deleting note:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (noteData: { title: string; description: string }) => {
    if (modelType === "create") {
      await handleCreateNote(noteData);
    } else if (modelType === "edit") {
      await handleUpdateNote(noteData);
    }
  };

  const handleSearchChange = (value: string) => {
    setParams(prev => ({
      ...prev,
      search: value,
      page: 1 // Reset to first page when searching
    }));
  };

  const handlePageChange = (page: number) => {
    setParams(prev => ({
      ...prev,
      page
    }));
  };

  const totalPages = Math.ceil(notesData.total / params.limit);

  return (
    <div className="min-h-screen py-12! px-4!">
      <div className="">
        <div className="flex items-center justify-between mb-8! flex-col md:flex-row gap-4">
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2">
              My Notes
            </h1>
            <p className="text-gray-400">Browse and manage your notes</p>
          </div>
          <div>
            <Button variant="primary" onClick={() => {
                setModelType("create");
                setSelectedNote(null);
                mainModal.openModal();
            }}>Create a note</Button>
          </div>
        </div>

        <div className="mb-6!">
          <SearchInput
            value={params.search}
            onChange={handleSearchChange}
            placeholder="Search notes by title or content..."
          />
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <p className="text-gray-400">Loading notes...</p>
          </div>
        ) : notesData.notes.length === 0 ? (
          <div className="flex justify-center items-center py-12">
            <p className="text-gray-400">
              {params.search ? "No notes found matching your search." : "No notes yet. Create your first note!"}
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {notesData.notes.map((note) => (
                <NoteCard
                  key={note._id}
                  title={note.title}
                  content={note.content}
                  date={note.createdAt ? new Date(note.createdAt).toLocaleDateString() : ""}
                  onClick={() => handleNoteClick(note._id)}
                />
              ))}
            </div>

            <Pagination
              currentPage={params.page}
              totalPages={totalPages}
              totalItems={notesData.total}
              itemsPerPage={params.limit}
              onPageChange={handlePageChange}
            />
          </>
        )}
      </div>
      <NoteModal
        isOpen={mainModal.isOpen}
        closeModal={mainModal.closeModal}
        modelType={modelType}
        setModelType={setModelType}
        selectedNote={selectedNote}
        setSelectedNote={setSelectedNote}
        onSubmit={handleSubmit}
        onDelete={handleDeleteNote}
      />
    </div>
  );
}
