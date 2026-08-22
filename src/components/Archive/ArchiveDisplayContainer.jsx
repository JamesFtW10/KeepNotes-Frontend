import { fetchWithAuth } from "../../shared/auth/auth";
import { useEffect, React, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArchiveRestore } from "lucide-react";
import { UnArchiveNotesCard } from "./UnArchiveNotesCard";

export function ArchiveDisplayContainer() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;

    (async () => {
      try {
        const response = await fetchWithAuth(
          `${import.meta.env.VITE_API_URL}/api/notes/archived`,
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
    <div className="p-4 flex flex-col gap-4">
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
                  <UnArchiveNotesCard
                    note={note}
                    onUnarchive={(unarchivedNote) =>
                      setNotes((prevNotes) =>
                        prevNotes.filter((n) => n.id !== unarchivedNote.id),
                      )
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
          <ArchiveRestore className="mt-[-240px] h-10 w-10 text-yellow-600 mb-[20px]" />
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Archive</h1>
            <p className="text-lg text-gray-600">This is the Archive page.</p>
          </div>
        </div>
      )}
    </div>
  );
}
