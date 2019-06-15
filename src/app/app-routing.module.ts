import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { NoteComponent } from "./components/note/note.component";
import { NotesComponent } from "./components/notes/notes.component";
import { ArchiveComponent } from "./components/archive/archive.component";

const routes: Routes = [
  { path: "", component: NotesComponent },
  { path: "note/:id", component: NoteComponent },
  { path: "archive", component: ArchiveComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
