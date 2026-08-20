import React, { useState } from "react";
import { fetchWithAuth, clearTokens } from "../../shared/auth/auth"; 
import { ArchiveRestore } from 'lucide-react';

export function ArchiveNotesContainer({ noteId, onArchive }) {
 const handleArchive = async () => {
    if (!noteId) return;

    try {
      const response = await fetchWithAuth(
        `${import.meta.env.VITE_API_URL}/api/notes/${noteId}/archive`,
        {
          method: "PATCH",
        },
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.message || "Failed to archive note");
      }

        if (onArchive) {
            onArchive(noteId);
        }

    } catch (error) {
      console.error("❌ Failed to archive note:", error);
    }
    };
    
    return (
        <button
         className="cursor-pointer rounded-md border border-gray-200 px-2 py-1 text-xs font-medium text-gray-600 hover:bg-gray-100"
       onClick={handleArchive}
        >
            <ArchiveRestore />
        </button>   
    );
}

export default ArchiveNotesContainer;