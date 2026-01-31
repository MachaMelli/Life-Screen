import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import Philosophy from "@/components/landing/Philosophy";
import Privacy from "@/components/landing/Privacy";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col landing-theme">
      <Header />
      <main className="flex-grow">
        <Hero />
        <Features />
        <Philosophy />
        <Privacy />
      </main>
      <Footer />
    </div>
  );
}
