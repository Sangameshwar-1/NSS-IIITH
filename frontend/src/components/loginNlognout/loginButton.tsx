"use client";
import { useEffect, useState } from "react";
import { login, logout } from "../../utils/loginNlogout";

export default function LoginButton() {
    const [uid, setUid] = useState<string | null>(null);

    // Check for uid cookie on mount
    useEffect(() => {
        // Simple cookie parser for "uid"
        const match = document.cookie.match(/(?:^|; )uid=([^;]*)/);
        setUid(match ? decodeURIComponent(match[1]) : null);
    }, []);

    if (!uid) {
        return (
            <button
                onClick={() => login("/")}
                style={{
                    padding: "0.5rem 1.2rem",
                    borderRadius: "12px",
                    background: "#1e3a8a",
                    color: "#fff",
                    fontWeight: 600,
                    border: "none",
                    cursor: "pointer"
                }}
            >
                Login
            </button>
        );
    } else {
        return (
            <button
                onClick={() => window.location.replace(`http://localhost:3000/me/profile/${uid}`)}
                style={{
                    padding: "0.3rem",
                    borderRadius: "50%",
                    background: "#fff",
                    border: "2px solid #1e3a8a",
                    cursor: "pointer",
                    width: 40,
                    height: 40,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
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
        );
    }
}