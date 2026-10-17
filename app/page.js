
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleLogin(e) {
    e.preventDefault();
    setError("");

    if (!email.trim()) {
      setError("Email is required.");
      return;
    }

    if (!/^[^\s@]+@gmail\.com$/i.test(email.trim())) {
      setError("Please enter a valid Gmail address.");
      return;
    }

    if (password.length <= 8) {
      setError("Password must be more than 8 characters.");
      return;
    }

    sessionStorage.setItem("isLoggedIn", "true");
    router.push("/notes");
  }

  return (
    <main className="login-page">
      <section className="login-card">
        <div className="logo">Q</div>

        <p className="system-label">SYSTEM ACTIVATED</p>

        <h1>QuestLog</h1>

        <p className="subtitle">
          Arise. Complete your daily quests.
        </p>

        <form onSubmit={handleLogin} noValidate>
          <label htmlFor="email">Email Address</label>

          <input
            id="email"
            type="email"
            placeholder="you@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor="password">Password</label>

          <input
            id="password"
            type="password"
            placeholder="At least 9 characters"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit">
            ENTER THE SYSTEM
          </button>

          {error && (
            <p className="error-message" role="alert">
              {error}
            </p>
          )}
        </form>

        <p className="footer-text">
          PLAYER LOGIN SYSTEM
        </p>
      </section>
    </main>
  );
}
