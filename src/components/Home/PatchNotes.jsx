import { useState } from "react";
import { fetchWithAuth, clearTokens } from "../../shared/auth/auth";
import { useNavigate } from "react-router-dom";

export const handleSave = async ({noteId, draftTitle, draftContent, setNotes, setEditingId, setDraftTitle, setDraftContent, navigate}) => {
    try {
    const response = await fetchWithAuth(
      `${import.meta.env.VITE_API_URL}/api/notes/${noteId}/edit`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: draftTitle,  
          content: draftContent,
        }),
      },
    );

    const jsonData = await response.json();

    if (!response.ok) {
      if (response.status === 401) {
        clearTokens();
        navigate("/signIn", { replace: true });
        return;
      }
      throw new Error(jsonData?.message || "Failed to update note");
    }

    setNotes((currentNotes) =>
      currentNotes.map((note) =>
        note.id === noteId
          ? { ...note, title: draftTitle, content: draftContent }
          : note,
      ),
    );
    setEditingId(null);
    setDraftTitle("");
    setDraftContent("");
  } catch (error) {
    console.error("Error updating note:", error);
  }
};
