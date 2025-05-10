import { Link, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { logout } from "../redux/features/auth/authSlice";
import Cookies from "js-cookie";

const Navbar = () => {
    const { name, image, token } = useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch();
    const { pathname } = useLocation();

    const handleLogout = () => {
        dispatch(logout());
        Cookies.remove("refreshToken");
    }

    return (
        <nav className={`${pathname === "/user/dashboard/profile" || pathname === "/user/dashboard/bookmarked" ? "pl-20 pr-50" : "px-50"} flex justify-between items-center bg-slate-100 py-4 sticky top-0 w-full z-50`}>
            <Link to="/"><h1 className="text-2xl font-bold">Blogify</h1></Link>
            <ul>
                <li><Link to="/" className="relative inline-block text-gray-700 hover:text-black transition-colors duration-300"><span className="after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-black after:transition-all after:duration-300 hover:after:w-full font-semibold text-lg">Home</span></Link></li>

            </ul>
            {
                token ?
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="size-10 rounded-full">
                                <img alt={name || ""} src={image || ""} title={name || ""} />
                            </div>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-5 w-40 p-2.5 shadow-lg border">
                            <li>
                                <Link to="/user/dashboard/profile" className="justify-between font-semibold mb-1.5">Dashboard</Link>
                            </li>
                            <li>
                                <button type="button" onClick={handleLogout} className="font-semibold">Logout</button>
                            </li>
                        </ul>
                    </div>
                    :
                    <ul className="flex gap-10 font-semibold">
                        <li><Link to="/login">Login</Link></li>
                        <li><Link to="/">Sign-up</Link></li>
                    </ul>
            }
        </nav>
    )
}

export default Navbar;