import { ArchiveRestore } from "lucide-react";

function Archive() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <ArchiveRestore className="mt-[-240px] h-40 w-40 text-yellow-600 mb-[20px]" />
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Archive</h1>
        <p className="text-lg text-gray-600">This is the Archive page.</p>
      </div>
    </div>
  );
}

export default Archive;
