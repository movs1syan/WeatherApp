import { NavLink } from "react-router-dom";

const Navbar = () => {
  const linkClasses = ({ isActive }: { isActive: boolean }) =>
    `px-3 py-1 ${isActive ? "text-black" : "text-gray-400"}`;

  return (
    <nav className="flex bg-gray-200 py-3 px-6 gap-4 text-xl font-semibold text-gray-600 mb-3">
      <NavLink to="/" className={linkClasses}>Homepage</NavLink>
      <NavLink to="/favourites" className={linkClasses}>Favourite Cities</NavLink>
    </nav>
  );
};

export default Navbar;