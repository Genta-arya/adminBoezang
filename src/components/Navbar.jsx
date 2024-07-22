import React from "react";
import useAuthStore from "../Zustand/useAuthStore";

const Navbar = () => {
  const { email } = useAuthStore();
  return (
    <nav className="bg-black text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div>
          <div className="text-2xl font-bold">Boezang Apple</div>
          <p className="font-bold md:text-sm">System Admin</p>
        </div>
        {email && (
          <div className="font-bold flex flex-col">
            <h1>Hi,</h1>

            <h1>{email}</h1>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
