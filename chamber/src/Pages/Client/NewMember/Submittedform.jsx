import React from "react";

const Submittedform = () => {
  const formData2 = JSON.parse(localStorage.getItem("formData2"));
  const storedFormData = JSON.parse(localStorage.getItem("completeFormData"));

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Your Data:</h1>
      <table className="table-auto">
        <tbody>
          <tr>
            <td className="border-2 px-4 py-2 font-bold">Form Data 1:</td>
            <td className="border-2 px-4 py-2">
              <pre>{JSON.stringify(storedFormData, null, 2)}</pre>
            </td>
          </tr>
          <tr>
            <td className="border px-4 py-2 font-bold">Form Data 2:</td>
            <td className="border px-4 py-2">
              <pre>{JSON.stringify(formData2, null, 2)}</pre>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Submittedform;
