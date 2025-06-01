
const Footer = () => {
    return (
        <footer className="bg-gray-100 text-black py-8">
            <div className="container mx-auto px-4 text-center">
                <div className="flex justify-center items-center gap-5 pb-4">
                    <p className="text-md font-semibold mt-2">+8801893-187274</p>
                    <a href="https://github.com/Robiul-Haque" target="_blank" className="font-semibold text-md mt-2">Github</a>
                </div>
                <p className="text-md font-semibold">&copy; {new Date().getFullYear()} Blogify. All rights reserved.</p>
            </div>
        </footer>
    )
}

export default Footer;