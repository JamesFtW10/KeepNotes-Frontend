import TakeNoteInput from "../components/Home/TakeNoteInput";
import AddNotesContainer from "../components/Home/AddNotesContainer";
import { useState } from "react";

function Home() {
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  return (
    <div className="w-full px-3 py-4 sm:px-6 lg:px-8">
      <TakeNoteInput setRefreshTrigger={setRefreshTrigger} />
      <div className="mx-auto w-full max-w-[720px]">
        <h3 className="mb-3 px-1 text-xs font-semibold uppercase tracking-wider text-gray-500">Ang imohang mga nota:</h3>
        <AddNotesContainer refreshTrigger={refreshTrigger} />
      </div>
    </div>
  );
}

export default Home;
