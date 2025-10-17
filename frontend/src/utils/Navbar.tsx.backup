"use client";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

const ACTIVE_BG = "#E90000"; // Airtel Red
const NSS_BLUE = "#1e3a8a"; // NSS Blue theme

const navItems = [
    { label: "Home", href: "/" },
    { label: "Events", href: "/events" },
    { label: "FAQs", href: "/faqs" },
    { label: "Members", href: "/members" },
    { label: "Contact Us", href: "/contact" }
];

const Navbar = () => {
    const router = useRouter();
    const pathname = usePathname();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [windowWidth, setWindowWidth] = useState(1200);
    const [scrolled, setScrolled] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const [showInitialAnimation, setShowInitialAnimation] = useState(false);
    const hasAnimatedRef = useRef(false);
    const [uid, setUid] = useState<string | null>(null);

    const particles = Array.from({ length: 8 }, (_, i) => ({
        id: i,
        delay: i * 0.5,
        duration: 3 + (i % 3),
    }));

    const handleContactClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        const footer = document.getElementById("footer");
        if (footer) {
            footer.scrollIntoView({ behavior: "smooth" });
        }
        setIsMobileMenuOpen(false);
    };

    const createRipple = (e: React.MouseEvent<HTMLElement>) => {
        const button = e.currentTarget;
        const rect = button.getBoundingClientRect();
        const ripple = document.createElement('div');
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        ripple.style.cssText = `
            position: absolute;
            left: ${x}px;
            top: ${y}px;
            width: ${size}px;
            height: ${size}px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.4);
            pointer-events: none;
            transform: scale(0);
            animation: ripple 0.6s ease-out;
        `;
        button.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
    };

    const toggleMobileMenu = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const handleNavItemClick = (href: string, e: React.MouseEvent<HTMLElement>) => {
        createRipple(e);
        if (isMobileMenuOpen) {
            setIsMobileMenuOpen(false);
        }
    };
    const isMobile = windowWidth <= 1000;

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
            document.body.style.paddingRight = 'var(--scrollbar-width, 0px)';
        } else {
            document.body.style.overflow = 'unset';
            document.body.style.paddingRight = '0px';
        }
        return () => {
            document.body.style.overflow = 'unset';
            document.body.style.paddingRight = '0px';
        };
    }, [isMobileMenuOpen]);

    useEffect(() => {
        setIsMounted(true);
        setWindowWidth(window.innerWidth);
        if (!hasAnimatedRef.current) {
            setShowInitialAnimation(true);
            hasAnimatedRef.current = true;
            setTimeout(() => {
                setShowInitialAnimation(false);
            }, 700);
        } else {
            setShowInitialAnimation(false);
        }
    }, []);

    useEffect(() => {
        if (!isMounted) return;
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [isMounted]);

    useEffect(() => {
        const match = document.cookie.match(/(?:^|; )uid=([^;]*)/);
        setUid(match ? decodeURIComponent(match[1]) : null);
    }, []);

    // Show loading state for first render to prevent hydration mismatch
    if (!isMounted) {
        return (
            <nav 
                style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "100%",
                    background: "linear-gradient(to bottom, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 70%, transparent 100%)",
                    color: "#fff",
                    padding: "0.8rem 2rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    zIndex: 2000,
                    backdropFilter: "blur(10px)",
                    WebkitBackdropFilter: "blur(10px)",
                    boxSizing: "border-box",
                }}
            >
                {/* Logo Section - Always show */}
                <div className="logo-container" style={{ 
                    position: "relative", 
                    display: "flex", 
                    alignItems: "center", 
                    gap: "1rem" 
                }}>
                    <a
                        href="https://nss.iiit.ac.in"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                            width: 40,
                            height: 40,
                            borderRadius: "50%",
                            overflow: "hidden",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            marginRight: "0.7rem",
                            boxShadow: "0 2px 8px rgba(30,58,138,0.15)",
                            background: "white",
                            cursor: "pointer"
                        }}
                    >
                        <img
                            src="/favicon.ico"
                            alt="favicon"
                            style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover"
                            }}
                        />
                    </a>
                    <div style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        gap: "0.5rem",
                    }}>
                        <span style={{
                            fontSize: "1.2rem",
                            color: "#fff",
                            letterSpacing: "2px",
                            fontFamily: "Merriweather, Georgia, serif",
                            fontWeight: "bold",
                            textShadow: "2px 2px 4px rgba(0,0,0,0.5)"
                        }}>
                            NSS,
                        </span>
                        <span style={{
                            fontSize: "1.2rem",
                            color: "rgba(255, 255, 255, 0.85)",
                            letterSpacing: "1px",
                            fontFamily: "Merriweather, Georgia, serif",
                            fontWeight: "bold",
                            textShadow: "1px 1px 2px rgba(0,0,0,0.3)"
                        }}>
                            IIIT HYDERABAD
                        </span>
                    </div>
                </div>

                {/* Desktop Navigation - show by default during SSR */}
                <div style={{
                    display: "flex",
                    gap: "0.5rem",
                    alignItems: "center",
                    flexWrap: "wrap",
                    overflow: "hidden",
                }}>
                    {navItems.map((item) => {
                        const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
                        if (item.label === "Contact Us") {
                            return (
                                <a
                                    key={item.label}
                                    href="#footer"
                                    style={{
                                        color: "#fff",
                                        textDecoration: "none",
                                        fontWeight: "600",
                                        padding: "0.5rem 1.2rem",
                                        borderRadius: "12px",
                                        border: "2px solid transparent",
                                        background: "rgba(255, 255, 255, 0.1)",
                                        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                                        cursor: "pointer",
                                        fontSize: "0.9rem",
                                        letterSpacing: "0.5px",
                                        display: "inline-block"
                                    }}
                                >
                                    {item.label}
                                </a>
                            );
                        }
                        return (
                            <Link 
                                key={item.label + item.href}
                                href={item.href}
                                style={{
                                    color: "#fff",
                                    textDecoration: "none",
                                    fontWeight: "600",
                                    padding: "0.5rem 1.2rem",
                                    borderRadius: "12px",
                                    border: isActive ? `2px solid ${ACTIVE_BG}` : "2px solid transparent",
                                    background: isActive 
                                        ? `linear-gradient(135deg, ${ACTIVE_BG} 0%, #ff4444 100%)`
                                        : "transparent",
                                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                                    cursor: "pointer",
                                    fontSize: "0.9rem",
                                    letterSpacing: "0.5px",
                                    boxShadow: isActive ? "0 4px 15px rgba(233, 0, 0, 0.4)" : "none",
                                    transform: isActive ? "translateY(-1px)" : "translateY(0)",
                                    display: "inline-block"
                                }}
                            >
                                {item.label}
                            </Link>
                        );
                    })}
                    {/* Login/Profile Button */}
                    {!uid ? (
                        <button
                            onClick={() => window.location.replace("http://localhost:8000/login")}
                            style={{
                                padding: "0.5rem 1.2rem",
                                borderRadius: "12px",
                                background: NSS_BLUE,
                                color: "#fff",
                                fontWeight: 600,
                                border: "none",
                                cursor: "pointer",
                                marginLeft: "0.5rem"
                            }}
                        >
                            Login
                        </button>
                    ) : (
                        <button
                            onClick={() => window.location.replace(`http://localhost:3000/me/profile/${uid}`)}
                            style={{
                                padding: "0.3rem",
                                borderRadius: "50%",
                                background: "#fff",
                                border: `2px solid ${NSS_BLUE}`,
                                cursor: "pointer",
                                width: 40,
                                height: 40,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                marginLeft: "0.5rem"
                            }}
                            title="Go to profile"
                        >
                            <img
                                src="/favicon.ico"
                                alt="Profile"
                                style={{
                                    width: "28px",
                                    height: "28px",
                                    borderRadius: "50%",
                                    objectFit: "cover"
                                }}
                            />
                        </button>
                    )}
                </div>
            </nav>
        );
    }

    return (
        <>
            <style>{`
                @keyframes ripple {
                    to {
                        transform: scale(2);
                        opacity: 0;
                    }
                }
                @keyframes float {
                    0%, 100% { transform: translateY(0px) rotate(0deg); }
                    25% { transform: translateY(-10px) rotate(90deg); }
                    50% { transform: translateY(-15px) rotate(180deg); }
                    75% { transform: translateY(-5px) rotate(270deg); }
                }
                @keyframes pulse {
                    0%, 100% { opacity: 0.3; transform: scale(1); }
                    50% { opacity: 0.8; transform: scale(1.1); }
                }
                @keyframes slideDown {
                    from { transform: translateY(-100%); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }
                @keyframes slideInRight {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
                @keyframes slideInFromRight {
                    from { transform: translateX(30px); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
                @keyframes glowPulse {
                    0%, 100% { box-shadow: 0 0 5px rgba(255, 255, 255, 0.1); }
                    50% { box-shadow: 0 0 20px rgba(255, 255, 255, 0.3), 0 0 30px rgba(233, 0, 0, 0.2); }
                }
                .navbar-enter {
                    animation: ${showInitialAnimation ? 'slideDown 0.6s ease-out' : 'none'};
                }
                .floating-particle {
                    position: absolute;
                    width: 4px;
                    height: 4px;
                    background: rgba(255, 255, 255, 0.6);
                    border-radius: 50%;
                    animation: float 3s ease-in-out infinite;
                }
                .nav-item {
                    position: relative;
                    overflow: hidden;
                }
                .nav-item::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: -100%;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
                    transition: left 0.5s;
                }
                .nav-item:hover::before {
                    left: 100%;
                }
                .logo-container {
                    position: relative;
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                }
                .logo-glow {
                    display: none;
                }
                
                .hamburger-menu {
                    display: ${!isMounted ? 'none' : (isMobile ? 'flex' : 'none')};
                    flex-direction: column;
                    cursor: pointer;
                    padding: 0.5rem;
                    z-index: 3000;
                    transition: all 0.3s ease;
                    background: rgba(30,58,138,0.85);
                    border-radius: 8px;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.2);
                }
                .hamburger-line {
                    width: 28px;
                    height: 4px;
                    background-color: #fff;
                    margin: 4px 0;
                    transition: all 0.3s ease;
                    border-radius: 2px;
                    box-shadow: 0 1px 4px rgba(0,0,0,0.15);
                }
                .hamburger-menu.open .hamburger-line:nth-child(1) {
                    transform: rotate(45deg) translate(6px, 6px);
                }
                .hamburger-menu.open .hamburger-line:nth-child(2) {
                    opacity: 0;
                }
                .hamburger-menu.open .hamburger-line:nth-child(3) {
                    transform: rotate(-45deg) translate(6px, -6px);
                }
                
                .mobile-menu-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100vw;
                    height: 100vh;
                    background: rgba(0, 0, 0, 0.5);
                    z-index: 1999;
                    opacity: ${isMobileMenuOpen ? '1' : '0'};
                    visibility: ${isMobileMenuOpen ? 'visible' : 'hidden'};
                    transition: all 0.3s ease;
                }
                
                .mobile-menu {
                    position: fixed;
                    top: 0;
                    right: 0;
                    width: ${windowWidth <= 480 ? 'calc(100vw - 40px)' : '280px'};
                    min-width: 220px;
                    max-width: 400px;
                    height: 100vh;
                    background: linear-gradient(135deg, rgba(30, 58, 138, 0.98) 0%, rgba(15, 30, 80, 0.99) 100%);
                    backdrop-filter: blur(10px);
                    display: flex;
                    flex-direction: column;
                    padding: 5rem 2rem 2rem;
                    transform: translateX(${isMobileMenuOpen ? '0' : '100%'});
                    transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                    z-index: 2000;
                    box-shadow: -5px 0 25px rgba(0, 0, 0, 0.3);
                }
                
                .mobile-nav-item {
                    margin: 0.5rem 0;
                    opacity: ${isMobileMenuOpen ? '1' : '0'};
                    transform: translateX(${isMobileMenuOpen ? '0' : '50px'});
                    transition: all 0.3s ease;
                    transition-delay: calc(0.1s * var(--delay));
                }
                
                .mobile-nav-item:hover {
                    background: rgba(255, 255, 255, 0.1);
                    transform: translateX(-5px);
                    padding-left: 1rem;
                    border-radius: 8px;
                }
                
                .mobile-close-btn {
                    position: absolute;
                    top: 1rem;
                    right: 1rem;
                    width: 40px;
                    height: 40px;
                    border: none;
                    background: rgba(255, 255, 255, 0.1);
                    border-radius: 50%;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    z-index: 2001;
                    backdrop-filter: blur(10px);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                }
                
                .mobile-close-btn:hover {
                    background: rgba(255, 255, 255, 0.2);
                    transform: rotate(90deg) scale(1.15);
                    animation: glowPulse 2s ease-in-out infinite;
                    border: 1px solid rgba(255, 255, 255, 0.3);
                }
                
                .mobile-close-btn:active {
                    transform: rotate(90deg) scale(0.95);
                    background: rgba(233, 0, 0, 0.3);
                }
                
                .mobile-close-btn::before,
                .mobile-close-btn::after {
                    content: '';
                    position: absolute;
                    width: 20px;
                    height: 2px;
                    background: #fff;
                    border-radius: 1px;
                }
                
                .mobile-close-btn::before {
                    transform: rotate(45deg);
                }
                
                .mobile-close-btn::after {
                    transform: rotate(-45deg);
                }
                
                .desktop-nav {
                    display: ${!isMounted ? 'flex' : (isMobile ? 'none' : 'flex')};
                    gap: 0.5rem;
                    align-items: center;
                    flex-wrap: wrap;
                    overflow: hidden;
                }
            `}</style>

            {/* Mobile Menu Overlay */}
            {isMounted && isMobileMenuOpen && (
                <div className="mobile-menu-overlay" onClick={() => setIsMobileMenuOpen(false)} />
            )}

            <nav 
                className={showInitialAnimation ? "navbar-enter" : ""}
                style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "100%",
                    background: scrolled
                        ? "linear-gradient(135deg, rgba(30, 58, 138, 0.95) 0%, rgba(15, 30, 80, 0.98) 100%)"
                        : "linear-gradient(to bottom, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 70%, transparent 100%)",
                    color: "#fff",
                    padding: "0.8rem 2rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    zIndex: 2000,
                    backdropFilter: "blur(10px)",
                    WebkitBackdropFilter: "blur(10px)",
                    boxSizing: "border-box",
                    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                    boxShadow: scrolled ? "0 8px 32px rgba(0, 0, 0, 0.3)" : "none",
                }}
            >
                {/* Floating particles - hidden on mobile */}
                {isMounted && !isMobile && particles.map(particle => (
                    <div
                        key={particle.id}
                        className="floating-particle"
                        style={{
                            left: `${10 + particle.id * 12}%`,
                            top: `${20 + (particle.id % 3) * 20}px`,
                            animationDelay: `${particle.delay}s`,
                            animationDuration: `${particle.duration}s`,
                        }}
                    />
                ))}

                {/* Logo Section */}
                <div className="logo-container">
                    <div className="logo-glow" />
                    <a
                        href="https://nss.iiit.ac.in"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                            width: 40,
                            height: 40,
                            borderRadius: "50%",
                            overflow: "hidden",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            marginRight: "0.7rem",
                            boxShadow: "0 2px 8px rgba(30,58,138,0.15)",
                            background: "white",
                            cursor: "pointer"
                        }}
                    >
                        <img
                            src="/favicon.ico"
                            alt="favicon"
                            style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover"
                            }}
                        />
                    </a>
                    <div style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        gap: "0.5rem",
                    }}>
                        <span style={{
                            fontSize: isMobile ? "1rem" : "1.2rem",
                            color: "#fff",
                            letterSpacing: "2px",
                            fontFamily: "Merriweather, Georgia, serif",
                            fontWeight: "bold",
                            textShadow: "2px 2px 4px rgba(0,0,0,0.5)"
                        }}>
                            NSS,
                        </span>
                        {isMounted && (!isMobile || windowWidth > 480) && (
                            <span style={{
                                fontSize: isMobile ? "1rem" : "1.2rem",
                                color: "rgba(255, 255, 255, 0.85)",
                                letterSpacing: "1px",
                                fontFamily: "Merriweather, Georgia, serif",
                                fontWeight: "bold",
                                textShadow: "1px 1px 2px rgba(0,0,0,0.3)"
                            }}>
                                IIIT HYDERABAD
                            </span>
                        )}
                    </div>
                </div>

                {/* Desktop Navigation Items */}
                <div className="desktop-nav">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
                        if (item.label === "Contact Us") {
                            return (
                                <a
                                    key={item.label}
                                    href="#footer"
                                    className="nav-item"
                                    style={{
                                        color: "#fff",
                                        textDecoration: "none",
                                        fontWeight: "600",
                                        padding: "0.5rem 1.2rem",
                                        borderRadius: "12px",
                                        border: "2px solid transparent",
                                        background: "rgba(255, 255, 255, 0.1)",
                                        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                                        cursor: "pointer",
                                        fontSize: "0.9rem",
                                        letterSpacing: "0.5px",
                                    }}
                                    onClick={(e) => {
                                        handleContactClick(e);
                                        createRipple(e);
                                    }}
                                    onMouseEnter={e => {
                                        e.currentTarget.style.background = "rgba(255, 255, 255, 0.2)";
                                        e.currentTarget.style.transform = "translateY(-2px)";
                                        e.currentTarget.style.boxShadow = "0 8px 25px rgba(0, 0, 0, 0.2)";
                                    }}
                                    onMouseLeave={e => {
                                        e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)";
                                        e.currentTarget.style.transform = "translateY(0)";
                                        e.currentTarget.style.boxShadow = "none";
                                    }}
                                >
                                    {item.label}
                                </a>
                            );
                        }
                        return (
                            <Link 
                                key={item.label + item.href}
                                href={item.href}
                                className="nav-item"
                                style={{
                                    color: "#fff",
                                    textDecoration: "none",
                                    fontWeight: "600",
                                    padding: "0.5rem 1.2rem",
                                    borderRadius: "12px",
                                    border: isActive ? `2px solid ${ACTIVE_BG}` : "2px solid transparent",
                                    background: isActive 
                                        ? `linear-gradient(135deg, ${ACTIVE_BG} 0%, #ff4444 100%)`
                                        : "transparent",
                                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                                    cursor: "pointer",
                                    fontSize: "0.9rem",
                                    letterSpacing: "0.5px",
                                    boxShadow: isActive ? "0 4px 15px rgba(233, 0, 0, 0.4)" : "none",
                                    transform: isActive ? "translateY(-1px)" : "translateY(0)",
                                    display: "inline-block"
                                }}
                                onClick={(e) => handleNavItemClick(item.href, e)}
                                onMouseEnter={e => {
                                    if (!isActive) {
                                        e.currentTarget.style.background = "rgba(255, 255, 255, 0.15)";
                                        e.currentTarget.style.transform = "translateY(-2px)";
                                        e.currentTarget.style.boxShadow = "0 8px 25px rgba(0, 0, 0, 0.2)";
                                    }
                                }}
                                onMouseLeave={e => {
                                    if (!isActive) {
                                        e.currentTarget.style.background = "transparent";
                                        e.currentTarget.style.transform = "translateY(0)";
                                        e.currentTarget.style.boxShadow = "none";
                                    }
                                }}
                            >
                                {item.label}
                            </Link>
                        );
                    })}
                    {/* Login/Profile Button */}
                    {!uid ? (
                        <button
                            onClick={() => window.location.replace("http://localhost:8000/login")}
                            style={{
                                padding: "0.5rem 1.2rem",
                                borderRadius: "12px",
                                background: NSS_BLUE,
                                color: "#fff",
                                fontWeight: 600,
                                border: "none",
                                cursor: "pointer",
                                marginLeft: "0.5rem"
                            }}
                        >
                            Login
                        </button>
                    ) : (
                        <button
                            onClick={() => window.location.replace(`http://localhost:3000/me/profile/${uid}`)}
                            style={{
                                padding: "0.3rem",
                                borderRadius: "50%",
                                background: "#fff",
                                border: `2px solid ${NSS_BLUE}`,
                                cursor: "pointer",
                                width: 40,
                                height: 40,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                marginLeft: "0.5rem"
                            }}
                            title="Go to profile"
                        >
                            <img
                                src="/favicon.ico"
                                alt="Profile"
                                style={{
                                    width: "28px",
                                    height: "28px",
                                    borderRadius: "50%",
                                    objectFit: "cover"
                                }}
                            />
                        </button>
                    )}
                </div>

                {/* Hamburger Menu Button - always show on mobile */}
                {isMobile && (
                    <div 
                        className={`hamburger-menu ${isMobileMenuOpen ? 'open' : ''}`}
                        onClick={toggleMobileMenu}
                    >
                        <div className="hamburger-line"></div>
                        <div className="hamburger-line"></div>
                        <div className="hamburger-line"></div>
                    </div>
                )}
            </nav>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="mobile-menu" style={{ display: isMobile ? 'flex' : 'none', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start' }}>
                    {/* Top section: Login/Profile button or favicon */}
                    <div style={{ width: "100%", display: "flex", justifyContent: "center", marginBottom: "2rem" }}>
                        {!uid ? (
                            <button
                                onClick={() => window.location.replace("http://localhost:8000/login")}
                                style={{
                                    padding: "0.7rem 2rem",
                                    borderRadius: "12px",
                                    background: NSS_BLUE,
                                    color: "#fff",
                                    fontWeight: 600,
                                    border: "none",
                                    cursor: "pointer",
                                    fontSize: "1.1rem",
                                    boxShadow: "0 2px 8px rgba(30,58,138,0.15)"
                                }}
                            >
                                Login
                            </button>
                        ) : (
                            <a
                                href={`http://localhost:3000/me/profile/${uid}`}
                                style={{
                                    width: "48px",
                                    height: "48px",
                                    borderRadius: "50%",
                                    overflow: "hidden",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    boxShadow: "0 2px 8px rgba(30,58,138,0.15)",
                                    background: "white"
                                }}
                                title="Go to profile"
                            >
                                <img
                                    src="/favicon.ico"
                                    alt="Profile"
                                    style={{
                                        width: "40px",
                                        height: "40px",
                                        borderRadius: "50%",
                                        objectFit: "cover"
                                    }}
                                />
                            </a>
                        )}
                    </div>
                    <button 
                        className="mobile-close-btn"
                        onClick={() => setIsMobileMenuOpen(false)}
                        aria-label="Close menu"
                        title="Close Menu"
                    />
                    <div style={{
                        opacity: isMobileMenuOpen ? '1' : '0',
                        transform: isMobileMenuOpen ? 'translateY(0)' : 'translateY(-10px)',
                        transition: 'all 0.3s ease',
                        transitionDelay: '0.1s',
                        marginBottom: '2rem',
                        paddingTop: '2rem',
                        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                        paddingBottom: '1rem',
                        width: '100%',
                        textAlign: 'center',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}>
                        <h3 style={{
                            color: '#fff',
                            fontSize: '1.3rem',
                            fontWeight: 'bold',
                            margin: 0,
                            textAlign: 'center',
                            letterSpacing: '1px',
                            fontFamily: 'Merriweather, Georgia, serif'
                        }}>
                            NAVIGATION
                        </h3>
                    </div>
                    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        {navItems.map((item, index) => {
                            const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
                            if (item.label === "Contact Us") {
                                return (
                                    <a
                                        key={item.label}
                                        href="#footer"
                                        className="mobile-nav-item"
                                        style={{
                                            '--delay': index,
                                            color: "#fff",
                                            textDecoration: "none",
                                            fontWeight: "600",
                                            padding: "1rem 0",
                                            borderRadius: "12px",
                                            fontSize: "1.1rem",
                                            letterSpacing: "0.5px",
                                            borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
                                            transition: "all 0.3s ease",
                                            display: "block",
                                            cursor: "pointer",
                                            position: "relative",
                                            textAlign: 'center',
                                            width: '100%',
                                        } as React.CSSProperties}
                                        onClick={handleContactClick}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)";
                                            e.currentTarget.style.transform = "translateX(-5px)";
                                            e.currentTarget.style.paddingLeft = "1rem";
                                            e.currentTarget.style.borderRadius = "8px";
                                            e.currentTarget.style.boxShadow = "0 4px 15px rgba(0, 0, 0, 0.1)";
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.background = "transparent";
                                            e.currentTarget.style.transform = "translateX(0)";
                                            e.currentTarget.style.paddingLeft = "0";
                                            e.currentTarget.style.borderRadius = "12px";
                                            e.currentTarget.style.boxShadow = "none";
                                        }}
                                    >
                                        <span style={{ position: "relative", zIndex: 1 }}>
                                            {item.label}
                                        </span>
                                    </a>
                                );
                            }
                            return (
                                <Link 
                                    key={item.label + item.href}
                                    href={item.href}
                                    className="mobile-nav-item"
                                    style={{
                                        '--delay': index,
                                        color: isActive ? ACTIVE_BG : "#fff",
                                        textDecoration: "none",
                                        fontWeight: isActive ? "700" : "600",
                                        padding: "1rem 0",
                                        borderRadius: "12px",
                                        fontSize: "1.1rem",
                                        letterSpacing: "0.5px",
                                        borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
                                        transition: "all 0.3s ease",
                                        display: "block",
                                        cursor: "pointer",
                                        position: "relative",
                                        background: isActive ? "rgba(233, 0, 0, 0.1)" : "transparent",
                                        textAlign: 'center',
                                        width: '100%',
                                    } as React.CSSProperties}
                                    onClick={(e) => handleNavItemClick(item.href, e)}
                                    onMouseEnter={(e) => {
                                        if (!isActive) {
                                            e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)";
                                            e.currentTarget.style.transform = "translateX(-5px)";
                                            e.currentTarget.style.paddingLeft = "1rem";
                                            e.currentTarget.style.borderRadius = "8px";
                                            e.currentTarget.style.boxShadow = "0 4px 15px rgba(0, 0, 0, 0.1)";
                                        } else {
                                            e.currentTarget.style.background = "rgba(233, 0, 0, 0.2)";
                                            e.currentTarget.style.transform = "translateX(-5px) scale(1.02)";
                                            e.currentTarget.style.boxShadow = "0 6px 20px rgba(233, 0, 0, 0.3)";
                                        }
                                    }}
                                    onMouseLeave={(e) => {
                                        if (!isActive) {
                                            e.currentTarget.style.background = "transparent";
                                            e.currentTarget.style.transform = "translateX(0)";
                                            e.currentTarget.style.paddingLeft = "0";
                                            e.currentTarget.style.borderRadius = "12px";
                                            e.currentTarget.style.boxShadow = "none";
                                        } else {
                                            e.currentTarget.style.background = "rgba(233, 0, 0, 0.1)";
                                            e.currentTarget.style.transform = "translateX(0)";
                                            e.currentTarget.style.boxShadow = "none";
                                        }
                                    }}
                                >
                                    <span style={{ position: "relative", zIndex: 1 }}>
                                        {item.label}
                                        {isActive && (
                                            <span style={{
                                                position: "absolute",
                                                right: "-10px",
                                                top: "50%",
                                                transform: "translateY(-50%)",
                                                fontSize: "0.8rem",
                                                color: ACTIVE_BG
                                            }}>
                                                ●
                                            </span>
                                        )}
                                    </span>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            )}
        </>
    );
};

export default Navbar;