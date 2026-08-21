import DeleteNotesContainer from "../Trash/DeleteNotesContainer";
import { ArchiveNotesContainer } from "../Archive/ArchiveNotes";
import { handleDeleted, handleArchived, EditButton } from "./handleFunction";

export function editCard(note, draftTitle, draftContent, setDraftTitle, setDraftContent, setNotes, setEditingId, navigate) {
  return (
    <div>
      <input
        type="text"
        value={draftTitle}
        onChange={(event) => setDraftTitle(event.target.value)}
        className="w-full rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-lg font-bold text-gray-800 outline-none focus:border-blue-300"
      />
      <textarea
        value={draftContent}
        onChange={(event) => setDraftContent(event.target.value)}
        rows={5}
        className="mt-3 w-full resize-none rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-gray-700 outline-none focus:border-blue-300"
      />
      <div className="mt-3 flex gap-2">
        <button
          type="button"
          onClick={() =>
            handleSave({
              noteId: note.id,
              draftTitle,
              draftContent,
              setNotes,
              setEditingId,
              setDraftTitle,
              setDraftContent,
              navigate,
            })
          }
          className="cursor-pointer rounded-md bg-blue-500 px-3 py-2 text-sm font-medium text-white hover:bg-blue-600"
        >
          Save
        </button>
        <button
          type="button"
          onClick={() => setEditingId(null)}
          className="cursor-pointer rounded-md border border-gray-200 px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export function containerCard(note, setEditingId, setDraftTitle, setDraftContent, setNotes, draftTitle, draftContent, navigate) {
  return (
    <>
      <div className="flex items-start justify-between gap-3">
        <h2 className="text-lg font-bold text-gray-800">{note.title}</h2>

        <div className="flex gap-2">
          <ArchiveNotesContainer
            noteId={note.id}
            onArchive={(archivedNoteId) =>
              handleArchived(setNotes, archivedNoteId)
            }
          />

          <DeleteNotesContainer
            noteId={note.id}
            onDeleted={(deletedNoteId) =>
              handleDeleted(setNotes, deletedNoteId)
            }
          />

          <EditButton
            setEditingId={setEditingId}
            setDraftTitle={setDraftTitle}
            setDraftContent={setDraftContent}
            note={note}
          />
        </div>
      </div>
      <p className="mt-2 text-gray-600 whitespace-pre-wrap">{note.content}</p>
    </>
  );
}
