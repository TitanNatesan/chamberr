import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const MembershipPrices = {
  General: {
    2950: 2950,
    4130: 4130,
    5900: 5900,
    8260: 8260,
  },
  professional: 2950,
  associations: 2360,
  lifeMembership: 88500,
  admissionFee: 3540,
};

const Payment = () => {
  const [selectedMembership, setSelectedMembership] = useState(null);
  const [selectedTurnover, setSelectedTurnover] = useState(null);
  const [totalAmount, setTotalAmount] = useState(0);
  const navigate = useNavigate();

  const handleMembershipChange = (type) => {
    setSelectedMembership(type);
    calculateTotalAmount(type, selectedTurnover);
  };

  const handleTurnoverChange = (turnover) => {
    setSelectedTurnover(turnover);
    calculateTotalAmount(selectedMembership, turnover);
    updateProperty("sales_turnover", turnover);
  };

  const calculateTotalAmount = (type, turnover) => {
    let total = 0;
    let selectedMembershipAmount = 0;
    console.log("turnover", turnover);
    console.log("turnover", MembershipPrices);

    if (type === "life") {
      total = MembershipPrices.lifeMembership;
    } else {
      if (type === "General") {
        selectedMembershipAmount = MembershipPrices.General[turnover];
        total += selectedMembershipAmount;
      } else {
        selectedMembershipAmount = MembershipPrices[type];
        total += selectedMembershipAmount;
      }
    }

    setTotalAmount(total);
    updateProperty("total_amount", total);
    updateProperty("selected_membership_amount", selectedMembershipAmount);
  };

  const [formData, setFormData] = useState({
    membership_type: "", // Set the default value based on your logic
    sales_turnover: "", // Set the default value based on your logic
    card_number: "",
    expiry_date: "",
    cvv: "",
    cardholder_name: "",
    entrance_fee: MembershipPrices.admissionFee, // Initial value based on admission fee
    selected_membership_amount: 0, // Initial value (to be calculated based on logic)
    total_amount: 0, // Initial value (to be calculated based on logic)
  });

  const updateProperty = (propertyName, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [propertyName]: value,
    }));
  };

  const accessToken = localStorage.getItem("token");

  console.log(accessToken);
  console.log(formData);
  console.log("AccessToken:", accessToken);

  const handlePaymentSuccess = async () => {
    navigate("/submittedpayment");
  };

  return (
    <div>
      <div className="pt-12 pb-20 flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-500">
        <div className="text-white text-center">
          <h1 className="text-4xl font-bold mb-4">Membership Application</h1>
          <p className="text-lg">
            Complete the form below to apply for membership. Select your
            membership type and other details.
          </p>
        </div>
      </div>
      <div className="flex items-center justify-center pt-[5%] w-full">
        <div className="bg-white shadow-md rounded-md w-[80%] grid grid-cols-2 gap-12 p-8">
          {/* Left Side - Form */}
          <div>
            <h1 className="text-3xl font-bold mb-6 text-center">
              Membership Details
            </h1>
            <div className="mb-6">
              <label className="block text-sm font-semibold mb-2">
                Membership Type
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="membershipType"
                  value="General"
                  onChange={() => {
                    updateProperty("membership_type", "General");
                    handleMembershipChange("General");
                  }}
                />
                <span>General</span>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="membershipType"
                  value="professional"
                  onChange={() => {
                    updateProperty("membership_type", "professional");
                    handleMembershipChange("professional");
                  }}
                />
                <span>Professional</span>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="membershipType"
                  value="associations"
                  onChange={() => {
                    updateProperty("membership_type", "associations");
                    handleMembershipChange("associations");
                  }}
                />
                <span>Associations</span>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="membershipType"
                  value="life"
                  onChange={() => {
                    updateProperty("membership_type", "life");
                    handleMembershipChange("life");
                  }}
                />
                <span>Life Membership</span>
              </div>
            </div>
            {selectedMembership === "General" && (
              <div className="mb-6">
                <label className="block text-sm font-semibold mb-2">
                  Sales Turnover
                </label>
                <select
                  className="border p-2 rounded-md w-full"
                  onChange={(e) => handleTurnoverChange(e.target.value)}
                >
                  <option value="2950">Up to Rs. 5 Crore</option>
                  <option value="4130">
                    Above Rs. 5 Crore up to Rs. 10 Crore
                  </option>
                  <option value="5900">
                    Above Rs. 10 Crore up to Rs. 25 Crore
                  </option>
                  <option value="8260">Above Rs. 25 Crore</option>
                </select>
              </div>
            )}
            <div className="grid grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Card Number
                </label>
                <input
                  type="text"
                  placeholder="Enter card number"
                  className="border p-2 rounded-md w-full"
                  onChange={(e) =>
                    updateProperty("card_number", e.target.value)
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Expiry Date (MM/YY)
                </label>
                <input
                  type="date"
                  placeholder="MM/YY"
                  className="border p-2 rounded-md w-full"
                  onChange={(e) =>
                    updateProperty("expiry_date", e.target.value)
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">CVV</label>
                <input
                  type="text"
                  placeholder="CVV"
                  className="border p-2 rounded-md w-full"
                  onChange={(e) => updateProperty("cvv", e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Cardholder Name
                </label>
                <input
                  type="text"
                  placeholder="Cardholder Name"
                  className="border p-2 rounded-md w-full"
                  onChange={(e) =>
                    updateProperty("cardholder_name", e.target.value)
                  }
                />
              </div>
            </div>
          </div>
          {/* Right Side - Bill */}
          <div>
            <h2 className="text-2xl font-bold mb-6 text-center">
              Membership Bill
            </h2>
            <div className="mb-6">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <p className="text-sm">Entrance Fee</p>
                  <p className="font-bold text-lg text-green-700">
                    Rs. {MembershipPrices.admissionFee}
                  </p>
                </div>
                {selectedMembership !== "life" && (
                  <div>
                    <p className="text-sm">Selected Membership Amount</p>
                    <p className="font-bold text-lg text-green-700">
                      Rs. {totalAmount}
                    </p>
                  </div>
                )}
              </div>
              <div className="mb-4">
                <label className="block text-sm font-semibold mb-2">
                  Subscription for Co-Chamber Journal
                  <span className="ml-2 text-red-500">
                    Rs. {MembershipPrices.journalSubscription}
                  </span>
                </label>
              </div>
              <div className="mb-4">
                {/* Remove the checkbox for chamber day celebrations */}
                <label className="block text-sm font-semibold mb-2">
                  Chamber Day Celebrations
                  <span className="ml-2 text-red-500">
                    Rs. {MembershipPrices.chamberDayCelebrations}
                  </span>
                </label>
              </div>
              <div className="flex justify-between items-center mb-4">
                <div>
                  <p className="text-sm">Total Amount</p>
                  <p className="font-bold text-lg text-green-700">
                    Rs.{" "}
                    {totalAmount + MembershipPrices.admissionFee + 295 + 1180}
                  </p>
                </div>
              </div>
              <button
                onClick={handlePaymentSuccess}
                className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
              >
                Pay Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
