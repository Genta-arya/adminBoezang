import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-black text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div>
          <div className="text-2xl font-bold">Boezang Apple</div>
          <p className="font-bold md:text-sm">System Admin</p>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
