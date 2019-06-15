import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { of } from "rxjs/internal/observable/of";

import { ArchiveComponent } from "./archive.component";
import { NotesService } from "src/app/services/notes/notes.service";

describe("ArchiveComponent", () => {
  const mockNotes = [
    {
      id: "TEST_ID",
      title: "TITLE",
      text: "TEXT",
      done: false,
      archive: false
    }
  ];

  let component: ArchiveComponent;
  let fixture: ComponentFixture<ArchiveComponent>;
  let notesService: Partial<NotesService> = {
    getArchivedNotes: jasmine
      .createSpy("getArchivedNotes")
      .and.returnValue(of(mockNotes)),
    removeNoteFromArchive: jasmine
      .createSpy("removeNoteFromArchive")
      .and.returnValue(of(mockNotes))
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ArchiveComponent],
      providers: [{ provide: NotesService, useValue: notesService }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArchiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should get archived notes", () => {
    component.ngOnInit();
    expect(notesService.getArchivedNotes).toHaveBeenCalled();
    expect(component.notes).toEqual(mockNotes);
  });

  it("should remove note from archive", () => {
    component.removeNoteFromArchive("TEST_ID");
    expect(notesService.removeNoteFromArchive).toHaveBeenCalledWith("TEST_ID");
    expect(component.notes).toEqual([]);
  });
});
