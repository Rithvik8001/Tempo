import { Pencil } from "lucide-react";
import { Button } from "./ui/button";
import { NavLink } from "react-router";

const Nav = () => {
  return (
    <>
      <nav className="flex justify-between">
        <div className="flex items-center space-x-3">
          <Pencil className="cursor-pointer" size={26} />
        </div>
        <div className="flex items-center space-x-2">
          <Button className="cursor-pointer" variant="outline">
            <NavLink to="/register">register</NavLink>
          </Button>
          <Button className="cursor-pointer" variant="outline">
            <NavLink to="/login">login</NavLink>
          </Button>
        </div>
      </nav>
    </>
  );
};

export default Nav;
