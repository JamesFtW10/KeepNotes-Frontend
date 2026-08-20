import { useEffect, useState } from "react";
import { fetchWithAuth, clearTokens } from "../../shared/auth/auth";
import { useNavigate } from "react-router-dom";
import DeleteNotesContainer from "./DeleteNotesContainer";
import {ArchiveNotesContainer} from "./ArchiveNotes";
import { handleDeleted, handleArchived } from "./handleFunction";
import { handleSave } from "./PatchNotes";
import { SquarePen } from 'lucide-react';

export function AddNotesContainer({ refreshTrigger = 0}) {
  const [notes, setNotes] = useState([]);
  const [draftTitle, setDraftTitle] = useState("");
  const [draftContent, setDraftContent] = useState("");
  const [editingId, setEditingId] = useState(null);
  const navigate = useNavigate();



  const handleEdit = (note) => {
    setEditingId(note.id);
    setDraftTitle(note.title || "");
    setDraftContent(note.content || "");
  };

  
  useEffect(() => {
    let isMounted = true;

    (async () => {
      try {
        const response = await fetchWithAuth(
          `${import.meta.env.VITE_API_URL}/api/notes`,
        );
        if (!response.ok) {
          if (response.status === 401) {
            clearTokens();
            navigate("/signIn", { replace: true });
            return;
          }
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const jsonData = await response.json();

        if (
          isMounted &&
          jsonData &&
          jsonData.success &&
          Array.isArray(jsonData.data)
        ) {
          setNotes(jsonData.data.slice().reverse());
        }
      } catch (error) {
        console.error("Error fetching notes data:", error);
      }
    })();

    return () => {
      isMounted = false;
    };
  }, [refreshTrigger, navigate]);

  return (
    <div className="p-4 flex flex-col gap-4">
      {notes.length > 0 ? (
        notes.map((note, index) => {
          const isEditing = editingId === note.id;
          return (
            <div
              key={note.id || index}
              className="p-4 rounded-lg border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow duration-200 min-h-40"
            >
              {isEditing ? (
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
                      className="rounded-md bg-blue-500 px-3 py-2 text-sm font-medium text-white hover:bg-blue-600"
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditingId(null)}
                      className="rounded-md border border-gray-200 px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex items-start justify-between gap-3">
                    <h2 className="text-lg font-bold text-gray-800">
                      {note.title}
                    </h2>


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

                      <button
                        type="button"
                        onClick={() => handleEdit(note)}
                        className="cursor-pointer rounded-md border border-gray-200 px-2 py-1 text-xs font-medium text-gray-600 hover:bg-gray-100"
                      >
                        <SquarePen />
                      </button>
                    </div>
                  </div>
                  <p className="mt-2 text-gray-600 whitespace-pre-wrap">
                    {note.content}
                  </p>
                </>
              )}
            </div>
          );
        })
      ) : (
        <p className="text-gray-400 text-sm text-center py-4">
          Walang nakitang notes.
        </p>
      )}
    </div>
  );
}

export default AddNotesContainer;
