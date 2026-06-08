import React from "react";
import NavBar from "../../components/NavBar/NavBar";
import Hero from "../../components/Home/Hero/Hero";
import HomeDown from "../../components/HomeDown/HomeDown";
import CourseView from "../../components/Home/CourseView/CourseView";
import HomeSection3 from "../../components/Home/HomeSection3/HomeSection3";
import HomeSection4 from "../../components/Home/HomeSection4/HmoeSection4";
import BecomeAnInstructor from "../../components/Home/HomeSection6/BecomeAnInstructor";
import HomeSection5 from "../../components/Home/HomeSection5/HomeSection5";
import Footer from "../../components/Footer/Footer";
import SuccessStory from "../../components/Home/HomeSection7/SuccessStory";

const Home = () => {
  return (
    <div className="min-h-screen bg-background">
      <NavBar />
      <main>
        <Hero />
        <HomeDown />
        <CourseView />
        <HomeSection3 />
        <HomeSection4 />
        <HomeSection5 />
        <BecomeAnInstructor />
        <SuccessStory />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
