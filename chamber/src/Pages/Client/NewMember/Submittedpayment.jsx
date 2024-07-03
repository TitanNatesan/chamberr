import React from "react";

const SubmittedPayment = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow">
        <h1 className="text-2xl font-bold mb-4">Payment Submitted</h1>
        <p className="text-gray-700">Thank you for your payment!</p>
      </div>
    </div>
  );
};

export default SubmittedPayment;
