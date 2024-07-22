import { useState } from "react";

const ToggleSwitch = ({ initialChecked, onChange, status }) => {
  const [isChecked, setIsChecked] = useState(initialChecked);

  const handleChange = (event) => {
    setIsChecked(event.target.checked);
    onChange(event.target.checked);
  };

  return (
    <label className="relative inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        className="sr-only"
        disabled={status}
        checked={isChecked}
        onChange={handleChange}
      />
      {!status && (
        <>
          <div className="w-11 h-6 bg-gray-200 rounded-full relative transition-colors duration-300">
            <div
              className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform duration-300 ${
                isChecked ? "translate-x-5 bg-yellow-200" : ""
              }`}
            ></div>
            <div
              className={`w-full h-full rounded-full ${
                isChecked ? "bg-yellow-400" : "bg-gray-200"
              }`}
            ></div>
          </div>
        </>
      )}
    </label>
  );
};

export default ToggleSwitch;
