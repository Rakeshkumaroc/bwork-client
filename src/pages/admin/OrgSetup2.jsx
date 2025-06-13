import Input from "../../components/common/Input";
import TakeImage from "../../components/common/TakeImage";
import Dropdown from "../../components/common/Dropdown";
import Checkbox from "../../components/common/Checkbox";

const OrgSetup2 = () => { 
 
  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Handle actual submit logic here
    alert("Form submitted!");
  };

  return (
    <form onSubmit={handleSubmit} className="p-10 bg-cream min-h-screen">
      {/* Heading */}
      <h2 className="text-3xl md:text-4xl font-bold text-yellow-400 mb-8">
        Organization Setup
      </h2>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-4">
          <Input placeholder="Name" />
          <Dropdown
            label="Type"
            options={["Private", "Public", "NGO"]}
            style="bg-transparent border border-black"
          />
          <Input placeholder="Industry Category" />
          <TakeImage />
          <Dropdown
            label="Organization Structure"
            options={["Flat", "Hierarchical"]}
            style="bg-transparent border border-black"
          />
          <Dropdown
            label="No. of Branches"
            options={["1", "2", "3", "More than 3"]}
            style="bg-transparent border border-black"
          />
        </div>

        {/* Right Column */}
        <div className="space-y-4">
          <Input placeholder="Colour & Theme" />
          <Input placeholder="Invite Team Members" />
          <Dropdown
            label="What features do you want?"
            options={["Option 1", "Option 2"]}
            style="bg-transparent border border-black"
          />
          <div className="space-y-2">
            <Checkbox label="Product Management" />
            <Checkbox label="Branch Management" />
            <Checkbox label="Lead Management" />
            <Checkbox label="Job Listing" />
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="mt-10 text-center">
        <button
          type="submit"
          className="bg-yellow-400 text-white px-6 py-3 rounded-lg shadow-md text-lg font-semibold"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default OrgSetup2;
