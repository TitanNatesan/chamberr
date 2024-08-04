import React, { useEffect, useState } from "react";
import axios from "axios";

const ApprovalPage = () => {
  const [pendingApplications, setPendingApplications] = useState([]);
  const [rejectedApplications, setRejectedApplications] = useState([]);
  const [approvedApplications, setApprovedApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showRejectReason, setShowRejectReason] = useState(null);
  const [rejectReasons, setRejectReasons] = useState({});

  const fetchApplications = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "http://192.168.188.144:8000/approval/",
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
      console.log("API Response:", response);

      setPendingApplications(response.data.pending);
      setRejectedApplications(response.data.rejected);
      setApprovedApplications(response.data.approved);

      console.log("Rejected Applications:", response.data.rejected); // Add this line to verify rejected applications
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const accept = async (fid) => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://192.168.188.144:8000/approval/",
        { fid, status: "accepted" },
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
      console.log("Accepted User ID:", fid);
      fetchApplications();
    } catch (error) {
      console.error("Error accepting user:", error);
    }
  };

  const reject = async (fid) => {
    const reason = rejectReasons[fid] || "No reason provided";
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://192.168.188.144:8000/approval/",
        { fid, reason },
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
      console.log("Rejected User ID:", fid);
      fetchApplications();
      setShowRejectReason(null);
      setRejectReasons((prev) => ({ ...prev, [fid]: "" }));
    } catch (error) {
      console.error("Error rejecting user:", error);
    }
  };

  const renderPendingTable = (applications) => (
    <div className="mb-8">
      <h2 className="text-xl font-bold mb-4">Pending Applications</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border-gray-200 shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-100 text-gray-800">
            <tr>
              <th className="py-3 px-4 border-b">S.No</th>
              <th className="py-3 px-4 border-b">Name of Applicant</th>
              <th className="py-3 px-4 border-b">Status</th>
              <th className="py-3 px-4 border-b">Accept/Reject</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((application, index) => (
              <tr key={application.id} className="text-gray-700">
                <td className="py-3 px-4 border-b">{index + 1}</td>
                <td className="py-3 px-4 border-b">
                  {application.NameofApplicant}
                </td>
                <td className="py-3 px-4 border-b">
                  {application.form_status}
                </td>
                <td className="py-3 px-4 border-b flex items-center space-x-2">
                  <button
                    className="bg-green-500 hover:bg-green-600 text-white py-1 px-3 rounded focus:outline-none focus:shadow-outline"
                    onClick={() => accept(application.id)}
                  >
                    Accept
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded focus:outline-none focus:shadow-outline"
                    onClick={() => setShowRejectReason(application.id)}
                  >
                    Reject
                  </button>
                  {showRejectReason === application.id && (
                    <div className="ml-4">
                      <textarea
                        className="mt-2 p-2 border rounded w-full"
                        placeholder="Reason for rejection"
                        value={rejectReasons[application.id] || ""}
                        onChange={(e) =>
                          setRejectReasons({
                            ...rejectReasons,
                            [application.id]: e.target.value,
                          })
                        }
                      />
                      <button
                        className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-3 mt-2 rounded focus:outline-none focus:shadow-outline"
                        onClick={() => reject(application.id)}
                      >
                        Submit
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderRejectedTable = (applications) => (
    <div className="mb-8">
      <h2 className="text-xl font-bold mb-4">Rejected Applications</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border-gray-200 shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-100 text-gray-800">
            <tr>
              <th className="py-3 px-4 border-b">S.No</th>
              <th className="py-3 px-4 border-b">Name of Applicant</th>
              <th className="py-3 px-4 border-b">Reason for Rejection</th>
              <th className="py-3 px-4 border-b">Admin Type</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((application, index) => (
              <tr key={application.id} className="text-gray-700">
                <td className="py-3 px-4 border-b">{index + 1}</td>
                <td className="py-3 px-4 border-b">
                  {application.NameofApplicant}
                </td>
                <td className="py-3 px-4 border-b">
                  {application.reason_for_rejection}
                </td>
                <td className="py-3 px-4 border-b">
                  {application.rejected_by.map((admin, i) => (
                    <div key={i}>{admin.admin_type}</div>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderApprovedTable = (applications) => (
    <div className="mb-8">
      <h2 className="text-xl font-bold mb-4">Approved Applications</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border-gray-200 shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-100 text-gray-800">
            <tr>
              <th className="py-3 px-4 border-b">S.No</th>
              <th className="py-3 px-4 border-b">Name of Applicant</th>
              <th className="py-3 px-4 border-b">Status</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((application, index) => (
              <tr key={application.id} className="text-gray-700">
                <td className="py-3 px-4 border-b">{index + 1}</td>
                <td className="py-3 px-4 border-b">
                  {application.NameofApplicant}
                </td>
                <td className="py-3 px-4 border-b">
                  {application.form_status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-xl font-semibold">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-xl font-semibold text-red-600">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-center">Approval Page</h1>
      <div className="container mx-auto space-y-12">
        {renderPendingTable(pendingApplications)}
        {renderRejectedTable(rejectedApplications)}
        {renderApprovedTable(approvedApplications)}
      </div>
    </div>
  );
};

export default ApprovalPage;
