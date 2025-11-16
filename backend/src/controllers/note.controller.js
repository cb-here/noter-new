import Note from "../models/note.model.js";
import {
  createNoteService,
  getNotesService,
  updateNoteService,
} from "../service/notes/note.service.js";
import { getPaginationParams } from "../utils/helpers/pagination.js";
import { badRequest, successResponse } from "../utils/helpers/response.js";

export const createNote = async (req, res) => {
  try {
    const { title, content } = req.body;

    const note = await createNoteService({
      title,
      content,
    });

    return successResponse(res, 201, "Note created successfully", note);
  } catch (error) {
    console.log("Error in createNote", error.message);
    return badRequest(res, 400, error.message);
  }
};

export const getNotes = async (req, res) => {
  try {
    const { limit, skip } = getPaginationParams(req);

    const notes = await getNotesService({
      query: req.query,
      skip,
      limit,
    });
    return successResponse(res, 200, "Notes fetched successfully", notes);
  } catch (error) {
    console.log("Error in getNotes", error.message);
    return badRequest(res, 400, error.message);
  }
};

export const updateNote = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    const { updated, isModified } = await updateNoteService(id, updateData);
    return successResponse(
      res,
      200,
      isModified ? "Note updated successfully" : "No changes detected",
      updated
    );
  } catch (error) {
    console.log("Error in updateNote:", error.message);
    return badRequest(res, 400, error.message);
  }
};

export const deleteNote = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedNote = await Note.findByIdAndDelete(id);
    if (!deletedNote) {
      return badRequest(res, 404, "Note not found");
    }
    return successResponse(res, 200, "Note deleted successfully", deletedNote);
  } catch (error) {
    console.log("Error in deleteNote:", error.message);
    return badRequest(res, 400, error.message);
  }
};
