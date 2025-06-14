const InputField = ({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  className = "",
  ...props
}) => {
 return (
  <div className="flex flex-col">
    {label && (
      <label
        htmlFor={name}
        className="block mb-2 text-sm font-medium text-gray-700"
      >
        {label}
      </label>
    )}
    <input
      id={name}
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`w-full px-scheduler px-3 py-3 border border-gray-300 rounded-md text-sm text-gray-800 placeholder-gray-600 focus:border-yellow-400 focus:ring-yellow-400 focus:outline-none ${className}`}
      {...props}
    />
  </div>
);
};

export default InputField;
