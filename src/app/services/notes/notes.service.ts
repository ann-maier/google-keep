import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Note } from "src/app/components/notes/notes.interfaces";
import { Observable } from "rxjs";

const ARCHIVED_PARAMS = { key: "archive", value: true };
export const API_URL = "/notes";

export const NOT_ARCHIVED_API_URL = `${API_URL}?${
  ARCHIVED_PARAMS.key
}=${!ARCHIVED_PARAMS.value}`;

export const ARCHIVED_API_URL = `${API_URL}?${ARCHIVED_PARAMS.key}=${
  ARCHIVED_PARAMS.value
}`;

@Injectable({
  providedIn: "root"
})
export class NotesService {
  constructor(private http: HttpClient) {}

  getNotes(): Observable<Note[]> {
    return this.http.get<Note[]>(NOT_ARCHIVED_API_URL);
  }

  getArchivedNotes(): Observable<Note[]> {
    return this.http.get<Note[]>(ARCHIVED_API_URL);
  }

  getNote(id: string): Observable<Note> {
    return this.http.get<Note>(`${API_URL}/${id}`);
  }

  setNote(note: Note): Observable<Note> {
    return this.http.post<Note>(API_URL, note);
  }

  changeNote({ id, title, text }: Note): Observable<Note> {
    const body = { title, text };
    return this.http.patch<Note>(`${API_URL}/${id}`, body);
  }

  archiveNote(id: string): Observable<Note> {
    const body = { archive: true };
    return this.http.patch<Note>(`${API_URL}/${id}`, body);
  }

  toggleNote(id: string, done: boolean): Observable<Note> {
    const body = { done: !done };
    return this.http.patch<Note>(`${API_URL}/${id}`, body);
  }

  removeNote(id: string): Observable<Note> {
    return this.http.delete<Note>(`${API_URL}/${id}`);
  }

  removeNoteFromArchive(id: string): Observable<Note> {
    const body = { archive: false };
    return this.http.patch<Note>(`${API_URL}/${id}`, body);
  }
}
