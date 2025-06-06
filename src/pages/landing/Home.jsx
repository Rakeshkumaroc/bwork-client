import Navbar from "../../components/global/Navbar";
import Hero from "../../components/landing/Hero";

const Home = () => {
  return (
    <div className="px-4 sm:px-10 lg:px-24 bg-light-cream min-h-screen">
      <Navbar isActive="Home" />
      <Hero />
    </div>
  );
};

export default Home;
