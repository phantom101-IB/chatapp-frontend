import {
  Eye,
  EyeClosed,
  Lock,
  LockOpen,
  Mail,
  MessageSquareText,
  Loader2,
} from "lucide-react";
import React, { useState } from "react";
import AuthImagePattern from "../component/AuthImagePattern";
import { Link } from "react-router-dom";
import { useAuthStore } from "../stores/useAuthStore";

function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const { login, isLoggingIn } = useAuthStore();

  const handleLogin = (e) => {
    e.preventDefault();
    const entry = new FormData(e.target);
    const data = Object.fromEntries(entry);
    login(data);
  };
  return (
    <div className="h-screen grid md:grid-cols-2">
      {/* left side */}
      <div className="w-full flex items-center justify-center p-6 sm:p-12">
        <div className="max-w-md w-full space-y-8">
          {/* Logo here */}
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <div className="size-12 bg-primary/10 rounded-lg flex items-center justify-center animate-bounce">
                <MessageSquareText className="size-7 text-primary" />
              </div>
              <h1 className="text-2xl font-bold mt-2">Welcome Back!</h1>
              <p className="text-base-content/40">Sign In to Continue</p>
            </div>
          </div>
          <form onSubmit={handleLogin} className="space-y-6 mb-8">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Email</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center justify-center z-10 pointer-events-none">
                  <Mail className="size-5 text-base-content/40" />
                </div>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="example@example.com"
                  style={{ outline: "none" }}
                  className="input w-full pl-10"
                />
              </div>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Password</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center justify-center z-10 pointer-events-none">
                  {showPassword ? (
                    <LockOpen className="size-5 text-red-600" />
                  ) : (
                    <Lock className="size-5 text-base-content/40" />
                  )}
                </div>
                <input
                  type={`${showPassword ? "text" : "password"}`}
                  name="password"
                  className="input input-bordered px-10 w-full"
                  placeholder="••••••••"
                  required
                  style={{ outline: "none" }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center justify-center z-10"
                >
                  {showPassword ? (
                    <Eye className="size-5 text-red-600 cursor-pointer" />
                  ) : (
                    <EyeClosed className="size-5 text-base-content/40" />
                  )}
                </button>
              </div>
            </div>
            <button className="btn btn-primary w-full">
              {isLoggingIn ? (
                <Loader2 className="size-5 animate-spin" />
              ) : (
                "Sign In"
              )}
            </button>
          </form>
          <div className="text-center text-base-content/20">
            Don't have an Account?{" "}
            <Link to={"/signup"} className="link link-primary">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
      {/* right side */}
      <AuthImagePattern
        title="Welcome Back!"
        text="Get Connected with famiy and friends every moment"
      />
    </div>
  );
}

export default LoginPage;
