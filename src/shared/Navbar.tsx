import { Link } from "react-router";

const Navbar = () => {
    return (
        <nav className="flex justify-between items-center py-4 px-50">
            <h1 className="text-2xl font-bold">Blogify</h1>
            <ul className="flex gap-10 font-semibold">
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/">Sign-up</Link></li>
            </ul>
            <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                    <div className="w-10 rounded-full">
                        <img
                            alt="Tailwind CSS Navbar component"
                            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                    </div>
                </div>
                <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2.5 shadow">
                    <li>
                        <Link to="/user/Dashboard" className="justify-between font-semibold mb-1">Dashboard</Link>
                    </li>
                    <li>
                        <button type="button" className="font-semibold">Logout</button>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar;