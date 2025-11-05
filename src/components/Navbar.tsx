import MenuItem from "./MenuItem";
import UnitsOption from "./UnitsOption";

const Navbar = () => {
  const menu = [
    { path: "/", title: "Homepage" },
    { path: "/favourites", title: "Favourites" },
  ];

  return (
    <nav className="flex items-center justify-between bg-gray-200 py-5 px-6 text-xl font-semibold mb-3">
      <div>
        {menu.map(item => (
          <MenuItem key={item.title} path={item.path} title={item.title} />
        ))}
      </div>
      <div className="flex outline-2 outline-black rounded overflow-hidden">
        <UnitsOption mode="metric" />
        <UnitsOption mode="imperial" />
      </div>
    </nav>
  );
};

export default Navbar;