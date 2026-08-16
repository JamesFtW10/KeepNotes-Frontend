import { useState } from "react";
import { fetchWithAuth } from "../../shared/auth/auth";

function PatchNotes({ note, onUpdated }) {
  const [title, setTitle] = useState(note?.title || "");
  const [content, setContent] = useState(note?.content || "");
  const [loading, setLoading] = useState(false);

  const handlePatch = async () => {
    if (!note?.id) return;

    setLoading(true);

    try {
      const response = await fetchWithAuth(`${import.meta.env.VITE_API_URL}/api/notes/${note.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          content,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || "Failed to update note");
      }

      if (onUpdated) {
        onUpdated({ ...note, title, content });
      }
    } catch (error) {
      console.error("Error updating patch notes:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex max-w-md flex-col gap-3 rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
      <input
        type="text"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        className="rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-lg font-bold text-gray-800 outline-none focus:border-blue-300"
      />
      <textarea
        value={content}
        onChange={(event) => setContent(event.target.value)}
        rows={5}
        className="resize-none rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-gray-700 outline-none focus:border-blue-300"
      />
      <button
        type="button"
        onClick={handlePatch}
        disabled={loading}
        className="rounded-md bg-blue-500 px-3 py-2 text-sm font-medium text-white hover:bg-blue-600 disabled:cursor-not-allowed disabled:bg-blue-300"
      >
        {loading ? "Saving..." : "Save Patch"}
      </button>
    </div>
  );
}

export default PatchNotes;
