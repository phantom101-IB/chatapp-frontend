import React from "react";
import { LogOut, MessageSquareText, Settings, User } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../stores/useAuthStore";

function NavBar() {
  const { authUser, logout } = useAuthStore();
  return (
    <nav className="bg-base-100 border-b border-base-300 backdrop-blur-lg fixed top-0 w-full">
      <div className="container mx-auto h-16 px-4">
        <div className="flex items-center justify-between h-full">
          {/* Logo */}
          <div className="flex items-center gap-8">
            <Link
              to={"/"}
              className="flex items-center justify-center gap-2.5 group "
            >
              <div className="size-9 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <MessageSquareText className="size-6 text-primary" />
              </div>
              <h1 className="text-lg font-bold">Chatty</h1>
            </Link>
          </div>

          {/* logout group */}

          <div className="flex items-center gap-1.5">
            <Link
              to={"/settings"}
              className="flex items-center justify-center gap-1 btn btn-sm transition-colors"
            >
              <Settings className="size-4" />
              <span className="hidden sm:inline">Settings</span>
            </Link>
            {authUser && (
              <>
                <Link
                  to={"/profile"}
                  className="flex items-center justify-center gap-1 btn btn-sm transition-colors"
                >
                  <User className="size-4" />
                  <span className="hidden sm:inline">Profile</span>
                </Link>

                <button
                  onClick={logout}
                  className="flex items-center justify-center btn btn-sm gap-2 transition-colors"
                >
                  <LogOut className="size-4" />
                  <span className="hidden sm:inline">Log Out</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
