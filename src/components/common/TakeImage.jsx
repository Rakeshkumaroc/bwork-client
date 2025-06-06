import { useState } from "react";
import { FaUpload } from "react-icons/fa";

const TakeImage = ({ onChange }) => {
  const [preview, setPreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      onChange(e);
    }
  };

  return (
    <div className="border border-black rounded-md flex flex-col items-center justify-center p-6 w-full h-40 text-center cursor-pointer">
      <label className="flex flex-col items-center cursor-pointer">
        <span className="text-sm font-medium mb-2">Upload Logo</span>
        {preview ? (
          <img src={preview} alt="Logo Preview" className="w-16 h-16 object-contain mb-2" />
        ) : (
          <FaUpload className="w-6 h-6 text-black mb-2" />
        )}
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImageChange}
        />
      </label>
    </div>
  );
};

export default TakeImage;
