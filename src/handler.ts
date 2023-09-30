import type { Request, ResponseObject, ResponseToolkit } from "@hapi/hapi";

import { type Note, notes } from "./notes";
import { randomUUID } from "crypto";

type AddNotePayload = Pick<Note, "body" | "tags" | "title">;

export const addNoteHandler = async (
  request: Request,
  h: ResponseToolkit
): Promise<ResponseObject> => {
  const { body, tags, title } = request.payload as AddNotePayload;

  const id = randomUUID();

  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;

  notes.push({
    body,
    id,
    tags,
    title,
    createdAt,
    updatedAt,
  });

  const isSuccess = Boolean(notes.find((note) => note.id === id));

  if (isSuccess) {
    const response = h.response({
      status: "success",
      message: "Note created",
      data: {
        noteId: id,
      },
    });

    response.code(201);
    return response;
  }

  const response = h.response({
    status: "failed",
    message: "Failed to create note",
  });

  response.code(500);
  return response;
};

export const getNotesHandler = async (
  request: Request,
  h: ResponseToolkit
): Promise<ResponseObject> => {
  const response = h.response({
    status: "success",
    data: {
      notes,
    },
  });

  response.code(200);
  return response;
};

export const getNoteByIdHandler = async (
  request: Request,
  h: ResponseToolkit
): Promise<ResponseObject> => {
  const note = notes.find((note) => note.id === request.params.id);

  if (note === undefined) {
    const response = h.response({
      status: "failed",
      message: "Note not found",
    });

    response.code(404);
    return response;
  }

  const response = h.response({
    status: "success",
    data: {
      note,
    },
  });
  response.code(200);
  return response;
};

export const updateNoteByIdHandler = async (
  request: Request,
  h: ResponseToolkit
): Promise<ResponseObject> => {
  const note = notes.find((note) => note.id === request.params.id);

  if (note === undefined) {
    const response = h.response({
      status: "failed",
      message: "Note not found",
    });

    response.code(404);
    return response;
  }

  const { body, tags, title } = request.payload as AddNotePayload;

  note.body = body;
  note.tags = tags;
  note.title = title;
  note.updatedAt = new Date().toISOString();

  const response = h.response({
    status: "success",
    message: "Note updated",
    data: {
      note,
    },
  });
  response.code(200);
  return response;
};

export const deleteNoteByIdHandler = async (
  request: Request,
  h: ResponseToolkit
): Promise<ResponseObject> => {
  const noteIndex = notes.findIndex((note) => note.id === request.params.id);

  if (noteIndex === -1) {
    const response = h.response({
      status: "failed",
      message: "Unable to delete note. Note id not found",
    });

    response.code(404);
    return response;
  }

  notes.splice(noteIndex, 1);

  const response = h.response({
    status: "success",
    message: "Note has been deleted",
  });

  response.code(200);
  return response;
};
