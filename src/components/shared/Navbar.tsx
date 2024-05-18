import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { toast } from "react-toastify";
import { logOut, useCurrentToken } from "../../redux/features/auth/authSlice";
import { useState } from "react";
import { GrMenu } from "react-icons/gr";
import { Drawer } from "antd";
import Sidebar from "./Sidebar";

function Navbar() {
  const token = useAppSelector(useCurrentToken);
  const dispatch = useAppDispatch();
  const [openDrawer, setOpenDrawer] = useState(false);

  const showDrawer = () => {
    setOpenDrawer(true);
  };

  const onClose = () => {
    setOpenDrawer(false);
  };

  const handleLogout = () => {
    dispatch(logOut());
    toast.success("Logout successfully");
  };

  const menuItems = (
    <>
      <li className="flex items-center gap-2">
        <img src="/favicon.png" alt="" className="size-8 lg:size-11" />
        <Link className="lg:text-2xl font-semibold text-primary" to="/">Sports Market</Link>
      </li>

      {token ? (
        <li className="hidden lg:block">
          <button className="roundedBtn bg-red/80 hover:bg-red" onClick={handleLogout}>Logout</button>
        </li>
      ) : (
        <li className="hidden lg:block">
          <Link className="roundedBtn bg-primary/80 hover:bg-primary" to="/login">Login</Link>
        </li>
      )}
    </>
  );

  return (
    <div className="w-full flex justify-between px-4 md:px-12 pt-2.5">

      <ul className="flex items-center justify-between w-full  gap-6 p-0">{menuItems}</ul>

      <>
        <div onClick={showDrawer} className='lg:hidden border rounded border-gray-200 p-1 text-textDark text-2xl'>
          <GrMenu />
        </div>
        <Drawer width={"70%"} placement="left" onClose={onClose} open={openDrawer}>
          <Sidebar />

          {token ? (

            <button className="roundedBtn bg-red/80 hover:bg-red pt-4" onClick={handleLogout}>Logout</button>

          ) : (

            <Link className="roundedBtn bg-primary/80 hover:bg-primary pt-4" to="/login">Login</Link>

          )}
        </Drawer>
      </>
    </div>
  );
}

export default Navbar;
