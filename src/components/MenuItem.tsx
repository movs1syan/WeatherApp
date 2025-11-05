import React from "react";
import { NavLink } from "react-router-dom";

interface Props {
  path: string;
  title: string;
}

const MenuItem: React.FC<Props> = ({ path, title }) => (
  <NavLink to={path} className={({ isActive }: { isActive: boolean }) => `px-3 py-1 ${isActive ? "text-black" : "text-gray-400"}`}>
    {title}
  </NavLink>
);

export default MenuItem;