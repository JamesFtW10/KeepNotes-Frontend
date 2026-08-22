import { fetchWithAuth } from '../../shared/auth/auth';
import { Trash2 } from 'lucide-react';

function DeleteNotesContainer({ noteId, onDeleted }) {
  const handleDelete = async () => {
    if (!noteId) return;

    try {
      const response = await fetchWithAuth(
        `${import.meta.env.VITE_API_URL}/api/notes/${noteId}/temporary-delete`,
        {
          method: "PATCH",
        },
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.message || "Failed to delete note");
      }

      if (onDeleted) {
        onDeleted(noteId);
      }
    } catch (error) {
      console.error("❌ Failed to delete note:", error);
    }
  };

  return (
    <button
      type="button"
      onClick={handleDelete}
      className="cursor-pointer rounded-md border border-gray-200 px-2 py-1 text-xs font-medium text-gray-600 hover:bg-gray-100"
    >
      <Trash2 className="md:h-4 w-4"/>
    </button>
  );
}

export default DeleteNotesContainer;