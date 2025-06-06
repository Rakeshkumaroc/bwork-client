const SelectField = ({
  label,
  value,
  onChange,
  options = [],
  placeholder,
  className = "",
  ...props
}) => {
  return (
    <div className="mb-4">
      {label && (
        <label className="block mb-1 font-medium text-gray-700">{label}</label>
      )}
      <select
        value={value}
        onChange={onChange}
        className={`w-full border border-orange-400 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-orange-300 ${className}`}
        {...props}
      >
        <option value="">{placeholder || "Select"}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};



export default SelectField