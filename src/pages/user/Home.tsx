import Navbar from "../../shared/Navbar";
import Hero from "../../components/user/Hero";
import Blog from "../../components/user/Blog";
import Footer from "../../shared/Footer";

const Home = () => {
    return (
        <>
            <Navbar />
            <Hero />
            <Blog />
            <Footer />
        </>
    )
}

export default Home;