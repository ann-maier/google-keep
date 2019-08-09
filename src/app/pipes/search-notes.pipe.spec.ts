import { SearchNotesPipe } from "./search-notes.pipe";

describe("SearchNotesPipe", () => {
  let pipe;

  beforeEach(() => {
    pipe = new SearchNotesPipe();
  });

  it("create an instance", () => {
    expect(pipe).toBeTruthy();
  });
});
