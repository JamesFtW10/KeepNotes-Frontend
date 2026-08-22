import { fetchWithAuth } from "../../shared/auth/auth";

export function RestoredNotesCard({ note, onRestore }) {
  const handleRestoreDelete = async () => {
    if (!note.id) return;

    try {
      const response = await fetchWithAuth(
         `${import.meta.env.VITE_API_URL}/api/notes/${note.id}/restoreTemporary-deleted`,
        {
          method: "PATCH",
        },
      );
      if (response.ok) {
        onRestore(note);
      }
    } catch (error) {
      console.error("Error restoring note:", error);
    }
  };

  return (
  <button
    onClick={handleRestoreDelete}
    className="text-green-500 hover:text-green-700 cursor-pointer rounded-md border border-green-200 px-2 py-1 text-xs font-medium hover:bg-gray-100"
  >
    Restore
  </button>
);
}

