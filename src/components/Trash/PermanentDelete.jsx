import { fetchWithAuth } from "../../shared/auth/auth";

export function PermanentDelete({ noteId, onDeleted }) {
  const handlePermanentDelete = async () => {
    if (!noteId) return;

    try {
      const response = await fetchWithAuth(
        `${import.meta.env.VITE_API_URL}/api/notes/${noteId}/permanent-delete`,
        {
          method: "DELETE",
        },
      );

      if (onDeleted) {
        onDeleted(noteId);
      }
    } catch (error) {
      console.error("Error deleting note permanently:", error);
    }
  };

  return (
    <button
      onClick={handlePermanentDelete}
      className="text-red-500 hover:text-red-700 cursor-pointer rounded-md border border-red-200 px-2 py-1 text-xs font-medium hover:bg-gray-100"
    >
      Permanent Delete
    </button>
  );
}
