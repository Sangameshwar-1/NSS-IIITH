"use client";
import React, { useState, useEffect, ReactNode } from "react";

interface CarouselProps {
  images: string[];
  heading?: string;
  interval?: number;
  children?: ReactNode; // Overlay content
}

const Carousel: React.FC<CarouselProps> = ({
  images,
  heading,
  interval = 3000,
  children,
}) => {
  const [current, setCurrent] = useState(0);
  const [transitioning, setTransitioning] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTransitioning(true);
      setTimeout(() => {
        setCurrent((prev) => (prev + 1) % images.length);
        setTransitioning(false);
      }, 400); // transition duration
    }, interval);
    return () => clearInterval(timer);
  }, [images.length, interval]);

  if (images.length === 0) return null;

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "80vh",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(250, 235, 232, 1)",
      }}
    >
      {/* Carousel Image */}
      <img
        src={images[current]}
        alt={`carousel-${current}`}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transition: "opacity 0.5s cubic-bezier(0.4,0,0.2,1)",
          opacity: transitioning ? 0.5 : 1,
          borderRadius: "0 0 2rem 2rem",
          boxShadow: "0 8px 32px 0 rgba(250, 235, 232, 1)",
          display: "block",
          background: "rgba(250, 235, 232, 1)",
        }}
      />

      {/* Overlay content (e.g., Navbar) */}
      <div style={{ position: "absolute", top: 0, left: 0, width: "100%", zIndex: 2 }}>
        {children}
      </div>

      {/* Responsive Heading */}
      {heading && (
        <h1
          style={{
            position: "absolute",
            top: "45%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            color: "#fff",
            fontFamily: "serif",
            fontWeight: "bold",
            width: "60%",
            maxWidth: "800px",
            fontSize: "clamp(1.5rem, 5vw, 3rem)", // responsive, no prop needed
            zIndex: 3,
            textAlign: "center",
            lineHeight: "1.2",
            wordWrap: "break-word",
          }}
        >
          {heading}
        </h1>
      )}

      {/* Carousel Dots */}
      <div
        style={{
          position: "absolute",
          bottom: "2%",
          left: 0,
          right: 0,
          textAlign: "center",
          zIndex: 3,
        }}
      >
        {images.map((_, idx) => (
          <span
            key={idx}
            style={{
              display: "inline-block",
              width: "12px",
              height: "12px",
              borderRadius: "50%",
              background: idx === current ? "#fff" : "#888",
              margin: "0 6px",
              cursor: "pointer",
              transition: "background 0.3s",
            }}
            onClick={() => setCurrent(idx)}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
