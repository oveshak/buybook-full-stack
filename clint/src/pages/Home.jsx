import Hero from "../component/home/Hero";
import RecentlyAdd from "../component/home/RecentlyAdd";


const Home = () => {
    return (
        <div className="bg-zinc-900 text-white px-10 py-8">
          <Hero/>
          <RecentlyAdd/>
        </div>
    );
}

export default Home;
