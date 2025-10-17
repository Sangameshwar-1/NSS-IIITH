import React from "react";
import Faq from "@/components/faq/Faq";
import Footer from '@/utils/Footer';
import Navbar from "@/utils/Navbar";
import Carousel from "@/utils/Carousel";
import Testimonials from "@/components/home/Testimonials";
import AboutUs from "@/components/home/AboutUs";
import FlagshipEvents from "@/components/home/FlagshipEvents";
import VolunteerReg from "@/components/home/VolunteerReg";
// import Header from '@/components/Header/Header';


const images = [
  "/carosel-imgs/1.jpeg",
  "/carosel-imgs/2.jpg",
  "/carosel-imgs/3.jpg"
];

const heading = "";

export default function Home() {
  return (
    <div
      style={{
        margin: 0,
        padding: 0,
        boxSizing: "border-box",
        width: "100vw",
        minHeight: "100vh",
        overflowY: "auto",
        overflowX: "hidden",
        position: "relative",
        top: 0,
        left: 0,
        background: "#FAEBE8"
      }}
    >
      <Navbar />
      <div
        style={{
          margin: 0,
          padding: 0,
          boxSizing: "border-box",
          width: "100vw",
          background: "#faf7f7ff"
        }}
      >
        <Carousel images={images} interval={3000} heading={heading}/>
      </div>
      <AboutUs />
      <FlagshipEvents />
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "1rem" }}>
        <Testimonials />
      </div>
      <VolunteerReg />
      <Footer />
    </div>
  );
}