"use client";

import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

import { testimonials, Testimonial } from "@/data/testimonials";

const Testimonials = () => {
  const [current, setCurrent] = useState(0);

  return (
    <section
      style={{
        padding: "3rem 1rem",
        width: "100%",
        maxWidth: "1100px",
        margin: "0 auto",
        background: "#FAEBE8",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          fontWeight: "400",
          letterSpacing: "0.5px",
          color: "#729bf2",
          fontSize: "2.2rem",
          marginBottom: "2rem",
          fontFamily: "Playfair Display, Georgia, serif",
        }}
      >
        Testimonials
      </h2>

      <Swiper
        modules={[Autoplay]}
        loop={true}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        slidesPerView={"auto"}
        centeredSlides
        onSlideChange={(swiper) => setCurrent(swiper.realIndex)}
        style={{ overflow: "visible" }}
      >
        {testimonials.map((t: Testimonial, index: number) => {
          const isActive = index === current;
          const isNext = index === (current + 1) % testimonials.length;
          const isPrev =
            index === (current - 1 + testimonials.length) % testimonials.length;

          let transform = "scale(0.9)";
          if (isActive) {
            transform = "scale(1)";
          } else if (isNext) {
            transform = "translateX(40px) scale(0.9)";
          } else if (isPrev) {
            transform = "translateX(-40px) scale(0.9)";
          }

          return (
            <SwiperSlide
              key={index}
              style={{
                background: "white",
                borderRadius: "16px",
                boxShadow: isActive
                  ? "0 6px 16px rgba(0,0,0,0.2)"
                  : "0 2px 8px rgba(0,0,0,0.1)",
                width: isActive ? "90%" : "80%",
                maxWidth: "600px",
                minHeight: "280px",
                display: "flex",
                flexDirection: "row",
                overflow: "hidden",
                position: "relative",
                transform,
                opacity: isActive ? 1 : 0.7,
                zIndex: isActive ? 2 : 1,
                transition: "all 0.6s ease-in-out",
              }}
            >
              {/* Left side: avatar */}
              <div
                style={{
                  flex: "4 0 0",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "#FEF8E0",
                }}
              >
                <img
                  src="/favicon.ico"
                  alt="avatar"
                  style={{
                    width: isActive ? "100px" : "80px",
                    height: isActive ? "100px" : "80px",
                    borderRadius: "50%",
                    objectFit: "cover",
                    boxShadow: isActive
                      ? "0 2px 12px rgba(0,0,0,0.18)"
                      : "0 1px 4px rgba(0,0,0,0.10)",
                    transition: "all 0.4s ease-in-out",
                  }}
                />
              </div>

              {/* Right side: text */}
              <div
                style={{
                  flex: "6 0 0",
                  padding: "1.5rem",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <h3
                  style={{
                    margin: 0,
                    fontSize: "1rem",
                    fontWeight: "600",
                  }}
                >
                  {t.name} – {t.title}
                </h3>
                <p
                  style={{
                    marginTop: "0.8rem",
                    fontSize: "1rem",
                    lineHeight: 1.5,
                    textAlign: "left",
                  }}
                >
                  “{t.quote}”
                </p>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>

      {/* Mobile-specific styles */}
      <style jsx>{`
        @media (max-width: 768px) {
          section {
            padding: 2rem 1rem;
          }
          h2 {
            font-size: 1.8rem !important;
            margin-bottom: 1.5rem;
          }
          .swiper-slide {
            flex-direction: column !important;
            width: 95% !important;
            min-height: auto !important;
          }
          .swiper-slide img {
            width: 80px !important;
            height: 80px !important;
            margin-top: 1rem;
          }
          .swiper-slide div:last-child {
            padding: 1rem !important;
            text-align: center;
          }
          .swiper-slide h3 {
            font-size: 1rem !important;
          }
          .swiper-slide p {
            font-size: 0.95rem !important;
            text-align: center !important;
          }
        }
      `}</style>
    </section>
  );
};

export default Testimonials;
