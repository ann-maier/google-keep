import { Component, OnInit } from "@angular/core";

import { NotesService } from "../../services/notes/notes.service";

import { Note } from "./notes.interfaces";

@Component({
  selector: "app-notes",
  templateUrl: "./notes.component.html",
  styleUrls: ["./notes.component.css"]
})
export class NotesComponent implements OnInit {
  notes: Note[];

  constructor(private notesService: NotesService) {}

  ngOnInit() {
    this.notesService.getNotes().subscribe(notes => {
      this.notes = notes;
    });
  }

  addNote(title: string, text: string) {
    const id = new Date().toJSON();
    const note = { id, title, text, done: false, archive: false };
    this.notesService
      .setNote(note)
      .subscribe((newNote: Note) => (this.notes = [...this.notes, newNote]));
  }

  toggleNote(id: string, done: boolean) {
    this.notesService
      .toggleNote(id, done)
      .subscribe(
        _ =>
          (this.notes = this.notes.map(note =>
            note.id === id ? { ...note, done: !done } : note
          ))
      );
  }

  archiveNote(id: string) {
    this.notesService
      .archiveNote(id)
      .subscribe(_ => (this.notes = this.notes.filter(note => note.id !== id)));
  }

  removeNote(id: string) {
    this.notesService
      .removeNote(id)
      .subscribe(_ => (this.notes = this.notes.filter(note => note.id !== id)));
  }
}
