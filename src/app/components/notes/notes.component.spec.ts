import { FormsModule } from "@angular/forms";
import { APP_BASE_HREF } from "@angular/common";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { of } from "rxjs";

import { AppRoutingModule } from "src/app/app-routing.module";
import { SearchNotesPipe } from "src/app/pipes/search-notes.pipe";
import { NotesService } from "src/app/services/notes/notes.service";

import { NotesComponent } from "./notes.component";
import { NoteComponent } from "../note/note.component";
import { ArchiveComponent } from "../archive/archive.component";

describe("NotesComponent", () => {
  const mockNote = {
    id: "TEST_ID_2",
    title: "TITLE 2",
    text: "TEXT 2",
    done: false,
    archive: false
  };
  const mockNotes = [
    {
      id: "TEST_ID",
      title: "TITLE",
      text: "TEXT",
      done: false,
      archive: false
    }
  ];
  let component: NotesComponent;
  let notesService: Partial<NotesService> = {
    getNotes: jasmine.createSpy("getNotes").and.returnValue(of(mockNotes)),
    setNote: jasmine.createSpy("setNote").and.returnValue(of(mockNote)),
    toggleNote: jasmine.createSpy("toggleNote").and.returnValue(of(mockNote)),
    archiveNote: jasmine.createSpy("removeNote").and.returnValue(of(mockNote)),
    removeNote: jasmine.createSpy("removeNote").and.returnValue(of(mockNote))
  };
  let fixture: ComponentFixture<NotesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, AppRoutingModule],
      declarations: [
        NotesComponent,
        NoteComponent,
        ArchiveComponent,
        SearchNotesPipe
      ],
      providers: [
        { provide: NotesService, useValue: notesService },
        { provide: APP_BASE_HREF, useValue: "/" }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    notesService = TestBed.get(NotesService);
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  describe("get notes", () => {
    beforeEach(() => {
      component.ngOnInit();
    });

    it("should get notes from a server", () => {
      expect(notesService.getNotes).toHaveBeenCalled();
    });

    it("should set retrieved notes", () => {
      expect(component.notes).toEqual(mockNotes);
    });
  });

  it("should add a note", () => {
    component.addNote("TITLE 2", "TEXT 2");
    expect(notesService.setNote).toHaveBeenCalled();
    expect(component.notes.length).toBe(2);
  });

  it("should toggle a note", () => {
    component.toggleNote("TEST_ID", false);
    expect(notesService.toggleNote).toHaveBeenCalledWith("TEST_ID", false);
    expect(component.notes[0].done).toBeTruthy();
  });

  it("should archive a note", () => {
    component.archiveNote("TEST_ID");
    expect(notesService.archiveNote).toHaveBeenCalledWith("TEST_ID");
    expect(component.notes).toEqual([]);
  });

  it("should remove a note", () => {
    component.removeNote("TEST_ID");
    expect(notesService.removeNote).toHaveBeenCalledWith("TEST_ID");
    expect(component.notes).toEqual([]);
  });
});
