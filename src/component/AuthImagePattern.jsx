import React from "react";

function AuthImagePattern({ title, text }) {
  return (
    <div className="hidden md:flex bg-base-200 items-center justify-center p-6 sm:p-12">
      <div className="max-w-md text-center">
        <div className="grid grid-cols-3 gap-3 mb-8">
          {[...Array(9)].map((_, i) => {
            return (
              <div
                key={i}
                className={`aspect-square rounded-2xl bg-primary/40 ${
                  i % 2 === 0 ? "animate-pulse" : ""
                }`}
              ></div>
            );
          })}
        </div>
        <h1 className="text-2xl font-bold mb-4">{title}</h1>
        <p className="text-base-content/40">{text}</p>
      </div>
    </div>
  );
}

export default AuthImagePattern;
