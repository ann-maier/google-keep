import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { BrowserModule } from "@angular/platform-browser";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { AppComponent } from "./components/app/app.component";
import { NotesComponent } from "./components/notes/notes.component";
import { NoteComponent } from "./components/note/note.component";
import { ArchiveComponent } from "./components/archive/archive.component";

import { SearchNotesPipe } from "./pipes/search-notes.pipe";
import { AppRoutingModule } from "./app-routing.module";

@NgModule({
  declarations: [
    AppComponent,
    NotesComponent,
    NoteComponent,
    SearchNotesPipe,
    ArchiveComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    FormsModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
