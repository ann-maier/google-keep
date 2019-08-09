const SAVE_NOTE_SUCCESS = "NOTE HAVE BEEN SAVED!";

interface Note {
  id: string;
  title: string;
  text: string;
  done: boolean;
  archive: boolean;
}

export { Note, SAVE_NOTE_SUCCESS };
