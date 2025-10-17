"use client";
import React, { useState } from "react";

export default function Footer() {
  const [hovered, setHovered] = useState({ x: false, instagram: false, linkedin: false, iiit: false });

  const socialLinks = [
    {
      name: "X",
      url: "https://x.com/NSSIIITH",
      icon: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",
      color: "#1da1f2",
      key: "x"
    },
    {
      name: "Instagram",
      url: "https://www.instagram.com/nss_iiith/",
      icon: "M7.75 2C4.13 2 2 4.13 2 7.75v8.5C2 19.87 4.13 22 7.75 22h8.5c3.62 0 5.75-2.13 5.75-5.75v-8.5C22 4.13 19.87 2 16.25 2h-8.5zm0 2h8.5c2.54 0 3.75 1.21 3.75 3.75v8.5c0 2.54-1.21 3.75-3.75 3.75h-8.5C5.21 20 4 18.79 4 16.25v-8.5C4 5.21 5.21 4 7.75 4zm8.25 2.75a1.25 1.25 0 1 0 0 2.5 1.25 1.25 0 0 0 0-2.5zm-4.25 2.25a5.25 5.25 0 1 0 0 10.5 5.25 5.25 0 0 0 0-10.5zm0 2a3.25 3.25 0 1 1 0 6.5 3.25 3.25 0 0 1 0-6.5z",
      color: "#e1306c",
      key: "instagram"
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/company/nssiiith/",
      icon: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
      color: "#0a66c2",
      key: "linkedin"
    },
    {
      name: "IIIT Hyderabad",
      url: "https://www.iiit.ac.in/",
      icon: "M3 6.75A3.75 3.75 0 0 1 6.75 3h10.5A3.75 3.75 0 0 1 21 6.75v10.5A3.75 3.75 0 0 1 17.25 21H6.75A3.75 3.75 0 0 1 3 17.25V6.75zm2 0v10.5c0 .966.784 1.75 1.75 1.75h10.5c.966 0 1.75-.784 1.75-1.75V6.75c0-.966-.784-1.75-1.75-1.75H6.75A1.75 1.75 0 0 0 5 6.75zm7 2.25a2.25 2.25 0 1 1 0 4.5 2.25 2.25 0 0 1 0-4.5zm0 2a.25.25 0 1 0 0 .5.25.25 0 0 0 0-.5z",
      color: "#E90000",
      key: "iiit"
    },
    {
      name: "Website",
      url: "https://nss.iiit.ac.in/",
      icon: "M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm0 2a8 8 0 0 1 8 8c0 4.418-3.582 8-8 8s-8-3.582-8-8a8 8 0 0 1 8-8zm0 2a6 6 0 0 0-6 6c0 3.314 2.686 6 6 6s6-2.686 6-6a6 6 0 0 0-6-6zm0 2a4 4 0 0 1 4 4c0 2.21-1.79 4-4 4s-4-1.79-4-4a4 4 0 0 1 4-4z",
      color: "#4285F4",
      key: "website"
    }
  ];

  const quickLinks = [
  { name: "Home", href: "/" },
  { name: "Events", href: "/events" },
  { name: "Gallery", href: "#" },
  { name: "Members", href: "/members" },
  { name: "FAQs", href: "#" },
  // { name: "Contact Us", href: "/contact" },
  { name: "Privacy Policy", href: "https://www.iiit.ac.in/privacy-policy/" }
  ];

  const getIconStyle = (key) => ({
    width: 20,
    height: 20,
    transition: "all 0.3s ease",
    filter: hovered[key] ? `drop-shadow(0 0 8px ${key === "iiit" ? "#E90000" : socialLinks.find(link => link.key === key)?.color})` : "none",
    transform: hovered[key] ? "scale(1.1)" : "scale(1)"
  });

  return (
  <footer id="footer" style={{
      background: "#e0b4a877",
      color: "#222",
      fontFamily: "'Roboto', Arial, sans-serif",
      position: "relative",
      overflow: "hidden",
      borderTop: "3px solid #E90000" // rgba(0,0,0,0.12)"
    }}>
      {/* Subtle background pattern */}
      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "url('data:image/svg+xml,<svg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"><g fill=\"none\" fill-rule=\"evenodd\"><g fill=\"%23ffffff\" fill-opacity=\"0.02\"><circle cx=\"30\" cy=\"30\" r=\"2\"/></g></g></svg>') repeat",
        pointerEvents: "none"
      }} />
      {/* Main content */}
      <div style={{
        position: "relative",
        maxWidth: "1400px",
        margin: "0 auto",
        padding: "40px 40px 25px" // Increased left/right padding
      }}>
        {/* Top section - now includes all sections in one row */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr 1fr", // Equal space for all columns
          gap: "32px", // Slightly increased gap for more breathing room
          marginBottom: "40px"
        }}>
          {/* Brand section */}
          <div>
            <div style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "20px"
            }}>
              <a href="https://nss.iiit.ac.in/" target="_blank" rel="noopener noreferrer">
                <img 
                  src="/favicon.ico" 
                  alt="NSS Logo" 
                  style={{
                    width: 70, 
                    height: 70,
                    marginRight: 20,
                    filter: "brightness(1.2)",
                    cursor: "pointer"
                  }} 
                />
              </a>
              <a href="https://www.iiit.ac.in/" target="_blank" rel="noopener noreferrer">
                <img 
                  src="/iiit-logo-color.png" 
                  alt="IIIT Logo" 
                  style={{
                    width: 150, 
                    height: 90, 
                    filter: "brightness(1.2)",
                    cursor: "pointer"
                  }} 
                />
              </a>
            </div>
            <h3 style={{
              margin: "0 0 16px 0",
              fontSize: "24px",
              fontWeight: "bold",
              color: "#000",
              fontFamily: "Roboto, Arial, sans-serif"
            }}>
              NSS IIIT Hyderabad
            </h3>
            <p style={{
              margin: 0,
              fontSize: "16px",
              lineHeight: "1.6",
              color: "#444",
              maxWidth: "300px"
            }}>
              Building a better society through service, innovation, and community engagement.
            </p>
          </div>
          
          {/* Social Media */}
          <div>
            <h4 style={{
              margin: "0 0 24px 0",
              fontSize: "18px",
              fontWeight: "bold",
              color: "#000",
              fontFamily: "Roboto, Arial, sans-serif"
            }}>
              Connect With Us
            </h4>
            <div style={{
              display: "flex",
              flexDirection: "column",
              gap: "12px",
              alignItems: "flex-start"
            }}>
              {socialLinks.map((social) => (
                <a
                  key={social.key}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    padding: "8px 16px",
                    background: "rgba(255, 255, 255, 0.05)",
                    borderRadius: "25px",
                    textDecoration: "none",
                    color: "#444",
                    fontSize: "14px",
                    fontWeight: "500",
                    transition: "all 0.3s ease",
                    border: "1px solid transparent",
                    backdropFilter: "blur(10px)",
                    width: "fit-content"
                  }}
                  onMouseEnter={(e) => {
                    setHovered(prev => ({ ...prev, [social.key]: true }));
                    e.target.style.background = `rgba(${parseInt(social.color.slice(1, 3), 16)}, ${parseInt(social.color.slice(3, 5), 16)}, ${parseInt(social.color.slice(5, 7), 16)}, 0.1)`;
                    e.target.style.borderColor = social.color;
                    e.target.style.color = "#E90000";
                    e.target.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    setHovered(prev => ({ ...prev, [social.key]: false }));
                    e.target.style.background = "rgba(255, 255, 255, 0.05)";
                    e.target.style.borderColor = "transparent";
                    e.target.style.color = "#444";
                    e.target.style.transform = "translateY(0)";
                  }}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    style={getIconStyle(social.key)}
                  >
                    <path d={social.icon} />
                  </svg>
                  {social.name}
                </a>
              ))}
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 style={{
              margin: "0 0 24px 0",
              fontSize: "18px",
              fontWeight: "bold",
              color: "#000",
              fontFamily: "Roboto, Arial, sans-serif"
            }}>
              Quick Links
            </h4>
            <ul style={{
              listStyle: "none",
              padding: 0,
              margin: 0,
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "12px"
            }}>
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href}
                    target={link.href.startsWith("http") ? "_blank" : "_self"}
                    rel={link.href.startsWith("http") ? "noopener noreferrer" : ""}
                    style={{
                      textDecoration: "none",
                      color: "#444",
                      fontSize: "14px",
                      fontWeight: "500",
                      transition: "all 0.3s ease",
                      display: "block",
                      padding: "4px 0",
                      borderLeft: "2px solid transparent",
                      paddingLeft: "8px"
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.color = "#E90000";
                      e.target.style.borderLeftColor = "#E90000";
                      e.target.style.transform = "translateX(4px)";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.color = "#444";
                      e.target.style.borderLeftColor = "transparent";
                      e.target.style.transform = "translateX(0)";
                    }}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Contact Info - now in the same row */}
          <div>
            <h4 style={{
              margin: "0 0 18px 0",
              fontSize: "18px",
              fontWeight: "bold",
              color: "#000",
              fontFamily: "Roboto, Arial, sans-serif"
            }}>
              Contact Info
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="#E90000" style={{ marginTop: "2px", flexShrink: 0 }}>
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
                <a 
                  href="mailto:nss@iiit.ac.in" 
                  style={{
                    color: "#444",
                    textDecoration: "none",
                    fontSize: "14px",
                    transition: "color 0.3s ease"
                  }}
                  onMouseEnter={(e) => e.target.style.color = "#E90000"}
                  onMouseLeave={(e) => e.target.style.color = "#444"}
                >
                  nss@iiit.ac.in
                </a>
              </div>
              <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="#E90000" style={{ marginTop: "2px", flexShrink: 0 }}>
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
                <a
                  href="https://maps.app.goo.gl/SW5tAYxYni7B7ifd9"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: "#444",
                    textDecoration: "none",
                    fontSize: "14px",
                    lineHeight: "1.4",
                    transition: "color 0.3s ease"
                  }}
                  onMouseEnter={(e) => e.target.style.color = "#E90000"}
                  onMouseLeave={(e) => e.target.style.color = "#444"}
                >
                  Professor CR Rao Rd, Gachibowli<br />
                  Hyderabad, Telangana 500032
                </a>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom section */}
        <div style={{
          borderTop: "2px solid #E90000",
          paddingTop: "20px",
          textAlign: "center"
        }}>
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "16px"
          }}>
            <p style={{
              margin: 0,
              fontSize: "14px",
              color: "#444"
            }}>
              © 2025 IIIT Hyderabad. All rights reserved.
            </p>
            <p style={{
              margin: 0,
              fontSize: "18px",
              color: "#444",
              display: "flex",
              alignItems: "center",
              gap: "6px",
              fontWeight: "bold"
            }}>
              Developed & Maintained with 
              <span style={{
                color: "#ff4444",
                fontSize: "22px",
                fontWeight: "bold",
                animation: "heartbeat 1.5s ease-in-out infinite alternate"
              }}>
                ♥
              </span>
              by NSS Tech Team
            </p>
          </div>
        </div>
      </div>
      <style jsx>{`
        @keyframes heartbeat {
          0% { transform: scale(1); }
          100% { transform: scale(1.1); }
        }
        @media (max-width: 768px) {
          footer > div {
            padding: 30px 15px 15px !important;
          }
          footer h3 {
            font-size: 20px !important;
          }
          footer h4 {
            font-size: 16px !important;
          }
          footer ul {
            grid-template-columns: 1fr !important;
          }
          footer > div > div:first-child {
            grid-template-columns: 1fr !important;
          }
          footer > div > div:last-child > div {
            justify-content: center !important;
            text-align: center;
          }
          footer > div > div:last-child p {
            font-size: 12px !important;
          }
          footer img {
            width: 40px !important;
            height: 40px !important;
          }
        }
      `}</style>
    </footer>
  );
}