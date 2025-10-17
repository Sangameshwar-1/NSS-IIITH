"use client";
export function login(path) {
    window.location.replace(`http://localhost:8000/login`);
}
export function logout() {
    window.location.replace("http://localhost:8000/logout");
}