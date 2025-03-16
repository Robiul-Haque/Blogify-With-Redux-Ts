import Navbar from "../../shared/Navbar";

const Header = () => {
    return (
        <>
            <Navbar />
            <div className="flex justify-center items-center gap-x-4 h-80">
                <label className="input">
                    <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></g></svg>
                    <input type="search" required placeholder="Search" />
                </label>
                <button type="submit" className="btn btn-neutral">Search</button>
            </div>
        </>
    )
}

export default Header;