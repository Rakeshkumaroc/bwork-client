const NavItem = ({ icon, label, active, trailingIcon }) => (
  <div
    className={`flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer transition-all ${
      active
        ? " text-orange-global font-semibold"
        : "text-gray-700 hover:text-orange-global"
    }`}
  >
    <div className="flex items-center gap-3">
      <div>{icon}</div>
      <span>{label}</span>
    </div>
    {trailingIcon && <div>{trailingIcon}</div>}
  </div>
);
export default NavItem;