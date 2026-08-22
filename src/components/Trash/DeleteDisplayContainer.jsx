import { fetchWithAuth, clearTokens } from "../../shared/auth/auth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Trash2 } from "lucide-react";
import { PermanentDelete } from "./PermanentDelete";
import { handleDeleted } from "../../components/Home/handleFunction";
import { RestoredNotesCard } from "./RestoredNotesCard";

function DeleteDisplayContainer() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const navigate = useNavigate();
  

  useEffect(() => {
    let isMounted = true;

    (async () => {
      try {
        const response = await fetchWithAuth(
          `${import.meta.env.VITE_API_URL}/api/notes/deleted`,
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
        console.error("Error fetching archive data:", error);
      }
    })();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="flex flex-col gap-4 px-3 py-3 sm:px-4 sm:py-4" >
      {notes.length > 0 ? (
        notes.map((note, index) => {
          return (
            <div
              key={note.id || index}
              className="min-h-40 rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-shadow duration-200 hover:shadow-md"
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <h2 className="text-lg font-bold text-gray-800 break-words">
                  {note.title}
                </h2>
                <div className="flex flex-wrap gap-2">
                  <RestoredNotesCard
                    note={note}
                    onRestore={(restoredNote) =>
                      setNotes((prevNotes) =>
                        prevNotes.filter((n) => n.id !== restoredNote.id)
                      )
                    }
                  />
                  <PermanentDelete
                    noteId={note.id}
                    onDeleted={(deletedNoteId) =>
                      handleDeleted(setNotes, deletedNoteId)
                    }
                  />
                </div>
              </div>
              <p className="mt-2 text-gray-600 whitespace-pre-wrap">
                {note.content}
              </p>
            </div>
          );
        })
      ) : (
        <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 py-10 text-center sm:min-h-[70vh]">
          <Trash2 className="mb-5 h-10 w-10 text-yellow-600" />
          <div>
            <h1 className="mb-4 text-3xl font-bold sm:text-4xl">Trash</h1>
            <p className="text-base text-gray-600 sm:text-lg">This is the Trash page.</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default DeleteDisplayContainer;