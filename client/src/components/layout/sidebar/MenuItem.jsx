const MenuItem = ({ label, value, activeComponent, setActiveComponent }) => (
  <li
    className={`cursor-pointer p-2 rounded transition 
      ${activeComponent === value ? "bg-amber-500 text-gray-900" : "hover:bg-gray-700 text-white"}`}
    onClick={() => setActiveComponent(value)}
  >
    {label}
  </li>
);

export default MenuItem;
