import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { NotesService } from "src/app/services/notes/notes.service";

import { Note, SAVE_NOTE_SUCCESS } from "../notes/notes.interfaces";

@Component({
  selector: "app-note",
  templateUrl: "./note.component.html"
})
export class NoteComponent implements OnInit {
  note: Note;

  constructor(
    private route: ActivatedRoute,
    private notesService: NotesService
  ) {}

  ngOnInit() {
    this.getNote();
  }

  getNote(): void {
    const id = this.route.snapshot.paramMap.get("id");
    this.notesService.getNote(id).subscribe(note => (this.note = note));
  }

  saveNote(): void {
    this.notesService
      .changeNote(this.note)
      .subscribe(_ => alert(SAVE_NOTE_SUCCESS));
  }
}
