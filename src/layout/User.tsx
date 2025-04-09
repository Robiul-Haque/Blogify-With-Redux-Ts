import { useState } from "react";
import { Link, Outlet, useLocation } from "react-router";

const User = () => {
    const { pathname } = useLocation();
    const [activeLink, setActiveLink] = useState<string>(pathname);

    return (
        <section className="flex justify-center">
            <div className="bg-slate-100 w-[14%] h-screen px-4 py-5">
                <h1 className="dark:text-black text-xl inter font-[600] mt-2 ml-1">User Dashboard</h1>
                <ul className="list-none roboto font-[500] text-gray-700 mt-8 ml-1">
                    <span onClick={() => setActiveLink("/user/dashboard")}>
                        <Link to="/user/dashboard" className="flex items-center gap-2">
                            {
                                activeLink === "/user/dashboard" ?
                                    <img className="size-5" src="https://img.icons8.com/material/24/dashboard-layout.png" alt="dashboard-layout" />
                                    :
                                    <img className="size-5" src="https://img.icons8.com/material-rounded/50/dashboard-layout.png" alt="dashboard-layout" />
                            }
                            Dashboard
                        </Link>
                    </span>
                    <span onClick={() => setActiveLink("/user/dashboard/bookmarked")}>
                        <Link to="/user/dashboard/bookmarked" className="flex items-center gap-2 my-6">
                            {
                                activeLink === "/admin/dashboard/bookmarked" ?
                                    <img className="size-6" src="https://img.icons8.com/material-rounded/24/bookmark-ribbon--v1.png" alt="bookmark-ribbon--v1" />
                                    :
                                    <img className="size-6" src="https://img.icons8.com/material-outlined/24/bookmark-ribbon--v1.png" alt="bookmark-ribbon--v1" />
                            }
                            Bookmarked
                        </Link>
                    </span>
                    <span onClick={() => setActiveLink("/user/dashboard/profile")}>
                        <Link to="/user/dashboard/profile" className="flex items-center gap-2 my-6">
                            {
                                activeLink === "/admin/dashboard/profile" ?
                                    <img className="size-6" src="https://img.icons8.com/fluency-systems-filled/50/1A1A1A/system-administrator-male.png" alt="system-administrator-male" />
                                    :
                                    <img className="size-6" src="https://img.icons8.com/fluency-systems-regular/48/1A1A1A/system-administrator-male.png" alt="system-administrator-male" />
                            }
                            Profile</Link>
                    </span>
                    <span onClick={() => setActiveLink("/")}>
                        <Link to="/" className="flex items-center gap-2 my-6">
                            {
                                activeLink === "/" ?
                                    <img className="size-6" src="https://img.icons8.com/material-sharp/24/home.png" alt="home" />
                                    :
                                    <img className="size-6" src="https://img.icons8.com/material-outlined/24/home--v2.png" alt="home--v2" />
                            }
                            Home
                        </Link>
                    </span>
                </ul>
            </div>
            <div className="w-[86%] h-screen overflow-y-auto text-center p-3">
                <Outlet />
            </div>
        </section>
    )
}

export default User;