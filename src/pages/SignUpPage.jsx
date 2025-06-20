import {
  Eye,
  EyeClosed,
  Loader,
  Loader2,
  Lock,
  LockOpen,
  Mail,
  MessageSquareText,
  User,
} from "lucide-react";
import React, { useState } from "react";
import AuthImagePattern from "../component/AuthImagePattern";
import { Link } from "react-router-dom";
import { useAuthStore } from "../stores/useAuthStore";
import toast from "react-hot-toast";

function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false);
  const { signup, isSigningUp } = useAuthStore();

  const handleSignUp = (e) => {
    e.preventDefault();
    const newForm = new FormData(e.target);
    const data = Object.fromEntries(newForm);
    signup(data);
  };
  return (
    <div className="h-screen grid md:grid-cols-2">
      {/* left side */}
      <div className="flex justify-center items-center p-6 lg:p-12">
        <div className="max-w-md w-full space-y-0">
          {/* logo here */}
          <div className="text-center mb-4">
            <div className="flex items-center flex-col gap-2 group">
              <div className="size-12 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary/30 transition-colors animate-bounce">
                <MessageSquareText className="size-7" />
              </div>
              <h1 className="text-2xl font-bold mt-2">Create Account</h1>
              <p className="text-base-content/60">
                Begin with free Account to Enjoy unlimited texts
              </p>
            </div>
          </div>

          {/* form */}
          <form onSubmit={handleSignUp} className="space-y-5">
            {/* full name */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Full Name</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                  <User className="size-5 text-base-content/40" />
                </div>
                <input
                  type="text"
                  name="fullName"
                  required
                  placeholder="John Doe"
                  style={{ outline: "none" }}
                  className="input input-bordered w-full pl-10"
                />
              </div>
            </div>

            {/* email */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Email</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                  <Mail className="size-5 text-base-content/40" />
                </div>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="example@example.com"
                  style={{ outline: "none" }}
                  className="input input-bordered w-full pl-10"
                />
              </div>
            </div>

            {/* password */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Password</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                  {showPassword ? (
                    <LockOpen className="size-5 text-red-600" />
                  ) : (
                    <Lock className="size-5 text-base-content/40" />
                  )}
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="••••••••"
                  required
                  className="input input-bordered w-full pl-10"
                  style={{ outline: "none" }}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center z-10 cursor-pointer transition-all"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <Eye className="size-5 text-red-600" />
                  ) : (
                    <EyeClosed className="size-5 text-base-content/40" />
                  )}
                </button>
              </div>
            </div>
            <button type="submit" className="btn btn-primary w-full">
              {isSigningUp ? (
                <Loader2 className="animate-spin" />
              ) : (
                "Create Account"
              )}
            </button>
          </form>
          <div className="text-center text-base-content/40 mt-3">
            Already have an Account?{" "}
            <Link to={"/login"} className="link link-primary">
              Log In
            </Link>
          </div>
        </div>
      </div>
      {/* right side */}
      <AuthImagePattern
        title="Join our Community"
        text="Enjoy unlimited Screen time with family and Love Ones"
      />
    </div>
  );
}

export default SignUpPage;
