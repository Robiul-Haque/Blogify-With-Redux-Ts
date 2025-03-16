import { Link } from "react-router";

const Navbar = () => {
    return (
        <nav className="flex justify-between items-center bg-base-300 py-5 px-50">
            <h1 className="text-2xl font-bold">Blogify</h1>
            <ul className="flex gap-10 font-semibold">
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/">Sign-up</Link></li>
            </ul>
        </nav>
    )
}

export default Navbar;