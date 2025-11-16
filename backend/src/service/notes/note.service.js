import Note from "../../models/note.model.js";

export const createNoteService = async (data) => {
  const { title, content } = data;

  if (!title || !content) {
    throw new Error("Note title and description are required");
  }

  const note = await Note.create({
    title,
    content,
  });
  return note;
};

export const getNotesService = async ({ query, skip = 0, limit = 15 }) => {
  const { search } = query;

  const filter = {};

  if (typeof search === "string" && search.trim()) {
    filter.$or = [
      { title: { $regex: search.trim(), $options: "i" } },
      { content: { $regex: search.trim(), $options: "i" } }
    ];
  }

  const [notes, total] = await Promise.all([
    Note.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .select("_id title content isPinned createdAt updatedAt")
      .lean(),
    Note.countDocuments(filter),
  ]);
  return {
    total,
    notes,
  };
};

export const updateNoteService = async (id, updateData) => {
  try {
    const existing = await Note.findOne({ _id: id });
    if (!existing) throw new Error("Note not found");

    if (updateData.title) updateData.title = updateData.title.trim();
    if (updateData.content) updateData.content = updateData.content.trim();

    // Simple change detection
    const isModified =
      (updateData.title && updateData.title !== existing.title) ||
      (updateData.content && updateData.content !== existing.content) ||
      (updateData.isPinned !== undefined && updateData.isPinned !== existing.isPinned);

    if (!isModified)
      return { updated: existing, isModified: false };

    const updated = await Note.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updated) throw new Error("Note update failed");
    return { updated, isModified: true };
  } catch (error) {
    throw error;
  }
};
