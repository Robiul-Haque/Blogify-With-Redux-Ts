import { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useAppDispatch } from "../redux/hooks";
import { logout } from "../redux/features/auth/authSlice";
import Cookies from "js-cookie";
import Swal from "sweetalert2";

const Admin = () => {
  const { pathname } = useLocation();
  const [activeLink, setActiveLink] = useState<string>(pathname);
  const dispatch = useAppDispatch();

  const handleLogOut = (): void => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to logout!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "",
      confirmButtonText: "Yes, Logout"
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(logout());
        Cookies.remove("refreshToken");
      }
    }).catch(() => {
      Swal.fire({
        title: "Error!",
        text: "Something went wrong, can't logout!",
        icon: "error"
      })
    });
  }

  return (
    <section className="flex justify-center">
      <div className="bg-slate-100 w-[14%] h-screen px-4 py-5">
        <h1 className="dark:text-black text-xl inter font-[600] mt-2 ml-1">Admin Dashboard</h1>
        <ul className="list-none roboto font-[500] text-gray-700 mt-8 ml-1">
          <span onClick={() => setActiveLink("/admin/dashboard")}>
            <Link to="/admin/dashboard" className="flex items-center gap-2">
              {
                activeLink === "/admin/dashboard" ?
                  <img className="size-5" src="https://img.icons8.com/material/24/dashboard-layout.png" alt="dashboard-layout" />
                  :
                  <img className="size-5" src="https://img.icons8.com/material-rounded/50/dashboard-layout.png" alt="dashboard-layout" />
              }
              Dashboard
            </Link>
          </span>
          <span onClick={() => setActiveLink("/admin/dashboard/blog")}>
            <Link to="/admin/dashboard/blog" className="flex items-center gap-2 my-6">
              {
                activeLink === "/admin/dashboard/blog" ?
                  <img className="size-6" src="https://img.icons8.com/ios-filled/50/google-blog-search.png" alt="google-blog-search" />
                  :
                  <img className="size-6" src="https://img.icons8.com/windows/32/google-blog-search.png" alt="google-blog-search" />
              }
              Blog
            </Link>
          </span>
          <span onClick={() => setActiveLink("/admin/dashboard/user")}>
            <Link to="/admin/dashboard/user" className="flex items-center gap-2 my-6">
              {
                activeLink === "/admin/dashboard/user" ?
                  <img className="size-6" src="https://img.icons8.com/ios-glyphs/30/group.png" alt="group" />
                  :
                  <img className="size-6" src="https://img.icons8.com/parakeet-line/48/group.png" alt="group" />
              }
              User
            </Link>
          </span>
          <span onClick={() => setActiveLink("/admin/dashboard/profile")}>
            <Link to="/admin/dashboard/profile" className="flex items-center gap-2 my-6">
              {
                activeLink === "/admin/dashboard/profile" ?
                  <img className="size-6" src="https://img.icons8.com/fluency-systems-filled/50/1A1A1A/system-administrator-male.png" alt="system-administrator-male" />
                  :
                  <img className="size-6" src="https://img.icons8.com/fluency-systems-regular/48/1A1A1A/system-administrator-male.png" alt="system-administrator-male" />
              }
              Profile
            </Link>
          </span>
          <span onClick={handleLogOut} className="flex items-center gap-2 cursor-pointer">
            <img className="size-5" src="https://img.icons8.com/ios-filled/50/logout-rounded.png" alt="logout-rounded" />
            <p>Logout</p>
          </span>
        </ul>
      </div>
      <div className="w-[86%] h-screen overflow-y-auto text-center p-3">
        <Outlet />
      </div>
    </section>
  )
}

export default Admin;