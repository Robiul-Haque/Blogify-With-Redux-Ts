import { Link } from "react-router";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { logout } from "../redux/features/auth/authSlice";

const Navbar = () => {
    const { name, image, token } = useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch();

    return (
        <nav className="flex justify-between items-center py-4 px-50">
            <h1 className="text-2xl font-bold">Blogify</h1>
            {
                token ? <>
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="size-10 rounded-full">
                                <img alt={name || ""} src={image || ""} title={name || ""} />
                            </div>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2.5 shadow">
                            <li>
                                <Link to="/user/Dashboard" className="justify-between font-semibold mb-1.5">Dashboard</Link>
                            </li>
                            <li>
                                <button type="button" onClick={() => dispatch(logout())} className="font-semibold">Logout</button>
                            </li>
                        </ul>
                    </div>
                </>
                    :
                    <>
                        <ul className="flex gap-10 font-semibold">
                            <li><Link to="/login">Login</Link></li>
                            <li><Link to="/">Sign-up</Link></li>
                        </ul>
                    </>
            }
        </nav>
    )
}

export default Navbar;