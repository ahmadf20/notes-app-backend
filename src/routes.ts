import type { ServerRoute } from "@hapi/hapi";
import {
  addNoteHandler,
  deleteNoteByIdHandler,
  getNoteByIdHandler,
  getNotesHandler,
  updateNoteByIdHandler,
} from "./handler";

export const routes: ServerRoute[] = [
  {
    method: "POST",
    path: "/notes",
    handler: addNoteHandler,
  },
  {
    method: "GET",
    path: "/notes",
    handler: getNotesHandler,
  },
  {
    method: "GET",
    path: "/notes/{id}",
    handler: getNoteByIdHandler,
  },
  {
    method: "PUT",
    path: "/notes/{id}",
    handler: updateNoteByIdHandler,
  },

  {
    method: "DELETE",
    path: "/notes/{id}",
    handler: deleteNoteByIdHandler,
  },
];
