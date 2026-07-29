import Navbar from "./components/layout/Navbar";
import Hero from "./components/home/Hero";
import CategoryGrid from "./components/category/CategoryGrid";
import AdvertisementGrid from "./components/advertisement/AdvertisementGrid";

export default function App() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <Hero />
      <CategoryGrid />
      <AdvertisementGrid />
    </div>
  );
}