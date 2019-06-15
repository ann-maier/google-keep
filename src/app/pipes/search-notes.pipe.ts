import { Pipe, PipeTransform } from "@angular/core";

import { Note } from "../components/notes/notes.interfaces";

@Pipe({
  name: "search"
})
export class SearchNotesPipe implements PipeTransform {
  transform(notes: Note[], searchText: string): Note[] {
    if (!notes) return [];
    if (!searchText) return notes;
    searchText = searchText.toLowerCase();
    return notes.filter(
      notes =>
        notes.title.toLowerCase().includes(searchText) ||
        notes.text.toLowerCase().includes(searchText)
    );
  }
}
