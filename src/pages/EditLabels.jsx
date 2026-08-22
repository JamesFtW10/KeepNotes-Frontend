import { Pen } from "lucide-react";

function EditLabels() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 py-10 text-center">
      <Pen className="mb-5 h-10 w-10 text-yellow-600" />
      <div>
        <h1 className="mb-4 text-3xl font-bold sm:text-4xl">EditLabels</h1>
        <p className="text-base text-gray-600 sm:text-lg">This is the EditLabels page.</p>
      </div>
    </div>
  );
}

export default EditLabels;
