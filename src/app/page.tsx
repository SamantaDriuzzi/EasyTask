"use client";

import React, { useState } from "react";
import Link from "next/link";
import AboutUs from "@/components/aboutUs";
import BenefitsSection from "@/components/benefits-section/benefits-section";
import MentalHealth from "@/components/mentalHealth";
import WelcomeSection from "@/components/welcome-section/Bienvenida";
import Footer from "@/components/footer/Footer";
import Newsletter from "@/components/Newletter";

const LandingPage = () => {
  const [showNewsletter, setShowNewsletter] = useState(false);

  const handleNewsletterOpen = () => {
    setShowNewsletter(true);
  };

  const handleNewsletterClose = () => {
    setShowNewsletter(false);
  };

  return (
    <div className="landing-page relative">
      <WelcomeSection />
      <BenefitsSection />
      <MentalHealth />
      <AboutUs />
      {showNewsletter && <Newsletter onClose={handleNewsletterClose} />}
      <Footer handleNewsletterOpen={handleNewsletterOpen} />
    </div>
  );
};

export default LandingPage;
