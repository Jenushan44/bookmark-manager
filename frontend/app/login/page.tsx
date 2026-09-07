"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "@/lib/firebase";

export default function LoginPage() {


  const router = useRouter();

  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleEmailAuth = () => {
    setError("");

    if (isRegistering) {
      createUserWithEmailAndPassword(auth, email, password)
        .then(() => { router.push("/"); })
        .catch(() => { setError("Could not create account."); });
    } else {
      signInWithEmailAndPassword(auth, email, password)
        .then(() => { router.push("/"); })
        .catch(() => { setError("Incorrect email or password."); });
    }
  };

  const handleGoogleSignIn = () => {

    setError("");
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
      .then(() => { router.push("/"); })
      .catch(() => { setError("Google sign in failed."); });
  };

  return (
    <div className="min-h-screen bg-[#09121a] flex items-center justify-center px-4">
      <div className="w-full max-w-[400px] bg-[#121a25] border border-gray-800 rounded-xl p-6">
        <p className="text-2xl font-semibold text-center">Bookmark Manager</p>

        <p className="text-gray-400 text-center mt-2">
          {isRegistering ? "Create an account" : "Sign in to your account"}
        </p>

        <div className="mt-6 flex flex-col gap-4">
          <input type="email" placeholder="Email" value={email} onChange={(event) => setEmail(event.target.value)} className="border border-gray-700 bg-[#0f1822] rounded-md px-3 py-2 outline-none" />
          <input type="password" placeholder="Password" value={password} onChange={(event) => setPassword(event.target.value)} className="border border-gray-700 bg-[#0f1822] rounded-md px-3 py-2 outline-none"
          />

          {error && (
            <p className="text-red-400 text-sm">{error}</p>
          )}

          <button onClick={handleEmailAuth} className="bg-[#5e54e0] rounded-md py-2 font-semibold cursor-pointer transition-all duration-200 hover:bg-[#6d63ed] hover:scale-[1.01] hover:shadow-lg">{isRegistering ? "Create Account" : "Log In"}</button>
          <div className="flex items-center gap-3">
            <hr className="flex-1 border-gray-700" />
            <p className="text-gray-500 text-sm">or</p>
            <hr className="flex-1 border-gray-700" />
          </div>
          <button onClick={handleGoogleSignIn} className="border border-gray-700 rounded-md py-2 font-semibold cursor-pointer text-gray-200 transition-all duration-200 hover:bg-gray-800 hover:border-gray-500 hover:text-white hover:shadow-md">Continue with Google</button>
        </div>

        <button onClick={() => setIsRegistering(!isRegistering)} className="mt-6 text-sm text-[#9b94ff] w-full cursor-pointer transition-colors duration-200 hover:text-[#b8b2ff] hover:underline">{isRegistering ? "Already have an account? Log in" : "Don't have an account? Register"}</button>

      </div>
    </div>
  );
}