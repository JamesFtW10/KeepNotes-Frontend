import { Pen } from "lucide-react";

function EditLabels() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Pen className="mt-[-240px] h-40 w-40 text-yellow-600 mb-[20px]" />
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">EditLabels</h1>
        <p className="text-lg text-gray-600">This is the EditLabels page.</p>
      </div>
    </div>
  );
}

export default EditLabels;
