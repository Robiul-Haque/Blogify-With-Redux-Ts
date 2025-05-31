
const Footer = () => {
    return (
        <footer className="bg-gray-100 text-black py-8 mt-10">
            <div className="container mx-auto px-4 text-center">
                <p className="text-md font-semibold">&copy; {new Date().getFullYear()} Blogify. All rights reserved.</p>
                <p className="text-md mt-2">+8801893187274</p>
            </div>
        </footer>
    )
}

export default Footer;