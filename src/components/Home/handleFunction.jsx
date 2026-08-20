export const handleDeleted = (setNotes, deletedNoteId) => {
  setNotes((currentNotes) =>
    currentNotes.filter((note) => note.id !== deletedNoteId),
  );
};

export const handleArchived = (setNotes, archivedNoteId) => {
  setNotes((currentNotes) =>
    currentNotes.filter((note) => note.id !== archivedNoteId),
  );
};
