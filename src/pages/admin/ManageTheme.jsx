import { useState } from "react";
import { HsvColorPicker } from "react-colorful";
import tinycolor from "tinycolor2";
import Topbar from "../../components/admin/Topbar";

const ManageTheme = () => {
  const [selectedColor, setSelectedColor] = useState(
    tinycolor("#914527").toHsv()
  );
  const presetColors = ["#F2D974", "#F26D6D", "#6DB3F2", "#A08EF2", "#64D8CB"];
  const hexColor = tinycolor(selectedColor).toHexString();

  return (
    <div className="min-h-screen bg-light-cream p-4 sm:p-8">
      <Topbar />
      <div className="flex justify-between flex-wrap items-center mb-6">
        <div className="bg-cream rounded-xl shadow-xl p-4 sm:p-6 w-full border flex flex-col justify-center border-orange-200">
          {/* New Theme Button */}
          <div className="border-dotted border-2 border-gray-400 p-2 rounded-md mb-4 flex items-center justify-center">
            <button className="flex items-center text-yellow-400 font-bold text-lg sm:text-xl">
              <span className="text-xl sm:text-2xl mr-2">+</span>
              <span className="hidden sm:block">New Theme</span>
            </button>
          </div>

          {/* Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Color Picker */}
            <div className="flex items-center justify-center">
              <div className="w-full max-w-[200px] sm:max-w-[300px] md:max-w-[384px]">
                <HsvColorPicker
                  color={selectedColor}
                  onChange={setSelectedColor}
                />
              </div>
            </div>
            {/* Dropdowns and Preset Colors */}
            <div className="space-y-4 w-full">
              {/* Dropdowns */}
              <select className="w-full border border-orange-300 rounded-md px-4 py-2 text-yellow-400">
                <option>Heading</option>
              </select>
              <select className="w-full border border-orange-300 rounded-md px-4 py-2 text-yellow-400">
                <option>Subheading</option>
              </select>
              <select className="w-full border border-orange-300 rounded-md px-4 py-2 text-yellow-400">
                <option>Body</option>
              </select>

              {/* Preset Colors */}
              <div className="flex flex-wrap gap-2 mt-2">
                {presetColors.map((color) => (
                  <div
                    key={color}
                    onClick={() => setSelectedColor(tinycolor(color).toHsv())}
                    className={`w-8 h-8 rounded-md cursor-pointer border-2 ${
                      hexColor === color ? "border-black" : "border-transparent"
                    }`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>

              {/* Color Hex Input */}
              <input
                type="text"
                className="border border-black rounded-md px-4 py-2 text-center w-full mt-2"
                value={hexColor}
                onChange={(e) => {
                  const newColor = tinycolor(e.target.value);
                  if (newColor.isValid()) {
                    setSelectedColor(newColor.toHsv());
                  }
                }}
              />
            </div>
          </div>
          {/* SAVE Button */}
          <button
            className="mt-4 mx-auto w-full sm:w-52 bg-yellow-400 hover:bg-orange-600 text-white font-semibold py-2 px-6 sm:px-12 rounded-md shadow-md"
          >
            SAVE
          </button>
        </div>
      </div>
    </div>
  );
};

export default ManageTheme;