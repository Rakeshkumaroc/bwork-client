// src/components/Checkbox.jsx
const Checkbox = ({ label, name, checked, onChange }) => {
  return (
    <label className="flex items-center gap-2 text-sm sm:text-base cursor-pointer">
      <input
        type="checkbox"
        name={name}
        checked={checked}
        onChange={onChange}
        className="accent-orange-global w-4 h-4"
      />
      {label}
    </label>
  );
};

export default Checkbox;
