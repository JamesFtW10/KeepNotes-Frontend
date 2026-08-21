import TakeNoteInput from "../components/Home/TakeNoteInput";
import AddNotesContainer from "../components/Home/AddNotesContainer";
import { useState } from "react";

function Home() {
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  return (
    <div>
      <TakeNoteInput setRefreshTrigger={setRefreshTrigger} />
        <div className="mx-auto w-full max-w-[620px]">
        <h3 className="text-gray-500 text-xs font-semibold uppercase tracking-wider mb-3 px-1">Ang imohang mga nota:</h3>
        <AddNotesContainer refreshTrigger={refreshTrigger} />
      </div>
    </div>
  );
}

export default Home;
