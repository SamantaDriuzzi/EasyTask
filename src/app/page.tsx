import AboutUs from "@/components/aboutUs";
import BenefitsSection from "@/components/benefits-section/benefits-section";
import MentalHealth from "@/components/mentalHealth";
import WelcomeSection from "@/components/welcome-section/Bienvenida";
import Footer from "@/components/footer/Footer";

const LandingPage = () => {
  return (
    <>
      <WelcomeSection />
      <BenefitsSection />
      <MentalHealth />
      <AboutUs />
      <Footer />
    </>
  );
};
export default LandingPage;
