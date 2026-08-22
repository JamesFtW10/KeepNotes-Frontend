import { fetchWithAuth } from "../../shared/auth/auth";
import { useEffect, React, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Trash2 } from "lucide-react";
import { PermanentDelete } from "./PermanentDelete";
import { handleDeleted } from "../../components/Home/handleFunction";
import { clearTokens } from "../../shared/auth/auth";
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
    <div className="p-4 flex flex-col gap-4" >
      {notes.length > 0 ? (
        notes.map((note, index) => {
          return (
            <div
              key={note.id || index}
              className="p-4 rounded-lg border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow duration-200 min-h-40"
            >
              <div className="flex items-start justify-between gap-3">
                <h2 className="text-lg font-bold text-gray-800">
                  {note.title}
                </h2>
                <div className="flex gap-2">
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
        <div className="flex flex-col items-center justify-center h-screen">
          <Trash2 className="mt-[-240px] h-10 w-10 text-yellow-600 mb-[20px]" />
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Trash</h1>
            <p className="text-lg text-gray-600">This is the Trash page.</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default DeleteDisplayContainer;