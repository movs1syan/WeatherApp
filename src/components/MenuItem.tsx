import { NavLink } from "react-router-dom";
import React from "react";

interface Props {
  path: string;
  title: string;
}

const MenuItem: React.FC<Props> = ({ path, title }) => {
  const linkClasses = ({ isActive }: { isActive: boolean }) => `px-3 py-1 ${isActive ? "text-black" : "text-gray-400"}`;
  return (
    <NavLink to={path} className={linkClasses}>
      {title}
    </NavLink>
  );
};

export default MenuItem;