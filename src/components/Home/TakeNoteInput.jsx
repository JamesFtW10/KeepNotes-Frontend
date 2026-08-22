import { useState } from "react";
import {
  ALargeSmall, Palette, BellPlus,
  UserPlus, ImagePlus, ArchiveRestore, EllipsisVertical, Undo2, Redo2
} from "lucide-react";

import AddNotesContainer from "./AddNotesContainer";
import { fetchWithAuth } from "../../shared/auth/auth";

// ==========================================
// 1. CHILD COMPONENT: NoteFields
// ==========================================
function NoteFields({ title, setTitle, note, setNote, isExpanded, setIsFocused, onSubmit }) { 
 
  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      onSubmit(event); 
    }
  };

  return (
    <>
      {isExpanded && (
        <input
          type="text"
          placeholder="Title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full rounded-lg bg-transparent px-4 py-3 text-[15px] font-bold text-gray-800 outline-none placeholder:text-gray-500 sm:pr-36"
        />
      )}
      <textarea
        rows={1}
        placeholder="Take a note..."
        className="w-full resize-none rounded-lg bg-transparent px-4 py-3 text-[15px] text-gray-800 outline-none placeholder:text-gray-500 sm:pr-36"
        value={note}
        onChange={(e) => setNote(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setTimeout(() => setIsFocused(false), 200)}
        onKeyDown={handleKeyDown}
      />
    </>
  );
}

// ==========================================
// 2. CHILD COMPONENT: BottomActionBar
// ==========================================
function BottomActionBar({ onCancel, onSubmit }) {
  const divBottomIcon = [
    <ALargeSmall />, <Palette />, <BellPlus />, <UserPlus />,
    <ImagePlus />, <ArchiveRestore />, <EllipsisVertical />, <Undo2 />, <Redo2 />
  ];

  return (
    <div className="flex flex-col gap-2 border-t border-gray-100 px-3 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-4">
      <div className="flex flex-wrap items-center gap-1 text-[5px] text-gray-400">
        {divBottomIcon.map((icon, index) => (
          <button
            key={index}
            type="button"
            className="cursor-pointer rounded-full p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600 focus:outline-none"
          >
            {icon}
          </button>
        ))}
      </div>
      
      <div className="flex flex-col gap-2 text-[5px] text-gray-400 sm:flex-row">
        <button
          onClick={onSubmit}
          type="button"
          className="cursor-pointer rounded-md border border-gray-300 px-4 py-2 text-[14px] font-medium hover:bg-gray-300 hover:text-gray-600 sm:px-3"
        >
          Submit
        </button>
        <button
          onClick={onCancel}
          type="button"
          className="cursor-pointer rounded-md border border-gray-300 px-4 py-2 text-[14px] font-medium hover:bg-gray-300 hover:text-gray-600 sm:px-3"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

// ==========================================
// 3. PARENT COMPONENT: Main Container
// ==========================================
export function TakeNoteInput({setRefreshTrigger}) {
  const [note, setNote] = useState("");
  const [title, setTitle] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const isExpanded = isFocused || note.length > 0;

  const handleSubmit = async (event) => {
    if (event) event.preventDefault();
    try {
      const response = await fetchWithAuth(`${import.meta.env.VITE_API_URL}/api/notes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, content: note }),
      });
      const data = await response.json();
      if (!response.ok) {
        if (response.status === 401) {
          window.location.href = "/signIn";
          return;
        }
        throw new Error(data?.message || "Failed to submit note");
      }
      setNote("");
      setTitle("");
      setRefreshTrigger((currentValue) => currentValue + 1);
      console.log("Response from backend:", data);
      
    } catch (error) {
      console.error("Error submitting note:", error);
    }
  };

  const handleCancel = () => {
    setNote("");
    setTitle("");
    setIsFocused(false);
  };

  return (
    <div className="flex w-full flex-col gap-6 px-3 py-4 sm:px-6 lg:px-8">
      
      <div className="mx-auto w-full max-w-[720px]">
        <div className="relative rounded-xl border border-gray-200 bg-white shadow-[0_1px_4px_rgba(60,64,67,0.15)]">
          
          <NoteFields 
            title={title}
            setTitle={setTitle}
            note={note}
            setNote={setNote}
            isExpanded={isExpanded}
            setIsFocused={setIsFocused}
            onSubmit={handleSubmit}
          />

          {isExpanded && (
            <BottomActionBar 
              onCancel={handleCancel}
              onSubmit={handleSubmit}
            />
          )}

        </div>
      </div>
    </div>
  );
}

export default TakeNoteInput;
