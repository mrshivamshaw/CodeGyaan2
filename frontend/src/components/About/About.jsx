import React from "react";
import HeroSection from "./HeroSection";
import NavBar from "../NavBar/NavBar";
import FoundingStory from "./FoundingStory";
import Footer from "../Footer/Footer";
import MiddleBanner from "./MiddleBanner";
import WorldClass from "./WorldClass";
import Review from "./Review";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <NavBar />
      <main>
        <HeroSection />
        <MiddleBanner />
        <FoundingStory />
        <WorldClass />
        <Review />
      </main>
      <Footer />
    </div>
  );
};

export default About;
