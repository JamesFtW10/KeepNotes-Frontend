import { useEffect, useState } from "react";
import { fetchWithAuth, clearTokens } from "../../shared/auth/auth";
import { useNavigate } from "react-router-dom";
import { handleSave } from "../EditLabels/PatchNotes";
import { editCard, containerCard } from "./HomeCard";

export function AddNotesContainer({ refreshTrigger = 0 }) {
  const [notes, setNotes] = useState([]);
  const [draftTitle, setDraftTitle] = useState("");
  const [draftContent, setDraftContent] = useState("");
  const [editingId, setEditingId] = useState(null);
  const navigate = useNavigate();

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
                editCard(note, draftTitle, draftContent, setDraftTitle, setDraftContent, setNotes, setEditingId, navigate)
              ) : (
                containerCard(note, setEditingId, setDraftTitle, setDraftContent, setNotes)
              )}
            </div>
          );
        })
      ) : (
        <p className="text-gray-400 text-sm text-center py-4">
          Walang nakitang nota.
        </p>
      )}
    </div>
  );
}

export default AddNotesContainer;