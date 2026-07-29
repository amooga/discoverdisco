import Navbar from "./components/layout/Navbar";
import Hero from "./components/home/Hero";

export default function App() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <Hero />
    </div>
  );
}