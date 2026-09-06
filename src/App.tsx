import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import InfoBar from '@/components/InfoBar';
import About from '@/components/About';
import Games from '@/components/Games';
import Pricing from '@/components/Pricing';
import Offers from '@/components/Offers';
import Booking from '@/components/Booking';
import Birthday from '@/components/Birthday';
import Safety from '@/components/Safety';
import Gallery from '@/components/Gallery';
import FAQ from '@/components/FAQ';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import BackToTop from '@/components/BackToTop';
import Chatbot from '@/components/Chatbot';

function App() {
  return (
    <div className="min-h-screen bg-ink-950 font-body text-ink-100 antialiased">
      <Navbar />
      <main>
        <Hero />
        <InfoBar />
        <About />
        <Games />
        <Pricing />
        <Offers />
        <Booking />
        <Birthday />
        <Safety />
        <Gallery />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
      <Chatbot />
    </div>
  );
}

export default App;
