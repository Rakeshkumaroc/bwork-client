import Navbar from "../../components/global/Navbar";
import Hero from "../../components/landing/Hero";

const Home = () => {
  return (
    <>
      <Navbar isActive="Home" />
      <div className="px-4  sm:px-10 xl:px-24 bg-light-cream min-h-screen">
        <Hero />
      </div>
    </>
  );
};

export default Home;
