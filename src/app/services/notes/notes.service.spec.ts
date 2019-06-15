import { TestBed, getTestBed } from "@angular/core/testing";
import {
  HttpClientTestingModule,
  HttpTestingController
} from "@angular/common/http/testing";

import { Note } from "src/app/components/notes/notes.interfaces";
import {
  NotesService,
  API_URL,
  NOT_ARCHIVED_API_URL,
  ARCHIVED_API_URL
} from "./notes.service";

describe("NotesService", () => {
  let injector: TestBed;
  let service: NotesService;
  let httpMock: HttpTestingController;

  const mockNote: Note = {
    id: "TEST_ID",
    title: "TITLE",
    text: "TEXT",
    done: true,
    archive: false
  };
  const mockNotes: Note[] = [mockNote];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [NotesService]
    });

    injector = getTestBed();
    service = injector.get(NotesService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("should get notes", () => {
    service.getNotes().subscribe();

    const req = httpMock.expectOne(NOT_ARCHIVED_API_URL);
    expect(req.request.method).toBe("GET");
    req.flush(mockNotes);
  });

  it("should get archived notes", () => {
    service.getArchivedNotes().subscribe();

    const req = httpMock.expectOne(ARCHIVED_API_URL);
    expect(req.request.method).toBe("GET");
    req.flush(mockNotes);
  });

  it("should get a note", () => {
    service.getNote(mockNote.id).subscribe();

    const req = httpMock.expectOne(`${API_URL}/${mockNote.id}`);
    expect(req.request.method).toBe("GET");
    req.flush(mockNotes);
  });

  it("should set a note", () => {
    service.setNote(mockNote).subscribe();

    const req = httpMock.expectOne(API_URL);
    expect(req.request.method).toBe("POST");
    req.flush(mockNote);
  });

  it("should change a note", () => {
    service.changeNote(mockNote).subscribe();

    const req = httpMock.expectOne(`${API_URL}/${mockNote.id}`);
    expect(req.request.method).toBe("PATCH");
    req.flush(mockNote);
  });

  it("should archive a note", () => {
    service.archiveNote(mockNote.id).subscribe();

    const req = httpMock.expectOne(`${API_URL}/${mockNote.id}`);
    expect(req.request.method).toBe("PATCH");
    req.flush(mockNote);
  });

  it("should toggle a note", () => {
    service.toggleNote(mockNote.id, false).subscribe();

    const req = httpMock.expectOne(`${API_URL}/${mockNote.id}`);
    expect(req.request.method).toBe("PATCH");
    req.flush(mockNote);
  });

  it("should delete a note", () => {
    service.removeNote(mockNote.id).subscribe();

    const req = httpMock.expectOne(`${API_URL}/${mockNote.id}`);
    expect(req.request.method).toBe("DELETE");
    req.flush(mockNote);
  });

  it("should delete a note from archive", () => {
    service.removeNoteFromArchive(mockNote.id).subscribe();

    const req = httpMock.expectOne(`${API_URL}/${mockNote.id}`);
    expect(req.request.method).toBe("PATCH");
    req.flush(mockNote);
  });
});
