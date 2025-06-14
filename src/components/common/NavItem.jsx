const NavItem = ({ icon, label, active, trailingIcon }) => (
  <div
    className={`flex items-center justify-between px-4 py-2 rounded-md cursor-pointer transition-all ${
      active
        ? "bg-yellow-400 text-black font-semibold"
        : "text-gray-700 hover:bg-gray-100 hover:text-yellow-400"
    } focus:outline-none focus:ring-2 focus:ring-yellow-400`}
  >
    <div className="flex items-center gap-3">
      <div className={active ? "text-black" : "text-gray-700 hover:text-yellow-400"}>{icon}</div>
      <span className=" font-medium">{label}</span>
    </div>
    {trailingIcon && (
      <div className={active ? "text-black" : "text-gray-700 hover:text-yellow-400"}>{trailingIcon}</div>
    )}
  </div>
);
export default NavItem;