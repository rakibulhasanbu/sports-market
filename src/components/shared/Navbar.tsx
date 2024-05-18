import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { toast } from "react-toastify";
import { logOut, useCurrentToken } from "../../redux/features/auth/authSlice";

function Navbar() {
  const token = useAppSelector(useCurrentToken);
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logOut());
    toast.success("Logout successfully");
  };

  const menuItems = (
    <>
      <li>
        <img src="/favicon.png" alt="" />
        <Link className="text-2xl font-semibold text-primary" to="/">Sports Market</Link>
      </li>
      {token ? (
        <li>
          <button className="roundedBtn bg-red/80 hover:bg-red" onClick={handleLogout}>Logout</button>
        </li>
      ) : (
        <li>
          <Link className="roundedBtn bg-primary/80 hover:bg-primary" to="/login">Login</Link>
        </li>
      )}
    </>
  );

  return (
    <div className="w-full flex justify-between">

      <div className="hidden lg:flex w-full px-12 pt-2.5">
        <ul className="flex items-center justify-between w-full  gap-6 p-0">{menuItems}</ul>
      </div>

      <label
        htmlFor="dashboard-drawer"
        tabIndex={2}
        className="btn btn-ghost lg:hidden"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h8m-8 6h16"
          />
        </svg>
      </label>
    </div>
  );
}

export default Navbar;
