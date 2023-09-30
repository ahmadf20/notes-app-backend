export interface Note {
  title: string;
  id: string;
  createdAt: string;
  updatedAt: string;
  tags: string[];
  body: string;
}

export const notes: Note[] = [];
