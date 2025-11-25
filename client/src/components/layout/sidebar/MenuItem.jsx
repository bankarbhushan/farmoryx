const MenuItem = ({ label, value, activeComponent, setActiveComponent }) => (
  <li
    className={`
      cursor-pointer px-4 py-2 rounded-md font-semibold font-sans flex items-center gap-3
      transition-all duration-200
      ${
        activeComponent === value
          ? "text-[#17CF91] bg-[#17CF911A] "
          : "text-gray-700 hover:bg-gray-200"
      }
    `}
    onClick={() => setActiveComponent(value)}
  >
    {label}
  </li>
);

export default MenuItem;


