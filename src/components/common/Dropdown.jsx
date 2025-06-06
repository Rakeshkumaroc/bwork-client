// src/components/Dropdown.jsx
const Dropdown = ({ label, name, value, onChange, options = [] }) => {
  return (
    <select
      name={name}
      value={value}
      onChange={onChange}
      className="w-full border border-black rounded-md px-3 py-2 sm:px-4 sm:py-3 outline-none text-sm sm:text-base bg-transparent"
    >
      <option value="">{label}</option>
      {options.map((option, idx) => (
        <option key={idx} value={option.value || option}>
          {option.label || option}
        </option>
      ))}
    </select>
  );
};

export default Dropdown;
