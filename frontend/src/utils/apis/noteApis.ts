import axiosInstance from "@/lib/axios";
import type {
  FetchNotesParams,
  NotesResponse,
  CreateNoteData,
  UpdateNoteData,
  NoteResponse,
} from "@/types/note";

export const fetchNotes = async (params?: FetchNotesParams) => {
  const { page = 1, limit = 15, search = "" } = params || {};

  const res = await axiosInstance.get<NotesResponse>("/notes", {
    params: {
      page,
      limit,
      search,
    },
  });

  return res.data.Response;
};

export const createNote = async (data: CreateNoteData) => {
  const res = await axiosInstance.post<NoteResponse>("/notes", data);
  return res.data.Response;
};

export const updateNote = async (id: string, data: UpdateNoteData) => {
  const res = await axiosInstance.put<NoteResponse>(`/notes/${id}`, data);
  return res.data.Response;
};

export const deleteNote = async (id: string) => {
  const res = await axiosInstance.delete<NoteResponse>(`/notes/${id}`);
  return res.data.Response;
};