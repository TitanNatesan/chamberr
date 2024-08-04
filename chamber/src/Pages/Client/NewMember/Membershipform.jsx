import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../../Assets/Formheader.png";
import axios from "axios";

const Membershipform = () => {
  const navigate = useNavigate();
  const currentDate = new Date().toLocaleDateString();
  const currentYear = new Date().getFullYear();
  const [image, setImage] = useState(null);

  const [formData, setFormData] = useState({
    NameofApplicant: "",
    constitution: "",
    profession1: "",
    profession2: "",
    profession3: "",
    YearofEstablishment: "",
    Businessactivity: "",
    Registerofficeaddress: "",
    Addressforcommunication_office: "",
    Addressforcommunication_work: "",
    Communicationdetails_landline: "",
    Communicationdetails_mobile: "",
    Communicationdetails_email: "",
    Communicationdetails_web: "",
    Legalinfo_aadhar: "",
    Legalinfo_pancard: "",
    Legalinfo_GSTNo: "",
    Legalinfo_CompanyFirmRegNo: "",
    Legalinfo_SocietyAssociationRegNo: "",
    Personauthorized_Name: "",
    Personauthorized_Designation: "",
    personauthorized_pan: "",
    personauthorized_aadhar: "",
    personauthorized_phone: "",
    personauthorized_email: "",
    Maincategory: "",
    Subcategory: "",
    Cateringtomarket: "",
    Percentageofimports: "",
    Percentageofexports: "",
    Foreigncollaboration_country: "",
    Foreigncollaboration_collaborator: "",
    Classificationofindustry: "",
    Annualturnover_year1: "",
    Annualturnover_year2: "",
    Annualturnover_year3: "",
    Noofpersonsemployed_direct: "",
    Noofpersonsemployed_works: "",
    Noofpersonsemployed_indirect: "",
    Noofpersonsemployed_outsourced: "",
    ESIC: "",
    EPF: "",
    Detailsofbranches: "",
    Memberofanyother: "",
    association_name: "",
    is_office_bearer: "",
    association_position: "",
    reason_for_joining_chamber: "",
    e_sign: null,
    IncomeandExpenditure: null,
    incometaxtpan: null,
    FactoryRegistrationCertificate: null,
    MemorandumArticleofAssociation: null,
    GSTINRegistrationCopy: null,
    IECodeCertificate: null,
    ProfessionalCertificate: null,
    CopyofLandDocument: null,
    LandHolding: null,
    passportsizephoto: null,
    DirectorsPartners: null,
    form_status: "pending",
    Reasonforrejection: "",
  });

  const labels = [
    "Proprietary Firm",
    "Partnership Firm LLP",
    "Private Limited",
    "Public Limited Unlisted",
    "Public Limited Listed",
    "Trust",
    "Society",
    "Associations",
  ];

  const [documentOptions, setDocOpt] = useState([
    {
      name: "Income Tax PAN Number",
      pName: "incometaxtpan",
      checked: false,
    },
    {
      name: "Factory Registration Certificate",
      pName: "FactoryRegistrationCertificate",
      checked: false,
    },
    {
      name: "Memorandum & Article of Association",
      pName: "MemorandumArticleofAssociation",
      checked: false,
    },
    {
      name: "GSTIN Registration Copy (Compulsory)",
      pName: "GSTINRegistrationCopy",
      checked: false,
    },
    {
      name: "IE Code Certificate",
      pName: "IECodeCertificate",
      checked: false,
    },
    {
      name: "Professional Certificate",
      pName: "ProfessionalCertificate",
      checked: false,
    },
    {
      name: "Copy of Land Document",
      pName: "CopyofLandDocument",
      checked: false,
    },
    {
      name: "Copy of Land Holding (Patta)",
      pName: "LandHolding",
      checked: false,
    },
  ]);

  const handleCheckboxChange = (e) => {
    setDocOpt(
      documentOptions.map((doc) => {
        if (doc.name === e.target.name) {
          console.log(
            `${doc.name} is ${doc.checked ? "checked" : "unchecked"}`
          );
          return {
            ...doc,
            checked: !doc.checked,
          };
        }
        return doc;
      })
    );
  };

  const handleFileChange = (event) => {
    const { name, file: selectedFiles } = event.target;
    const file = event.target.files[0];
    setFormData((prevState) => ({
      ...prevState,
      [name]: file,
    }));
  };

  const handleInputChange = (event) => {
    const { name, type, checked, value } = event.target;
    const inputValue = type === "checkbox" ? checked : value;

    setFormData((prevState) => ({
      ...prevState,
      [name]: inputValue,
    }));
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
      setFormData({
        ...formData,
        e_sign: file,
      });
    }
  };

  const handleConstitutionChange = (e) => {
    const { value, checked } = e.target; // Use 'value' instead of 'checked'
    if (!checked) {
      setFormData({
        ...formData,
        constitution: "",
      })
    }
    else {
      setFormData({
        ...formData,
        constitution: value, // Update constitution with value
      });
    }
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const response = await axios.post(
        "http://192.168.188.144:8000/membershipform/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response);
      navigate("/adminhome");
    } catch (error) {
      console.log(error);
      console.log(error.response.data)
    }
  };

  return (
    <div className="w-[60%] ml-[20%] lg:ml-[25%]">
      <form onSubmit={handleSubmit}>
        <div>
          <img src={Header} alt="Header" className="w-fit" />
        </div>
        <div className="text-blue-800 font-medium">
          <div className="text-blue-800 font-medium w-[60%]">
            <div className="flex justify-end space-x-2 mb-4">
              <h5 className="w-32 text-right">Date:</h5>
              <input
                type="text"
                value={currentDate}
                readOnly
                className="border outline-none rounded px-2 flex-grow"
              />
            </div>

            <div className="flex items-center mb-4">
              <h6 className="w-64 mr-3 text-right font-semibold">
                1. Name of Applicant:
              </h6>
              <input
                type="text"
                name="NameofApplicant"
                value={formData.NameofApplicant}
                onChange={handleInputChange}
                className="border rounded px-2 flex-grow"
              />
            </div>

            <div className="flex flex-col mb-4">
              <div className="flex items-center mb-2">
                <label className="w-64 text-right font-semibold">
                  2. Constitution:
                </label>
                <div className="flex space-x-4 items-center ml-2">
                  <span className="ml-2 font-semibold">Individual</span>
                  <input
                    type="checkbox"
                    value="Individual"
                    name="constitution"
                    checked={formData.constitution === "Individual"}
                    onChange={handleConstitutionChange}
                    className="form-checkbox"
                  />
                </div>
              </div>
              {formData.constitution && formData.constitution === 'Individual' && (
                <div className="ml-[8.5rem] mb-4">
                  <label className="font-semibold mb-2 block">
                    Describe the profession:
                  </label>
                    <div className="flex items-center space-x-3 mb-1">
                      <span>1</span>
                      <input
                        type="text"
                        name="profession1"
                        value={formData.profession1}
                        onChange={handleInputChange}
                        className="border rounded border-black flex-grow"
                      />
                    </div>
                    <div className="flex items-center space-x-3 mb-1">
                      <span>2</span>
                      <input
                        type="text"
                        name="profession2"
                        value={formData.profession2}
                        onChange={handleInputChange}
                        className="border rounded border-black flex-grow"
                      />
                    </div>
                    <div className="flex items-center space-x-3 mb-1">
                      <span>3</span>
                      <input
                        type="text"
                        name="profession3"
                        value={formData.profession3}
                        onChange={handleInputChange}
                        className="border rounded border-black flex-grow"
                      />
                    </div>
                </div>
              )}
              {labels.map((label, index) => (
                <div className="flex items-center mb-2" key={index}>
                  <label className="w-64 text-right font-semibold">
                    {label}:
                  </label>
                  <input
                    type="checkbox"
                    name="constitution"
                    value={label}
                    checked={
                      formData.constitution===label}
                    onChange={handleConstitutionChange}
                    className="form-checkbox ml-2"
                  />
                </div>
              ))}
            </div>

            <div className="flex items-center mb-4">
              <h6 className="w-64 text-right font-bold">
                3. Year of Establishment:
              </h6>
              <input
                type="number"
                name="YearofEstablishment"
                value={formData.YearofEstablishment}
                onChange={handleInputChange}
                className="border px-2 flex-grow"
                min={1900}
                max={currentYear}
                placeholder="Year"
              />
            </div>

            <div className="flex flex-col space-y-5 mb-5">
              <div className="flex items-center">
                <h6 className="w-64 text-right pr-4 font-bold">
                  4. Business Activity:
                </h6>
                <textarea
                  name="Businessactivity"
                  value={formData.Businessactivity}
                  onChange={handleInputChange}
                  className="border border-black flex-grow h-20"
                ></textarea>
              </div>
              <div className="flex items-center">
                <h6 className="w-64 text-right pr-4 font-bold">
                  5. Registered Office Address:
                </h6>
                <textarea
                  name="Registerofficeaddress"
                  value={formData.Registerofficeaddress}
                  onChange={handleInputChange}
                  className="border border-black flex-grow h-20"
                ></textarea>
              </div>
              <div className="flex items-center">
                <h6 className="w-64 text-right pr-4 font-bold">
                  6. Address for Communication - Office:
                </h6>
                <textarea
                  name="Addressforcommunication_office"
                  value={formData.Addressforcommunication_office}
                  onChange={handleInputChange}
                  className="border border-black flex-grow h-20"
                ></textarea>
              </div>
              <div className="flex items-center">
                <h6 className="w-64 text-right pr-4 font-bold">
                  Works/Factory:
                </h6>
                <textarea
                  name="Addressforcommunication_work"
                  value={formData.Addressforcommunication_work}
                  onChange={handleInputChange}
                  className="border border-black flex-grow h-20"
                ></textarea>
              </div>
            </div>

            <div className="flex flex-col space-y-5 font-bold">
              <div>
                <h6>7. Communication Details</h6>
              </div>
              <div className="flex flex-col space-y-4">
                <div className="flex items-center">
                  <h6 className="w-64 text-right pr-4">Phone Landline:</h6>
                  <input
                    type="text"
                    name="Communicationdetails_landline"
                    value={formData.Communicationdetails_landline}
                    onChange={handleInputChange}
                    className="border border-black flex-grow"
                  />
                </div>
                <div className="flex items-center">
                  <h6 className="w-64 text-right pr-4">Phone Mobile:</h6>
                  <input
                    type="text"
                    name="Communicationdetails_mobile"
                    value={formData.Communicationdetails_mobile}
                    onChange={handleInputChange}
                    className="border border-black flex-grow"
                  />
                </div>
                <div className="flex items-center">
                  <h6 className="w-64 text-right pr-4">Email ID:</h6>
                  <input
                    type="email"
                    name="Communicationdetails_email"
                    value={formData.Communicationdetails_email}
                    onChange={handleInputChange}
                    className="border border-black flex-grow"
                  />
                </div>
                <div className="flex items-center">
                  <h6 className="w-64 text-right pr-4">Website:</h6>
                  <input
                    type="text"
                    name="Communicationdetails_web"
                    value={formData.Communicationdetails_web}
                    onChange={handleInputChange}
                    className="border border-black flex-grow"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 max-w-4xl">
            <h2 className="text-xl font-bold mb-4">8. Legal Information:</h2>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block mb-1">Aadhaar Card No</label>
                <input
                  type="text"
                  name="Legalinfo_aadhar"
                  value={formData.Legalinfo_aadhar}
                  onChange={handleInputChange}
                  className="w-full border rounded px-2 py-1"
                />
              </div>
              <div>
                <label className="block mb-1">PAN Card No</label>
                <input
                  type="text"
                  name="Legalinfo_pancard"
                  value={formData.Legalinfo_pancard}
                  onChange={handleInputChange}
                  className="w-full border rounded px-2 py-1"
                />
              </div>
              <div>
                <label className="block mb-1">GST No</label>
                <input
                  type="text"
                  name="Legalinfo_GSTNo"
                  value={formData.Legalinfo_GSTNo}
                  onChange={handleInputChange}
                  className="w-full border rounded px-2 py-1"
                />
              </div>
              <div>
                <label className="block mb-1">
                  Company/Firm Registration No
                </label>
                <input
                  type="text"
                  name="Legalinfo_CompanyFirmRegNo"
                  value={formData.Legalinfo_CompanyFirmRegNo}
                  onChange={handleInputChange}
                  className="w-full border rounded px-2 py-1"
                />
              </div>
              <div>
                <label className="block mb-1">
                  Society/Association Registration No
                </label>
                <input
                  type="text"
                  name="Legalinfo_SocietyAssociationRegNo"
                  value={formData.Legalinfo_SocietyAssociationRegNo}
                  onChange={handleInputChange}
                  className="w-full border rounded px-2 py-1"
                />
              </div>
            </div>

            {/* <h2 className="text-xl font-bold mb-4">
              9. List of Directors/ Partners/ Office Bearers/ Trustees:
            </h2>
            <table className="w-ful">
              <thead>
                <tr>
                  <th className="text-left ml-10">Sl. No</th>
                  <th className="text-left">Name of the Person</th>
                  <th className="text-left ml-10">Designation</th>
                  <th className="text-left">PAN</th>
                </tr>
              </thead>
              <tbody>
                {directors.map((director, index) => (
                  <tr key={index}>
                    <td>{index + 1}.</td>
                    <td>
                      <input
                        type="text"
                        value={director.name}
                        onChange={(e) =>
                          handleDirectorChange(index, "name", e.target.value)
                        }
                        className="w-full border-b-2 outline-none border-blue-700 border-dotted  rounded py-1"
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        value={director.designation}
                        onChange={(e) =>
                          handleDirectorChange(
                            index,
                            "designation",
                            e.target.value
                          )
                        }
                        className="w-full border-b-2 outline-none border-blue-700 border-dotted  rounded  py-1"
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        value={director.pan}
                        onChange={(e) =>
                          handleDirectorChange(index, "pan", e.target.value)
                        }
                        className="w-full border-b-2 outline-none border-blue-700 border-dotted  rounded py-1"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table> */}
            
          </div>
          <div className="flex flex-col space-y-5 font-bold">
            <div>
              <h6>10. Details of the Person Authorized:</h6>
            </div>
            <div className="flex flex-col space-y-4">
              <div className="flex items-center">
                <h6 className="w-64 text-right pr-4">Name:</h6>
                <input
                  type="text"
                  name="Personauthorized_Name"
                  value={formData.Personauthorized_Name}
                  onChange={handleInputChange}
                  className="border-b outline-none border-black  w-64"
                />
              </div>
              <div className="flex items-center">
                <h6 className="w-64 text-right pr-4">Designation:</h6>
                <input
                  type="text"
                  name="Personauthorized_Designation"
                  value={formData.Personauthorized_Designation}
                  onChange={handleInputChange}
                  className="border-b outline-none border-black  w-64"
                />
              </div>
              <div className="flex items-center">
                <h6 className="w-64 text-right pr-4">PAN:</h6>
                <input
                  type="text"
                  name="personauthorized_pan"
                  value={formData.personauthorized_pan}
                  onChange={handleInputChange}
                  className="border-b outline-none border-black  w-64"
                />
              </div>
              <div className="flex items-center">
                <h6 className="w-64 text-right pr-4">Aadhaar:</h6>
                <input
                  type="text"
                  name="personauthorized_aadhar"
                  value={formData.personauthorized_aadhar}
                  onChange={handleInputChange}
                  className="border-b outline-none border-black  w-64"
                />
              </div>
              <div className="flex items-center">
                <h6 className="w-64 text-right pr-4">Phone:</h6>
                <input
                  type="text"
                  name="personauthorized_phone"
                  value={formData.personauthorized_phone}
                  onChange={handleInputChange}
                  className="border-b outline-none border-black  w-64"
                />
              </div>
              <div className="flex items-center">
                <h6 className="w-64 text-right pr-4">Mail Id:</h6>
                <input
                  type="text"
                  name="personauthorized_email"
                  value={formData.personauthorized_email}
                  onChange={handleInputChange}
                  className="border-b outline-none border-black  w-64"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col space-y-5 font-bold">
            <div>
              <h6>11. Category of Industry/Trade/Services:</h6>
            </div>
            <div className="flex flex-col space-y-4">
              <div className="flex items-center">
                <h6 className="w-64 text-right pr-4">Main Category:</h6>
                <input
                  type="text"
                  name="Maincategory"
                  value={formData.Maincategory}
                  onChange={handleInputChange}
                  className="px-2 border-b outline-none border-black w-64"
                />
              </div>
              <div className="flex items-center">
                <h6 className="w-64 text-right pr-4">Sub Category:</h6>
                <input
                  type="text"
                  name="Subcategory"
                  value={formData.Subcategory}
                  onChange={handleInputChange}
                  className="px-2 border-b outline-none border-black w-64"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col space-y-5 font-bold">
            <div>
              <h6>12. Catering to Market:</h6>
            </div>
            <div className="flex flex-col space-y-4">
              <div className="flex items-center">
                <h6 className="w-64 text-right pr-4">Domestic:</h6>
                <input
                  type="checkbox"
                  name="Cateringtomarket"
                  checked={formData.Cateringtomarket==="Domestic"}
                  onChange={()=>
                    setFormData((prevState) => ({
                      ...prevState,
                      ["Cateringtomarket"]: "Domestic",
                    }))
                  }
                  className="px-2 border-b border-black w-64"
                />
              </div>
              <div className="flex items-center">
                <h6 className="w-64 text-right pr-4">Global:</h6>
                <input
                  type="checkbox"
                  name="Cateringtomarket"
                  checked={formData.Cateringtomarket==="Global"}
                  onChange={()=>
                    setFormData((prevState) => ({
                      ...prevState,
                      ["Cateringtomarket"]: "Global",
                    }))
                  }
                  className="px-2 border-b border-black w-64"
                />
              </div>
              <div className="flex items-center">
                <h6 className="w-64 text-right pr-4">Both:</h6>
                <input
                  type="checkbox"
                  name="Cateringtomarket"
                  checked={formData.Cateringtomarket==="Both"}
                  onChange={()=>
                    setFormData((prevState) => ({
                      ...prevState,
                      ["Cateringtomarket"]: "Both",
                    }))
                  }
                  className="px-2 border-b border-black w-64"
                />
              </div>

              <div className="flex items-center">
                <h6 className="w-64 text-right pr-4">% of Exports:</h6>
                <input
                  type="text"
                  name="Percentageofexports"
                  value={formData.Percentageofexports}
                  onChange={handleInputChange}
                  className="px-2 border-b border-black w-64"
                />
              </div>
              <div className="flex items-center">
                <h6 className="w-64 text-right pr-4">% of Imports:</h6>
                <input
                  type="text"
                  name="Percentageofimports"
                  value={formData.Percentageofimports}
                  onChange={handleInputChange}
                  className="px-2 border-b border-black w-64"
                />
              </div>
            </div>

            <div>
              <h6>13. Foreign Collaboration if any:</h6>
            </div>
            <div className="flex flex-col space-y-4">
              <div className="flex items-center">
                <h6 className="w-64 text-right pr-4">Name of the Country:</h6>
                <input
                  type="text"
                  name="Foreigncollaboration_country"
                  value={formData.Foreigncollaboration_country}
                  onChange={handleInputChange}
                  className="px-2 border-b border-black w-64"
                />
              </div>
              <div className="flex items-center">
                <h6 className="w-64 text-right pr-4">
                  Name of the Collaborator / Joint Venture:
                </h6>
                <input
                  type="text"
                  name="Foreigncollaboration_collaborator"
                  value={formData.Foreigncollaboration_collaborator}
                  onChange={handleInputChange}
                  className="px-2 border-b border-black w-64"
                />
              </div>
            </div>

            <div>
              <h6>14. Classification of Industry:</h6>
            </div>
            <div className="flex flex-col space-y-2">
              <div className="flex items-center">
                <h6 className="w-64 text-right pr-4">Large:</h6>
                <input
                  type="checkbox"
                  name="Classificationofindustry"
                  checked={formData.Classificationofindustry==="Large" }
                  onChange={()=>
                    setFormData((prevState) => ({
                      ...prevState,
                      ["Classificationofindustry"]: "Large",
                    }))
                  }
                  className="ml-2"
                />
              </div>
              <div className="flex items-center">
                <h6 className="w-64 text-right pr-4">Medium:</h6>
                <input
                  type="checkbox"
                  name="Classificationofindustry"
                  checked={formData.Classificationofindustry==="Medium"}
                  onChange={()=>
                    setFormData((prevState) => ({
                      ...prevState,
                      ["Classificationofindustry"]: "Medium",
                    }))
                  }
                  className="ml-2"
                />
              </div>
              <div className="flex items-center">
                <h6 className="w-64 text-right pr-4">Small:</h6>
                <input
                  type="checkbox"
                  name="Classificationofindustry"
                  checked={formData.Classificationofindustry==="Small"}
                  onChange={()=>
                    setFormData((prevState) => ({
                      ...prevState,
                      ["Classificationofindustry"]: "Small",
                    }))
                  }
                  className="ml-2"
                />
              </div>
              <div className="flex items-center">
                <h6 className="w-64 text-right pr-4">Micro:</h6>
                <input
                  type="checkbox"
                  name="Classificationofindustry"
                  checked={formData.Classificationofindustry==="Micro"}
                  onChange={()=>
                    setFormData((prevState) => ({
                      ...prevState,
                      ["Cateringtomarket"]: "Micro",
                    }))
                  }
                  className="ml-2"
                />
              </div>
            </div>
          </div>

          <div className="flex space-x-3 font-bold my-10">
            <h6>
              15. Annul Turnover for the last three years (Rs in million):
            </h6>
            <div className="flex space-x-8">
              <div>
                <h6>1st Year</h6>
                <input
                  type="text"
                  name="Annualturnover_year1"
                  value={formData.Annualturnover_year1}
                  onChange={handleInputChange}
                  className="border-b-4 outline-none border-blue-700 border-dotted "
                />
              </div>
              <div>
                <h6>2nd Year</h6>
                <input
                  type="text"
                  value={formData.Annualturnover_year2}
                  onChange={handleInputChange}
                  name="Annualturnover_year2"
                  className="border-b-4 outline-none border-blue-700 border-dotted "
                />
              </div>
              <div>
                <h6>3rd Year</h6>
                <input
                  type="text"
                  value={formData.Annualturnover_year3}
                  onChange={handleInputChange}
                  name="Annualturnover_year3"
                  className="border-b-4 outline-none border-blue-700 border-dotted "
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col space-y-10 my-10 font-bold">
            <div className="flex items-center">
              <h6 className="w-64 text-right pr-4">
                16. No of Persons Employed:
              </h6>
              <div className="flex flex-col space-y-3">
                <div className="flex items-center">
                  <h6 className="w-32 text-right pr-2">Direct - Office:</h6>
                  <input
                    type="text"
                    name="Noofpersonsemployed_direct"
                    value={formData.Noofpersonsemployed_direct}
                    onChange={handleInputChange}
                    className="border-black outline-none rounded px-2 border w-40"
                  />
                </div>
                <div className="flex items-center">
                  <h6 className="w-32 text-right pr-2">Works:</h6>
                  <input
                    type="text"
                    name="Noofpersonsemployed_works"
                    value={formData.Noofpersonsemployed_works}
                    onChange={handleInputChange}
                    className="border-black outline-none rounded px-2 border w-40"
                  />
                </div>
                <div className="flex items-center">
                  <h6 className="w-32 text-right pr-2">
                    Indirect - Contractual:
                  </h6>
                  <input
                    type="text"
                    name="Noofpersonsemployed_indirect"
                    value={formData.Noofpersonsemployed_indirect}
                    onChange={handleInputChange}
                    className="border-black outline-none rounded px-2 border w-40"
                  />
                </div>
                <div className="flex items-center">
                  <h6 className="w-32 text-right pr-2">Outsourced:</h6>
                  <input
                    type="text"
                    name="Noofpersonsemployed_outsourced"
                    value={formData.Noofpersonsemployed_outsourced}
                    onChange={handleInputChange}
                    className="border-black outline-none rounded px-2 border w-40"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center">
              <h6 className="w-64 text-right pr-4">17. Welfare Obligations:</h6>
              <div className="flex flex-col space-y-3">
                <div className="flex items-center">
                  <h6 className="w-32 text-right pr-2">ESIC:</h6>
                  <input
                    type="text"
                    name="ESIC"
                    value={formData.ESIC}
                    onChange={handleInputChange}
                    className="border-black outline-none rounded px-2 border w-40"
                  />
                </div>
                <div className="flex items-center">
                  <h6 className="w-32 text-right pr-2">EPF:</h6>
                  <input
                    type="text"
                    onChange={handleInputChange}
                    name="EPF"
                    value={formData.EPF}
                    className="border-black outline-none rounded px-2 border w-40"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-start">
              <h6 className="w-64 text-right pr-4">
                18. Details of branches / Outlet outside India:
              </h6>
              <textarea 
              name="Detailsofbranches"
              value={formData.Detailsofbranches}
              onChange={handleInputChange}
              className="border border-black w-64 h-20"></textarea>
            </div>

            <div className="flex-col items-center justify-center">
              <h6 className="w-64 text-right pr-4">
                19. Are you member of any other Association :
              </h6>
              <div className="flex items-center space-x-7">
                <div className="flex items-center">
                  <input
                  id="YES"
                    type="checkbox"
                    className="mr-2"
                    name="Memberofanyother"
                    value="Yes"
                    checked={formData.Memberofanyother==="Yes"}
                    onChange={()=>
                      setFormData((prevState) => ({
                        ...prevState,
                        ["Memberofanyother"]: "Yes",
                      }))
                    }
                  />
                  <label htmlFor="YES">YES</label>
                </div>
                <div className="flex items-center">
                  <input
                  id="NO"
                    type="checkbox"
                    className="mr-2"
                    name="Memberofanyother"
                    value='No'
                    checked={formData.Memberofanyother==="No"}
                    onChange={()=>
                      setFormData((prevState) => ({
                        ...prevState,
                        ["Memberofanyother"]: "No",
                      }))
                    }
                  />
                  <label htmlFor="NO">NO</label>
                </div>
              </div>
              {formData.Memberofanyother==="Yes" && (
                <div className="flex items-start mt-4">
                  <h6 className="w-64 text-right pr-4">
                    If yes, mention Association Name:
                  </h6>
                  <textarea
                    name="association_name"
                    value={formData.association_name}
                    onChange={handleInputChange}
                    className="px-2 border border-black w-64"
                    rows="4"
                  ></textarea>
                </div>
              )}
            </div>

            <div className="flex-row items-start">
              <div className="flex">
                <h6 className="w-64 text-right pr-4">
                  20. Do you hold any Office Bearers position in that Association
                </h6>
                <div className="flex items-center space-x-7">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      className="mr-2"
                      name="is_office_bearer"
                      checked={formData.is_office_bearer==="Yes"}
                      onChange={()=>
                        setFormData((prevState) => ({
                          ...prevState,
                          ["is_office_bearer"]: "Yes",
                        }))
                      }
                    />
                    <label htmlFor="YES">YES</label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      className="mr-2"
                      name="is_office_bearer"
                      checked={formData.is_office_bearer==="No"}
                      onChange={()=>
                        setFormData((prevState) => ({
                          ...prevState,
                          ["is_office_bearer"]: "No",
                        }))
                      }
                    />
                    <label htmlFor="NO">NO</label>
                  </div>
                </div>
              </div>
              <div className="flex flex-col space-y-3"></div>
              {formData.is_office_bearer==="Yes" && (
                <div className="flex items-start">
                  <h6 className="w-64 text-right pr-4">
                    If yes - mention the position in that association:
                  </h6>
                  <textarea 
                  name="association_position"
                  value={formData.association_position}
                  onChange={handleInputChange}
                  className="border border-black w-64 h-20"></textarea>
                </div>
              )}
            </div>
          </div>

          <div className="flex font-bold">
            <h6> 21. Reason for Joining Chamber :</h6>
            <textarea
              name="reason_for_joining_chamber"
              value={formData.reason_for_joining_chamber}
              onChange={handleInputChange}
              className="border-black border ml-4"
            ></textarea>
          </div>
          <div className="flex flex-col ml-4 items-center mt-20 justify-end">
            {image && (
              <img
                src={image}
                alt="Uploaded"
                className="w-32 h-32 object-contain mb-4"
              />
            )}
            <input
              type="file"
              onChange={handleImageUpload}
              className="mb-2 p-2 border border-gray-300 rounded"
            />
            <h6 className="mt-2 text-center">
              Signature of Authorized person with seal
            </h6>
          </div>
          <div className="mb-6">
            <label className="block text-gray-800 text-base font-semibold mb-2">
              Income and Expenditure statement and your Assets and Liabilities
              Statement for the last three financial years
            </label>
            <input
              type="file"
              name="IncomeandExpenditure"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              onChange={handleFileChange}
            />

            <div className="mb-6">
              <label className="block text-gray-800 text-base font-semibold mb-2">
                Please enclose any Three of the following:
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {documentOptions.map((item, index) => (
                  <label key={index} className="inline-flex items-center">
                    <input
                      type="checkbox"
                      name={item["name"]}
                      onChange={handleCheckboxChange}
                      className="form-checkbox h-5 w-5 text-blue-600"
                    />
                    <span className="ml-2 text-gray-700">{item["name"]}</span>
                  </label>
                ))}
              </div>
            </div>

            {documentOptions.map(
              (item, index) =>
                item.checked && (
                  <div className="mb-6" key={index}>
                    <label className="block text-gray-800 text-base font-semibold mb-2">
                      Upload file for {item["name"]}
                    </label>
                    <input
                      type="file"
                      name={`${item["pName"]}`}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      onChange={handleFileChange}
                    />
                  </div>
                )
            )}

            <div className="mb-6">
              <label className="block text-gray-800 text-base font-semibold mb-2">
                Two passport size colour photographs of the Authorised
                Representative
              </label>
              <input
                type="file"
                name="passportsizephoto"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                multiplep
                onChange={handleFileChange}
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-800 text-base font-semibold mb-2">
                List of Directors / Partners etc.
              </label>
              <input
                type="file"
                name="DirectorsPartners"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                onChange={handleFileChange}
              />
            </div>

            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Membershipform;
