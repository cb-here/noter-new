import { useState, useEffect } from "react";
import { Modal } from "@/components/ui/modal";
import Input from "@/components/ui/input";
import Textarea from "@/components/ui/textarea";
import Button from "@/components/ui/button";
import type { Note } from "@/types/note";

interface NoteModalProps {
  isOpen: boolean;
  closeModal: () => void;
  modelType: "create" | "edit" | "delete" | "view";
  setModelType: (type: "create" | "edit"| "delete" | "view") => void;
  selectedNote: Note | null;
  setSelectedNote: (note: any) => void;
  onSubmit?: (note: { title: string; description: string }) => void;
  onDelete?: (id: string) => void;
}

export default function NoteModal({
  isOpen,
  closeModal,
  modelType,
  setModelType,
  selectedNote,
  setSelectedNote,
  onSubmit,
  onDelete,
}: NoteModalProps) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const [errors, setErrors] = useState({
    title: "",
    description: "",
  });

  // Populate form when editing or viewing
  useEffect(() => {
    if ((modelType === "edit" || modelType === "view") && selectedNote) {
      setFormData({
        title: selectedNote.title,
        description: selectedNote.content,
      });
    } else {
      setFormData({ title: "", description: "" });
    }
  }, [modelType, selectedNote]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (modelType === "delete") {
      // Handle delete
      if (selectedNote && onDelete) {
        onDelete(selectedNote._id);
      }
      handleClose();
      return;
    }

    // Validation for create/edit
    const newErrors = {
      title: formData.title.trim() ? "" : "Title is required",
      description: formData.description.trim() ? "" : "Description is required",
    };

    setErrors(newErrors);

    if (!newErrors.title && !newErrors.description) {
      if (onSubmit) {
        onSubmit(formData);
      }
      handleClose();
    }
  };

  const handleClose = () => {
    // Reset form on close
    setFormData({ title: "", description: "" });
    setErrors({ title: "", description: "" });
    setSelectedNote(null);
    setModelType("create");
    closeModal();
  };

  const handleEdit = () => {
    setModelType("edit");
  };

  const handleDelete = () => {
    setModelType("delete");
  };

  const getModalTitle = () => {
    switch (modelType) {
      case "create": return "Create New Note";
      case "edit": return "Edit Note";
      case "delete": return "Delete Note";
      case "view": return "View Note";
      default: return "Note";
    }
  };

  const getModalDescription = () => {
    switch (modelType) {
      case "create": return "Add a new note to your collection";
      case "edit": return "Update your note details";
      case "delete": return "Are you sure you want to delete this note?";
      case "view": return selectedNote?.createdAt ? `Created on ${new Date(selectedNote.createdAt).toLocaleDateString()}` : "";
      default: return "";
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      className="max-w-[750px] p-8! m-4!"
      showCloseButton={false}
    >
      <div className="space-y-6!">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2!">
            {getModalTitle()}
          </h2>
          <p className="text-gray-400">
            {getModalDescription()}
          </p>
        </div>

        {modelType === "view" ? (
          // Read-only view
          <div className="space-y-6!">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Title
              </label>
              <p className="text-xl font-semibold text-white">
                {selectedNote?.title}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Description
              </label>
              <p className="text-base text-gray-300 whitespace-pre-wrap">
                {selectedNote?.content}
              </p>
            </div>

            <div className="flex gap-4 justify-end pt-4! flex-col md:flex-row w-full">
              <Button type="button" variant="outline" onClick={handleClose} className="w-full md:w-auto">
                Close
              </Button>
              <Button type="button" variant="error" onClick={handleDelete} className="w-full md:w-auto">
                Delete
              </Button>
              <Button type="button" variant="primary" onClick={handleEdit} className="w-full md:w-auto">
                Edit
              </Button>
            </div>
          </div>
        ) : modelType === "delete" ? (
          // Delete confirmation
          <div className="space-y-6!">
            <div className="p-6! rounded-2xl bg-red-950/30 border border-red-900/50">
              <p className="text-lg text-white font-semibold mb-2">
                {selectedNote?.title}
              </p>
              <p className="text-sm text-gray-400">
                This action cannot be undone.
              </p>
            </div>

            <div className="flex gap-4 justify-end pt-4! flex-col md:flex-row w-full">
              <Button type="button" variant="outline" onClick={handleClose} className="w-full md:w-auto">
                Cancel
              </Button>
              <Button type="button" variant="error" onClick={handleSubmit} className="w-full md:w-auto">
                Delete Note
              </Button>
            </div>
          </div>
        ) : (
          // Create/Edit form
          <form onSubmit={handleSubmit} className="space-y-6!">
            <Input
              label="Note Title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              error={errors.title}
              placeholder="Note Title"
            />

            <Textarea
              label="Note Description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              error={errors.description}
              placeholder="Note Description"
              rows={8}
            />

            <div className="flex gap-4 justify-end pt-4! flex-col md:flex-row w-full">
              <Button type="button" variant="outline" onClick={handleClose} className="w-full md:w-auto">
                Cancel
              </Button>
              <Button type="submit" variant="primary" className="w-full md:w-auto">
                {modelType === "create" ? "Create Note" : "Update Note"}
              </Button>
            </div>
          </form>
        )}
      </div>
    </Modal>
  );
}
