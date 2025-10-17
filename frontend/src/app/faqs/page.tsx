import React from "react";
import Faq from "@/components/faq/Faq";
import Navbar from "@/utils/Navbar";
import Footer from "@/utils/Footer";
import Carousel from "@/utils/Carousel";

const images = [
  "/carosel-imgs/1.jpeg",
  "/carosel-imgs/2.jpg",
  "/carosel-imgs/3.jpg"
];

const heading = "FREQUENTLY ASKED QUESTIONS";

export default function FaqPage() {
  return (
    <div>
      <Carousel images={images} interval={3000} heading={heading}/>
      <Navbar />
      <Faq />
      <Footer />
    </div>
  );
}