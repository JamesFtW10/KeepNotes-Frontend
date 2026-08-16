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
          className="font-bold w-full resize-none rounded-lg bg-transparent px-4 py-3 pr-36 text-[15px] text-gray-800 outline-none placeholder:text-gray-500"
        />
      )}
      <textarea
        rows={1}
        placeholder="Take a note..."
        className="w-full resize-none rounded-lg bg-transparent px-4 py-3 pr-36 text-[15px] text-gray-800 outline-none placeholder:text-gray-500"
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
    <div className="flex flex-row justify-between border-t border-gray-100">
      <div className="border-t border-gray-100 px-4 py-2 text-[5px] text-gray-400">
        {divBottomIcon.map((icon, index) => (
          <button
            key={index}
            type="button"
            className="rounded-full p-2 cursor-pointer text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600 focus:outline-none"
          >
            {icon}
          </button>
        ))}
      </div>
      
      <div className="flex border-t border-gray-100 px-4 py-2 text-[5px] text-gray-400">
        <button
          onClick={onSubmit}
          type="button"
          className="cursor-pointer ml-2 px-2 py-2 text-[14px] font-medium hover:bg-gray-300 hover:text-gray-600 border border-gray-300 rounded-md"
        >
          Submit
        </button>
        <button
          onClick={onCancel}
          type="button"
          className="cursor-pointer ml-2 px-4 py-2 text-[14px] font-medium hover:bg-gray-300 hover:text-gray-600 border border-gray-300 rounded-md"
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
export function TakeNoteInput() {
  const [note, setNote] = useState("");
  const [title, setTitle] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const isExpanded = isFocused || note.length > 0;

  const handleSubmit = async (event) => {
    if (event) event.preventDefault();
    try {
      const response = await fetchWithAuth(`${import.meta.env.VITE_API_URL}/api/post`, {
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
    <div className="flex w-full flex-col gap-8 px-4 py-6 sm:px-6 lg:px-8">
      
      <div className="mx-auto w-full max-w-[620px]">
        <div className="relative rounded-lg border border-gray-200 bg-white shadow-[0_1px_4px_rgba(60,64,67,0.15)]">
          
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

      <div className="mx-auto w-full max-w-[620px]">
        <h3 className="text-gray-500 text-xs font-semibold uppercase tracking-wider mb-3 px-1">Ang imohang mga nota:</h3>
        <AddNotesContainer refreshTrigger={refreshTrigger} />
      </div>

    </div>
  );
}

export default TakeNoteInput;
