import { SquarePen } from "lucide-react";

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

export function handleEdit({ setEditingId, setDraftTitle, setDraftContent, note }) {
  setEditingId(note.id);
  setDraftTitle(note.title || "");
  setDraftContent(note.content || "");
}

export function EditButton({
  setEditingId,
  setDraftTitle,
  setDraftContent,
  note,
}) {
  return (
    <button
      type="button"
      onClick={() =>
        handleEdit({ setEditingId, setDraftTitle, setDraftContent, note })
      }
      className="cursor-pointer rounded-md border border-gray-200 px-2 py-0 text-xs font-medium text-gray-600 hover:bg-gray-100"
    >
      <SquarePen 
      className="md:h-4 w-4" />
    </button>
  );
}

