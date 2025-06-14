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
  <div className="flex flex-col">
    {label && (
      <label
        htmlFor={props.name}
        className="block mb-2 text-sm font-medium text-gray-700"
      >
        {label}
      </label>
    )}
    <select
      id={props.name}
      value={value}
      onChange={onChange}
      className={`w-full px-3 py-3 border border-gray-300 rounded-md text-sm text-gray-800 placeholder-gray-600 focus:border-yellow-400 focus:ring-yellow-400 focus:outline-none ${className}`}
      {...props}
    >
      <option value="" disabled hidden>
        {placeholder || "Select"}
      </option>
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