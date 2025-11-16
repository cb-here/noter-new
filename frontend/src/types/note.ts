export interface Note {
  _id: string;
  title: string;
  content: string;
  isPinned?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface NotesResponse {
  statusCode: number;
  status: boolean;
  title: string;
  message: string;
  Response: {
    total: number;
    notes: Note[];
  };
}

export interface NoteResponse {
  statusCode: number;
  status: boolean;
  title: string;
  message: string;
  Response: Note;
}

export interface FetchNotesParams {
  page?: number;
  limit?: number;
  search?: string;
}

export interface CreateNoteData {
  title: string;
  content: string;
}

export interface UpdateNoteData {
  title?: string;
  content?: string;
  isPinned?: boolean;
}
