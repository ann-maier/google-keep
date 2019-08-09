import { Component, OnInit } from "@angular/core";

import { NotesService } from "src/app/services/notes/notes.service";

import { Note } from "../notes/notes.interfaces";

@Component({
  selector: "app-archive",
  templateUrl: "./archive.component.html"
})
export class ArchiveComponent implements OnInit {
  notes: Note[];

  constructor(private notesService: NotesService) {}

  ngOnInit() {
    this.notesService
      .getArchivedNotes()
      .subscribe(notes => (this.notes = notes));
  }

  removeNoteFromArchive(id: string): void {
    this.notesService
      .removeNoteFromArchive(id)
      .subscribe(_ => (this.notes = this.notes.filter(note => note.id !== id)));
  }
}
