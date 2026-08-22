import { fetchWithAuth } from "../../shared/auth/auth";

export function UnArchiveNotesCard({ note, onUnarchive }) {
  const handleUnarchive = async () => {
    if (!note.id) return;

    try {
      const response = await fetchWithAuth(
        `${import.meta.env.VITE_API_URL}/api/notes/${note.id}/unarchive`,
        {
          method: "PATCH",
        },
      );
      if (response.ok) {
        onUnarchive(note);
      }
    } catch (error) {
      console.error("Error unarchiving note:", error);
    }
  };
  return (
    <button
      onClick={handleUnarchive}
      className="text-blue-500 hover:text-blue-700 cursor-pointer rounded-md border border-blue-200 px-2 py-1 text-xs font-medium hover:bg-gray-100"
    >
      Unarchive
    </button>
  );
}
