import { useState } from "react";
import { Link, Outlet } from "react-router";
import { useAppDispatch } from "../redux/hooks";
import { logout } from "../redux/features/auth/authSlice";

const Admin = () => {
  const [activeLink, setActiveLink] = useState<string>("");
  const dispatch = useAppDispatch();

  return (
    <section className="flex justify-center">
      <div className="bg-slate-100 w-[17%] h-screen p-5">
        <h1 className="dark:text-black text-xl inter font-[600] mt-2 ml-2">Admin Dashboard</h1>
        <ul className="list-none roboto font-[500] text-gray-700 mt-8 ml-2">
          <span onClick={() => setActiveLink("/admin/dashboard")}>
            <Link to="/admin/dashboard" className="flex items-center gap-2">
              {
                activeLink === "/admin/dashboard" ?
                  <img className="size-5" src="https://img.icons8.com/material/24/dashboard-layout.png" alt="dashboard-layout" />
                  :
                  <img className="size-5" src="https://img.icons8.com/material-rounded/50/dashboard-layout.png" alt="dashboard-layout" />
              }
              Dashboard</Link>
          </span>
          <span onClick={() => setActiveLink("/admin/dashboard/user")}>
            <Link to="/admin/dashboard/user" className="flex items-center gap-2 my-6">
              {
                activeLink === "/admin/dashboard/user" ?
                  <img className="size-6" src="https://img.icons8.com/ios-glyphs/30/group.png" alt="group" />
                  :
                  <img className="size-6" src="https://img.icons8.com/parakeet-line/48/group.png" alt="group" />
              }
              User</Link>
          </span>
          <span onClick={() => dispatch(logout())} className="flex items-center gap-2 cursor-pointer">
            <img className="size-5" src="https://img.icons8.com/ios-filled/50/logout-rounded.png" alt="logout-rounded" />
            <p>Logout</p>
          </span>
        </ul>
      </div>
      <div className="w-[83%] h-screen overflow-y-auto text-center p-5">
        <Outlet />
      </div>
    </section>
  )
}

export default Admin;