import { useEffect, useState } from "react";
import { FaEdit, FaChevronRight } from "react-icons/fa";
import InputField from "../../components/common/admin/InputField";
import { handleFormChange } from "../../utils/form";
import { fetchData } from "../../utils/api";
import Topbar from "../../components/admin/Topbar";
import { toast } from "react-toastify";
const baseUrl = import.meta.env.VITE_APP_URL;

const Settings = () => {
  const [formData, setFormData] = useState({
    orgName: "",
    email: "",
    phone: "",
    _id: "",
    orgLogo: null,
    address: "",
    password: "",
    cpassword: "",
  });
  const [activeTab, setActiveTab] = useState("Basics");
  const [isEditing, setIsEditing] = useState({
    Basics: false,
    Password: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const authToken = JSON.parse(
      localStorage.getItem("authToken") || "{}"
    );
     
    const orgId = authToken.orgId;
    console.log("formData.orgId:", orgId);
    fetchData(
      `${baseUrl}/org/get-org-by-id/${orgId}`,
      setFormData,
      setLoading,
      setError
    );
  }, []);

  const handleFileChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.files[0],
    }));
  };

   const handleBasicSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      orgName: formData.orgName,
      email: formData.email,
      address: formData.address,
      phone: formData.phone,
    };
    const authToken = JSON.parse(localStorage.getItem("authToken") || "{}");
    const orgId = authToken.orgId;
 
    try {
      const result = await fetch(`${baseUrl}/org/update-org-by-id/${orgId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await result.json();
      if (result.ok) {
        toast.success("Organization details updated successfully!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        setIsEditing((prev) => ({ ...prev, Basics: false }));
      } else {
        throw new Error(data.message || "Failed to update organization details.");
      }
    } catch (err) {
      toast.error(err.message || "An error occurred while updating.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    console.log("Password Update:", {
      password: formData.password,
      cpassword: formData.cpassword,
    });
    setIsEditing((prev) => ({ ...prev, Password: false }));
    setFormData((prev) => ({ ...prev, password: "", cpassword: "" }));
  };

  const toggleEditMode = (tab) => {
    setIsEditing((prev) => ({ ...prev, [tab]: !prev[tab] }));
  };

  return (
    <div className="min-h-screen bg-light-cream p-4 sm:p-8">
      <Topbar />
      <div className="flex flex-col md:flex-row gap-4 md:gap-6">
        {/* Sidebar */}
        <div className="w-full md:w-64 bg-cream rounded-xl shadow-lg p-5 border border-blue-300">
          <h3 className="text-orange-global font-semibold mb-4">Settings</h3>
          <ul className="space-y-2">
            {["Basics", "Password", "Account", "Notification", "Payment"].map(
              (tab) => (
                <li
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex justify-between items-center px-3 py-2 rounded cursor-pointer ${
                    activeTab === tab
                      ? "bg-orange-global text-white"
                      : "text-black hover:bg-orange-100"
                  }`}
                >
                  {tab}
                  {activeTab === tab && <FaChevronRight className="text-sm" />}
                </li>
              )
            )}
          </ul>
        </div>

        {/* Main Content */}
        <div className="flex-1 bg-cream rounded-lg shadow-lg p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <h2 className="text-lg font-semibold text-orange-global">
              {activeTab === "Basics"
                ? "Organization Registration"
                : "Update Password"}
            </h2>
            <button
              onClick={() => toggleEditMode(activeTab)}
              className="w-full sm:w-auto bg-orange-global hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-md shadow-md flex items-center justify-center transition text-lg sm:text-base"
            >
              <FaEdit className="mr-2" />
              <span className="hidden sm:block">
                {isEditing[activeTab] ? "Cancel" : "Edit"}
              </span>
            </button>
          </div>

          {loading ? (
            <p className="text-gray-600">Loading data...</p>
          ) : error ? (
            <p className="text-red-600">Error: {error}</p>
          ) : activeTab === "Basics" ? (
            isEditing.Basics ? (
              <form onSubmit={handleBasicSubmit} className="space-y-4">
                <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-4">
                  <div className="relative w-16 h-16">
                    {formData.orgLogo ? (
                      <img
                        src={URL.createObjectURL(formData.orgLogo)}
                        alt="Logo Preview"
                        className="w-full h-full rounded-md object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 rounded-md flex items-center justify-center">
                        <span className="text-xs text-gray-500">No Logo</span>
                      </div>
                    )}
                    escolares
                    <label className="absolute bottom-0 right-0 bg-white p-1 rounded-full shadow cursor-pointer">
                      <FaEdit className="text-sm text-black" />
                      <input
                        type="file"
                        name="orgLogo"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                    </label>
                  </div>
                  <div className="flex-1 w-full">
                    <InputField
                      label="Organization Name"
                      name="orgName"
                      value={formData.orgName}
                      onChange={(e) => handleFormChange(e, setFormData)}
                      placeholder="Enter organization name"
                    />
                  </div>
                </div>

                <InputField
                  label="Email"
                  name="email"
                  value={formData.email}
                  onChange={(e) => handleFormChange(e, setFormData)}
                  placeholder="Enter email"
                  type="email"
                />

                <InputField
                  label="Phone"
                  name="phone"
                  value={formData.phone}
                  onChange={(e) => handleFormChange(e, setFormData)}
                  placeholder="Enter phone number"
                />

                <InputField
                  label="Address"
                  name="address"
                  value={formData.address}
                  onChange={(e) => handleFormChange(e, setFormData)}
                  placeholder="Enter address"
                />

                <button
                  type="submit"
                  className="w-full sm:w-auto bg-orange-global hover:bg-orange-600 text-white font-semibold py-2 px-4 sm:px-6 rounded-md shadow-md flex items-center justify-center transition text-lg sm:text-base"
                >
                  <span>+</span>
                  <span className="hidden sm:block">SAVE</span>
                </button>
              </form>
            ) : (
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-4">
                  <div className="w-16 h-16">
                    {formData.orgLogo ? (
                      <img
                        src={URL.createObjectURL(formData.orgLogo)}
                        alt="Logo Preview"
                        className="w-full h-full rounded-md object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 rounded-md flex items-center justify-center">
                        <span className="text-xs text-gray-500">No Logo</span>
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Organization Name</p>
                    <p className="text-black font-medium">
                      {formData.orgName || "Not provided"}
                    </p>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-gray-600">Email</p>
                  <p className="text-black font-medium">
                    {formData.email || "Not provided"}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-600">Phone</p>
                  <p className="text-black font-medium">
                    {formData.phone || "Not provided"}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-600">Address</p>
                  <p className="text-black font-medium">
                    {formData.address || "Not provided"}
                  </p>
                </div>
              </div>
            )
          ) : activeTab === "Password" ? (
            isEditing.Password ? (
              <form onSubmit={handlePasswordSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <InputField
                    label="New Password"
                    name="password"
                    value={formData.password}
                    onChange={(e) => handleFormChange(e, setFormData)}
                    type="password"
                    placeholder="Enter new password"
                  />
                  <InputField
                    label="Confirm Password"
                    name="cpassword"
                    value={formData.cpassword}
                    onChange={(e) => handleFormChange(e, setFormData)}
                    type="password"
                    placeholder="Confirm new password"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto bg-orange-global hover:bg-orange-600 text-white font-semibold py-2 px-4 sm:px-6 rounded-md shadow-md flex items-center justify-center transition text-lg sm:text-base"
                >
                  <span>+</span>
                  <span className="hidden sm:block">SAVE</span>
                </button>
              </form>
            ) : (
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600">Password</p>
                  <p className="text-black font-medium">********</p>
                </div>
              </div>
            )
          ) : (
            <p className="text-gray-600">
              Select a tab to view or edit settings.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;
