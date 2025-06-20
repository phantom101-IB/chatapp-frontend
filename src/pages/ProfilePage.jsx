import { Camera, Loader, Mail, User } from "lucide-react";
import React, { useState } from "react";
import { useAuthStore } from "../stores/useAuthStore";
import toast from "react-hot-toast";

function ProfilePage() {
  const [imagePreview, setImagePreview] = useState(null);
  const { authUser, profile, isUpdatingProfile } = useAuthStore();
  const local = "http://localhost:3000";
  const cloud = "https://chatapp-backend-v5jc.onrender.com";
  const handleImagePreview = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target.form);
    // const entries = Object.fromEntries(formData);
    console.log(formData);
    // const MAX_FILE_BYTE = 2 * 1024 * 1024;
    const file = e.target.files[0];
    // if (!file) return;

    // if (file.size > MAX_FILE_BYTE) {
    //   toast.error(`file size limit: 2MB`);
    //   return;
    // }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const Base64Image = reader.result;
      setImagePreview(Base64Image);
      await profile(formData);
    };
  };

  const img_uri = authUser?.profilePic
    ? `${cloud}/api/v1/profile/${authUser.profilePic}`
    : null;

  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-2xl mx-auto p-4 py-8">
        <div className="bg-base-300 rounded-2xl p-6 space-y-6">
          {/* profile intro */}
          <div className="text-center">
            <h1 className="text-2xl font-semibold">Profile</h1>
            <p className="mt-2">Your profile information</p>
          </div>
          {/* Profile Photo */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <img
                src={img_uri || imagePreview || "/avatar.png"}
                alt="Profile"
                className="size-32 border-4 object-cover rounded-full"
              />
              <label
                htmlFor="image"
                className={`absolute p-2 bottom-0 right-0 rounded-full transition-all duration-200 bg-base-content hover:scale-105 cursor-pointer`}
              >
                <Camera className="size-5 text-base-200" />
                <form encType="multipart/form-data">
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    name="image"
                    id="image"
                    onChange={handleImagePreview}
                  />
                </form>
              </label>
            </div>
            <div className="text-sm text-zinc-400">
              {isUpdatingProfile ? (
                <div className="flex items-center flex-col">
                  <Loader className="size-5 animate-spin" />
                  <p className="text-sm font-medium text-base-content/40">
                    Loading...
                  </p>
                </div>
              ) : (
                "Click on the Camera to Update your Profile"
              )}
            </div>
          </div>
          {/* User Infor */}
          <div className="space-y-6">
            {/* fullname */}
            <div className="space-y-1.5">
              <div className="text-sm text-zinc-400 flex items-center gap-2">
                <User className="size-4" />
                Full Name
              </div>
              <p className="px-4 py-1.5 bg-base-200 rounded-lg border">
                {authUser.fullName}
              </p>
            </div>
            {/* Email */}
            <div className="space-y-1.5">
              <div className="text-sm text-zinc-400 flex items-center gap-2">
                <Mail className="size-4" />
                Email
              </div>
              <p className="px-4 py-1.5 bg-base-200 rounded-lg border">
                {authUser.email}
              </p>
            </div>
          </div>
          {/* Account infor */}
          <div className="mt-6 bg-base-300 p-6 rounded-xl">
            <h1 className="text-lg font-medium mb-4">Account Infor</h1>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between py-2 border-b border-zinc-400">
                <span>Member Since</span>
                <span>{authUser.createdAt}</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span>Account Status</span>
                <span className="text-green-500">Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
