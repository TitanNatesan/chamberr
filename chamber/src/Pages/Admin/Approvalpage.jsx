import React, { useEffect, useState } from "react";
import axios from "axios";

const ApprovalPage = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://192.168.169.77:8000/approval/",
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        );
        console.log("API Response:", response);

        const combinedData = [
          ...response.data.pending,
          ...response.data.rejected,
        ];
        setApplications(combinedData);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const accept = async (fid) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://192.168.169.77:8000/approval/",
        { fid },
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
      console.log("API Response:", response);
    } catch (error) {
      console.error("Error accepting user:", error);
    }
  };

  const reject = async (fid, reason) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://192.168.169.77:8000/approval/",
        { fid, reason },
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
      console.log("API Response:", response);
    } catch (error) {
      console.error("Error accepting user:", error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Approval Page</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border-gray-200 shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-100 text-gray-800">
            <tr>
              <th className="py-2 px-4 border-b">S.No</th>
              <th className="py-2 px-4 border-b">Name of Applicant</th>
              <th className="py-2 px-4 border-b">Status Admitted</th>
              <th className="py-2 px-4 border-b">Accept/Reject</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((application, index) => (
              <tr key={application.id} className="text-gray-700">
                <td className="py-2 px-4 border-b">{index + 1}</td>
                <td className="py-2 px-4 border-b">
                  {application.NameofApplicant}
                </td>
                <td className="py-2 px-4 border-b">
                  {application.form_status}
                </td>
                <td className="py-2 px-4 border-b">
                  <button
                    className="bg-green-500 hover:bg-green-600 text-white py-1 px-3 rounded focus:outline-none focus:shadow-outline"
                    onClick={() => accept(application.id)}
                  >
                    Accept
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 ml-2 rounded focus:outline-none focus:shadow-outline"
                    onClick={() => reject(application.id, application.reason)}
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default ApprovalPage;
